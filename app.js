// Namma Tour — app.js
// Part A: core, tips, add-with-template, explore
// Part B: map, sos, fare, phrasebook, ai
// Part C: track, settings, languages, diagnostics, init
// Paste all three parts into one file, then save & upload.

// ============================================================
// USER LOCATION (works offline — GPS chip needs no internet)
// ============================================================
let userCoords = null;
function requestLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      if (typeof onUserLocationChanged === 'function') onUserLocationChanged(userCoords.lat, userCoords.lng);
      renderTips();
      if (typeof refreshOfflineMap === 'function' && document.getElementById('map')?.classList.contains('active')) {
        renderOfflineMap('mapContainer');
      }
    },
    () => { userCoords = null; },
    { enableHighAccuracy: true, maximumAge: 30000, timeout: 15000 }
  );
}
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ============================================================
// UTIL
// ============================================================
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function escapeJs(str) {
  return String(str ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function formatDate(d) { return new Date(d).toLocaleDateString('en-GB'); }
function genTipId() { return 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

// ============================================================
// TOASTS
// ============================================================
function toast(message, type) {
  const container = document.getElementById('toastContainer');
  if (!container) { console.warn('Toast:', message); return; }
  const el = document.createElement('div');
  el.className = 'toast' + (type ? ' ' + type : '');
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 220);
  }, 3200);
}

// ============================================================
// PER-DEVICE ID (used for trust — not tied to any identity)
// ============================================================
function myDeviceId() {
  let id = localStorage.getItem('deviceId');
  if (!id) {
    id = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('deviceId', id);
  }
  return id;
}

// ============================================================
// TIPS STORAGE + SEED
// ============================================================
function getTips() {
  let tips = JSON.parse(localStorage.getItem('tips') || 'null');
  if (!tips) {
    tips = [
      { place: "Munnar - old bridge road", lat: 10.0889, lng: 77.0595, type: "urgent", text: "Landslide risk after heavy rain. Road closed near km 14 — take the highway detour.", date: "2026-09-04", helpful: 27, synced: true },
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
  let changed = false;
  tips.forEach(tip => { if (!tip.id) { tip.id = genTipId(); changed = true; } });
  if (changed) localStorage.setItem('tips', JSON.stringify(tips));
  return tips;
}
function saveTips(list) {
  localStorage.setItem('tips', JSON.stringify(list));
  renderTips();
  if (typeof autoBackupToCloud === 'function') autoBackupToCloud();
}

// ============================================================
// SPAM GUARDS
// ============================================================
function getVoted(kind) { return JSON.parse(localStorage.getItem('voted_' + kind) || '[]'); }
function hasVoted(kind, tipId) { return getVoted(kind).includes(tipId); }
function recordVote(kind, tipId) {
  const voted = getVoted(kind);
  voted.push(tipId);
  localStorage.setItem('voted_' + kind, JSON.stringify(voted));
}

// ============================================================
// TRUST SYSTEM
// ============================================================
const CONFIRM_THRESHOLD = 4;
const FLAG_DISPUTE_THRESHOLD = 4;
const FLAG_QUARANTINE_THRESHOLD = 8;
const URGENT_EXPIRY_DAYS = 21;

function getTipTrust(tip) {
  const confirms = tip.confirms || 0;
  const flags = tip.flags || 0;
  const refDate = tip.lastConfirmed || tip.date;
  const ageDays = (Date.now() - new Date(refDate).getTime()) / 86400000;
  const disputed = flags >= FLAG_DISPUTE_THRESHOLD && flags > confirms;
  const quarantined = flags >= FLAG_QUARANTINE_THRESHOLD && flags > confirms * 3;
  const expired = tip.type === 'urgent' && ageDays > URGENT_EXPIRY_DAYS && confirms < CONFIRM_THRESHOLD;
  const verified = confirms >= CONFIRM_THRESHOLD && !disputed;
  return { confirms, flags, disputed, quarantined, expired, verified, ageDays };
}

// ============================================================
// STATS ROW
// ============================================================
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

// ============================================================
// TIPS LIST RENDER
// ============================================================
let activeFilter = 'all';
let searchTerm = '';
let showQuarantined = false;

function renderTips() {
  let list = getTips().map((tip, i) => ({ ...tip, _idx: i }));

  const quarantinedCount = list.filter(x => getTipTrust(x).quarantined).length;
  if (!showQuarantined) list = list.filter(x => !getTipTrust(x).quarantined);

  if (activeFilter === 'nearby' && userCoords) {
    list.sort((a, b) => distanceKm(userCoords.lat, userCoords.lng, a.lat, a.lng) - distanceKm(userCoords.lat, userCoords.lng, b.lat, b.lng));
  } else {
    list.sort((a, b) => {
      const ta = getTipTrust(a), tb = getTipTrust(b);
      const aTop = a.type === 'urgent' && !ta.disputed && !ta.expired;
      const bTop = b.type === 'urgent' && !tb.disputed && !tb.expired;
      if (aTop && !bTop) return -1;
      if (bTop && !aTop) return 1;
      return new Date(b.date) - new Date(a.date);
    });
  }
  if (activeFilter !== 'all' && activeFilter !== 'nearby') list = list.filter(x => x.type === activeFilter);
  if (searchTerm) list = list.filter(x => x.place.toLowerCase().includes(searchTerm.toLowerCase()));

  const badgeText = { recommend: t('recommend'), warning: t('warning'), urgent: t('urgent') };

  const quarantineBanner = quarantinedCount > 0 ? `
    <div class="quarantineBanner">
      <span>${getLang() === 'ta' ? `${quarantinedCount} குறிப்பு(கள்) மறைக்கப்பட்டுள்ளன` : `${quarantinedCount} tip(s) hidden for heavy community flagging`}</span>
      <button onclick="toggleQuarantined()">${showQuarantined ? (getLang() === 'ta' ? 'மறை' : 'Hide') : (getLang() === 'ta' ? 'காட்டு' : 'Show')}</button>
    </div>` : '';
  document.getElementById('quarantineBanner').innerHTML = quarantineBanner;

  document.getElementById('tipsList').innerHTML = list.map((tip) => {
    const realIndex = tip._idx;
    const dist = (userCoords && tip.lat) ? `${distanceKm(userCoords.lat, userCoords.lng, tip.lat, tip.lng).toFixed(1)} km away` : '';
    const trust = getTipTrust(tip);
    const ta = getLang() === 'ta';
    let trustNote = '';
    let cardExtraClass = '';
    if (trust.disputed) {
      trustNote = `<div class="trustNote disputed">⚠️ ${ta ? 'சர்ச்சைக்குள்ளானது' : 'Disputed by other travelers'}</div>`;
      cardExtraClass = ' disputed';
    } else if (trust.expired) {
      trustNote = `<div class="trustNote expired">⏳ ${ta ? `${Math.round(trust.ageDays)} நாட்களுக்கு முன்` : `Reported ${Math.round(trust.ageDays)} days ago`}</div>`;
      cardExtraClass = ' expired-urgent';
    } else if (trust.verified) {
      trustNote = `<div class="trustNote verified">✅ ${ta ? `${trust.confirms} பயணிகளால் உறுதி` : `Verified by ${trust.confirms} travelers`}</div>`;
    } else {
      trustNote = `<div class="trustNote unverified">🆕 ${ta ? 'இன்னும் உறுதிப்படுத்தப்படவில்லை' : 'Not yet verified — use your judgment'}</div>`;
    }
    const isOwnTip = tip.authorDeviceId && tip.authorDeviceId === myDeviceId();
    const confirmVoted = isOwnTip || hasVoted('confirm', tip.id);
    const flagVoted = isOwnTip || hasVoted('flag', tip.id);
    return `
    <li class="tipCard ${tip.type}${cardExtraClass}">
      <span class="badge ${tip.type}">${badgeText[tip.type]}</span>
      <h3>${escapeHtml(tip.place)}</h3>
      <p class="tipText">${escapeHtml(tip.text)}</p>
      <div class="tipMeta">${formatDate(tip.date)} · ${t('leftBy')} ${dist ? '· 📍 ' + dist : ''}</div>
      ${trustNote}
      <div class="tipActions">
        <button onclick="speak('${escapeJs(tip.place)}. ${escapeJs(tip.text)}')">🔊 ${t('readAloud')}</button>
        <button onclick="shareOneTip(${realIndex})">📤 ${t('shareThis')}</button>
        <button onclick="markHelpful(${realIndex})">👍 ${tip.helpful || 0}</button>
        <button onclick="markConfirm(${realIndex})" ${confirmVoted ? 'disabled' : ''}>✅ ${trust.confirms}</button>
        <button onclick="markFlag(${realIndex})" ${flagVoted ? 'disabled' : ''}>🚩 ${trust.flags}</button>
      </div>
    </li>`;
  }).join('') || `<p class="helpHint">${getLang() === 'ta' ? 'எதுவும் கிடைக்கவில்லை' : 'No tips match.'}</p>`;
  renderStats();
}

function toggleQuarantined() { showQuarantined = !showQuarantined; renderTips(); }

function markHelpful(index) {
  const list = getTips();
  list[index].helpful = (list[index].helpful || 0) + 1;
  saveTips(list);
}
function markConfirm(index) {
  const list = getTips();
  const tip = list[index];
  if (tip.authorDeviceId && tip.authorDeviceId === myDeviceId()) {
    toast(getLang() === 'ta' ? 'உங்கள் சொந்த குறிப்பை உறுதிப்படுத்த முடியாது.' : "You can't confirm your own tip.", 'warn');
    return;
  }
  if (hasVoted('confirm', tip.id)) return;
  tip.confirms = (tip.confirms || 0) + 1;
  tip.lastConfirmed = new Date().toISOString().slice(0, 10);
  recordVote('confirm', tip.id);
  saveTips(list);
}
function markFlag(index) {
  const list = getTips();
  const tip = list[index];
  if (tip.authorDeviceId && tip.authorDeviceId === myDeviceId()) {
    toast(getLang() === 'ta' ? 'உங்கள் சொந்த குறிப்பை புகார் செய்ய முடியாது.' : "You can't report your own tip.", 'warn');
    return;
  }
  if (hasVoted('flag', tip.id)) return;
  tip.flags = (tip.flags || 0) + 1;
  recordVote('flag', tip.id);
  saveTips(list);
}

// ============================================================
// FILTERS + SEARCH
// ============================================================
document.querySelectorAll('.chip[data-filter]').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderTips();
  });
});
document.getElementById('searchBox')?.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  renderTips();
});

