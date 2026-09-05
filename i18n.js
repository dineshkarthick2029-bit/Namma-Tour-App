const translations = {
  en: {
    appName: "Namma Tour",
    online: "Online", offline: "Offline",
    tabTips: "Tips", tabAdd: "Add", tabSync: "Sync", tabSettings: "Settings",
    heroTitle: "Traveler tips, no signal needed",
    heroDesc: "Every note here was left by a traveler and passed phone-to-phone by QR code. No internet, no server needed — just travelers helping travelers.",
    recommend: "RECOMMEND", warning: "WARNING", urgent: "URGENT ALERT",
    readAloud: "Read aloud", shareThis: "Share this", helpful: "Helpful",
    leftBy: "left by a traveler",
    searchPlaceholder: "Search place...",
    filterAll: "All", filterNearby: "📍 Nearby", filterUrgent: "🚨 Urgent", filterWarning: "⚠️ Warning", filterRecommend: "👍 Recommend",
    installBtn: "📲 Install App",
    addTitle: "Add a Tip", addPlaceLabel: "Place name",
    addPlacePlaceholder: "e.g. Kolukkumalai viewpoint",
    addTypeLabel: "Type", addTextLabel: "Your tip",
    addTextPlaceholder: "Write something useful for the next traveler...",
    addBtn: "Save Tip", addedMsg: "Tip saved! It's now in your Tips list.",
    syncTitle: "Sync With Another Traveler",
    syncDesc: "Show this QR to another traveler using Namma Tour. They scan it to instantly receive all your tips — no internet needed.",
    showQrBtn: "Show My Tips as QR", scanBtn: "Scan a Traveler's QR",
    assistantHint: "Tap the mic and speak in Tamil or English",
    assistantListening: "Listening...",
    settingsTitle: "Settings", settingsLang: "App Language", settingsTheme: "Theme",
    themeDark: "Dark", themeLight: "Light",
    settingsGeminiLabel: "Gemini AI Key (optional, for smarter assistant)",
    settingsSaveKey: "Save Key", geminiSaved: "Key saved. Assistant will use AI when online.",
    aboutText: "Namma Tour is a phone-to-phone safety and tips network for travelers in areas with no signal. Alerts spread without any server.",
    helpHint: "Tap 'Read aloud' to hear any tip spoken out loud. Tap the mic (bottom right) any time to ask the assistant something.",
  },
  ta: {
    appName: "நம்ம டூர்",
    online: "ஆன்லைன்", offline: "ஆஃப்லைன்",
    tabTips: "குறிப்புகள்", tabAdd: "சேர்", tabSync: "ஒத்திசை", tabSettings: "அமைப்புகள்",
    heroTitle: "பயணிகள் குறிப்புகள், சிக்னல் தேவையில்லை",
    heroDesc: "இங்குள்ள ஒவ்வொரு குறிப்பும் ஒரு பயணி எழுதி, QR கோட் மூலம் மற்றொரு பயணிக்கு அனுப்பப்பட்டது. இணையம் தேவையில்லை.",
    recommend: "பரிந்துரை", warning: "எச்சரிக்கை", urgent: "அவசர எச்சரிக்கை",
    readAloud: "படித்துக் காட்டு", shareThis: "பகிர்", helpful: "பயனுள்ளது",
    leftBy: "ஒரு பயணி எழுதியது",
    searchPlaceholder: "இடத்தை தேடு...",
    filterAll: "அனைத்தும்", filterNearby: "📍 அருகில்", filterUrgent: "🚨 அவசரம்", filterWarning: "⚠️ எச்சரிக்கை", filterRecommend: "👍 பரிந்துரை",
    installBtn: "📲 செயலியை நிறுவு",
    addTitle: "குறிப்பு சேர்க்க", addPlaceLabel: "இடத்தின் பெயர்",
    addPlacePlaceholder: "எ.கா. கொளுக்குமலை பார்வையிடம்",
    addTypeLabel: "வகை", addTextLabel: "உங்கள் குறிப்பு",
    addTextPlaceholder: "அடுத்த பயணிக்கு பயனுள்ளதை எழுதுங்கள்...",
    addBtn: "குறிப்பை சேமி", addedMsg: "குறிப்பு சேமிக்கப்பட்டது!",
    syncTitle: "மற்றொரு பயணியுடன் ஒத்திசை",
    syncDesc: "இந்த QR-ஐ மற்றொரு பயணிக்கு காட்டுங்கள். அவர்கள் ஸ்கேன் செய்தால் உங்கள் குறிப்புகள் கிடைக்கும்.",
    showQrBtn: "என் குறிப்புகளை QR ஆக காட்டு", scanBtn: "பயணியின் QR-ஐ ஸ்கேன் செய்",
    assistantHint: "மைக்கை தட்டி தமிழில் அல்லது ஆங்கிலத்தில் பேசுங்கள்",
    assistantListening: "கேட்கிறது...",
    settingsTitle: "அமைப்புகள்", settingsLang: "செயலி மொழி", settingsTheme: "தீம்",
    themeDark: "இருள்", themeLight: "ஒளி",
    settingsGeminiLabel: "Gemini AI கீ (விருப்பம்)",
    settingsSaveKey: "கீயை சேமி", geminiSaved: "கீ சேமிக்கப்பட்டது.",
    aboutText: "நம்ம டூர் என்பது சிக்னல் இல்லாத இடங்களில் பயணிகளுக்கான பாதுகாப்பு மற்றும் குறிப்பு நெட்வொர்க்.",
    helpHint: "எந்த குறிப்பையும் கேட்க 'படித்துக் காட்டு' பொத்தானை தட்டவும். மைக்கை (கீழ் வலது) எப்போது வேண்டுமானாலும் தட்டவும்.",
  }
};

function getLang() { return localStorage.getItem('lang') || 'en'; }
function setLang(lang) { localStorage.setItem('lang', lang); applyTranslations(); }
function t(key) { return translations[getLang()][key] || translations.en[key] || key; }

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = getLang() === 'en' ? 'தமிழ்' : 'English';
  const aboutEl = document.querySelector('.aboutBox p');
  if (aboutEl) aboutEl.textContent = t('aboutText');
  if (typeof renderTips === 'function') renderTips();
}
