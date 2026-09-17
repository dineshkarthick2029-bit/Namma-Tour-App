// Namma Tour — voice.js
// 7-language text-to-speech + SOS voice + EXPANDED offline assistant.
// Understands ~30 commands now. When confused, says so instead of
// reading a random tip.

let voicesLoaded = false;
let cachedVoices = [];

function loadVoices() {
  if (!('speechSynthesis' in window)) return [];
  const v = window.speechSynthesis.getVoices();
  if (v && v.length) { cachedVoices = v; voicesLoaded = true; }
  return cachedVoices;
}
if ('speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => { loadVoices(); };
}

// ---------- VOICE SELECTION ----------
function findVoiceFor(locale) {
  const voices = loadVoices();
  if (!voices.length) return null;
  const [lang] = locale.split('-');
  let match = voices.find(v => v.lang && v.lang.toLowerCase() === locale.toLowerCase());
  if (match) return match;
  match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang.toLowerCase() + '-'));
  if (match) return match;
  const langNames = {
    ta: ['tamil', 'தமிழ்'], te: ['telugu', 'తెలుగు'], hi: ['hindi', 'हिन्दी'],
    ml: ['malayalam', 'മലയാളം'], fr: ['french', 'français'],
    ja: ['japanese', '日本語'], en: ['english'],
  };
  const names = langNames[lang] || [];
  match = voices.find(v => v.name && names.some(n => v.name.toLowerCase().includes(n)));
  return match || null;
}
function hasVoiceFor(locale) { return !!findVoiceFor(locale); }

// ---------- SPEAK ----------
function speak(text, opts) {
  opts = opts || {};
  if (!('speechSynthesis' in window)) {
    if (!opts.silent) alert('Voice reader not supported on this browser.');
    return;
  }
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  const lang = opts.lang || getLang();
  const wantLocale = VOICE_LOCALE[lang] || VOICE_LOCALE.en;
  utter.lang = wantLocale;

  const chosen = findVoiceFor(wantLocale);
  if (chosen) {
    utter.voice = chosen;
  } else {
    if (lang !== 'en' && !opts.silent) {
      const langLabel = LANG_LABELS[lang] || lang;
      const ok = confirm(
        (getLang() === 'ta'
          ? `இந்த மொபைலில் ${langLabel} குரல் இல்லை.\n\nAndroid Settings → Language & input → Text-to-speech → Install voice data → ${langLabel}.\n\nதொடரவா?`
          : `This phone doesn't have a ${langLabel} voice.\n\nInstall: Android Settings → Language & input → Text-to-speech → Install voice data → ${langLabel}.\n\nContinue with default voice?`)
      );
      if (!ok) return;
    }
    const enVoice = findVoiceFor('en-IN') || findVoiceFor('en-US');
    if (enVoice) utter.voice = enVoice;
  }

  utter.rate = opts.rate || 0.95;
  utter.pitch = opts.pitch || 1.0;
  utter.volume = opts.volume || 1.0;
  if (opts.onend) utter.onend = opts.onend;
  window.speechSynthesis.speak(utter);
}

// ---------- SOS VOICE ----------
function speakSOS(lat, lng) {
  const lang = getLang();
  const templates = {
    en: `Emergency. I need help. My location is latitude ${lat.toFixed(4)}, longitude ${lng.toFixed(4)}. Please help me.`,
    ta: `அவசரம். எனக்கு உதவி தேவை. என் இருப்பிடம் அட்சரேகை ${lat.toFixed(4)}, தீர்க்கரேகை ${lng.toFixed(4)}. தயவுசெய்து உதவுங்கள்.`,
    te: `అత్యవసరం. నాకు సహాయం కావాలి. నా స్థానం అక్షాంశం ${lat.toFixed(4)}, రేఖాంశం ${lng.toFixed(4)}. దయచేసి సహాయం చేయండి.`,
    hi: `आपातकाल। मुझे मदद चाहिए। मेरी लोकेशन अक्षांश ${lat.toFixed(4)}, देशांतर ${lng.toFixed(4)}। कृपया मदद करें।`,
    ml: `അടിയന്തിരം. എനിക്ക് സഹായം വേണം. എന്റെ സ്ഥാനം അക്ഷാംശം ${lat.toFixed(4)}, രേഖാംശം ${lng.toFixed(4)}. ദയവായി സഹായിക്കൂ.`,
    fr: `Urgence. J'ai besoin d'aide. Ma position est latitude ${lat.toFixed(4)}, longitude ${lng.toFixed(4)}.`,
    ja: `緊急です。助けが必要です。私の位置は緯度${lat.toFixed(4)}、経度${lng.toFixed(4)}です。`,
  };
  speak(templates[lang] || templates.en, { lang, rate: 0.85, volume: 1.0 });
  const panel = document.getElementById('sosSpokenText');
  if (panel) panel.textContent = templates[lang] || templates.en;
}

