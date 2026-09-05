// ---------- USER LOCATION (works offline - GPS chip needs no internet) ----------
let userCoords = null;
function requestLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => { userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude }; renderTips(); },
    () => { userCoords = null; }
  );
}
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ---------- IMPACT STATS ----------
function renderStats() {
  const list = getTips();
  const totalHelpful = list.reduce((sum, t) => sum + (t.helpful || 0), 0);
  const urgentCount = list.filter(t => t.type === 'urgent').length;
  const el = document.getElementById('statsRow');
  if (!el) return;
  el.innerHTML = `
    <div class="statCard"><div class="statNum">${list.length}</div><div class="statLabel">${getLang()==='ta'?'குறிப்புகள்':'Tips'}</div></div>
    <div class="statCard"><div class="statNum">${urgentCount}</div><div class="statLabel">${getLang()==='ta'?'அவசரம்':'Alerts'}</div></div>
    <div class="statCard"><div class="statNum">${totalHelpful}</div><div class="statLabel">${getLang()==='ta'?'பயனுள்ளது':'Helped'}</div></div>
  `;
}

// ---------- SEED DATA ----------
function getTips() {
  let tips = JSON.parse(localStorage.getItem('tips') || 'null');
  if (!tips) {
    tips = [
      { place: "Munnar - old bridge road", lat: 10.0889, lng: 77.0595, type: "urgent", text: "Landslide risk after heavy rain. Road closed near km 14 — take the highway detour, do not attempt the shortcut.", date: "2026-09-04", helpful: 27, synced: true },
      { place: "Kodaikanal Lake road", lat: 10.2381, lng: 77.4892, type: "urgent", text: "Fog is extremely thick after 6pm, two-wheeler accidents reported. Avoid riding after dark.", date: "2026-09-03", helpful: 19, synced: true },
      { place: "Kolukkumalai viewpoint", lat: 10.1512, lng: 77.2233, type: "recommend", text: "Best sunrise in the Western Ghats. Go before 5:30am, jeep track is rough.", date: "2026-09-03", helpful: 41, synced: true },
      { place: "Rameswaram - Pamban bridge", lat: 9.2762, lng: 79.2028, type: "warning", text: "Strong winds in the evening, hold your belongings tight while crossing on foot.", date: "2026-09-02", helpful: 15, synced: true },
      { place: "Green Valley Homestay, Munnar", lat: 10.0968, lng: 77.0621, type: "recommend", text: "Family-run, great food, ₹900/night. Ask for the room facing the tea estate.", date: "2026-09-01", helpful: 33, synced: true },
      { place: "Madurai - Meenakshi Temple", lat: 9.9195, lng: 78.1193, type: "recommend", text: "Enter before 6am to avoid crowds, free entry, camera ticket separate.", date: "2026-08-31", helpful: 52, synced: true },
      { place: "Kanyakumari beach road", lat: 8.0883, lng: 77.5385, type: "warning", text: "Pickpockets reported near the sunset viewpoint after 7pm, keep bags in front.", date: "2026-08-30", helpful: 22, synced: true },
      { place: "Ooty - Doddabetta peak", lat: 11.4064, lng: 76.7397, type: "recommend", text: "Cold even in summer, carry a jacket. Best visited on weekday mornings.", date: "2026-08-29", helpful: 18, synced: true },
      { place: "Thekkady boat jetty", lat: 9.5916, lng: 77.16, type: "warning", text: "Boat tickets sell out by 9am in season, book online the night before.", date: "2026-08-28", helpful: 12, synced: true },
      { place: "Coimbatore - Marudhamalai temple road", lat: 11.0724, lng: 76.893, type: "urgent", text: "Elephant crossing reported near the forest checkpost at dusk, drive slowly.", date: "2026-08-27", helpful: 24, synced: true },
      { place: "Yercaud lake", lat: 11.7753, lng: 78.2101, type: "recommend", text: "Boating is cheap and peaceful, go early morning for mist views.", date: "2026-08-26", helpful: 14, synced: true },
      { place: "Chennai - ECR road at night", lat: 12.8406, lng: 80.227, type: "warning", text: "Very few streetlights past Muttukadu, drive with high beam and caution.", date: "2026-08-25", helpful: 20, synced: true },
    ];
    localStorage.setItem('tips', JSON.stringify(tips));
  }
  return tips;
}
function saveTips(list) { localStorage.setItem('tips', JSON.stringify(list)); renderTips(); }