// ============================================================
// TAB SWITCHING (also calls per-tab setup)
// ============================================================
document.querySelectorAll('.segBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.segBtn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    const tabEl = document.getElementById(tabId);
    if (tabEl) tabEl.classList.add('active');

    // Per-tab activation hooks
    if (tabId === 'map' && typeof initMapTab === 'function') initMapTab();
    if (tabId === 'ai' && typeof renderDKAI === 'function') renderDKAI('dkAiContainer');
    if (tabId === 'sos' && typeof renderSosTab === 'function') renderSosTab();
    if (tabId === 'fare' && typeof renderFareDefaults === 'function') renderFareDefaults();
    if (tabId === 'phrase' && typeof renderPhrasebook === 'function') renderPhrasebook();
    if (tabId === 'settings' && typeof renderSettingsTab === 'function') renderSettingsTab();
  });
});

// ============================================================
// ADD A TIP — WITH TEMPLATE PICKER
// ============================================================
const TEMPLATE_FIELDS = {
  urgent: [
    { id: 'what', labelKey: 'templateWhat', options: [
      { v: 'Landslide', en: 'Landslide' },
      { v: 'Accident', en: 'Accident' },
      { v: 'Road closed', en: 'Road closed' },
      { v: 'Flooding', en: 'Flooding' },
      { v: 'Animal crossing', en: 'Animal crossing' },
      { v: 'Crime', en: 'Crime / safety' },
      { v: 'Other', en: 'Other' },
    ] },
    { id: 'advice', labelKey: 'templateAdvice', options: [
      { v: 'Avoid the area', en: 'Avoid the area' },
      { v: 'Take detour', en: 'Take the detour' },
      { v: 'Drive slow', en: 'Drive slowly' },
      { v: 'Call ahead', en: 'Call ahead' },
      { v: 'Stay indoors', en: 'Stay indoors' },
    ] },
  ],
  warning: [
    { id: 'about', labelKey: 'templateAbout', options: [
      { v: 'Weather', en: 'Weather' },
      { v: 'Road condition', en: 'Road condition' },
      { v: 'Crowds', en: 'Crowds' },
      { v: 'Prices', en: 'Prices' },
      { v: 'Safety', en: 'Safety' },
      { v: 'Scam', en: 'Scam' },
    ] },
    { id: 'when', labelKey: 'templateBestAvoid', options: [
      { v: 'During the day', en: 'During the day' },
      { v: 'At night', en: 'At night' },
      { v: 'In monsoon', en: 'In monsoon' },
      { v: 'During festivals', en: 'During festivals' },
      { v: 'Always', en: 'Always' },
    ] },
  ],
  recommend: [
    { id: 'great', labelKey: 'templateWhatGreat', options: [
      { v: 'Food', en: 'Food' },
      { v: 'View', en: 'View' },
      { v: 'Stay', en: 'Stay' },
      { v: 'Experience', en: 'Experience' },
      { v: 'Price', en: 'Price' },
      { v: 'Hidden gem', en: 'Hidden gem' },
    ] },
    { id: 'bestTime', labelKey: 'templateBestVisit', options: [
      { v: 'Morning', en: 'Morning' },
      { v: 'Evening', en: 'Evening' },
      { v: 'Weekday', en: 'Weekday' },
      { v: 'Off-season', en: 'Off-season' },
      { v: 'Any time', en: 'Any time' },
    ] },
  ],
};

let currentTemplate = null;
document.querySelectorAll('.templateBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tpl = btn.dataset.template;
    if (currentTemplate === tpl) {
      currentTemplate = null;
      btn.classList.remove('active');
      document.getElementById('templateFields').classList.add('hidden');
      document.getElementById('newType').value = '';
      return;
    }
    document.querySelectorAll('.templateBtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTemplate = tpl;
    document.getElementById('newType').value = tpl;
    renderTemplateFields(tpl);
  });
});

