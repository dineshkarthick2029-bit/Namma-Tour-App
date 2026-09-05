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