// ---------- FILTER + SEARCH STATE ----------
let activeFilter = 'all';
let searchTerm = '';

// ---------- RENDER TIPS FEED ----------
function renderTips() {
  let list = getTips().slice();
  if (activeFilter === 'nearby' && userCoords) {
    list.sort((a, b) => distanceKm(userCoords.lat, userCoords.lng, a.lat, a.lng) - distanceKm(userCoords.lat, userCoords.lng, b.lat, b.lng));
  } else {
    list.sort((a, b) => {
      if (a.type === 'urgent' && b.type !== 'urgent') return -1;
      if (b.type === 'urgent' && a.type !== 'urgent') return 1;
      return new Date(b.date) - new Date(a.date);
    });
  }
  if (activeFilter !== 'all' && activeFilter !== 'nearby') list = list.filter(x => x.type === activeFilter);
  if (searchTerm) list = list.filter(x => x.place.toLowerCase().includes(searchTerm.toLowerCase()));

  const badgeText = { recommend: t('recommend'), warning: t('warning'), urgent: t('urgent') };

  document.getElementById('tipsList').innerHTML = list.map((tip) => {
    const realIndex = getTips().indexOf(tip);
    const dist = (userCoords && tip.lat) ? `${distanceKm(userCoords.lat, userCoords.lng, tip.lat, tip.lng).toFixed(1)} km away` : '';
    return `
    <li class="tipCard ${tip.type}">
      <span class="badge ${tip.type}">${badgeText[tip.type]}</span>
      <h3>${tip.place}</h3>
      <p class="tipText">${tip.text}</p>
      <div class="tipMeta">${formatDate(tip.date)} · ${t('leftBy')} ${dist ? '· 📍 ' + dist : ''}</div>
      <div class="tipActions">
        <button onclick="speak('${escapeJs(tip.place)}. ${escapeJs(tip.text)}')">🔊 ${t('readAloud')}</button>
        <button onclick="shareOneTip(${realIndex})">📤 ${t('shareThis')}</button>
        <button onclick="markHelpful(${realIndex})">👍 ${tip.helpful || 0}</button>
      </div>
    </li>`;
  }).join('') || `<p class="helpHint">${getLang() === 'ta' ? 'எதுவும் கிடைக்கவில்லை' : 'No tips match.'}</p>`;
  renderStats();
}
function escapeJs(str) { return str.replace(/'/g, "\\'"); }
function formatDate(d) { return new Date(d).toLocaleDateString('en-GB'); }

// ---------- HELPFUL COUNTER ----------
function markHelpful(index) {
  const list = getTips();
  list[index].helpful = (list[index].helpful || 0) + 1;
  saveTips(list);
}

// ---------- FILTER CHIPS + SEARCH ----------
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderTips();
  });
});
document.getElementById('searchBox').addEventListener('input', (e) => {
  searchTerm = e.target.value;
  renderTips();
});

// ---------- TAB SWITCHING ----------
document.querySelectorAll('.segBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.segBtn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ---------- LANGUAGE TOGGLE ----------
document.getElementById('langToggle').addEventListener('click', () => {
  setLang(getLang() === 'en' ? 'ta' : 'en');
});

// ---------- THEME TOGGLE ----------
function applyTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  btn.textContent = theme === 'dark' ? t('themeDark') : t('themeLight');
}
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'dark';
  localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark');
  applyTheme();
});

// ---------- GEMINI KEY SETTING ----------
document.getElementById('geminiKeyInput').value = localStorage.getItem('geminiKey') || '';
document.getElementById('saveGeminiBtn').addEventListener('click', () => {
  const key = document.getElementById('geminiKeyInput').value.trim();
  if (key) { localStorage.setItem('geminiKey', key); alert(t('geminiSaved')); }
});

// ---------- ADD A TIP ----------
document.getElementById('saveTipBtn').addEventListener('click', () => {
  const place = document.getElementById('newPlace').value.trim();
  const text = document.getElementById('newText').value.trim();
  const type = document.getElementById('newType').value;
  if (!place || !text) return;
  const list = getTips();
  list.push({ place, type, text, date: new Date().toISOString().slice(0,10), helpful: 0, synced: false });
  saveTips(list);
  document.getElementById('newPlace').value = '';
  document.getElementById('newText').value = '';
  alert(t('addedMsg'));
  document.querySelector('[data-tab="tips"]').click();
});