function renderTemplateFields(tpl) {
  const fields = TEMPLATE_FIELDS[tpl] || [];
  const el = document.getElementById('templateFields');
  el.innerHTML = fields.map(f => `
    <label>${t(f.labelKey)}</label>
    <select data-tpl-field="${f.id}">
      ${f.options.map(o => `<option value="${escapeHtml(o.v)}">${escapeHtml(o.en)}</option>`).join('')}
    </select>
  `).join('') + `<p class="tinyNote">${getLang() === 'ta' ? 'நீங்கள் தேர்ந்தெடுத்தவை குறிப்பின் தொடக்கத்தில் சேர்க்கப்படும்.' : 'These choices are prepended to your tip to keep it clear.'}</p>`;
  el.classList.remove('hidden');
}

document.getElementById('saveTipBtn')?.addEventListener('click', () => {
  const place = document.getElementById('newPlace').value.trim();
  const text = document.getElementById('newText').value.trim();
  let type = document.getElementById('newType').value;

  // Compose tip text if a template is active
  let composedText = text;
  if (currentTemplate) {
    const fields = TEMPLATE_FIELDS[currentTemplate] || [];
    const parts = fields.map(f => {
      const sel = document.querySelector(`[data-tpl-field="${f.id}"]`);
      return sel ? sel.value : null;
    }).filter(Boolean);
    if (parts.length) composedText = '[' + parts.join(' · ') + '] ' + text;
    type = currentTemplate;
  }

  if (!place || !text) return;
  if (text.length < 8) {
    toast(getLang() === 'ta' ? 'குறிப்பு மிகவும் குறுகியது.' : 'That tip is too short — add a bit more detail.', 'warn');
    return;
  }
  const lastAdd = Number(localStorage.getItem('lastTipAddTime') || 0);
  if (Date.now() - lastAdd < 15000) {
    toast(getLang() === 'ta' ? 'சிறிது காத்திருங்கள்.' : 'Slow down a little before adding another tip.', 'warn');
    return;
  }
  const list = getTips();
  list.push({
    id: genTipId(),
    place,
    type,
    text: composedText,
    date: new Date().toISOString().slice(0, 10),
    helpful: 0, confirms: 0, flags: 0, synced: false,
    authorDeviceId: myDeviceId(),
  });
  saveTips(list);
  localStorage.setItem('lastTipAddTime', String(Date.now()));
  document.getElementById('newPlace').value = '';
  document.getElementById('newText').value = '';
  document.querySelectorAll('.templateBtn').forEach(b => b.classList.remove('active'));
  document.getElementById('templateFields').classList.add('hidden');
  currentTemplate = null;
  toast(t('addedMsg'), 'success');
  document.querySelector('[data-tab="tips"]').click();
});

// ============================================================
// SHARE ONE TIP
// ============================================================
function shareOneTip(index) {
  const tip = getTips()[index];
  const text = `${tip.place}: ${tip.text} (via Namma Tour)`;
  if (navigator.share) {
    navigator.share({ title: 'Namma Tour tip', text }).catch(() => showTipQr(tip));
  } else {
    showTipQr(tip);
  }
}
function minimalTip(tip) {
  return { p: tip.place, la: tip.lat, ln: tip.lng, t: tip.type, x: tip.text, d: tip.date, a: tip.authorDeviceId };
}
function expandTip(m) {
  return { place: m.p, lat: m.la, lng: m.ln, type: m.t, text: m.x, date: m.d, helpful: 0, confirms: 0, flags: 0, synced: false, authorDeviceId: m.a };
}
function showTipQr(tip) {
  const data = JSON.stringify({ type: 'tip', tip: minimalTip(tip) });
  document.querySelector('[data-tab="sync"]').click();
  renderQrOrFallback('qrOutput', data);
}

// ============================================================
// BULK QR
// ============================================================
const QR_CHUNK_BYTE_LIMIT = 900;
let bulkQrPages = [];
let bulkQrPageIndex = 0;
const bulkBatchId = () => 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function buildBulkPages(tips) {
  const batchId = bulkBatchId();
  const minimal = tips.map(minimalTip);
  const chunks = [];
  let current = [];
  for (const tip of minimal) {
    const trial = [...current, tip];
    const size = encodeURIComponent(JSON.stringify({ type: 'bulk_tips', batch: batchId, part: 1, total: 1, tips: trial })).length;
    if (size > QR_CHUNK_BYTE_LIMIT && current.length) {
      chunks.push(current);
      current = [tip];
    } else {
      current.push(tip);
    }
  }
  if (current.length) chunks.push(current);
  return chunks.map((tipsChunk, i) => JSON.stringify({
    type: 'bulk_tips', batch: batchId, part: i + 1, total: chunks.length, tips: tipsChunk,
  }));
}

function renderBulkQrPage() {
  renderQrOrFallback('qrOutput', bulkQrPages[bulkQrPageIndex]);
  const nav = document.getElementById('qrPageNav');
  if (!nav) return;
  if (bulkQrPages.length > 1) {
    nav.classList.remove('hidden');
    nav.querySelector('.qrPageLabel').textContent =
      (getLang() === 'ta' ? 'பகுதி ' : 'Part ') + (bulkQrPageIndex + 1) + ' / ' + bulkQrPages.length;
  } else {
    nav.classList.add('hidden');
  }
}

document.getElementById('showQrBtn')?.addEventListener('click', () => {
  bulkQrPages = buildBulkPages(getTips());
  bulkQrPageIndex = 0;
  renderBulkQrPage();
});
document.getElementById('qrPrevBtn')?.addEventListener('click', () => {
  if (bulkQrPageIndex > 0) { bulkQrPageIndex--; renderBulkQrPage(); }
});
document.getElementById('qrNextBtn')?.addEventListener('click', () => {
  if (bulkQrPageIndex < bulkQrPages.length - 1) { bulkQrPageIndex++; renderBulkQrPage(); }
});

function renderQrOrFallback(containerId, data) {
  const out = document.getElementById(containerId);
  if (!out) return;
  out.innerHTML = '';
  try {
    if (typeof QRCode === 'undefined') throw new Error('QRCode library not loaded');
    const safeData = encodeURIComponent(data);
    new QRCode(out, { text: safeData, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.L });
  } catch (err) {
    console.warn('QR generation failed, showing text fallback:', err);
    out.innerHTML = `
      <div class="qrFallback">
        <p class="tinyNote">${getLang() === 'ta' ? 'QR உருவாக்க முடியவில்லை. குறியீட்டை நகலெடுத்து அனுப்பவும்:' : "Couldn't generate a QR code. Copy and send this code instead:"}</p>
        <textarea readonly class="qrFallbackText" onclick="this.select()">${escapeHtml(data)}</textarea>
        <button onclick="navigator.clipboard.writeText(this.previousElementSibling.value).then(()=>toast('${getLang() === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}','success'))">📋 ${getLang() === 'ta' ? 'நகலெடு' : 'Copy'}</button>
      </div>`;
  }
}

