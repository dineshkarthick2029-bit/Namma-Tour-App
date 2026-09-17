// Namma Tour — features-extra.js
// Adds 4 features: Itinerary Generator, Weather Memory, Where-Am-I, Budget Tracker.
// Loads AFTER app.js. Depends on curatedPlaces, getTips, saveTips, userCoords,
// distanceKm, escapeHtml, t, getLang, toast, nearestPolice, nearestHospital.

// ============================================================
// FEATURE 1 — ITINERARY GENERATOR
// ============================================================
function buildItinerary() {
  const hours = Math.max(1, Math.min(12, Number(document.getElementById('planHours').value) || 4));
  const startQuery = document.getElementById('planStart').value.trim();
  const resultEl = document.getElementById('planResult');
  const ta = getLang() === 'ta';

  if (typeof curatedPlaces === 'undefined' || !curatedPlaces.length) {
    toast(ta ? 'இடங்கள் ஏற்றப்படவில்லை' : 'Places data not loaded', 'error');
    return;
  }

  let startLat = null, startLng = null, startLabel = '';
  if (startQuery) {
    const q = startQuery.toLowerCase();
    const hit = curatedPlaces.find(p =>
      p.place.toLowerCase().includes(q) || p.district.toLowerCase().includes(q)
    );
    if (hit) { startLat = hit.lat; startLng = hit.lng; startLabel = hit.place; }
  }
  if (startLat === null && userCoords) {
    startLat = userCoords.lat; startLng = userCoords.lng;
    startLabel = ta ? 'உங்கள் இருப்பிடம்' : 'Your location';
  }
  if (startLat === null) {
    toast(ta ? 'GPS அல்லது தொடக்க இடத்தை உள்ளிடவும்' : 'Enter a start location or enable GPS', 'warn');
    return;
  }

  const candidates = curatedPlaces
    .map(p => Object.assign({}, p, { distanceKm: distanceKm(startLat, startLng, p.lat, p.lng) }))
    .filter(p => p.distanceKm < 60)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  if (!candidates.length) {
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = `<p class="helpHint">${ta ? 'அருகில் இடங்கள் இல்லை' : 'No places nearby'}</p>`;
    return;
  }

  const MIN_PER_STOP = 45;
  const totalSlots = Math.floor((hours * 60) / MIN_PER_STOP);
  const stops = candidates.slice(0, Math.max(2, totalSlots));

  let totalKm = 0;
  for (let i = 1; i < stops.length; i++) {
    totalKm += distanceKm(stops[i - 1].lat, stops[i - 1].lng, stops[i].lat, stops[i].lng);
  }
  const totalMin = stops.length * MIN_PER_STOP;

  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <p class="tinyNote" style="margin-bottom:10px;">${ta ? 'தொடக்கம்' : 'Starting from'}: <strong>${escapeHtml(startLabel)}</strong></p>
    ${stops.map((s, i) => `
      <div class="planStop">
        <div class="planNum">${i + 1}</div>
        <div>
          <div class="planStopName">${escapeHtml(s.place)}</div>
          <div class="planStopMeta">${escapeHtml(s.district)} · ${s.distanceKm.toFixed(1)} km · ~${MIN_PER_STOP} min</div>
        </div>
      </div>
    `).join('')}
    <div class="planSummary">
      ${ta ? 'மொத்த தூரம்' : 'Total distance'}: <strong>${totalKm.toFixed(1)} km</strong> ·
      ${ta ? 'மதிப்பிடப்பட்ட நேரம்' : 'Estimated time'}: <strong>~${Math.round(totalMin / 60 * 10) / 10} ${ta ? 'மணி' : 'hrs'}</strong>
    </div>
  `;
}
document.getElementById('planBuildBtn')?.addEventListener('click', buildItinerary);

// ============================================================
// FEATURE 2 — WEATHER MEMORY
// ============================================================
// Users log weather when they visit. Stored locally. When another user
// opens a place card, they see "Other travelers reported: often rainy".
function getWeatherLog() { return JSON.parse(localStorage.getItem('weatherLog') || '[]'); }
function saveWeatherLog(list) { localStorage.setItem('weatherLog', JSON.stringify(list.slice(-500))); }

const WEATHER_OPTIONS = [
  { id: 'sunny',  icon: '☀️', key: 'weatherSunny' },
  { id: 'cloudy', icon: '☁️', key: 'weatherCloudy' },
  { id: 'rainy',  icon: '🌧️', key: 'weatherRainy' },
  { id: 'foggy',  icon: '🌫️', key: 'weatherFoggy' },
  { id: 'hot',    icon: '🔥', key: 'weatherHot' },
  { id: 'cold',   icon: '❄️', key: 'weatherCold' },
];

let selectedWeather = null;

function renderWeatherButtons() {
  const el = document.getElementById('weatherButtons');
  if (!el) return;
  const ta = getLang() === 'ta';
  el.innerHTML = WEATHER_OPTIONS.map(w => `
    <button type="button" class="weatherBtn" data-weather="${w.id}">
      <span class="wIcon">${w.icon}</span>
      <span class="wLabel">${t(w.key)}</span>
    </button>
  `).join('');
  el.querySelectorAll('.weatherBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedWeather = btn.dataset.weather;
      el.querySelectorAll('.weatherBtn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });
}

document.getElementById('weatherSubmitBtn')?.addEventListener('click', () => {
  const ta = getLang() === 'ta';
  const place = document.getElementById('weatherPlace').value.trim();
  if (!place) { toast(ta ? 'ஒரு இடத்தை உள்ளிடவும்' : 'Enter a place', 'warn'); return; }
  if (!selectedWeather) { toast(ta ? 'வானிலையை தேர்ந்தெடுக்கவும்' : 'Pick a weather', 'warn'); return; }

  const log = getWeatherLog();
  log.push({
    place: place,
    weather: selectedWeather,
    date: new Date().toISOString().slice(0, 10),
    lat: userCoords ? userCoords.lat : null,
    lng: userCoords ? userCoords.lng : null,
    device: (typeof myDeviceId === 'function') ? myDeviceId() : 'unknown'
  });
  saveWeatherLog(log);

  toast(ta ? '✅ வானிலை சேமிக்கப்பட்டது' : '✅ Weather saved', 'success');
  document.getElementById('weatherPlace').value = '';
  selectedWeather = null;
  document.querySelectorAll('#weatherButtons .weatherBtn').forEach(b => b.classList.remove('active'));
});

// Returns a summary of weather for a place name (used in place cards)
function getWeatherSummary(placeName) {
  const log = getWeatherLog();
  const lower = placeName.toLowerCase();
  const matches = log.filter(e => e.place.toLowerCase().includes(lower) || lower.includes(e.place.toLowerCase()));
  if (matches.length < 2) return null;
  const counts = {};
  matches.forEach(m => { counts[m.weather] = (counts[m.weather] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const opt = WEATHER_OPTIONS.find(w => w.id === top[0]);
  if (!opt) return null;
  return { icon: opt.icon, weather: top[0], count: matches.length, label: t(opt.key) };
}

// ============================================================
// FEATURE 3 — WHERE AM I? (offline locator)
// ============================================================
document.getElementById('findBtn')?.addEventListener('click', () => {
  const ta = getLang() === 'ta';
  const resultEl = document.getElementById('findResult');

  const runWithCoords = (lat, lng) => {
    let nearestPlace = null, nearestDist = Infinity;
    if (typeof curatedPlaces !== 'undefined') {
      curatedPlaces.forEach(p => {
        const d = distanceKm(lat, lng, p.lat, p.lng);
        if (d < nearestDist) { nearestDist = d; nearestPlace = p; }
      });
    }
    const pol = (typeof nearestPolice === 'function') ? nearestPolice(lat, lng, 1)[0] : null;
    const hos = (typeof nearestHospital === 'function') ? nearestHospital(lat, lng, 1)[0] : null;

    resultEl.classList.remove('hidden');
    resultEl.innerHTML = `
      <div class="findRow"><span class="findLabel">📌 ${ta ? 'ஆயத்தொலைவு' : 'Coordinates'}</span><span class="findValue">${lat.toFixed(4)}, ${lng.toFixed(4)}</span></div>
      ${nearestPlace ? `<div class="findRow"><span class="findLabel">🏛️ ${ta ? 'அருகிலுள்ள இடம்' : 'Nearest place'}</span><span class="findValue">${escapeHtml(nearestPlace.place)}<br><small>${nearestDist.toFixed(1)} km · ${escapeHtml(nearestPlace.district)}</small></span></div>` : ''}
      ${pol ? `<div class="findRow"><span class="findLabel">🚔 ${ta ? 'அருகிலுள்ள காவல்' : 'Nearest police'}</span><span class="findValue">${escapeHtml(pol.name)}<br><small>${pol.distanceKm.toFixed(1)} km · <a href="tel:100">${ta ? 'அழை' : 'Call'}</a></small></span></div>` : ''}
      ${hos ? `<div class="findRow"><span class="findLabel">🏥 ${ta ? 'அருகிலுள்ள மருத்துவமனை' : 'Nearest hospital'}</span><span class="findValue">${escapeHtml(hos.name)}<br><small>${hos.distanceKm.toFixed(1)} km · <a href="tel:108">${ta ? 'அழை' : 'Call'}</a></small></span></div>` : ''}
    `;
  };

  if (userCoords) { runWithCoords(userCoords.lat, userCoords.lng); return; }
  if (!navigator.geolocation) { toast(ta ? 'GPS இல்லை' : 'GPS not supported', 'error'); return; }
  toast(ta ? 'GPS பெறுகிறது…' : 'Getting GPS…', 'info');
  navigator.geolocation.getCurrentPosition(
    (pos) => { userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude }; runWithCoords(userCoords.lat, userCoords.lng); },
    () => toast(t('gpsError'), 'error'),
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

// ============================================================
// FEATURE 4 — BUDGET TRACKER
// ============================================================
function getExpenses() { return JSON.parse(localStorage.getItem('expenses') || '[]'); }
function saveExpenses(list) { localStorage.setItem('expenses', JSON.stringify(list)); }

document.getElementById('budgetAddBtn')?.addEventListener('click', () => {
  const ta = getLang() === 'ta';
  const amount = Number(document.getElementById('budgetAmount').value);
  const category = document.getElementById('budgetCategory').value;
  const note = document.getElementById('budgetNote').value.trim();

  if (!amount || amount <= 0) { toast(ta ? 'சரியான தொகையை உள்ளிடவும்' : 'Enter a valid amount', 'warn'); return; }

  const list = getExpenses();
  list.push({
    amount: Math.round(amount),
    category: category,
    note: note,
    date: new Date().toISOString().slice(0, 10),
    ts: Date.now()
  });
  saveExpenses(list);

  document.getElementById('budgetAmount').value = '';
  document.getElementById('budgetNote').value = '';
  toast(ta ? '✅ சேமிக்கப்பட்டது' : '✅ Saved', 'success');
  renderBudgetSummary();
});

function renderBudgetSummary() {
  const el = document.getElementById('budgetSummary');
  if (!el) return;
  const ta = getLang() === 'ta';
  const list = getExpenses();
  if (!list.length) { el.innerHTML = `<p class="tinyNote">${ta ? 'இன்னும் செலவுகள் இல்லை' : 'No expenses yet'}</p>`; return; }

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTotal = list.filter(e => e.date === todayStr).reduce((s, e) => s + e.amount, 0);
  const total = list.reduce((s, e) => s + e.amount, 0);
  const days = new Set(list.map(e => e.date)).size;
  const dailyAvg = Math.round(total / days);

  const byCat = {};
  list.forEach(e => { byCat[e.category] = (byCat[e.category] || 0) + e.amount; });
  const catRows = Object.entries(byCat).map(([c, amt]) => {
    const label = t('budget' + c.charAt(0).toUpperCase() + c.slice(1));
    return `<div class="budgetCatRow"><span>${escapeHtml(label)}</span><span>₹${amt}</span></div>`;
  }).join('');

  el.innerHTML = `
    <div class="budgetTotals">
      <div class="budgetStat"><div class="statNum">₹${todayTotal}</div><div class="statLabel">${ta ? 'இன்று' : 'Today'}</div></div>
      <div class="budgetStat"><div class="statNum">₹${total}</div><div class="statLabel">${ta ? 'மொத்தம்' : 'Total'}</div></div>
      <div class="budgetStat"><div class="statNum">₹${dailyAvg}</div><div class="statLabel">${ta ? 'தினசரி' : 'Daily avg'}</div></div>
    </div>
    <div class="budgetCatList">${catRows}</div>
    <button id="budgetClearBtn" class="dangerBtn" style="width:auto;margin-top:12px;padding:8px 14px;font-size:13px;">${ta ? 'அழி' : 'Clear all'}</button>
  `;
  document.getElementById('budgetClearBtn')?.addEventListener('click', () => {
    if (!confirm(ta ? 'அனைத்து செலவுகளையும் அழிக்கவா?' : 'Clear all expenses?')) return;
    saveExpenses([]);
    renderBudgetSummary();
  });
}

// ============================================================
// INIT — wire up on load
// ============================================================
window.addEventListener('load', () => {
  renderWeatherButtons();
  renderBudgetSummary();
});

// Expose
window.buildItinerary = buildItinerary;
window.getWeatherSummary = getWeatherSummary;
window.getWeatherLog = getWeatherLog;
window.getExpenses = getExpenses;
window.renderBudgetSummary = renderBudgetSummary;
