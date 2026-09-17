// Namma Tour — map-offline.js
// Offline SVG map. No tiles, no internet — just your places and their
// coordinates drawn on a canvas-like SVG. Works in airplane mode.
//
// Shows:
//   • All curatedPlaces as gold dots
//   • Hub-to-hub roads as lines (from routes-data.js if available)
//   • User location as pulsing blue dot
//   • Tap a dot → see name + distance

let offlineMapState = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  width: 0,
  height: 0,
  bounds: null,
};

// Compute bounding box of all places
function computeOfflineBounds() {
  if (typeof curatedPlaces === 'undefined' || !curatedPlaces.length) {
    return { minLat: 8, maxLat: 13, minLng: 75, maxLng: 81 };
  }
  const lats = curatedPlaces.map(p => p.lat);
  const lngs = curatedPlaces.map(p => p.lng);
  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
}

// Project a lat/lng into pixel coordinates inside the SVG viewport
function projectOffline(lat, lng, bounds, width, height, pad) {
  pad = pad || 24;
  const x = pad + ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * (width - pad * 2);
  const y = pad + (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * (height - pad * 2);
  return [x, y];
}

// ---------- MAIN RENDER ----------
function renderOfflineMap(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (typeof curatedPlaces === 'undefined' || !curatedPlaces.length) {
    el.innerHTML = '<p class="tinyNote">Places data not loaded.</p>';
    return;
  }

  const width = Math.max(300, el.clientWidth || 340);
  const height = Math.round(width * 1.25);
  const bounds = computeOfflineBounds();

  offlineMapState.width = width;
  offlineMapState.height = height;
  offlineMapState.bounds = bounds;

  // Build SVG
  const svgParts = [];
  svgParts.push(`<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" style="background:#0a1f13;border-radius:12px;display:block;">`);

  // Faint background grid — gives it a "hand-drawn map" feel
  svgParts.push(`<g stroke="#153a24" stroke-width="0.5" opacity="0.5">`);
  for (let gx = 0; gx < width; gx += 40) {
    svgParts.push(`<line x1="${gx}" y1="0" x2="${gx}" y2="${height}" />`);
  }
  for (let gy = 0; gy < height; gy += 40) {
    svgParts.push(`<line x1="0" y1="${gy}" x2="${width}" y2="${gy}" />`);
  }
  svgParts.push(`</g>`);

  // Hub-to-hub roads (real road polylines from routes-data.js)
  if (typeof roadRoutes !== 'undefined' && roadRoutes.backbone) {
    svgParts.push(`<g stroke="#2d5c3e" stroke-width="1.2" fill="none" opacity="0.7">`);
    Object.keys(roadRoutes.backbone).forEach(key => {
      const seg = roadRoutes.backbone[key];
      if (!seg || !seg.coords || !seg.coords.length) return;
      const pts = seg.coords.map(c => projectOffline(c[1], c[0], bounds, width, height));
      const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
      svgParts.push(`<path d="${d}" />`);
    });
    svgParts.push(`</g>`);
  }

  // Place dots — cluster by state colour for visual identity
  svgParts.push(`<g>`);
  curatedPlaces.forEach(p => {
    const [x, y] = projectOffline(p.lat, p.lng, bounds, width, height);
    const fill = p.state === 'Kerala' ? '#6db68a' : '#d4af37';
    svgParts.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${fill}" ` +
      `stroke="#0a1f13" stroke-width="0.6" class="offlinePlaceDot" ` +
      `data-place-id="${p.id}" style="cursor:pointer;" />`
    );
  });
  svgParts.push(`</g>`);

  // Danger heatmap overlay (recent urgent tips — if getTips is loaded)
  if (typeof getTips === 'function') {
    const urgent = getTips().filter(t => t.type === 'urgent' && t.lat && t.lng);
    if (urgent.length) {
      svgParts.push(`<g>`);
      urgent.forEach(t => {
        const [x, y] = projectOffline(t.lat, t.lng, bounds, width, height);
        svgParts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="#e03131" opacity="0.18" />`);
        svgParts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#e03131" opacity="0.35" />`);
      });
      svgParts.push(`</g>`);
    }
  }

  // User location — pulsing blue dot
  if (typeof userCoords !== 'undefined' && userCoords) {
    const [ux, uy] = projectOffline(userCoords.lat, userCoords.lng, bounds, width, height);
    svgParts.push(`<circle cx="${ux.toFixed(1)}" cy="${uy.toFixed(1)}" r="14" fill="#4f9dff" opacity="0.15">
      <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2s" repeatCount="indefinite" />
    </circle>`);
    svgParts.push(`<circle cx="${ux.toFixed(1)}" cy="${uy.toFixed(1)}" r="5" fill="#4f9dff" stroke="#ffffff" stroke-width="1.5" />`);
    svgParts.push(`<text x="${ux.toFixed(1)}" y="${(uy - 14).toFixed(1)}" fill="#4f9dff" font-size="10" text-anchor="middle">${typeof t === 'function' ? t('mapYouAreHere') : 'You'}</text>`);
  }

  svgParts.push(`</svg>`);

  // Hint below the map
  svgParts.push(`<p class="tinyNote" style="margin-top:8px;text-align:center;">${typeof t === 'function' ? t('mapOfflineHint') : 'Offline map — works without internet'}</p>`);
  svgParts.push(`<p class="tinyNote" style="text-align:center;" id="offlineMapSelected">${typeof t === 'function' ? t('mapTapPlace') : 'Tap any dot to see details'}</p>`);

  el.innerHTML = svgParts.join('');

  // Wire up tap handlers on dots
  el.querySelectorAll('.offlinePlaceDot').forEach(dot => {
    dot.addEventListener('click', () => {
      const id = dot.getAttribute('data-place-id');
      showOfflinePlaceDetails(id);
    });
    // Larger touch target on mobile
    const r = dot.getAttribute('r');
    dot.setAttribute('r', String(parseFloat(r) * 1.6));
    dot.setAttribute('fill-opacity', '0.5');
  });
}

