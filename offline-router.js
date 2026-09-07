// ---------- OFFLINE ROUTER ----------
// Requires: curatedPlaces (places-data.js) and roadRoutes (routes-data.js,
// produced once by route-generator.html while online) to already be loaded
// as <script> tags before this file. No network calls happen in here —
// every route is either a bundled real-road polyline or a computed
// straight line, both fully available offline.

const placeById = {};
(typeof curatedPlaces !== 'undefined' ? curatedPlaces : []).forEach(p => { placeById[p.id] = p; });

// Build the hub-to-hub backbone as an adjacency graph so we can pathfind
// between any two districts even if they weren't directly precomputed as
// neighbors (e.g. Kanyakumari -> Chennai walks through several hubs).
function buildBackboneGraph() {
  const graph = {}; // hubId -> [ { to: hubId, key: 'a__b', distanceKm } ]
  if (typeof roadRoutes === 'undefined') return graph;
  Object.keys(roadRoutes.backbone).forEach(key => {
    const [a, b] = key.split('__');
    const r = roadRoutes.backbone[key];
    (graph[a] = graph[a] || []).push({ to: b, key, forward: true, distanceKm: r.distanceKm });
    (graph[b] = graph[b] || []).push({ to: a, key, forward: false, distanceKm: r.distanceKm });
  });
  return graph;
}
const backboneGraph = buildBackboneGraph();

// Dijkstra over the small hub graph (71 nodes, ~136 edges — instant on-device).
function findHubPath(startHub, endHub) {
  if (startHub === endHub) return [startHub];
  const dist = { [startHub]: 0 };
  const prev = {};
  const visited = new Set();
  const queue = new Set([startHub]);

  while (queue.size) {
    let u = null, best = Infinity;
    queue.forEach(n => { if (dist[n] < best) { best = dist[n]; u = n; } });
    queue.delete(u);
    if (u === endHub) break;
    visited.add(u);
    (backboneGraph[u] || []).forEach(edge => {
      if (visited.has(edge.to)) return;
      const nd = dist[u] + edge.distanceKm;
      if (nd < (dist[edge.to] ?? Infinity)) {
        dist[edge.to] = nd;
        prev[edge.to] = { node: u, key: edge.key, forward: edge.forward };
        queue.add(edge.to);
      }
    });
  }
  if (!(endHub in dist)) return null; // no path found in backbone data

  const path = [endHub];
  let cur = endHub;
  while (cur !== startHub) {
    const p = prev[cur];
    path.unshift(p.node);
    cur = p.node;
  }
  return path;
}

function hubIdForPlace(placeId) {
  const place = placeById[placeId];
  if (!place) return null;
  return roadRoutes.hubs[place.district] || null;
}

// Returns { coords: [[lat,lng],...], distanceKm, durationMin, real: bool }
// coords is ready to draw straight onto the offline map, in order from
// origin to destination.
function getRoute(fromId, toId) {
  const from = placeById[fromId], to = placeById[toId];
  if (!from || !to) return null;

  if (typeof roadRoutes === 'undefined') {
    return straightLineRoute(from, to);
  }

  const fromHub = hubIdForPlace(fromId);
  const toHub = hubIdForPlace(toId);
  const segments = [];
  let totalKm = 0, totalMin = 0, allReal = true;

  function addSpoke(placeId, hubId, reverse) {
    if (placeId === hubId) return; // place IS the hub, nothing to add
    const spoke = roadRoutes.spokes[placeId];
    if (!spoke) { allReal = false; return; }
    const pts = spoke.coords.map(c => [c[1], c[0]]); // [lng,lat] -> [lat,lng]
    segments.push(reverse ? pts.slice().reverse() : pts);
    totalKm += spoke.distanceKm; totalMin += spoke.durationMin;
  }

  if (fromHub && toHub) {
    addSpoke(fromId, fromHub, false);

    const hubPath = findHubPath(fromHub, toHub);
    if (hubPath) {
      for (let i = 0; i < hubPath.length - 1; i++) {
        const a = hubPath[i], b = hubPath[i + 1];
        const key = a + '__' + b, keyRev = b + '__' + a;
        const seg = roadRoutes.backbone[key] || roadRoutes.backbone[keyRev];
        if (!seg) { allReal = false; continue; }
        let pts = seg.coords.map(c => [c[1], c[0]]);
        if (!roadRoutes.backbone[key]) pts = pts.reverse(); // stored the other direction
        segments.push(pts);
        totalKm += seg.distanceKm; totalMin += seg.durationMin;
      }
    } else {
      allReal = false;
    }

    addSpoke(toId, toHub, true);
  } else {
    allReal = false;
  }

  if (!allReal || !segments.length) {
    return straightLineRoute(from, to);
  }

  const coords = segments.flat();
  return { coords, distanceKm: Math.round(totalKm * 10) / 10, durationMin: Math.round(totalMin), real: true };
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180, dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function straightLineRoute(from, to) {
  const km = haversineKm(from.lat, from.lng, to.lat, to.lng);
  return {
    coords: [[from.lat, from.lng], [to.lat, to.lng]],
    distanceKm: Math.round(km * 10) / 10,
    durationMin: Math.round(km / 40 * 60), // rough 40km/h estimate, clearly not a real road time
    real: false
  };
}

// ---------- OFFLINE MAP RENDERING (no tile server, pure SVG) ----------
// Projects lat/lng to SVG coordinates using the bounding box of all your
// curated places, so the whole thing works with zero map-tile downloads.
function projectPoint(lat, lng, bounds, width, height, pad) {
  const x = pad + ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * (width - pad * 2);
  const y = pad + (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * (height - pad * 2);
  return [x, y];
}

function getPlaceBounds() {
  const lats = curatedPlaces.map(p => p.lat), lngs = curatedPlaces.map(p => p.lng);
  return { minLat: Math.min(...lats), maxLat: Math.max(...lats), minLng: Math.min(...lngs), maxLng: Math.max(...lngs) };
}

function renderRouteSVG(containerId, fromId, toId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const route = getRoute(fromId, toId);
  if (!route) { container.innerHTML = '<p>Route unavailable.</p>'; return; }

  const width = container.clientWidth || 360, height = 420, pad = 24;
  const bounds = getPlaceBounds();
  const pts = route.coords.map(([lat, lng]) => projectPoint(lat, lng, bounds, width, height, pad));
  const pathD = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

  const from = placeById[fromId], to = placeById[toId];
  const [fx, fy] = projectPoint(from.lat, from.lng, bounds, width, height, pad);
  const [tx, ty] = projectPoint(to.lat, to.lng, bounds, width, height, pad);

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" style="background:#0d2818;border-radius:12px;">
      <path d="${pathD}" fill="none" stroke="${route.real ? '#d4af37' : '#7a9c85'}"
            stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="${route.real ? 'none' : '6,6'}"/>
      <circle cx="${fx}" cy="${fy}" r="6" fill="#5fbf7a"/>
      <circle cx="${tx}" cy="${ty}" r="6" fill="#e07a5f"/>
      <text x="${fx+10}" y="${fy+4}" fill="#f2e9d0" font-size="11">${from.place}</text>
      <text x="${tx+10}" y="${ty+4}" fill="#f2e9d0" font-size="11">${to.place}</text>
    </svg>
    <p style="color:#a9c2ac;font-size:0.85rem;margin-top:6px;">
      ${route.distanceKm} km &middot; ~${route.durationMin} min
      ${route.real ? '' : ' &middot; <em>approximate — road route not available offline for this pair</em>'}
    </p>`;
}