// ---------- SHARE ONE TIP (native share sheet first, QR fallback) ----------
function shareOneTip(index) {
  const tip = getTips()[index];
  const text = `${tip.place}: ${tip.text} (via Namma Tour)`;
  if (navigator.share) {
    navigator.share({ title: 'Namma Tour tip', text }).catch(() => showTipQr(tip));
  } else {
    showTipQr(tip);
  }
}
function showTipQr(tip) {
  const data = JSON.stringify({ type: 'tip', tip });
  document.querySelector('[data-tab="sync"]').click();
  const out = document.getElementById('qrOutput');
  out.innerHTML = '';
  new QRCode(out, { text: data, width: 220, height: 220 });
}

// ---------- SHOW ALL TIPS AS QR ----------
document.getElementById('showQrBtn').addEventListener('click', () => {
  const data = JSON.stringify({ type: 'bulk_tips', tips: getTips() });
  const out = document.getElementById('qrOutput');
  out.innerHTML = '';
  new QRCode(out, { text: data, width: 220, height: 220 });
});

// ---------- SCAN A TRAVELER'S QR ----------
let scanner = null;
document.getElementById('scanBtn').addEventListener('click', () => {
  if (scanner) return;
  scanner = new Html5Qrcode('qrReader');
  scanner.start(
    { facingMode: 'environment' }, { fps: 10, qrbox: 220 },
    (decodedText) => { handleScannedData(decodedText); scanner.stop().then(() => { scanner = null; }); },
    () => {}
  );
});
function handleScannedData(text) {
  try {
    const data = JSON.parse(text);
    const list = getTips();
    if (data.type === 'tip') {
      list.push({ ...data.tip, synced: false });
      saveTips(list);
      alert('Received 1 tip: ' + data.tip.place);
    } else if (data.type === 'bulk_tips') {
      data.tips.forEach(tip => list.push({ ...tip, synced: false }));
      saveTips(list);
      alert('Received ' + data.tips.length + ' tips');
    }
    document.querySelector('[data-tab="tips"]').click();
  } catch (e) { alert('Not a valid Namma Tour QR code'); }
}

// ---------- ONLINE / OFFLINE STATUS ----------
function updateStatus() {
  const dot = document.getElementById('statusDot');
  if (navigator.onLine) { dot.textContent = t('online'); dot.className = 'status online'; syncPendingTips(); }
  else { dot.textContent = t('offline'); dot.className = 'status offline'; }
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

// ---------- FIREBASE SYNC ----------
function syncPendingTips() {
  if (typeof firebaseDb === 'undefined') return;
  const list = getTips();
  let changed = false;
  list.forEach(async (tip) => {
    if (!tip.synced) {
      try { await firebaseDb.collection('tips').add(tip); tip.synced = true; changed = true; } catch (e) {}
    }
  });
  if (changed) saveTips(list);
}

// ---------- VOICE ASSISTANT FAB ----------
const micFab = document.getElementById('micFab');
const assistantPanel = document.getElementById('assistantPanel');
micFab.addEventListener('click', () => {
  assistantPanel.classList.remove('hidden');
  document.getElementById('assistantReply').textContent = '';
  startAssistant();
});

// ---------- ONBOARDING (shows once) ----------
function initOnboarding() {
  if (localStorage.getItem('onboarded')) return;
  const overlay = document.getElementById('onboarding');
  overlay.classList.remove('hidden');
  const slides = [document.getElementById('obSlide1'), document.getElementById('obSlide2'), document.getElementById('obSlide3')];
  let step = 0;
  document.getElementById('obNextBtn').addEventListener('click', () => {
    slides[step].classList.add('hidden');
    step++;
    if (step < slides.length) {
      slides[step].classList.remove('hidden');
      if (step === slides.length - 1) document.getElementById('obNextBtn').textContent = 'Start';
    } else {
      overlay.classList.add('hidden');
      localStorage.setItem('onboarded', '1');
    }
  });
}

// ============================================================
// LIVE GPS TRACKING — uses only the phone's GPS chip (navigator.geolocation).
// No map tiles, no data connection, and no third-party maps SDK are used or
// required at any point — this works exactly the same with the phone in
// flight mode, as long as location services are on.
// ============================================================
let trackWatchId = null;
let trackPoints = [];
let trackStartTime = null;

function getTrackHistory() { return JSON.parse(localStorage.getItem('trackHistory') || '[]'); }
function saveTrackToHistory(trip) {
  const hist = getTrackHistory();
  hist.unshift(trip);
  localStorage.setItem('trackHistory', JSON.stringify(hist.slice(0, 20))); // keep last 20 trips on device
  renderTripHistory();
}

function startTracking() {
  if (!navigator.geolocation) { alert(t('gpsNotSupported')); return; }
  trackPoints = [];
  trackStartTime = Date.now();
  document.getElementById('trackStartBtn').classList.add('hidden');
  document.getElementById('trackStopBtn').classList.remove('hidden');
  trackWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      trackPoints.push({ lat: pos.coords.latitude, lng: pos.coords.longitude, t: Date.now() });
      renderTrackStats();
      drawTrackTrail();
    },
    (err) => { console.warn('GPS error', err); },
    { enableHighAccuracy: true, maximumAge: 4000, timeout: 15000 }
  );
}