// ============================================================
// SCAN A TRAVELER'S QR
// ============================================================
let scanner = null;
document.getElementById('scanBtn')?.addEventListener('click', () => {
  if (scanner) return;
  if (typeof Html5Qrcode === 'undefined') {
    toast(getLang() === 'ta' ? 'கேமரா ஸ்கேனர் இன்னும் பதிவிறக்கப்படவில்லை.' : "The camera scanner hasn't downloaded yet.", 'warn');
    return;
  }
  scanner = new Html5Qrcode('qrReader');
  scanner.start(
    { facingMode: 'environment' }, { fps: 10, qrbox: 220 },
    (decodedText) => { handleScannedData(decodedText); scanner.stop().then(() => { scanner = null; }); },
    () => {}
  ).catch((err) => {
    console.warn('Camera scanner failed:', err);
    toast(getLang() === 'ta' ? 'கேமராவைத் திறக்க முடியவில்லை.' : 'Could not open the camera.', 'error');
    scanner = null;
  });
});

document.getElementById('manualImportBtn')?.addEventListener('click', () => {
  const box = document.getElementById('manualImportBox');
  const val = box.value.trim();
  if (!val) { toast(getLang() === 'ta' ? 'முதலில் ஒட்டவும்' : 'Paste a code first', 'warn'); return; }
  handleScannedData(val);
  box.value = '';
});

let pendingBulkBatches = {};

function handleScannedData(text) {
  try {
    let decoded;
    try { decoded = decodeURIComponent(text); } catch (e) { decoded = text; }
    const data = JSON.parse(decoded);
    const list = getTips();
    const resetTrust = (tip) => ({ ...expandTip(tip), id: genTipId(), confirms: 0, flags: 0, lastConfirmed: undefined, synced: false });
    if (data.type === 'tip') {
      list.push(resetTrust(data.tip));
      saveTips(list);
      toast('Received 1 tip: ' + (data.tip.p || data.tip.place), 'success');
    } else if (data.type === 'bulk_tips') {
      if (data.total && data.total > 1) {
        const batch = pendingBulkBatches[data.batch] || { parts: {}, total: data.total };
        batch.parts[data.part] = data.tips;
        pendingBulkBatches[data.batch] = batch;
        const receivedCount = Object.keys(batch.parts).length;
        if (receivedCount < data.total) {
          toast((getLang() === 'ta' ? 'பகுதி ' : 'Part ') + data.part + '/' + data.total +
            (getLang() === 'ta' ? ' பெறப்பட்டது.' : ' received.'), 'info');
        } else {
          let allTips = [];
          for (let p = 1; p <= data.total; p++) allTips = allTips.concat(batch.parts[p] || []);
          allTips.forEach(tip => list.push(resetTrust(tip)));
          saveTips(list);
          delete pendingBulkBatches[data.batch];
          toast('Received ' + allTips.length + ' tips', 'success');
        }
      } else {
        data.tips.forEach(tip => list.push(resetTrust(tip)));
        saveTips(list);
        toast('Received ' + data.tips.length + ' tips', 'success');
      }
    }
    document.querySelector('[data-tab="tips"]').click();
    if (typeof autoBackupToCloud === 'function') autoBackupToCloud();
  } catch (e) { toast('Not a valid Namma Tour QR code', 'error'); }
}

// ============================================================
// ONLINE / OFFLINE STATUS
// ============================================================
function updateStatus() {
  const dot = document.getElementById('statusDot');
  if (!dot) return;
  if (navigator.onLine) {
    dot.textContent = t('online');
    dot.className = 'status online';
    if (typeof syncPendingTips === 'function') syncPendingTips();
    if (typeof autoBackupToCloud === 'function') autoBackupToCloud();
    if (typeof pullCommunityTips === 'function') pullCommunityTips();
  } else {
    dot.textContent = t('offline');
    dot.className = 'status offline';
  }
}
window.addEventListener('online', () => {
  updateStatus();
  // Reload map if map tab is open
  if (document.getElementById('map')?.classList.contains('active') && typeof initMapTab === 'function') {
    initMapTab();
  }
});
window.addEventListener('offline', updateStatus);

// ============================================================
// EXPLORE TAB (placeholder renderer, fully wired below)
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
  if (typeof autoBackupToCloud === 'function') autoBackupToCloud();
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
  const festival = (typeof currentFestivalWarning === 'function') ? currentFestivalWarning(p.place) : null;
  const festWarn = festival ? `<div class="trustNote expired">🎉 ${festival}</div>` : '';
  return `
    <li class="tipCard placeCard" id="place-${p.id}">
      <span class="badge place">${CATEGORY_EMOJI[p.category] || '📍'} ${escapeHtml(p.district)}, ${escapeHtml(p.state)}</span>
      <h3>${escapeHtml(p.place)}</h3>
      <p class="tipText">${escapeHtml(p.text)}</p>
      <div class="tipMeta">${getLang() === 'ta' ? 'சிறந்த நேரம்' : 'Best time'}: ${escapeHtml(p.best)}${dist ? ' · 📍 ' + dist : ''}</div>
      ${festWarn}
      <div class="tipActions">
        <button onclick="speak('${escapeJs(p.place)}. ${escapeJs(p.text)}')">🔊 ${t('readAloud')}</button>
        <button onclick="toggleSavedPlace('${p.id}')">${saved ? '💛 ' + t('savedBtn') : '🤍 ' + t('saveBtn')}</button>
        <button onclick="openPlaceOnMap('${p.id}')">🗺️ ${getLang() === 'ta' ? 'வரைபடம்' : 'Map'}</button>
      </div>
    </li>`;
}

