// OPTIONAL: connects the voice assistant to Google's Gemini AI for smarter,
// free-form answers (like "what's the weather usually like in Munnar in
// December?") instead of just fixed offline replies.
//
// SECURITY NOTE (please read): putting an API key directly in a website's
// code means anyone can view it in the browser and use your quota. This is
// fine for a hackathon DEMO, but before any real public launch, move this
// call behind a small server (e.g. a free Firebase Cloud Function) so the
// key is never exposed. For now, this keeps things simple since you're
// building solo from your phone.
//
// Get a free key at: aistudio.google.com/app/apikey

// The key is now entered by the user in the Settings tab (no code editing needed).
async function askGemini(question) {
  const key = localStorage.getItem('geminiKey');
  if (!key) return null; // not configured yet
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are a helpful Tamil Nadu tourist guide assistant. Answer in ${getLang() === 'ta' ? 'Tamil' : 'English'}, in 1-2 short sentences. Question: ${question}` }]
          }]
        })
      }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (e) {
    return null; // silently fall back to offline commands
  }
}
