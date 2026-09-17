// Namma Tour — voice.js
// 7-language text-to-speech + SOS voice + offline keyword assistant.
// Depends on: i18n.js (getLang, t, VOICE_LOCALE, LANG_LABELS)

// ============ CORE TEXT-TO-SPEECH ============
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

  // Try to find a matching voice for the requested locale, then
  // progressively fall back: exact locale -> language prefix -> English.
  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find(v => v.lang === wantLocale);
  const langPrefix = wantLocale.split('-')[0];
  const sameLang = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
  const english = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  const chosen = exact || sameLang || english || null;

  if (chosen) utter.voice = chosen;
  else if (lang !== 'en') {
    console.warn('No ' + lang + ' voice found on this device — falling back to default voice.');
    if (!opts.silent) {
      // Nudge the user once, don't spam alerts.
      const warned = sessionStorage.getItem('voiceWarned_' + lang);
      if (!warned) {
        sessionStorage.setItem('voiceWarned_' + lang, '1');
        if (confirm('This phone does not have a ' + (LANG_LABELS[lang] || lang) +
                    ' voice installed. Open Settings → Language & input → Text-to-speech ' +
                    '→ install ' + (LANG_LABELS[lang] || lang) + ' voice data for proper pronunciation. Continue with default voice?')) {
          // user accepted, keep going
        } else { return; }
      }
    }
  }

  utter.rate = opts.rate || 0.95;
  utter.pitch = opts.pitch || 1.0;
  utter.volume = opts.volume || 1.0;

  if (opts.onend) utter.onend = opts.onend;
  window.speechSynthesis.speak(utter);
}

// Force early voice list load on devices that populate it lazily.
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ============ SOS VOICE (7 LANGUAGES) ============
// Speaks current GPS coordinates aloud in the traveler's chosen language,
// so anyone nearby (shopkeeper, stranger, police) can hear them and help
// even if the traveler can't speak the local language.
function speakSOS(lat, lng) {
  const lang = getLang();
  const coordStr = lat.toFixed(4) + ', ' + lng.toFixed(4);

  const templates = {
    en: `Emergency. I need help. My location is latitude ${lat.toFixed(4)}, longitude ${lng.toFixed(4)}. Please help me.`,
    ta: `அவசரம். எனக்கு உதவி தேவை. என் இருப்பிடம் அட்சரேகை ${lat.toFixed(4)}, தீர்க்கரேகை ${lng.toFixed(4)}. தயவுசெய்து உதவுங்கள்.`,
    te: `అత్యవసరం. నాకు సహాయం కావాలి. నా స్థానం అక్షాంశం ${lat.toFixed(4)}, రేఖాంశం ${lng.toFixed(4)}. దయచేసి సహాయం చేయండి.`,
    hi: `आपातकाल। मुझे मदद चाहिए। मेरी लोकेशन अक्षांश ${lat.toFixed(4)}, देशांतर ${lng.toFixed(4)}। कृपया मदद करें।`,
    ml: `അടിയന്തിരം. എനിക്ക് സഹായം വേണം. എന്റെ സ്ഥാനം അക്ഷാംശം ${lat.toFixed(4)}, രേഖാംശം ${lng.toFixed(4)}. ദയവായി സഹായിക്കൂ.`,
    fr: `Urgence. J'ai besoin d'aide. Ma position est latitude ${lat.toFixed(4)}, longitude ${lng.toFixed(4)}. Aidez-moi s'il vous plaît.`,
    ja: `緊急です。助けが必要です。私の位置は緯度${lat.toFixed(4)}、経度${lng.toFixed(4)}です。助けてください。`,
  };
  const text = templates[lang] || templates.en;

  // Speak at a slightly slower rate for clarity in emergencies.
  speak(text, { lang, rate: 0.85, volume: 1.0 });

  // Also display it on screen so a nearby person can read it.
  const panel = document.getElementById('sosSpokenText');
  if (panel) panel.textContent = text;
}