function stopTracking() {
  if (trackWatchId !== null) navigator.geolocation.clearWatch(trackWatchId);
  trackWatchId = null;
  document.getElementById('trackStartBtn').classList.remove('hidden');
  document.getElementById('trackStopBtn').classList.add('hidden');
  if (trackPoints.length > 1) {
    saveTrackToHistory({ points: trackPoints, start: trackStartTime, end: Date.now(), distanceKm: trackDistanceKm() });
  }
}

function trackDistanceKm() {
  let d = 0;
  for (let i = 1; i < trackPoints.length; i++) {
    d += distanceKm(trackPoints[i - 1].lat, trackPoints[i - 1].lng, trackPoints[i].lat, trackPoints[i].lng);
  }
  return d;
}

function renderTrackStats() {
  const el = document.getElementById('trackStats');
  if (!el) return;
  const mins = trackStartTime ? Math.max(0, Math.floor((Date.now() - trackStartTime) / 60000)) : 0;
  el.innerHTML = `
    <div class="statCard"><div class="statNum">${trackDistanceKm().toFixed(2)}</div><div class="statLabel">km</div></div>
    <div class="statCard"><div class="statNum">${mins}</div><div class="statLabel">min</div></div>
    <div class="statCard"><div class="statNum">${trackPoints.length}</div><div class="statLabel">${getLang() === 'ta' ? 'புள்ளிகள்' : 'points'}</div></div>
  `;
}