// ---------- TAP A DOT ----------
function showOfflinePlaceDetails(placeId) {
  if (typeof placeById === 'undefined' || !placeById[placeId]) return;
  const p = placeById[placeId];
  const label = document.getElementById('offlineMapSelected');
  if (!label) return;
  const lang = typeof getLang === 'function' ? getLang() : 'en';
  const ta = lang === 'ta';
  let distTxt = '';
  if (typeof userCoords !== 'undefined' && userCoords && typeof distanceKm === 'function') {
    const d = distanceKm(userCoords.lat, userCoords.lng, p.lat, p.lng);
    distTxt = ' · ' + d.toFixed(1) + ' km';
  }
  label.innerHTML = `<strong style="color:#d4af37;">${escapeHtml(p.place)}</strong> — ${escapeHtml(p.district)}, ${escapeHtml(p.state)}${distTxt}`;
  // Optionally open a bigger info card
  if (typeof showPlaceDetails === 'function') showPlaceDetails(p.id);
}

// ---------- REFRESH (called when location updates) ----------
function refreshOfflineMap(containerId) {
  if (!document.getElementById(containerId)) return;
  renderOfflineMap(containerId);
}

// ---------- FOCUS (zooms visually on a place) ----------
// The SVG map is a full overview, so "focus" just highlights the dot.
function focusOfflinePlace(placeId, containerId) {
  const el = document.getElementById(containerId || 'mapContainer');
  if (!el) return;
  const dot = el.querySelector(`.offlinePlaceDot[data-place-id="${placeId}"]`);
  if (!dot) return;
  const oldR = dot.getAttribute('r');
  const oldFill = dot.getAttribute('fill');
  dot.setAttribute('r', String(parseFloat(oldR) * 3));
  dot.setAttribute('fill', '#fff');
  setTimeout(() => {
    dot.setAttribute('r', oldR);
    dot.setAttribute('fill', oldFill);
  }, 1600);
}

window.renderOfflineMap       = renderOfflineMap;
window.refreshOfflineMap      = refreshOfflineMap;
window.focusOfflinePlace      = focusOfflinePlace;
window.showOfflinePlaceDetails = showOfflinePlaceDetails;
