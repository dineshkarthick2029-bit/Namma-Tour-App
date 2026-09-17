// Namma Tour — map-online.js
// Real interactive map using Leaflet + OpenStreetMap tiles.
// Free, no API key. Works online only.
//
// Leaflet is loaded via CDN in index.html (added in File 12).
// If Leaflet fails to load (no internet), the app calls map-offline.js
// instead — see app.js integration.

let leafletMap = null;
let placeMarkers = [];
let userMarker = null;
let routeLine = null;

// ---------- INIT ----------
// Creates the Leaflet map inside the given container. Called from app.js
// when the Map tab is activated and the phone is online.
function initOnlineMap(containerId, options) {
  options = options || {};
  if (typeof L === 'undefined') {
    console.warn('Leaflet not loaded — falling back to offline map.');
    if (typeof renderOfflineMap === 'function') {
      renderOfflineMap(containerId);
    } else {
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = '<p class="tinyNote">Map unavailable — Leaflet failed to load.</p>';
    }
    return null;
  }

  const el = document.getElementById(containerId);
  if (!el) return null;

  // Tear down any previous instance so we don't leak
  if (leafletMap) {
    leafletMap.remove();
    leafletMap = null;
  }
  placeMarkers = [];
  userMarker = null;
  routeLine = null;

  // Default center: middle of Tamil Nadu (roughly)
  const center = options.center || [10.5, 78.5];
  const zoom = options.zoom || 7;

  leafletMap = L.map(containerId, {
    center: center,
    zoom: zoom,
    zoomControl: true,
    attributionControl: true,
    preferCanvas: true,
  });

  // OpenStreetMap tiles — free, no key
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(leafletMap);

  // Add all curated places as markers
  if (typeof curatedPlaces !== 'undefined') {
    curatedPlaces.forEach(p => addPlaceMarker(p));
  }

  // Show user's location if already known
  if (typeof userCoords !== 'undefined' && userCoords) {
    updateUserMarker(userCoords.lat, userCoords.lng);
  }

  return leafletMap;
}

// ---------- PLACE MARKERS ----------
function addPlaceMarker(place) {
  if (!leafletMap || !place || !place.lat || !place.lng) return;
  const marker = L.circleMarker([place.lat, place.lng], {
    radius: 5,
    color: '#d4af37',
    fillColor: '#d4af37',
    fillOpacity: 0.85,
    weight: 1.5,
  });
  marker.bindPopup(buildPlacePopup(place));
  marker.on('click', () => {
    if (typeof showPlaceDetails === 'function') showPlaceDetails(place.id);
  });
  marker.addTo(leafletMap);
  placeMarkers.push({ id: place.id, marker: marker });
}

function buildPlacePopup(place) {
  const lang = (typeof getLang === 'function') ? getLang() : 'en';
  const dist = (typeof userCoords !== 'undefined' && userCoords && typeof distanceKm === 'function')
    ? distanceKm(userCoords.lat, userCoords.lng, place.lat, place.lng).toFixed(1) + ' km'
    : '';
  const safeName = escapeHtml(place.place);
  const safeDistrict = escapeHtml(place.district);
  const safeState = escapeHtml(place.state);
  const safeCat = escapeHtml(place.category);
  const safeText = escapeHtml(place.text);
  return `
    <div style="max-width:220px;font-family:system-ui,sans-serif;">
      <strong style="color:#d4af37;">${safeName}</strong><br>
      <small>${safeDistrict}, ${safeState}</small><br>
      <small style="text-transform:capitalize;">${safeCat}</small>${dist ? ' · ' + dist : ''}
      <p style="margin:6px 0;font-size:12px;">${safeText}</p>
      <button onclick="routeToPlace('${place.id}')" style="background:#d4af37;color:#111;border:none;padding:4px 10px;border-radius:6px;font-size:12px;cursor:pointer;">
        ${lang === 'ta' ? 'இந்த இடத்திற்கு பாதை' : 'Route to this place'}
      </button>
    </div>`;
}

// ---------- USER LOCATION MARKER ----------
function updateUserMarker(lat, lng) {
  if (!leafletMap) return;
  const latlng = [lat, lng];
  if (userMarker) {
    userMarker.setLatLng(latlng);
  } else {
    userMarker = L.circleMarker(latlng, {
      radius: 8,
      color: '#4f9dff',
      fillColor: '#4f9dff',
      fillOpacity: 0.7,
      weight: 3,
    });
    userMarker.bindPopup('📍 ' + (typeof t === 'function' ? t('mapYouAreHere') : 'You are here'));
    userMarker.addTo(leafletMap);
  }
}

function centerOnUser() {
  if (!leafletMap || typeof userCoords === 'undefined' || !userCoords) return;
  leafletMap.setView([userCoords.lat, userCoords.lng], 13);
}

// ---------- ROUTE DRAWING ----------
// If offline-router.js / routes-data.js are loaded, we can use real road
// routes. Otherwise fall back to a straight line between points.
function drawRouteOnMap(fromId, toId) {
  if (!leafletMap) return;
  if (typeof placeById === 'undefined' || !placeById[fromId] || !placeById[toId]) return;
  clearRouteOnMap();

  let coords = [];
  if (typeof getRoute === 'function') {
    const route = getRoute(fromId, toId);
    if (route && route.coords && route.coords.length) {
      coords = route.coords; // already [lat, lng]
    }
  }
  if (!coords.length) {
    const a = placeById[fromId];
    const b = placeById[toId];
    coords = [[a.lat, a.lng], [b.lat, b.lng]];
  }

  routeLine = L.polyline(coords, {
    color: '#d4af37',
    weight: 4,
    opacity: 0.85,
    lineJoin: 'round',
  }).addTo(leafletMap);

  // Fit the map so the whole route is visible
  leafletMap.fitBounds(routeLine.getBounds(), { padding: [30, 30] });
}

function clearRouteOnMap() {
  if (routeLine && leafletMap) {
    leafletMap.removeLayer(routeLine);
    routeLine = null;
  }
}

// ---------- FOCUS ON A SPECIFIC PLACE ----------
function focusPlace(placeId, zoom) {
  if (!leafletMap || typeof placeById === 'undefined') return;
  const p = placeById[placeId];
  if (!p) return;
  leafletMap.setView([p.lat, p.lng], zoom || 14);
  // Open popup after short delay so map has time to render
  setTimeout(() => {
    const entry = placeMarkers.find(x => x.id === placeId);
    if (entry) entry.marker.openPopup();
  }, 250);
}

// ---------- UPDATE FROM APP ----------
// Called by app.js when user location changes
function onUserLocationChanged(lat, lng) {
  if (!leafletMap) return;
  updateUserMarker(lat, lng);
}

window.initOnlineMap        = initOnlineMap;
window.addPlaceMarker       = addPlaceMarker;
window.updateUserMarker     = updateUserMarker;
window.centerOnUser         = centerOnUser;
window.drawRouteOnMap       = drawRouteOnMap;
window.clearRouteOnMap      = clearRouteOnMap;
window.focusPlace           = focusPlace;
window.onUserLocationChanged = onUserLocationChanged;