// ============================================================
// EXPANDED OFFLINE ASSISTANT
// ============================================================
function matchLocalCommand(heardRaw) {
  const heard = (heardRaw || '').toLowerCase().trim();
  const lang = getLang();
  const tips = (typeof getTips === 'function') ? getTips() : [];

  // Helper: localized string picker
  const L = (en, ta, te, hi, ml, fr, ja) => {
    if (lang === 'ta') return ta;
    if (lang === 'te') return te;
    if (lang === 'hi') return hi;
    if (lang === 'ml') return ml;
    if (lang === 'fr') return fr;
    if (lang === 'ja') return ja;
    return en;
  };

  // Helper: has any of the phrases
  const has = (...phrases) => phrases.some(p => heard.includes(p.toLowerCase()));

  // ============ TIP QUERIES ============
  if (has('how many', 'எத்தனை', 'ఎన్ని', 'कितने', 'എത്ര', 'combien', 'いくつ')) {
    return L(
      `You have ${tips.length} tips saved.`,
      `இதுவரை ${tips.length} குறிப்புகள் உள்ளன.`,
      `మీకు ${tips.length} చిట్కాలు ఉన్నాయి.`,
      `आपके पास ${tips.length} सुझाव हैं।`,
      `നിങ്ങൾക്ക് ${tips.length} നുറുങ്ങുകൾ ഉണ്ട്.`,
      `Vous avez ${tips.length} conseils.`,
      `${tips.length}件のヒントがあります。`
    );
  }
  if (has('urgent', 'alert', 'அவசர', 'అత్యవసర', 'अत्यावश्यक', 'അടിയന്തിര', 'urgence', '緊急')) {
    const urgent = tips.filter(x => x.type === 'urgent');
    if (!urgent.length) return L('No urgent alerts right now.', 'தற்போது அவசர எச்சரிக்கை இல்லை.',
      'ప్రస్తుతం అత్యవసర హెచ్చరికలు లేవు.', 'अभी कोई अत्यावश्यक चेतावनी नहीं है।',
      'ഇപ്പോൾ അടിയന്തിര മുന്നറിയിപ്പുകൾ ഇല്ല.', 'Aucune alerte urgente.', '緊急警報はありません。');
    return urgent.slice(0, 3).map(u => `${u.place}: ${u.text}`).join('. ');
  }
  if (has('warning', 'எச்சரிக்கை', 'హెచ్చరిక', 'चेतावनी', 'മുന്നറിയിപ്പ്', 'attention', '警告')) {
    const warn = tips.find(x => x.type === 'warning');
    return warn ? warn.text : L('No warnings right now.', 'எச்சரிக்கை எதுவும் இல்லை.',
      'హెచ్చరికలు లేవు.', 'चेतावनी नहीं है।', 'മുന്നറിയിപ്പുകൾ ഇല്ല.',
      'Aucune alerte.', '警告はありません。');
  }
  if (has('recommend', 'பரிந்துரை', 'సిఫార్సు', 'सिफ़ारिश', 'ശുപാർശ', 'recommand', 'おすすめ')) {
    const rec = tips.find(x => x.type === 'recommend');
    return rec ? rec.text : L('No recommendations yet.', 'பரிந்துரை இல்லை.',
      'సిఫార్సులు లేవు.', 'सिफ़ारिश नहीं।', 'ശുപാർശകൾ ഇല്ല.',
      'Pas de recommandations.', 'おすすめはまだありません。');
  }
  if (has('read my tips', 'read all tips', 'read tips', 'எல்லா குறிப்புகள்', 'सभी सुझाव')) {
    if (!tips.length) return L('No tips yet.', 'குறிப்புகள் இல்லை.', 'చిట్కాలు లేవు.',
      'सुझाव नहीं।', 'നുറുങ്ങുകൾ ഇല്ല.', 'Pas de conseils.', 'ヒントはありません。');
    return tips.slice(0, 3).map(t => `${t.place}: ${t.text}`).join('. ');
  }

  // ============ LOCATION QUERIES ============
  if (has('where am i', 'my location', 'my position', 'என் இருப்பிடம்', 'నా స్థానం', 'मेरी लोकेशन', 'എന്റെ സ്ഥാനം', 'ma position', '私の位置')) {
    if (typeof userCoords === 'undefined' || !userCoords) {
      return L('I don\'t have your GPS yet. Open the Find tab and tap Locate.',
        'உங்கள் GPS இன்னும் கிடைக்கவில்லை. Find தாவலைத் திறந்து தட்டவும்.',
        'మీ GPS ఇంకా లేదు.', 'आपका GPS अभी नहीं है।',
        'ജിപിഎസ് ഇല്ല.', 'GPS pas encore disponible.', 'GPSがまだありません。');
    }
    return L(
      `Your location is latitude ${userCoords.lat.toFixed(4)}, longitude ${userCoords.lng.toFixed(4)}.`,
      `உங்கள் இருப்பிடம் அட்சரேகை ${userCoords.lat.toFixed(4)}, தீர்க்கரேகை ${userCoords.lng.toFixed(4)}.`,
      `మీ స్థానం అక్షాంశం ${userCoords.lat.toFixed(4)}, రేఖాంశం ${userCoords.lng.toFixed(4)}.`,
      `आपकी लोकेशन अक्षांश ${userCoords.lat.toFixed(4)}, देशांतर ${userCoords.lng.toFixed(4)}।`,
      `നിങ്ങളുടെ സ്ഥാനം ${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)}.`,
      `Votre position: ${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)}.`,
      `あなたの位置は緯度${userCoords.lat.toFixed(4)}、経度${userCoords.lng.toFixed(4)}です。`
    );
  }
  if (has('nearest hospital', 'hospital near', 'closest hospital', 'மருத்துவமனை', 'ఆసుపత్రి', 'अस्पताल', 'ആശുപത്രി', 'hôpital', '病院')) {
    if (typeof userCoords === 'undefined' || !userCoords || typeof nearestHospital !== 'function') {
      return L('I need your GPS location first. Open the Find tab.',
        'முதலில் GPS தேவை. Find தாவலைத் திறக்கவும்.',
        'ముందు GPS కావాలి.', 'पहले GPS चाहिए।', 'ആദ്യം GPS വേണം.',
        'J\'ai besoin de votre GPS d\'abord.', '先にGPSが必要です。');
    }
    const h = nearestHospital(userCoords.lat, userCoords.lng, 1)[0];
    if (!h) return L('No hospital data for this area.', 'இந்த பகுதிக்கு தரவு இல்லை.',
      'డేటా లేదు.', 'डेटा नहीं।', 'ഡാറ്റ ഇല്ല.', 'Pas de données.', 'データがありません。');
    return L(
      `The nearest hospital is ${h.name}, about ${h.distanceKm.toFixed(1)} kilometers away.`,
      `அருகிலுள்ள மருத்துவமனை ${h.name}, சுமார் ${h.distanceKm.toFixed(1)} கிமீ தொலைவில்.`,
      `దగ్గరలో ఆసుపత్రి ${h.name}, ${h.distanceKm.toFixed(1)} కిమీ.`,
      `नज़दीकी अस्पताल ${h.name}, लगभग ${h.distanceKm.toFixed(1)} किमी।`,
      `അടുത്തുള്ള ആശുപത്രി ${h.name}, ${h.distanceKm.toFixed(1)} കി.മീ.`,
      `L'hôpital le plus proche est ${h.name}, à ${h.distanceKm.toFixed(1)} km.`,
      `最寄りの病院は${h.name}、約${h.distanceKm.toFixed(1)}キロです。`
    );
  }
  if (has('nearest police', 'police station', 'closest police', 'காவல்', 'పోలీసు', 'पुलिस', 'പോലീസ്', 'police', '警察')) {
    if (typeof userCoords === 'undefined' || !userCoords || typeof nearestPolice !== 'function') {
      return L('I need your GPS location first. Open the Find tab.',
        'முதலில் GPS தேவை.', 'ముందు GPS కావాలి.', 'पहले GPS चाहिए।',
        'ആദ്യം GPS വേണം.', 'J\'ai besoin de votre GPS.', '先にGPSが必要です。');
    }
    const p = nearestPolice(userCoords.lat, userCoords.lng, 1)[0];
    if (!p) return L('No police data for this area.', 'தரவு இல்லை.', 'డేటా లేదు.',
      'डेटा नहीं।', 'ഡാറ്റ ഇല്ല.', 'Pas de données.', 'データなし。');
    return L(
      `The nearest police station is ${p.name}, about ${p.distanceKm.toFixed(1)} kilometers away.`,
      `அருகிலுள்ள காவல் நிலையம் ${p.name}, சுமார் ${p.distanceKm.toFixed(1)} கிமீ தொலைவில்.`,
      `దగ్గరలో పోలీస్ స్టేషన్ ${p.name}, ${p.distanceKm.toFixed(1)} కిమీ.`,
      `नज़दीकी पुलिस स्टेशन ${p.name}, लगभग ${p.distanceKm.toFixed(1)} किमी।`,
      `അടുത്തുള്ള പോലീസ് സ്റ്റേഷൻ ${p.name}, ${p.distanceKm.toFixed(1)} കി.മീ.`,
      `Le commissariat le plus proche est ${p.name}, à ${p.distanceKm.toFixed(1)} km.`,
      `最寄りの警察署は${p.name}、約${p.distanceKm.toFixed(1)}キロです。`
    );
  }
  if (has('places near me', 'nearby places', 'what is around', 'அருகிலுள்ள இடங்கள்', 'దగ్గరలో ప్రదేశాలు', 'आस-पास की जगहें')) {
    if (typeof userCoords === 'undefined' || !userCoords || typeof curatedPlaces === 'undefined' || typeof distanceKm !== 'function') {
      return L('I need your GPS location first.', 'முதலில் GPS தேவை.', 'ముందు GPS కావాలి.',
        'पहले GPS चाहिए।', 'ആദ്യം GPS വേണം.', 'J\'ai besoin de votre GPS.', '先にGPSが必要です。');
    }
    const nearest = curatedPlaces
      .map(p => Object.assign({}, p, { d: distanceKm(userCoords.lat, userCoords.lng, p.lat, p.lng) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    return nearest.map(p => `${p.place}, ${p.d.toFixed(1)} km`).join('. ');
  }

  // ============ TIME / SUN ============
  if (has('what time', 'current time', 'நேரம் என்ன', 'समय क्या', 'സമയം', 'quelle heure', '何時')) {
    const now = new Date();
    const time = now.toLocaleTimeString(getLang() === 'ta' ? 'ta-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' });
    return L(`It is ${time}.`, `இப்போது ${time}.`, `ఇప్పుడు ${time}.`, `अभी ${time} है।`,
      `ഇപ്പോൾ ${time}.`, `Il est ${time}.`, `${time}です。`);
  }
  if (has('sunrise', 'sun set', 'sunset', 'சூரிய', 'సూర్య', 'सूर्य', 'സൂര്യ', 'soleil', '日の出')) {
    return L(
      'Sunrise and sunset for your location are shown on the Plan tab, in the Sunrise / Sunset section.',
      'சூரிய உதயம் / அஸ்தமனம் Plan தாவலின் கீழ் உள்ளது.',
      'సూర్యోదయం Plan ట్యాబ్‌లో ఉంది.',
      'सूर्योदय Plan टैब में है।',
      'സൂര്യോദയം Plan ടാബിൽ ഉണ്ട്.',
      'Le lever du soleil est dans l\'onglet Plan.',
      '日の出はPlanタブにあります。'
    );
  }

  // ============ EMERGENCY ACTIONS ============
  if (has('call police', 'dial police', 'காவலரை அழை', 'పోలీసు', 'पुलिस को बुलाओ', 'പോലീസിനെ')) {
    setTimeout(() => { window.location.href = 'tel:100'; }, 1500);
    return L('Calling police on 100.', 'காவல்துறையை 100-இல் அழைக்கிறேன்.',
      'పోలీసులను 100కు కాల్ చేస్తున్నాను.', 'पुलिस को 100 पर कॉल कर रहा हूँ।',
      'പോലീസിനെ 100-ൽ വിളിക്കുന്നു.', 'J\'appelle la police au 100.',
      '警察（100）に電話します。');
  }
  if (has('call ambulance', 'ambulance', 'ஆம்புலன்ஸ்', 'అంబులెన్స్', 'एम्बुलेंस', 'ആംബുലൻസ്', '救急')) {
    setTimeout(() => { window.location.href = 'tel:108'; }, 1500);
    return L('Calling ambulance on 108.', 'ஆம்புலன்ஸை 108-இல் அழைக்கிறேன்.',
      'అంబులెన్స్ 108కు కాల్.', 'एम्बुलेंस को 108 पर कॉल।',
      'ആംബുലൻസ് 108-ൽ വിളിക്കുന്നു.', 'J\'appelle l\'ambulance au 108.',
      '救急車（108）に電話します。');
  }
  if (has('call fire', 'fire brigade', 'தீயணைப்பு', 'अग्निशमन', 'അഗ്നിശമന')) {
    setTimeout(() => { window.location.href = 'tel:101'; }, 1500);
    return L('Calling fire service on 101.', 'தீயணைப்பு 101-இல் அழைக்கிறேன்.',
      'అగ్నిమాపక 101కు కాల్.', 'अग्निशमन को 101 पर कॉल।',
      'അഗ്നിശമന 101-ൽ വിളിക്കുന്നു.', 'Pompiers au 101.',
      '消防（101）に電話します。');
  }
  if (has('emergency', 'sos', 'help me', 'அவசர', 'अत्यावश्यक', 'അടിയന്തിര', 'urgence')) {
    return L(
      'If you are in danger, say "call police" or "call ambulance", or open the SOS tab.',
      '"காவலரை அழை" அல்லது "ஆம்புலன்ஸ்" என்று சொல்லுங்கள், அல்லது SOS தாவலைத் திறக்கவும்.',
      '"పోలీసు" లేదా "అంబులెన్స్" అని చెప్పండి.',
      '"पुलिस" या "एम्बुलेंस" कहें।',
      '"പോലീസ്" അല്ലെങ്കിൽ "ആംബുലൻസ്" പറയൂ.',
      'Dites "police" ou "ambulance".',
      '「警察」または「救急車」と言ってください。'
    );
  }

  // ============ NAVIGATION ============
  if (has('open map', 'show map', 'வரைபடம்', 'మ్యాప్', 'नक्शा', 'carte', '地図')) {
    setTimeout(() => document.querySelector('[data-tab="map"]')?.click(), 1200);
    return L('Opening the map.', 'வரைபடத்தை திறக்கிறேன்.', 'మ్యాప్ తెరుస్తున్నాను.',
      'नक्शा खोल रहा हूँ।', 'മാപ്പ് തുറക്കുന്നു.', 'J\'ouvre la carte.', '地図を開きます。');
  }
  if (has('open sos', 'show sos')) {
    setTimeout(() => document.querySelector('[data-tab="sos"]')?.click(), 1200);
    return L('Opening SOS.', 'SOS திறக்கிறேன்.', 'SOS తెరుస్తున్నాను.',
      'SOS खोल रहा हूँ।', 'SOS തുറക്കുന്നു.', 'J\'ouvre SOS.', 'SOSを開きます。');
  }
  if (has('open fare', 'auto fare', 'rickshaw fare', 'கட்டணம்')) {
    setTimeout(() => document.querySelector('[data-tab="fare"]')?.click(), 1200);
    return L('Opening the fare checker.', 'கட்டண சரிபார்ப்பை திறக்கிறேன்.',
      'ఛార్జీ తనిఖీ తెరుస్తున్నాను.', 'किराया जाँच खोल रहा हूँ।',
      'ചാർജ് പരിശോധന തുറക്കുന്നു.', 'J\'ouvre le vérificateur de tarif.', '運賃チェッカーを開きます。');
  }
  if (has('open plan', 'plan a trip', 'itinerary')) {
    setTimeout(() => document.querySelector('[data-tab="plan"]')?.click(), 1200);
    return L('Opening the Plan tab.', 'Plan தாவலை திறக்கிறேன்.', 'Plan తెరుస్తున్నాను.',
      'Plan टैब खोल रहा हूँ।', 'Plan തുറക്കുന്നു.', 'J\'ouvre l\'onglet Plan.', 'Planを開きます。');
  }

  // ============ LANGUAGE SWITCHING ============
  if (has('speak tamil', 'தமிழில் பேசு', 'tamil')) {
    if (getLang() !== 'ta') { setLang('ta'); }
    return 'இப்போது தமிழில் பேசுகிறேன்.';
  }
  if (has('speak english', 'english')) {
    if (getLang() !== 'en') { setLang('en'); }
    return 'Switching to English.';
  }
  if (has('speak hindi', 'हिंदी')) {
    if (getLang() !== 'hi') { setLang('hi'); }
    return 'अब हिंदी में बोल रहा हूँ।';
  }

  // ============ FALLBACK — clear "don't know" ============
  return L(
    'I don\'t understand that yet. Try: "nearest hospital", "call police", "my location", or open the AI tab to ask DK AI.',
    'அது இன்னும் புரியவில்லை. "அருகிலுள்ள மருத்துவமனை", "காவலரை அழை", "என் இருப்பிடம்" எனச் சொல்லுங்கள்.',
    '"దగ్గరలో ఆసుపత్రి", "పోలీసు", "నా స్థానం" అని చెప్పండి.',
    '"नज़दीकी अस्पताल", "पुलिस", "मेरी लोकेशन" कहें।',
    '"അടുത്തുള്ള ആശുപത്രി", "പോലീസ്" പറയൂ.',
    'Dites "hôpital", "police" ou "ma position".',
    '「病院」「警察」「私の位置」と言ってください。'
  );
}

// ---------- ASSISTANT ENTRY ----------
function startAssistant() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const statusEl = document.getElementById('assistantStatus');
  const replyEl = document.getElementById('assistantReply');
  if (!SR) {
    speak(t('gpsNotSupported'), { silent: true });
    if (statusEl) statusEl.textContent = 'Voice not supported.';
    return;
  }
  const rec = new SR();
  rec.lang = VOICE_LOCALE[getLang()] || 'en-IN';
  if (statusEl) statusEl.textContent = t('assistantListening');

  rec.onresult = async (e) => {
    const heard = e.results[0][0].transcript;
    if (statusEl) statusEl.textContent = '"' + heard + '"';
    let reply = null;
    if (navigator.onLine && typeof askDK === 'function') {
      try { reply = await askDK(heard); } catch (_) { reply = null; }
    }
    if (!reply) reply = matchLocalCommand(heard);
    speak(reply);
    if (replyEl) replyEl.textContent = reply;
  };
  rec.onerror = () => { if (statusEl) statusEl.textContent = ''; };
  rec.start();
}

function speakPhrase(text, lang) {
  speak(text, { lang: lang || 'ta', rate: 0.8, volume: 1.0 });
}

function availableVoicesReport() {
  const r = {};
  SUPPORTED_LANGS.forEach(c => { r[c] = hasVoiceFor(VOICE_LOCALE[c]); });
  return r;
}

window.speak = speak;
window.speakSOS = speakSOS;
window.speakPhrase = speakPhrase;
window.startAssistant = startAssistant;
window.hasVoiceFor = hasVoiceFor;
window.availableVoicesReport = availableVoicesReport;
window.matchLocalCommand = matchLocalCommand;