// Draws the shape of the route on a canvas using only the raw lat/lng points
// collected — this is a relative trail sketch, not a downloaded map, so it
// needs zero bandwidth and zero storage beyond the points themselves.
function drawTrackTrail() {
  const canvas = document.getElementById('trackCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  if (trackPoints.length < 2) return;

  const lats = trackPoints.map(p => p.lat), lngs = trackPoints.map(p => p.lng);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const pad = 20;
  const scaleX = (w - pad * 2) / (maxLng - minLng || 0.0001);
  const scaleY = (h - pad * 2) / (maxLat - minLat || 0.0001);

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  trackPoints.forEach((p, i) => {
    const x = pad + (p.lng - minLng) * scaleX;
    const y = h - pad - (p.lat - minLat) * scaleY; // flip Y since lat increases upward
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  const first = trackPoints[0], last = trackPoints[trackPoints.length - 1];
  const fx = pad + (first.lng - minLng) * scaleX, fy = h - pad - (first.lat - minLat) * scaleY;
  const lx = pad + (last.lng - minLng) * scaleX, ly = h - pad - (last.lat - minLat) * scaleY;
  ctx.fillStyle = '#3a8a5a'; ctx.beginPath(); ctx.arc(fx, fy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e03131'; ctx.beginPath(); ctx.arc(lx, ly, 7, 0, Math.PI * 2); ctx.fill();
}

function renderTripHistory() {
  const el = document.getElementById('tripHistoryList');
  if (!el) return;
  const hist = getTrackHistory();
  if (!hist.length) { el.innerHTML = ''; return; }
  el.innerHTML = `<p class="tinyNote">${getLang() === 'ta' ? 'சமீபத்திய பயணங்கள்' : 'Recent trips'}</p>` +
    hist.slice(0, 5).map(trip => {
      const mins = Math.round((trip.end - trip.start) / 60000);
      return `<div class="tripRow">${new Date(trip.start).toLocaleDateString('en-GB')} · ${trip.distanceKm.toFixed(2)} km · ${mins} min</div>`;
    }).join('');
}

document.getElementById('trackStartBtn')?.addEventListener('click', startTracking);
document.getElementById('trackStopBtn')?.addEventListener('click', stopTracking);

// ============================================================
// SOS — shares the current GPS position. Uses the native share sheet first;
// falls back to an SMS draft (sms: URI), which sends over the normal
// cellular signal and needs NO mobile data or Wi-Fi at all — the closest
// thing to a true "zero internet" emergency share on a stock phone.
// ============================================================
function sendSOS() {
  if (!navigator.geolocation) { alert(t('gpsNotSupported')); return; }
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    const msg = `SOS - I need help. My location: https://maps.google.com/?q=${latitude},${longitude} (sent via Namma Tour)`;
    if (navigator.share) {
      navigator.share({ title: 'SOS', text: msg }).catch(() => fallbackSms(msg));
    } else {
      fallbackSms(msg);
    }
  }, () => alert(t('gpsError')), { enableHighAccuracy: true, timeout: 10000 });
}
function fallbackSms(msg) {
  window.location.href = `sms:?body=${encodeURIComponent(msg)}`;
}
document.getElementById('sosBtn')?.addEventListener('click', sendSOS);

// ============================================================
// BACKUP / RESTORE — tips and trip history live only in this browser's
// localStorage today, which means they vanish if the user clears site data
// or switches phones. Export writes everything to a JSON file the user
// saves themselves (no server involved); Import reads it back in.
// ============================================================
function exportData() {
  const data = { tips: getTips(), trackHistory: getTrackHistory(), savedPlaceIds: getSavedPlaceIds(), exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `namma-tour-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
document.getElementById('exportBtn')?.addEventListener('click', exportData);

document.getElementById('importFile')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (Array.isArray(data.tips)) saveTips(data.tips);
      if (Array.isArray(data.trackHistory)) { localStorage.setItem('trackHistory', JSON.stringify(data.trackHistory)); renderTripHistory(); }
      if (Array.isArray(data.savedPlaceIds)) { localStorage.setItem('savedPlaceIds', JSON.stringify(data.savedPlaceIds)); renderExplore(); }
      alert(t('importSuccess'));
    } catch (err) { alert(t('importError')); }
  };
  reader.readAsText(file);
});

renderTripHistory();

// ============================================================
// EXPLORE — curated directory of 300+ real Tamil Nadu & Kerala tourist
// places (places-data.js), separate from the community "Tips" feed.
// Runs entirely from the bundled places-data.js file — no internet call.
// ============================================================
let exploreState = 'all';
let exploreCat = 'all';
let exploreSearch = '';
let exploreSortByDistance = false;

function getSavedPlaceIds() { return JSON.parse(localStorage.getItem('savedPlaceIds') || '[]'); }
function toggleSavedPlace(id) {
  let saved = getSavedPlaceIds();
  if (saved.includes(id)) saved = saved.filter(x => x !== id);
  else saved.push(id);
  localStorage.setItem('savedPlaceIds', JSON.stringify(saved));
  renderExplore();
}

const CATEGORY_EMOJI = { temple: '🛕', hill: '⛰️', beach: '🏖️', backwater: '🚤', wildlife: '🐘', waterfall: '💦', heritage: '🏰', nature: '🌿', museum: '🖼️', adventure: '🎢' };

function filteredPlaces() {
  if (typeof curatedPlaces === 'undefined') return [];
  let list = curatedPlaces.slice();
  if (exploreState !== 'all') list = list.filter(p => p.state === exploreState);
  if (exploreCat !== 'all') list = list.filter(p => p.category === exploreCat);
  if (exploreSearch) {
    const s = exploreSearch.toLowerCase();
    list = list.filter(p => p.place.toLowerCase().includes(s) || p.district.toLowerCase().includes(s));
  }
  if (exploreSortByDistance && userCoords) {
    list.sort((a, b) => distanceKm(userCoords.lat, userCoords.lng, a.lat, a.lng) - distanceKm(userCoords.lat, userCoords.lng, b.lat, b.lng));
  }
  return list;
}

function placeCardHtml(p) {
  const saved = getSavedPlaceIds().includes(p.id);
  const dist = (userCoords) ? `${distanceKm(userCoords.lat, userCoords.lng, p.lat, p.lng).toFixed(0)} km` : '';
  return `
    <li class="tipCard placeCard" id="place-${p.id}">
      <span class="badge place">${CATEGORY_EMOJI[p.category] || '📍'} ${p.district}, ${p.state}</span>
      <h3>${p.place}</h3>
      <p class="tipText">${p.text}</p>
      <div class="tipMeta">${getLang() === 'ta' ? 'சிறந்த நேரம்' : 'Best time'}: ${p.best}${dist ? ' · 📍 ' + dist : ''}</div>
      <div class="tipActions">
        <button onclick="speak('${escapeJs(p.place)}. ${escapeJs(p.text)}')">🔊 ${t('readAloud')}</button>
        <button onclick="toggleSavedPlace('${p.id}')">${saved ? '💛 ' + (getLang() === 'ta' ? 'சேமிக்கப்பட்டது' : 'Saved') : '🤍 ' + (getLang() === 'ta' ? 'சேமி' : 'Save')}</button>
      </div>
    </li>`;
}

function renderExplore() {
  const listEl = document.getElementById('exploreList');
  const countEl = document.getElementById('exploreCount');
  if (!listEl) return;
  const list = filteredPlaces();
  listEl.innerHTML = list.map(placeCardHtml).join('') ||
    `<p class="helpHint">${getLang() === 'ta' ? 'எதுவும் கிடைக்கவில்லை' : 'No places match your filters.'}</p>`;
  if (countEl) {
    countEl.textContent = getLang() === 'ta'
      ? `${list.length} இடங்கள் கிடைத்தன (மொத்தம் ${curatedPlaces.length})`
      : `Showing ${list.length} of ${curatedPlaces.length} places`;
  }
  renderSavedPlacesBox();
}

function renderSavedPlacesBox() {
  const box = document.getElementById('savedPlacesBox');
  const listEl = document.getElementById('savedPlacesList');
  const labelEl = document.getElementById('savedPlacesLabel');
  if (!box || typeof curatedPlaces === 'undefined') return;
  const savedIds = getSavedPlaceIds();
  if (!savedIds.length) { box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  const savedPlaces = curatedPlaces.filter(p => savedIds.includes(p.id));
  labelEl.textContent = getLang() === 'ta' ? `📝 என் பயண பட்டியல் (${savedPlaces.length})` : `📝 My Trip List (${savedPlaces.length})`;
  listEl.innerHTML = savedPlaces.map(p => `<span class="savedChip">${p.place} <a href="#" onclick="toggleSavedPlace('${p.id}');return false;">✕</a></span>`).join('');
}

document.getElementById('exploreSearch')?.addEventListener('input', (e) => { exploreSearch = e.target.value; renderExplore(); });
document.getElementById('stateChipsRow')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  document.querySelectorAll('#stateChipsRow .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  exploreState = btn.dataset.state;
  renderExplore();
});
document.getElementById('categoryChipsRow')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  document.querySelectorAll('#categoryChipsRow .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  exploreCat = btn.dataset.cat;
  renderExplore();
});
document.getElementById('nearMeBtn')?.addEventListener('click', () => {
  exploreSortByDistance = !exploreSortByDistance;
  if (exploreSortByDistance && !userCoords) requestLocation();
  document.getElementById('nearMeBtn').classList.toggle('chip-active', exploreSortByDistance);
  renderExplore();
});
document.getElementById('surpriseBtn')?.addEventListener('click', () => {
  const list = filteredPlaces();
  if (!list.length) return;
  const pick = list[Math.floor(Math.random() * list.length)];
  renderExplore();
  requestAnimationFrame(() => {
    const el = document.getElementById(`place-${pick.id}`);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('highlightCard'); setTimeout(() => el.classList.remove('highlightCard'), 2000); }
  });
});

renderExplore();

// ---------- SERVICE WORKER ----------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}

// ---------- INSTALL APP BUTTON ----------
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('installBtn');
  if (btn) btn.classList.remove('hidden');
});
document.getElementById('installBtn')?.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
});

// ---------- INITIAL RENDER ----------
applyTranslations();
applyTheme();
updateStatus();
initOnboarding();
requestLocation();
