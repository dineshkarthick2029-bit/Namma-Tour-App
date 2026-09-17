// Namma Tour — dk-assistant.js
// Replaces gemini-assistant.js.
//
// Your DK-AI (https://dk-chatbot-ai.onrender.com/?v=2) is a chat UI, not a
// JSON API. Best integration: embed it in an iframe inside the AI tab.
// When offline, the app falls back to voice.js's matchLocalCommand().
//
// ─── IMPORTANT SECURITY NOTE ───
// The iframe loads your DK-AI from Render directly. There is no API key in
// this file (good). But if you later want deeper integration (button to
// send a phrase from Namma Tour into DK-AI), you'd need an API endpoint on
// your DK-AI server — which requires you to edit the DK-AI codebase.

// ---------- CONFIG ----------
const DK_AI_URL = 'https://dk-chatbot-ai.onrender.com/?v=2';

// ---------- IFRAME EMBED ----------
// Renders the DK-AI chat inside a container element. Called by app.js
// when the AI tab is opened. If offline, shows fallback message.
function renderDKAI(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  // Not online — show offline fallback
  if (!navigator.onLine) {
    el.innerHTML = `
      <div class="aiOffline">
        <p class="tinyNote">📴 ${t('aiOfflineFallback')}</p>
        <p class="tinyNote">${getLang() === 'ta'
          ? 'மைக்கை (கீழ் வலது) தட்டி கேளுங்கள் — அது ஆஃப்லைனிலும் வேலை செய்யும்.'
          : 'Tap the mic (bottom right) and ask — the offline assistant still works.'}</p>
        <button onclick="startAssistant()" class="aiMicBtn">🎙️ ${getLang() === 'ta' ? 'கேட்க' : 'Ask offline'}</button>
      </div>`;
    return;
  }

  // Online — embed DK-AI in an iframe
  el.innerHTML = `
    <div class="aiWrapper">
      <div class="aiHeader">
        <span>🤖 DK AI</span>
        <a href="${DK_AI_URL}" target="_blank" rel="noopener" class="aiOpenBtn">${t('aiOpenExternal')}</a>
      </div>
      <iframe
        src="${DK_AI_URL}"
        class="aiFrame"
        allow="microphone; camera; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        referrerpolicy="no-referrer"
        loading="lazy"></iframe>
      <p class="tinyNote aiHint">
        ${getLang() === 'ta'
          ? 'DK AI ஆன்லைனில் மட்டும் வேலை செய்யும். ஆஃப்லைனில் மைக் பொத்தான் (🎙️) பயன்படுத்தவும்.'
          : 'DK AI needs internet. Offline, use the mic button (🎙️) for the local assistant.'}
      </p>
    </div>`;
}

// ---------- OPTIONAL: SHORTCUT QUERY ----------
// If you later add an API endpoint to your DK-AI server (e.g. /api/chat
// that accepts ?q=<text> and returns plain text), uncomment this and
// call it from voice.js's startAssistant() instead of matchLocalCommand.
//
// Right now, without an API endpoint, this function is not used.
//
// async function askDK(question) {
//   try {
//     const res = await fetch(`https://dk-chatbot-ai.onrender.com/api/chat?q=${encodeURIComponent(question)}`);
//     if (!res.ok) return null;
//     const txt = await res.text();
//     return txt || null;
//   } catch (e) {
//     console.warn('DK AI fetch failed:', e);
//     return null;
//   }
// }

// Placeholder so voice.js doesn't crash if it tries to call askDK
// before an API endpoint exists. Returns null → falls back to local.
async function askDK(question) {
  // No API endpoint on your DK-AI server yet. Fall back to local matching.
  return null;
}

// ---------- AUTO-REFRESH ON RECONNECT ----------
// If the AI tab is open when the phone reconnects, reload the iframe.
window.addEventListener('online', () => {
  const tab = document.getElementById('ai');
  if (tab && tab.classList.contains('active')) {
    const container = document.getElementById('dkAiContainer');
    if (container) renderDKAI('dkAiContainer');
  }
});

window.renderDKAI = renderDKAI;
window.askDK = askDK;
