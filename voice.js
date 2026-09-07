// ============ AI VOICE READER (Text-to-Speech) ============
// IMPORTANT REAL-WORLD NOTE:
// This uses the phone's OWN built-in voice engine (speechSynthesis).
// If Tamil speech doesn't come out, it is almost always because the
// Tamil voice pack is not downloaded on the phone yet — not a code bug.
// Fix on the phone: Settings -> General management -> Language & input
// -> Text-to-speech output -> (gear icon next to engine) -> Install voice
// data -> download "Tamil". Once downloaded, this code will find it
// automatically.

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert('Voice reader not supported on this browser.');
    return;
  }
  window.speechSynthesis.cancel(); // stop anything currently speaking
  const utter = new SpeechSynthesisUtterance(text);
  const wantTamil = getLang() === 'ta';
  utter.lang = wantTamil ? 'ta-IN' : 'en-IN';

  // Try to find an actual Tamil voice on this phone
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find(v => v.lang === utter.lang) ||
                voices.find(v => v.lang.startsWith(wantTamil ? 'ta' : 'en'));
  if (match) utter.voice = match;
  else if (wantTamil) {
    console.warn('No Tamil voice found on this device — falling back to default voice.');
  }

  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

// Some phones load voices asynchronously — this forces an early load
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ============ AI VOICE ASSISTANT ============
// Listens once, matches simple commands, speaks back a response.
// This works with ZERO internet (pure on-device matching).
// If you later add gemini-assistant.js with your own API key, it will
// be used automatically ONLY when the phone is online, for smarter
// free-form answers — otherwise it always falls back to this offline logic.

function startAssistant() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    speak(getLang() === 'ta' ? 'இந்த பிரௌசரில் குரல் கிடைக்கவில்லை' : 'Voice not supported on this browser');
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = getLang() === 'ta' ? 'ta-IN' : 'en-IN';
  document.getElementById('assistantStatus').textContent = t('assistantListening');

  recognition.onresult = async (e) => {
    const heard = e.results[0][0].transcript;
    document.getElementById('assistantStatus').textContent = '"' + heard + '"';
    let reply;
    if (navigator.onLine && typeof askGemini === 'function') {
      reply = await askGemini(heard); // smarter online answer, if configured
    }
    if (!reply) reply = matchLocalCommand(heard);
    speak(reply);
    document.getElementById('assistantReply').textContent = reply;
  };
  recognition.onerror = () => {
    document.getElementById('assistantStatus').textContent = '';
  };
  recognition.start();
}

// Basic offline command matching — add more phrases any time
function matchLocalCommand(heardRaw) {
  const heard = heardRaw.toLowerCase();
  const tips = getTips();

  if (heard.includes('how many') || heard.includes('எத்தனை')) {
    return getLang() === 'ta'
      ? `இதுவரை ${tips.length} குறிப்புகள் உள்ளன.`
      : `You have ${tips.length} tips saved.`;
  }
  if (heard.includes('urgent') || heard.includes('alert') || heard.includes('safe') || heard.includes('அவசர')) {
    const urgent = tips.filter(x => x.type === 'urgent');
    if (!urgent.length) return getLang() === 'ta' ? 'தற்போது அவசர எச்சரிக்கை இல்லை' : 'No urgent alerts right now.';
    return urgent.map(u => `${u.place}: ${u.text}`).join('. ');
  }
  if (heard.includes('warning') || heard.includes('எச்சரிக்கை')) {
    const warn = tips.find(x => x.type === 'warning');
    return warn ? warn.text : (getLang() === 'ta' ? 'எச்சரிக்கை எதுவும் இல்லை' : 'No warnings right now.');
  }
  if (heard.includes('recommend') || heard.includes('பரிந்துரை')) {
    const rec = tips.find(x => x.type === 'recommend');
    return rec ? rec.text : (getLang() === 'ta' ? 'பரிந்துரை இல்லை' : 'No recommendations yet.');
  }
  // default: read the newest tip
  if (tips.length) return tips[tips.length - 1].text;
  return getLang() === 'ta' ? 'இன்னும் குறிப்புகள் இல்லை' : 'No tips added yet.';
}