function renderExplore() {
  const listEl = document.getElementById('exploreList');
  const countEl = document.getElementById('exploreCount');
  if (!listEl) return;
  const list = filteredPlaces();
  listEl.innerHTML = list.slice(0, 200).map(placeCardHtml).join('') ||
    `<p class="helpHint">${t('noPlacesMatch')}</p>`;
  if (countEl) {
    countEl.textContent = (getLang() === 'ta'
      ? `${list.length} இடங்கள் (மொத்தம் ${curatedPlaces.length})`
      : `Showing ${Math.min(list.length, 200)} of ${curatedPlaces.length} places`);
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
  labelEl.textContent = (getLang() === 'ta' ? `📝 என் பயண பட்டியல் (${savedPlaces.length})` : `📝 My Trip List (${savedPlaces.length})`);
  listEl.innerHTML = savedPlaces.map(p => `<span class="savedChip">${escapeHtml(p.place)} <a href="#" onclick="toggleSavedPlace('${p.id}');return false;">✕</a></span>`).join('');
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

// ========== PART B CONTINUES HERE ==========
// ============================================================
// PART B — MAP, SOS, FARE, PHRASEBOOK, AI TABS
// ============================================================

// ============ MAP TAB ============
let mapMode = 'online'; // 'online' or 'offline'

function initMapTab() {
  const hint = document.getElementById('mapModeHint');
  const container = document.getElementById('mapContainer');
  if (!container) return;

  // If offline OR Leaflet not loaded → force offline mode
  if (!navigator.onLine || typeof L === 'undefined') {
    mapMode = 'offline';
    document.getElementById('mapOnlineBtn')?.classList.remove('active');
    document.getElementById('mapOfflineBtn')?.classList.add('active');
    if (hint) hint.textContent = t('mapNoInternet');
  }

  if (mapMode === 'online') {
    if (typeof initOnlineMap === 'function') initOnlineMap('mapContainer');
    if (hint) hint.textContent = t('mapOnlineHint');
  } else {
    if (typeof renderOfflineMap === 'function') renderOfflineMap('mapContainer');
    if (hint) hint.textContent = t('mapOfflineHint');
  }

  renderMapSearchResults('');
}

document.getElementById('mapOnlineBtn')?.addEventListener('click', () => {
  mapMode = 'online';
  document.getElementById('mapOnlineBtn').classList.add('active');
  document.getElementById('mapOfflineBtn').classList.remove('active');
  initMapTab();
});
document.getElementById('mapOfflineBtn')?.addEventListener('click', () => {
  mapMode = 'offline';
  document.getElementById('mapOfflineBtn').classList.add('active');
  document.getElementById('mapOnlineBtn').classList.remove('active');
  initMapTab();
});
document.getElementById('mapLocateBtn')?.addEventListener('click', () => {
  if (!userCoords) { requestLocation(); toast(getLang() === 'ta' ? 'இருப்பிடம் பெறுகிறது…' : 'Getting your location…', 'info'); return; }
  if (mapMode === 'online' && typeof centerOnUser === 'function') centerOnUser();
  else if (typeof renderOfflineMap === 'function') { renderOfflineMap('mapContainer'); toast(getLang() === 'ta' ? 'நீங்கள் வரைபடத்தில் நீல புள்ளி' : 'You are the blue dot', 'info'); }
});

let mapSearchTerm = '';
document.getElementById('mapSearchBox')?.addEventListener('input', (e) => {
  mapSearchTerm = e.target.value.toLowerCase().trim();
  renderMapSearchResults(mapSearchTerm);
});

function renderMapSearchResults(term) {
  // Remove existing results bar if any
  document.getElementById('mapSearchResults')?.remove();
  if (!term || typeof curatedPlaces === 'undefined') return;

  const matches = curatedPlaces.filter(p =>
    p.place.toLowerCase().includes(term) ||
    p.district.toLowerCase().includes(term)
  ).slice(0, 8);
  if (!matches.length) return;

  const bar = document.createElement('div');
  bar.id = 'mapSearchResults';
  bar.className = 'mapSearchResults';
  bar.innerHTML = matches.map(p =>
    `<button class="mapSearchItem" onclick="openPlaceOnMap('${p.id}')">📍 ${escapeHtml(p.place)} <small>${escapeHtml(p.district)}</small></button>`
  ).join('');
  document.getElementById('mapContainer').parentNode.insertBefore(bar, document.getElementById('mapContainer'));
}

// Called from Explore tab and anywhere with a place id
function openPlaceOnMap(placeId) {
  document.querySelector('[data-tab="map"]').click();
  setTimeout(() => {
    if (mapMode === 'online' && typeof focusPlace === 'function') {
      focusPlace(placeId, 14);
    } else if (typeof focusOfflinePlace === 'function') {
      focusOfflinePlace(placeId, 'mapContainer');
      if (typeof showOfflinePlaceDetails === 'function') showOfflinePlaceDetails(placeId);
    }
  }, 200);
}

// ============ SOS TAB ============
function renderSosTab() {
  // Emergency phrase cards grid
  const grid = document.getElementById('emergencyPhrasesGrid');
  if (grid && typeof emergencyPhrases !== 'undefined') {
    const lang = getLang();
    grid.innerHTML = emergencyPhrases.map(p => {
      const label = (p.text && p.text[lang]) || (p.text && p.text.en) || p.id;
      return `<div class="emergencyCard" onclick="triggerEmergencyCard('${p.id}')">
        <div class="emIcon">${p.icon}</div>
        <div class="emText">${escapeHtml(label)}</div>
      </div>`;
    }).join('');
  }

  // National helplines list
  const list = document.getElementById('helplinesList');
  if (list && typeof nationalHelplines !== 'undefined') {
    const lang = getLang();
    list.innerHTML = nationalHelplines.map(h => {
      const label = (h.name && h.name[lang]) || (h.name && h.name.en) || h.id;
      return `<li>
        <span class="hlName">${escapeHtml(label)}</span>
        <a class="hlNum" href="tel:${h.number}">${h.number}</a>
      </li>`;
    }).join('');
  }

  // Nearby police + hospital (only if we have location)
  renderNearestHelp();
}

function triggerEmergencyCard(id) {
  if (typeof emergencyPhrases === 'undefined') return;
  const card = emergencyPhrases.find(p => p.id === id);
  if (!card) return;
  // Speak the local-language version (falls back to English)
  const lang = getLang();
  const localSpeak = (card.speak && (card.speak.ta || card.speak.ml)) || (card.text && card.text.en);
  const spokenLang = card.speak?.ta ? 'ta' : (card.speak?.ml ? 'ml' : 'en');
  if (typeof speak === 'function') speak(localSpeak, { lang: spokenLang, rate: 0.75, volume: 1.0 });
  // Also show on the panel for reading aloud by a nearby person
  const box = document.getElementById('sosSpokenBox');
  const txt = document.getElementById('sosSpokenText');
  const lbl = document.getElementById('sosSpokenLabel');
  if (box && txt) {
    box.classList.remove('hidden');
    if (lbl) lbl.textContent = (card.text && card.text[lang]) || (card.text && card.text.en) || '';
    txt.textContent = localSpeak;
  }
}

document.getElementById('sosBtnBig')?.addEventListener('click', () => {
  if (!navigator.geolocation) { toast(t('gpsNotSupported'), 'error'); return; }
  toast(getLang() === 'ta' ? 'GPS பெறுகிறது…' : 'Getting your GPS location…', 'info');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      userCoords = { lat: latitude, lng: longitude };

      // 1) Speak location aloud in chosen language
      if (typeof speakSOS === 'function') speakSOS(latitude, longitude);

      // 2) Show the spoken text on screen
      const box = document.getElementById('sosSpokenBox');
      const txt = document.getElementById('sosSpokenText');
      const lbl = document.getElementById('sosSpokenLabel');
      if (box && txt) {
        box.classList.remove('hidden');
        if (lbl) lbl.textContent = t('sosSpeaking');
        txt.textContent = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      }

      // 3) Share via native share sheet OR SMS fallback
      const msg = `SOS — I need help. My location: https://maps.google.com/?q=${latitude},${longitude} (via Namma Tour)`;
      if (navigator.share) {
        navigator.share({ title: 'SOS', text: msg }).catch(() => {
          window.location.href = `sms:?body=${encodeURIComponent(msg)}`;
        });
      } else {
        window.location.href = `sms:?body=${encodeURIComponent(msg)}`;
      }

      // 4) Show nearest police/hospital
      renderNearestHelp();
    },
    () => toast(t('gpsError'), 'error'),
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

function renderNearestHelp() {
  const box = document.getElementById('nearestHelp');
  if (!box) return;
  if (!userCoords || typeof nearestPolice !== 'function') { box.classList.add('hidden'); return; }
  const police = nearestPolice(userCoords.lat, userCoords.lng, 2);
  const hospitals = nearestHospital(userCoords.lat, userCoords.lng, 2);
  if (!police.length && !hospitals.length) { box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  const ta = getLang() === 'ta';
  box.innerHTML = `
    <h4>🚔 ${ta ? 'அருகிலுள்ள காவல் நிலையம்' : 'Nearest police'}</h4>
    ${police.map(p => `<div class="helpRow">
      <span class="helpName">${escapeHtml(p.name)}</span>
      <span class="helpDist">${p.distanceKm.toFixed(1)} km</span>
      <a href="tel:100">${t('sosCall')}</a>
    </div>`).join('')}
    <h4 style="margin-top:14px;">🏥 ${ta ? 'அருகிலுள்ள மருத்துவமனை' : 'Nearest hospital'}</h4>
    ${hospitals.map(h => `<div class="helpRow">
      <span class="helpName">${escapeHtml(h.name)}</span>
      <span class="helpDist">${h.distanceKm.toFixed(1)} km</span>
      <a href="tel:108">${t('sosCall')}</a>
    </div>`).join('')}
    <p class="tinyNote" style="margin-top:10px;">
      ${ta ? '📞 100/108 அழைப்பது நேரடி எண்ணை விட பாதுகாப்பானது.' : '📞 Calling 100/108 routes to the nearest dispatch — safer than a fixed number.'}
    </p>
  `;
}

// ============ FARE CHECKER TAB ============
function renderFareDefaults() {
  // Pre-fill "from" with current location's nearest place if available
  if (userCoords && typeof curatedPlaces !== 'undefined') {
    let nearest = null, bestD = Infinity;
    curatedPlaces.forEach(p => {
      const d = distanceKm(userCoords.lat, userCoords.lng, p.lat, p.lng);
      if (d < bestD) { bestD = d; nearest = p; }
    });
    if (nearest && bestD < 5) {
      const fromEl = document.getElementById('fareFrom');
      if (fromEl && !fromEl.value) fromEl.value = nearest.place;
    }
  }
}

document.getElementById('fareCheckBtn')?.addEventListener('click', () => {
  const from = document.getElementById('fareFrom').value.trim();
  const to = document.getElementById('fareTo').value.trim();
  const resultEl = document.getElementById('fareResult');
  const qrEl = document.getElementById('fareDriverQr');
  if (!resultEl) return;
  if (!from || !to) { toast(getLang() === 'ta' ? 'இரு இடங்களையும் உள்ளிடவும்' : 'Enter both locations', 'warn'); return; }

  let result = null;
  if (typeof findFareRoute === 'function') result = findFareRoute(from, to);
  if (!result) {
    // Try matching by place name to curatedPlaces and using haversine fallback
    if (typeof curatedPlaces !== 'undefined' && typeof fareForPlaces === 'function') {
      const fp = curatedPlaces.find(p => p.place.toLowerCase().includes(from.toLowerCase()));
      const tp = curatedPlaces.find(p => p.place.toLowerCase().includes(to.toLowerCase()));
      if (fp && tp) result = fareForPlaces(fp, tp);
    }
  }

  if (!result) {
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = `<p class="fareNote">${t('fareNoRoute')}</p>`;
    if (qrEl) qrEl.innerHTML = '';
    return;
  }

  const km = result.km || 0;
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <div class="fareRoute">${escapeHtml(result.from)} → ${escapeHtml(result.to)}</div>
    <div class="fareKm">${t('fareEstimated')}: ${km.toFixed ? km.toFixed(1) : km} km</div>
    <div class="fareRange">₹${result.min} – ₹${result.max}</div>
    <div class="fareNote">${t('fareActualNote')}</div>
  `;

  // Driver QR
  if (qrEl) {
    qrEl.innerHTML = '';
    const payload = `Namma Tour fair fare | ${result.from} → ${result.to} | ${km} km | Fair: ₹${result.min}–₹${result.max}`;
    try {
      if (typeof QRCode !== 'undefined') {
        new QRCode(qrEl, { text: payload, width: 180, height: 180, correctLevel: QRCode.CorrectLevel.M });
      }
    } catch (e) { console.warn('Fare QR failed:', e); }
  }

  // Update map preview if user is curious — future feature
});

// ============ PHRASEBOOK TAB ============
let phraseCat = 'all';

function renderPhrasebook() {
  const list = document.getElementById('phraseList');
  if (!list || typeof phrasebook === 'undefined') return;
  const lang = getLang();
  const items = phraseCat === 'all' ? phrasebook : phrasebook.filter(p => p.cat === phraseCat);
  list.innerHTML = items.map((p, i) => `
    <div class="phraseCard" onclick="speakPhrase('${escapeJs(p.local)}', '${lang === 'ml' ? 'ml' : 'ta'}')">
      <span class="phSpeak">🔊</span>
      <div class="phLocal">${escapeHtml(p.local)}</div>
      <div class="phRoman">${escapeHtml(p.roman)}</div>
      <div class="phMeaning">${escapeHtml((p.meaning && p.meaning[lang]) || (p.meaning && p.meaning.en) || '')}</div>
    </div>
  `).join('') || `<p class="helpHint">${getLang() === 'ta' ? 'எதுவும் இல்லை' : 'No phrases'}</p>`;
}

document.getElementById('phraseCatsRow')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  document.querySelectorAll('#phraseCatsRow .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  phraseCat = btn.dataset.phrasecat;
  renderPhrasebook();
});

// ============ AI TAB (DK AI iframe) ============
// Renders the DK AI chat inside the AI tab when it's opened.
// dk-assistant.js provides the actual renderDKAI() function.

// ============ VOICE ASSISTANT FAB ============
const micFab = document.getElementById('micFab');
const assistantPanel = document.getElementById('assistantPanel');
micFab?.addEventListener('click', () => {
  assistantPanel?.classList.remove('hidden');
  const reply = document.getElementById('assistantReply');
  if (reply) reply.textContent = '';
  if (typeof startAssistant === 'function') startAssistant();
});
// ============================================================
// PART C — TRACK, SETTINGS, LANGUAGES, CLOUD, DIAGNOSTICS, INIT
// ============================================================

// ============ TRACK TAB ============
let trackWatchId = null;
let trackPoints = [];
let trackStartTime = null;
let wakeLock = null;
let pendingGapMarker = false;

function getTrackHistory() { return JSON.parse(localStorage.getItem('trackHistory') || '[]'); }
function saveTrackToHistory(trip) {
  const hist = getTrackHistory();
  hist.unshift(trip);
  localStorage.setItem('trackHistory', JSON.stringify(hist.slice(0, 20)));
  renderTripHistory();
}

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
      updateWakeLockBanner('active');
    } else updateWakeLockBanner('unsupported');
  } catch (err) {
    console.warn('Wake Lock failed:', err);
    updateWakeLockBanner('unsupported');
  }
}
function releaseWakeLock() {
  if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; }
  document.getElementById('wakeLockBanner')?.classList.add('hidden');
}
function updateWakeLockBanner(state) {
  const el = document.getElementById('wakeLockBanner');
  if (!el) return;
  const ta = getLang() === 'ta';
  el.classList.remove('hidden');
  if (state === 'active') {
    el.className = 'wakeLockBanner active';
    el.textContent = ta ? '🔒 திரை ஆனாக இருக்கும்.' : '🔒 Screen will stay awake while tracking.';
  } else if (state === 'unsupported') {
    el.className = 'wakeLockBanner warn';
    el.textContent = ta ? '⚠️ திரை ஆனாக வைக்க முடியாது.' : "⚠️ This browser can't keep the screen awake here.";
  } else if (state === 'paused') {
    el.className = 'wakeLockBanner warn';
    el.textContent = ta ? '⏸️ டிராக்கிங் இடைநிறுத்தப்பட்டது.' : '⏸️ Tracking may have paused.';
  }
}
document.addEventListener('visibilitychange', () => {
  if (trackWatchId === null) return;
  if (document.hidden) pendingGapMarker = true;
  else { if (pendingGapMarker) updateWakeLockBanner('paused'); requestWakeLock(); }
});

function startTracking() {
  if (!navigator.geolocation) { toast(t('gpsNotSupported'), 'error'); return; }
  trackPoints = [];
  trackStartTime = Date.now();
  pendingGapMarker = false;
  document.getElementById('trackStartBtn').classList.add('hidden');
  document.getElementById('trackStopBtn').classList.remove('hidden');
  requestWakeLock();
  trackWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      trackPoints.push({ lat: pos.coords.latitude, lng: pos.coords.longitude, t: Date.now(), gap: pendingGapMarker });
      pendingGapMarker = false;
      userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      renderTrackStats();
      drawTrackTrail();
    },
    (err) => console.warn('GPS error', err),
    { enableHighAccuracy: true, maximumAge: 4000, timeout: 15000 }
  );
}

function stopTracking() {
  if (trackWatchId !== null) navigator.geolocation.clearWatch(trackWatchId);
  trackWatchId = null;
  releaseWakeLock();
  document.getElementById('trackStartBtn').classList.remove('hidden');
  document.getElementById('trackStopBtn').classList.add('hidden');
  if (trackPoints.length > 1) {
    saveTrackToHistory({ points: trackPoints, start: trackStartTime, end: Date.now(), distanceKm: trackDistanceKm() });
    if (typeof autoBackupToCloud === 'function') autoBackupToCloud();
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
    <div class="statCard"><div class="statNum">${trackPoints.length}</div><div class="statLabel">${t('trackPoints')}</div></div>
  `;
}

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
    const y = h - pad - (p.lat - minLat) * scaleY;
    if (i === 0 || p.gap) ctx.moveTo(x, y); else ctx.lineTo(x, y);
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
  el.innerHTML = `<p class="tinyNote">${t('tripHistoryTitle')}</p>` +
    hist.slice(0, 5).map(trip => {
      const mins = Math.round((trip.end - trip.start) / 60000);
      return `<div class="tripRow">${new Date(trip.start).toLocaleDateString('en-GB')} · ${trip.distanceKm.toFixed(2)} km · ${mins} min</div>`;
    }).join('');
}

document.getElementById('trackStartBtn')?.addEventListener('click', startTracking);
document.getElementById('trackStopBtn')?.addEventListener('click', stopTracking);

// ============ SETTINGS TAB ============
function renderSettingsTab() {
  // Language dropdown
  const sel = document.getElementById('langSelect');
  if (sel) sel.value = getLang();
  // Backup code
  const codeEl = document.getElementById('backupCodeShort');
  if (codeEl) codeEl.textContent = getDeviceId();
  // Cloud status
  updateCloudStatusLabel(typeof cloudConfigured === 'function' && cloudConfigured() ? 'ok' : 'off');
}

document.getElementById('langSelect')?.addEventListener('change', (e) => {
  setLang(e.target.value);
  applyTranslations();
  renderTips();
  renderExplore();
  renderPhrasebook();
  renderSosTab();
  if (typeof refreshOfflineMap === 'function' && document.getElementById('map')?.classList.contains('active')) {
    renderOfflineMap('mapContainer');
  }
});

// Theme toggle
function applyTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? t('themeDark') : t('themeLight');
}
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'dark';
  localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark');
  applyTheme();
});

// ============ BACKUP CODE ============
function getDeviceId() {
  let id = localStorage.getItem('deviceBackupId');
  if (!id) {
    const seg = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    id = `NT-${seg()}-${seg()}`;
    localStorage.setItem('deviceBackupId', id);
  }
  return id;
}
document.getElementById('copyBackupCodeBtn')?.addEventListener('click', () => {
  navigator.clipboard.writeText(getDeviceId()).then(() => toast(t('copied'), 'success'));
});

// ============ FIREBASE (cloud backup) ============
function cloudConfigured() { return typeof firebaseDb !== 'undefined'; }

function updateCloudStatusLabel(state) {
  const el = document.getElementById('cloudStatusLabel');
  if (!el) return;
  if (!cloudConfigured()) { el.textContent = t('cloudStatusOff'); return; }
  el.textContent = state === 'ok' ? t('cloudStatusOn') : state === 'error' ? t('cloudStatusError') : t('cloudStatusOff');
}

let backupDebounceTimer = null;
function autoBackupToCloud() {
  if (!cloudConfigured() || !navigator.onLine) return;
  clearTimeout(backupDebounceTimer);
  backupDebounceTimer = setTimeout(async () => {
    try {
      const payload = {
        tips: getTips(),
        trackHistory: getTrackHistory(),
        savedPlaceIds: getSavedPlaceIds(),
        updatedAt: new Date().toISOString()
      };
      await firebaseDb.collection('backups').doc(getDeviceId()).set(payload);
      updateCloudStatusLabel('ok');
    } catch (e) { console.warn('Cloud backup failed:', e); updateCloudStatusLabel('error'); }
  }, 1500);
}

async function restoreFromCloudCode(code) {
  code = (code || '').trim().toUpperCase();
  if (!code) return;
  if (!cloudConfigured()) { toast(t('cloudNotConfigured'), 'error'); return; }
  try {
    const doc = await firebaseDb.collection('backups').doc(code).get();
    if (!doc.exists) { toast(t('backupCodeNotFound'), 'error'); return; }
    const data = doc.data();
    if (Array.isArray(data.tips)) saveTips(data.tips);
    if (Array.isArray(data.trackHistory)) { localStorage.setItem('trackHistory', JSON.stringify(data.trackHistory)); renderTripHistory(); }
    if (Array.isArray(data.savedPlaceIds)) { localStorage.setItem('savedPlaceIds', JSON.stringify(data.savedPlaceIds)); renderExplore(); }
    localStorage.setItem('deviceBackupId', code);
    document.getElementById('backupCodeShort').textContent = code;
    toast(t('importSuccess'), 'success');
  } catch (e) { console.warn('Cloud restore failed:', e); toast(t('cloudRestoreFailed'), 'error'); }
}

document.getElementById('restoreCodeBtn')?.addEventListener('click', () => {
  restoreFromCloudCode(document.getElementById('restoreCodeInput').value);
});

// ============ COMMUNITY TIPS PULL ============
let communityPullDone = false;
async function pullCommunityTips() {
  if (!cloudConfigured() || communityPullDone) return;
  communityPullDone = true;
  try {
    const snap = await firebaseDb.collection('tips').orderBy('date', 'desc').limit(50).get();
    const existing = getTips();
    const existingKeys = new Set(existing.map(t => `${t.place}|${t.date}|${t.text}`));
    let added = 0;
    snap.forEach((doc) => {
      const tip = doc.data();
      const key = `${tip.place}|${tip.date}|${tip.text}`;
      if (!existingKeys.has(key)) {
        existing.push({ ...tip, confirms: 0, flags: 0, synced: true });
        existingKeys.add(key);
        added++;
      }
    });
    if (added > 0) saveTips(existing);
  } catch (e) { console.warn('Community pull failed:', e); }
}

// ============ SYNC PENDING TIPS ============
async function syncPendingTips() {
  if (!cloudConfigured()) return;
  const list = getTips();
  let changed = false;
  await Promise.all(list.map(async (tip) => {
    if (!tip.synced) {
      try { await firebaseDb.collection('tips').add(tip); tip.synced = true; changed = true; }
      catch (e) { console.warn('Tip sync failed:', e); }
    }
  }));
  if (changed) saveTips(list);
}

// ============ EXPORT / IMPORT ============
function exportData() {
  const data = { tips: getTips(), trackHistory: getTrackHistory(), savedPlaceIds: getSavedPlaceIds(), exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `namma-tour-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  localStorage.setItem('lastExportTime', String(Date.now()));
  hideExportReminder();
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
      toast(t('importSuccess'), 'success');
    } catch (err) { toast(t('importError'), 'error'); }
  };
  reader.readAsText(file);
});

// ============ EXPORT REMINDER ============
const EXPORT_REMINDER_DAYS = 14;
function hideExportReminder() {
  document.getElementById('exportReminderBanner')?.classList.add('hidden');
}
function checkExportReminder() {
  const banner = document.getElementById('exportReminderBanner');
  if (!banner) return;
  const hasData = getTips().length > 12 || getTrackHistory().length > 0;
  if (!hasData) return;
  const last = Number(localStorage.getItem('lastExportTime') || 0);
  const daysSince = (Date.now() - last) / 86400000;
  if (daysSince >= EXPORT_REMINDER_DAYS) banner.classList.remove('hidden');
}
document.getElementById('exportReminderBtn')?.addEventListener('click', exportData);
document.getElementById('exportReminderDismiss')?.addEventListener('click', () => {
  localStorage.setItem('lastExportTime', String(Date.now() - (EXPORT_REMINDER_DAYS - 3) * 86400000));
  hideExportReminder();
});

// ============ ONBOARDING ============
function initOnboarding() {
  if (localStorage.getItem('onboarded')) return;
  const overlay = document.getElementById('onboarding');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  const slides = [document.getElementById('obSlide1'), document.getElementById('obSlide2'), document.getElementById('obSlide3')];
  let step = 0;
  document.getElementById('obNextBtn')?.addEventListener('click', () => {
    slides[step].classList.add('hidden');
    step++;
    if (step < slides.length) {
      slides[step].classList.remove('hidden');
      const btn = document.getElementById('obNextBtn');
      if (step === slides.length - 1 && btn) btn.textContent = t('obStart');
    } else {
      overlay.classList.add('hidden');
      localStorage.setItem('onboarded', '1');
    }
  });
}

// ============ SERVICE WORKER ============
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}

// ============ INSTALL APP ============
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('installBtn')?.classList.remove('hidden');
});
document.getElementById('installBtn')?.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
});

// ============ DEVICE DIAGNOSTICS ============
async function runDiagnostics() {
  const ta = getLang() === 'ta';
  const rows = [];
  const push = (label, ok, detail) => rows.push({ label, ok, detail });

  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration().catch(() => null);
    push(ta ? 'Service Worker' : 'Service Worker', !!reg && reg.active,
      reg ? (reg.active ? 'active' : 'registered, not active') : 'not registered');
  } else push('Service Worker', false, ta ? 'ஆதரவு இல்லை' : 'not supported');

  try {
    const keys = await caches.keys();
    const ourCache = keys.find(k => k.startsWith('namma-tour-'));
    const entries = ourCache ? (await caches.open(ourCache)).keys() : [];
    push(ta ? 'கேச் கோப்புகள்' : 'Cached files', (await entries).length > 5, `${(await entries).length} files`);
  } catch (e) { push('Cached files', false, String(e.message || e)); }

  push(ta ? 'கேமரா ஸ்கேனர்' : 'Camera scanner', typeof Html5Qrcode !== 'undefined',
    typeof Html5Qrcode !== 'undefined' ? 'ready' : 'not loaded (needs 1 online visit)');
  push(ta ? 'GPS' : 'GPS', !!userCoords, userCoords ? `${userCoords.lat.toFixed(3)}, ${userCoords.lng.toFixed(3)}` : 'not yet');
  push(ta ? 'Wake Lock' : 'Wake Lock', 'wakeLock' in navigator, 'wakeLock' in navigator ? 'supported' : 'not supported');
  push(ta ? 'பேச்சு அங்கீகாரம்' : 'Speech recognition', !!(window.SpeechRecognition || window.webkitSpeechRecognition), 'ok');
  push(ta ? 'குரல் படித்தல்' : 'Text-to-speech', !!window.speechSynthesis, 'ok');
  push(ta ? 'LocalStorage' : 'LocalStorage', !!localStorage.getItem('tips'), 'ok');
  push(ta ? 'Leaflet' : 'Leaflet (online map)', typeof L !== 'undefined', typeof L !== 'undefined' ? 'loaded' : 'not loaded');
  push(ta ? 'இடங்கள்' : 'Places loaded', (typeof curatedPlaces !== 'undefined') ? curatedPlaces.length : 0, `${(typeof curatedPlaces !== 'undefined') ? curatedPlaces.length : 0} places`);
  push(ta ? 'குறிப்புகள்' : 'Tips loaded', getTips().length, `${getTips().length} tips`);
  push(ta ? 'கிளவுட்' : 'Cloud (Firebase)', cloudConfigured(), cloudConfigured() ? 'configured' : 'not configured');
  push(ta ? 'இணையம்' : 'Internet now', navigator.onLine, navigator.onLine ? 'online' : 'offline');

  const icon = (ok) => ok === true ? '✅' : ok === false ? '❌' : '➖';
  const results = document.getElementById('diagResults');
  if (!results) return;
  results.innerHTML = `
    <ul class="diagList">
      ${rows.map(r => `<li><span class="diagIcon">${icon(r.ok)}</span><span class="diagLabel">${escapeHtml(r.label)}</span><span class="diagDetail">${escapeHtml(String(r.detail))}</span></li>`).join('')}
    </ul>`;
}
document.getElementById('runDiagBtn')?.addEventListener('click', runDiagnostics);

// ============ INIT ============
function initApp() {
  applyTranslations();
  applyTheme();
  updateStatus();
  initOnboarding();
  renderTips();
  renderExplore();
  renderTripHistory();
  renderSosTab();
  renderPhrasebook();
  renderSettingsTab();
  requestLocation();
  checkExportReminder();
}

// Wait for all scripts (some are deferred/async)
window.addEventListener('load', initApp);
document.addEventListener('DOMContentLoaded', () => {
  // Fallback — call initApp even if load fires weirdly
  setTimeout(() => {
    if (!document.body.dataset.initialized) {
      initApp();
      document.body.dataset.initialized = '1';
    }
  }, 800);
});