// ============ OFFLINE KEYWORD ASSISTANT ============
// This runs when the phone is offline (or the AI tab is unreachable).
// Matches simple spoken phrases and returns a spoken reply in the
// current language. Used as a fallback by startAssistant() below.
function matchLocalCommand(heardRaw) {
  const heard = (heardRaw || '').toLowerCase();
  const tips = (typeof getTips === 'function') ? getTips() : [];
  const lang = getLang();
  const ta = lang === 'ta';
  const te = lang === 'te';
  const hi = lang === 'hi';
  const ml = lang === 'ml';
  const fr = lang === 'fr';
  const ja = lang === 'ja';

  const pick = (en, taV, teV, hiV, mlV, frV, jaV) => {
    if (ta) return taV; if (te) return teV; if (hi) return hiV;
    if (ml) return mlV; if (fr) return frV; if (ja) return jaV;
    return en;
  };

  // How many tips?
  if (/how many|எத்தனை|ఎన్ని|कितने|എത്ര|combien|いくつ/.test(heard)) {
    return pick(
      `You have ${tips.length} tips saved.`,
      `இதுவரை ${tips.length} குறிப்புகள் உள்ளன.`,
      `మీకు ${tips.length} చిట్కాలు ఉన్నాయి.`,
      `आपके पास ${tips.length} सुझाव हैं।`,
      `നിങ്ങൾക്ക് ${tips.length} നുറുങ്ങുകൾ ഉണ്ട്.`,
      `Vous avez ${tips.length} conseils.`,
      `${tips.length}件のヒントがあります。`
    );
  }

  // Urgent alerts?
  if (/urgent|alert|safe|அவசர|అత్యవసర|अत्यावश्यक|അടിയന്തിര|urgence|緊急/.test(heard)) {
    const urgent = tips.filter(x => x.type === 'urgent');
    if (!urgent.length) return pick(
      'No urgent alerts right now.',
      'தற்போது அவசர எச்சரிக்கை இல்லை.',
      'ప్రస్తుతం అత్యవసర హెచ్చరికలు లేవు.',
      'अभी कोई अत्यावश्यक चेतावनी नहीं है।',
      'ഇപ്പോൾ അടിയന്തിര മുന്നറിയിപ്പുകൾ ഇല്ല.',
      'Aucune alerte urgente pour le moment.',
      '緊急警報はありません。'
    );
    return urgent.slice(0, 3).map(u => `${u.place}: ${u.text}`).join('. ');
  }

  // Warnings?
  if (/warning|எச்சரிக்கை|హెచ్చరిక|चेतावनी|മുന്നറിയിപ്പ്|attention|警告/.test(heard)) {
    const warn = tips.find(x => x.type === 'warning');
    return warn ? warn.text : pick(
      'No warnings right now.',
      'எச்சரிக்கை எதுவும் இல்லை.',
      'ప్రస్తుతం హెచ్చరికలు లేవు.',
      'अभी कोई चेतावनी नहीं है।',
      'ഇപ്പോൾ മുന്നറിയിപ്പുകൾ ഇല്ല.',
      'Aucune alerte pour le moment.',
      '警告はありません。'
    );
  }

  // Recommendations?
  if (/recommend|பரிந்துரை|సిఫార్సు|सिफ़ारिश|ശുപാർശ|recommand|おすすめ/.test(heard)) {
    const rec = tips.find(x => x.type === 'recommend');
    return rec ? rec.text : pick(
      'No recommendations yet.',
      'பரிந்துரை இல்லை.',
      'ఇంకా సిఫార్సులు లేవు.',
      'अभी कोई सिफ़ारिश नहीं।',
      'ഇപ്പോൾ ശുപാർശകൾ ഇല്ല.',
      'Pas encore de recommandations.',
      'おすすめはまだありません。'
    );
  }

  // Default: read newest tip
  if (tips.length) return tips[tips.length - 1].text;

  return pick(
    'No tips added yet.',
    'இன்னும் குறிப்புகள் இல்லை.',
    'ఇంకా చిట్కాలు లేవు.',
    'अभी तक कोई सुझाव नहीं।',
    'ഇതുവരെ നുറുങ്ങുകൾ ഇല്ല.',
    'Pas encore de conseils.',
    'ヒントはまだありません。'
  );
}

// ============ VOICE ASSISTANT ENTRY POINT ============
// Listens once, tries online AI first (askDK if loaded), else falls back
// to matchLocalCommand above. Speaks the reply back in the current language.
function startAssistant() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const statusEl = document.getElementById('assistantStatus');
  const replyEl = document.getElementById('assistantReply');

  if (!SpeechRecognition) {
    speak(t('gpsNotSupported'), { silent: true });
    if (statusEl) statusEl.textContent = 'Voice not supported on this browser.';
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = VOICE_LOCALE[getLang()] || 'en-IN';
  if (statusEl) statusEl.textContent = t('assistantListening');

  recognition.onresult = async (e) => {
    const heard = e.results[0][0].transcript;
    if (statusEl) statusEl.textContent = '"' + heard + '"';
    let reply = null;

    // Try the DK AI assistant (online only) if the helper is loaded.
    if (navigator.onLine && typeof askDK === 'function') {
      try { reply = await askDK(heard); } catch (_) { reply = null; }
    }
    if (!reply) reply = matchLocalCommand(heard);

    speak(reply);
    if (replyEl) replyEl.textContent = reply;
  };
  recognition.onerror = () => {
    if (statusEl) statusEl.textContent = '';
  };
  recognition.start();
}

// ============ EMERGENCY PHRASE CARD SPEAKER ============
// Called from the SOS tab when a user taps a phrase card. Speaks it in
// the language the phrase is written for (which is the local language of
// that card — usually Tamil or English for TN/KL).
function speakPhrase(phraseText, phraseLang) {
  speak(phraseText, { lang: phraseLang || 'ta', rate: 0.8, volume: 1.0 });
}

// Expose to console for debugging.
window.speak = speak;
window.speakSOS = speakSOS;
window.speakPhrase = speakPhrase;
window.startAssistant = startAssistant;
