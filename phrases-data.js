// Namma Tour — phrases-data.js
// Emergency phrases + traveler phrasebook in 7 languages.
// Offline — no audio files needed; voice.js speaks them on tap.

// ============ EMERGENCY PHRASE CARDS ============
// Big one-tap cards shown on the SOS tab. Each phrase is spoken aloud in
// the target local language when tapped (Tamil/Kerala areas = ta or ml).
// `text` is what the traveler shows on screen. `speak` is what gets
// spoken aloud so a local person can understand.
const emergencyPhrases = [
  {
    id: 'help',
    icon: '🆘',
    text: { en: 'I need help', ta: 'எனக்கு உதவி தேவை', te: 'నాకు సహాయం కావాలి', hi: 'मुझे मदद चाहिए', ml: 'എനിക്ക് സഹായം വേണം', fr: "J'ai besoin d'aide", ja: '助けが必要です' },
    speak: { ta: 'எனக்கு உதவி தேவை', ml: 'എനിക്ക് സഹായം വേണം', en: 'I need help' }
  },
  {
    id: 'police',
    icon: '👮',
    text: { en: 'Call the police', ta: 'காவலரை அழையுங்கள்', te: 'పోలీసులను పిలవండి', hi: 'पुलिस को बुलाओ', ml: 'പോലീസിനെ വിളിക്കൂ', fr: 'Appelez la police', ja: '警察を呼んでください' },
    speak: { ta: 'காவலரை அழையுங்கள்', ml: 'പോലീസിനെ വിളിക്കൂ', en: 'Call the police' }
  },
  {
    id: 'lost',
    icon: '🧭',
    text: { en: 'I am lost', ta: 'நான் வழி தவறிவிட்டேன்', te: 'నేను దారి తప్పాను', hi: 'मैं खो गया हूँ', ml: 'ഞാൻ വഴി തെറ്റി', fr: 'Je suis perdu', ja: '道に迷いました' },
    speak: { ta: 'நான் வழி தவறிவிட்டேன்', ml: 'ഞാൻ വഴി തെറ്റി', en: 'I am lost' }
  },
  {
    id: 'injured',
    icon: '🩹',
    text: { en: 'I am injured', ta: 'நான் காயமடைந்துள்ளேன்', te: 'నేను గాయపడ్డాను', hi: 'मैं घायल हूँ', ml: 'ഞാൻ മുറിവേറ്റു', fr: 'Je suis blessé', ja: '怪我をしました' },
    speak: { ta: 'நான் காயமடைந்துள்ளேன்', ml: 'ഞാൻ മുറിവേറ്റു', en: 'I am injured' }
  },
  {
    id: 'hospital',
    icon: '🏥',
    text: { en: 'Where is the hospital?', ta: 'மருத்துவமனை எங்கே?', te: 'ఆసుపత్రి ఎక్కడ?', hi: 'अस्पताल कहाँ है?', ml: 'ആശുപത്രി എവിടെ?', fr: "Où est l'hôpital ?", ja: '病院はどこですか？' },
    speak: { ta: 'மருத்துவமனை எங்கே?', ml: 'ആശുപത്രി എവിടെ?', en: 'Where is the hospital?' }
  },
  {
    id: 'doctor',
    icon: '👨‍⚕️',
    text: { en: 'I need a doctor', ta: 'எனக்கு மருத்துவர் தேவை', te: 'నాకు డాక్టర్ కావాలి', hi: 'मुझे डॉक्टर चाहिए', ml: 'എനിക്ക് ഡോക്ടർ വേണം', fr: "J'ai besoin d'un médecin", ja: '医者が必要です' },
    speak: { ta: 'எனக்கு மருத்துவர் தேவை', ml: 'എനിക്ക് ഡോക്ടർ വേണം', en: 'I need a doctor' }
  },
  {
    id: 'fire',
    icon: '🔥',
    text: { en: 'Fire emergency', ta: 'தீ விபத்து', te: 'అగ్ని ప్రమాదం', hi: 'आग लगी है', ml: 'തീപിടുത്തം', fr: 'Incendie', ja: '火事です' },
    speak: { ta: 'தீ விபத்து', ml: 'തീപിടുത്തം', en: 'Fire' }
  },
  {
    id: 'accident',
    icon: '🚗',
    text: { en: 'There has been an accident', ta: 'விபத்து நடந்துள்ளது', te: 'ప్రమాదం జరిగింది', hi: 'दुर्घटना हुई है', ml: 'അപകടം ഉണ്ടായി', fr: 'Il y a eu un accident', ja: '事故が起きました' },
    speak: { ta: 'விபத்து நடந்துள்ளது', ml: 'അപകടം ഉണ്ടായി', en: 'There is an accident' }
  },
  {
    id: 'danger',
    icon: '⚠️',
    text: { en: 'I am in danger', ta: 'நான் ஆபத்தில் உள்ளேன்', te: 'నేను ప్రమాదంలో ఉన్నాను', hi: 'मैं खतरे में हूँ', ml: 'ഞാൻ അപകടത്തിലാണ്', fr: 'Je suis en danger', ja: '危険です' },
    speak: { ta: 'நான் ஆபத்தில் உள்ளேன்', ml: 'ഞാൻ അപകടത്തിലാണ്', en: 'I am in danger' }
  },
  {
    id: 'nomoney',
    icon: '💸',
    text: { en: 'I have no money', ta: 'என்னிடம் பணம் இல்லை', te: 'నా దగ్గర డబ్బు లేదు', hi: 'मेरे पास पैसे नहीं हैं', ml: 'എന്റെ കൈയിൽ പണം ഇല്ല', fr: "Je n'ai pas d'argent", ja: 'お金がありません' },
    speak: { ta: 'என்னிடம் பணம் இல்லை', ml: 'എന്റെ കൈയിൽ പണം ഇല്ല', en: 'I have no money' }
  },
  {
    id: 'phone',
    icon: '📱',
    text: { en: 'I need to use a phone', ta: 'எனக்கு ஒரு போன் தேவை', te: 'నాకు ఫోన్ కావాలి', hi: 'मुझे फ़ोन चाहिए', ml: 'എനിക്ക് ഒരു ഫോൺ വേണം', fr: "J'ai besoin d'un téléphone", ja: '電話を貸してください' },
    speak: { ta: 'எனக்கு ஒரு போன் தேவை', ml: 'എനിക്ക് ഒരു ഫോൺ വേണം', en: 'I need a phone' }
  },
  {
    id: 'embassy',
    icon: '🏛️',
    text: { en: 'Where is my embassy?', ta: 'என் தூதரகம் எங்கே?', te: 'నా రాయబార కార్యాలయం ఎక్కడ?', hi: 'मेरा दूतावास कहाँ है?', ml: 'എന്റെ എംബസി എവിടെ?', fr: 'Où est mon ambassade ?', ja: '大使館はどこですか？' },
    speak: { ta: 'என் தூதரகம் எங்கே?', ml: 'എന്റെ എംബസി എവിടെ?', en: 'Where is my embassy?' }
  },
  {
    id: 'water',
    icon: '💧',
    text: { en: 'I need drinking water', ta: 'எனக்கு குடிநீர் தேவை', te: 'నాకు తాగునీరు కావాలి', hi: 'मुझे पीने का पानी चाहिए', ml: 'എനിക്ക് കുടിവെള്ളം വേണം', fr: "J'ai besoin d'eau potable", ja: '飲み水が必要です' },
    speak: { ta: 'எனக்கு குடிநீர் தேவை', ml: 'എനിക്ക് കുടിവെള്ളം വേണം', en: 'I need drinking water' }
  },
  {
    id: 'food',
    icon: '🍛',
    text: { en: 'I need food', ta: 'எனக்கு உணவு தேவை', te: 'నాకు ఆహారం కావాలి', hi: 'मुझे खाना चाहिए', ml: 'എനിക്ക് ഭക്ഷണം വേണം', fr: "J'ai besoin de nourriture", ja: '食べ物が必要です' },
    speak: { ta: 'எனக்கு உணவு தேவை', ml: 'എനിക്ക് ഭക്ഷണം വേണം', en: 'I need food' }
  },
  {
    id: 'toilet',
    icon: '🚻',
    text: { en: 'Where is the toilet?', ta: 'கழிப்பறை எங்கே?', te: 'మరుగుదొడ్డి ఎక్కడ?', hi: 'शौचालय कहाँ है?', ml: 'ടോയ്ലറ്റ് എവിടെ?', fr: 'Où sont les toilettes ?', ja: 'トイレはどこですか？' },
    speak: { ta: 'கழிப்பறை எங்கே?', ml: 'ടോയ്ലറ്റ് എവിടെ?', en: 'Where is the toilet?' }
  },
  {
    id: 'police station',
    icon: '🚔',
    text: { en: 'Where is the police station?', ta: 'காவல் நிலையம் எங்கே?', te: 'పోలీస్ స్టేషన్ ఎక్కడ?', hi: 'पुलिस स्टेशन कहाँ है?', ml: 'പോലീസ് സ്റ്റേഷൻ എവിടെ?', fr: 'Où est le commissariat ?', ja: '警察署はどこですか？' },
    speak: { ta: 'காவல் நிலையம் எங்கே?', ml: 'പോലീസ് സ്റ്റേഷൻ എവിടെ?', en: 'Where is the police station?' }
  },
];

// ============ TRAVELER PHRASEBOOK ============
// Everyday phrases with pronunciation help. Grouped by category.
// `local` = phrase written in the local script (Tamil or Malayalam),
// `roman` = pronunciation guide, `meaning` = English meaning.
const phrasebook = [
  // ---- Greetings ----
  { cat: 'greeting', local: 'வணக்கம்', roman: 'Vanakkam', meaning: { en: 'Hello / Greetings', ta: 'வணக்கம்', te: 'నమస్కారం', hi: 'नमस्ते', ml: 'നമസ്കാരം', fr: 'Bonjour', ja: 'こんにちは' } },
  { cat: 'greeting', local: 'நன்றி', roman: 'Nandri', meaning: { en: 'Thank you', ta: 'நன்றி', te: 'ధన్యవాదాలు', hi: 'धन्यवाद', ml: 'നന്ദി', fr: 'Merci', ja: 'ありがとう' } },
  { cat: 'greeting', local: 'போய் வருகிறேன்', roman: 'Poi varugiren', meaning: { en: 'Goodbye', ta: 'போய் வருகிறேன்', te: 'వీడ్కోలు', hi: 'अलविदा', ml: 'വിട', fr: 'Au revoir', ja: 'さようなら' } },
  { cat: 'greeting', local: 'எப்படி இருக்கிறீர்கள்?', roman: 'Eppadi irukkirirgal?', meaning: { en: 'How are you?', ta: 'எப்படி இருக்கிறீர்கள்?', te: 'ఎలా ఉన్నారు?', hi: 'कैसे हैं आप?', ml: 'സുഖമാണോ?', fr: 'Comment allez-vous ?', ja: 'お元気ですか？' } },
  { cat: 'greeting', local: 'என் பெயர்...', roman: 'En peyar...', meaning: { en: 'My name is...', ta: 'என் பெயர்...', te: 'నా పేరు...', hi: 'मेरा नाम...', ml: 'എന്റെ പേര്...', fr: 'Je m\'appelle...', ja: '私の名前は...' } },

  // ---- Bargaining ----
  { cat: 'bargaining', local: 'இது எவ்வளவு?', roman: 'Idhu evvalavu?', meaning: { en: 'How much is this?', ta: 'இது எவ்வளவு?', te: 'ఇది ఎంత?', hi: 'यह कितने का है?', ml: 'ഇതിന് എത്ര?', fr: 'Combien ça coûte ?', ja: 'これはいくらですか？' } },
  { cat: 'bargaining', local: 'மிக அதிகம்', roman: 'Miga adhigam', meaning: { en: 'Too expensive', ta: 'மிக அதிகம்', te: 'చాలా ఎక్కువ', hi: 'बहुत महंगा', ml: 'വളരെ കൂടുതൽ', fr: 'Trop cher', ja: '高すぎます' } },
  { cat: 'bargaining', local: 'குறைத்து சொல்லுங்கள்', roman: 'Kuraithu sollungal', meaning: { en: 'Please reduce the price', ta: 'குறைத்து சொல்லுங்கள்', te: 'తగ్గించండి', hi: 'कम कीजिए', ml: 'കുറയ്ക്കൂ', fr: 'Réduisez le prix', ja: '安くしてください' } },
  { cat: 'bargaining', local: 'மீட்டர் போடுங்கள்', roman: 'Meter podungal', meaning: { en: 'Please use the meter', ta: 'மீட்டர் போடுங்கள்', te: 'మీటర్ వేయండి', hi: 'मीटर लगाइए', ml: 'മീറ്റർ ഇടൂ', fr: 'Utilisez le compteur', ja: 'メーターを使ってください' } },

  // ---- Food ----
  { cat: 'food', local: 'தண்ணீர்', roman: 'Thanneer', meaning: { en: 'Water', ta: 'தண்ணீர்', te: 'నీళ్ళు', hi: 'पानी', ml: 'വെള്ളം', fr: 'Eau', ja: '水' } },
  { cat: 'food', local: 'உணவு', roman: 'Unavu', meaning: { en: 'Food', ta: 'உணவு', te: 'ఆహారం', hi: 'खाना', ml: 'ഭക്ഷണം', fr: 'Nourriture', ja: '食べ物' } },
  { cat: 'food', local: 'சாப்பிட வழி இருக்கிறதா?', roman: 'Saapida vazhi irukkiratha?', meaning: { en: 'Is there somewhere to eat?', ta: 'சாப்பிட வழி இருக்கிறதா?', te: 'తినడానికి ఏదైనా ఉందా?', hi: 'खाने की जगह है?', ml: 'കഴിക്കാൻ എവിടെയെങ്കിലും ഉണ്ടോ?', fr: 'Où puis-je manger ?', ja: '食事する場所はありますか？' } },
  { cat: 'food', local: 'சைவம் / அசைவம்', roman: 'Saivam / Asaivam', meaning: { en: 'Vegetarian / Non-vegetarian', ta: 'சைவம் / அசைவம்', te: 'శాకాహారం / మాంసాహారం', hi: 'शाकाहारी / मांसाहारी', ml: 'സസ്യാഹാരം / മാംസാഹാരം', fr: 'Végétarien / Non-végétarien', ja: 'ベジタリアン／ノンベジ' } },

  // ---- Directions ----
  { cat: 'direction', local: 'எங்கே இருக்கிறது?', roman: 'Engae irukkirathu?', meaning: { en: 'Where is it?', ta: 'எங்கே இருக்கிறது?', te: 'ఎక్కడ ఉంది?', hi: 'कहाँ है?', ml: 'എവിടെയാണ്?', fr: 'Où est-ce ?', ja: 'どこですか？' } },
  { cat: 'direction', local: 'இடது / வலது', roman: 'Idathu / Valathu', meaning: { en: 'Left / Right', ta: 'இடது / வலது', te: 'ఎడమ / కుడి', hi: 'बाएँ / दाएँ', ml: 'ഇടത് / വലത്', fr: 'Gauche / Droite', ja: '左／右' } },
  { cat: 'direction', local: 'நேராக', roman: 'Neraga', meaning: { en: 'Straight ahead', ta: 'நேராக', te: 'నేరుగా', hi: 'सीधे', ml: 'നേരെ', fr: 'Tout droit', ja: 'まっすぐ' } },
  { cat: 'direction', local: 'எவ்வளவு தூரம்?', roman: 'Evvalavu dooram?', meaning: { en: 'How far?', ta: 'எவ்வளவு தூரம்?', te: 'ఎంత దూరం?', hi: 'कितनी दूर?', ml: 'എത്ര ദൂരം?', fr: 'À quelle distance ?', ja: 'どのくらいの距離ですか？' } },
  { cat: 'direction', local: 'பஸ் நிலையம் எங்கே?', roman: 'Bus nilaiyam engae?', meaning: { en: 'Where is the bus station?', ta: 'பஸ் நிலையம் எங்கே?', te: 'బస్ స్టాండ్ ఎక్కడ?', hi: 'बस स्टेशन कहाँ है?', ml: 'ബസ് സ്റ്റാൻഡ് എവിടെ?', fr: 'Où est la gare routière ?', ja: 'バス停はどこですか？' } },
  { cat: 'direction', local: 'ரயில் நிலையம் எங்கே?', roman: 'Rail nilaiyam engae?', meaning: { en: 'Where is the railway station?', ta: 'ரயில் நிலையம் எங்கே?', te: 'రైల్వే స్టేషన్ ఎక్కడ?', hi: 'रेलवे स्टेशन कहाँ है?', ml: 'റെയിൽവേ സ്റ്റേഷൻ എവിടെ?', fr: 'Où est la gare ?', ja: '駅はどこですか？' } },

  // ---- Medical ----
  { cat: 'medical', local: 'உடம்பு சரியில்லை', roman: 'Udambu sariyillai', meaning: { en: 'I am not feeling well', ta: 'உடம்பு சரியில்லை', te: 'నాకు బాగా లేదు', hi: 'मैं ठीक नहीं हूँ', ml: 'എനിക്ക് സുഖമില്ല', fr: 'Je ne me sens pas bien', ja: '気分が悪いです' } },
  { cat: 'medical', local: 'மருத்துவமனை', roman: 'Maruthuvamanai', meaning: { en: 'Hospital', ta: 'மருத்துவமனை', te: 'ఆసుపత్రి', hi: 'अस्पताल', ml: 'ആശുപത്രി', fr: 'Hôpital', ja: '病院' } },
  { cat: 'medical', local: 'மருந்து கடை', roman: 'Marundhu kadai', meaning: { en: 'Pharmacy', ta: 'மருந்து கடை', te: 'మందుల దుకాణం', hi: 'दवाखाना', ml: 'മെഡിക്കൽ ഷോപ്പ്', fr: 'Pharmacie', ja: '薬局' } },
  { cat: 'medical', local: 'வலி', roman: 'Vali', meaning: { en: 'Pain', ta: 'வலி', te: 'నొప్పి', hi: 'दर्द', ml: 'വേദന', fr: 'Douleur', ja: '痛み' } },
  { cat: 'medical', local: 'காயம்', roman: 'Kaayam', meaning: { en: 'Wound / injury', ta: 'காயம்', te: 'గాయం', hi: 'घाव', ml: 'മുറിവ്', fr: 'Blessure', ja: '怪我' } },

  // ---- Emergency ----
  { cat: 'emergency', local: 'உதவி!', roman: 'Uthavi!', meaning: { en: 'Help!', ta: 'உதவி!', te: 'సహాయం!', hi: 'मदद!', ml: 'സഹായം!', fr: 'Au secours !', ja: '助けて！' } },
  { cat: 'emergency', local: 'போலீஸ்', roman: 'Police', meaning: { en: 'Police', ta: 'போலீஸ்', te: 'పోలీసు', hi: 'पुलिस', ml: 'പോലീസ്', fr: 'Police', ja: '警察' } },
  { cat: 'emergency', local: 'ஆம்புலன்ஸ்', roman: 'Ambulance', meaning: { en: 'Ambulance', ta: 'ஆம்புலன்ஸ்', te: 'అంబులెన్స్', hi: 'एम्बुलेंस', ml: 'ആംബുലൻസ്', fr: 'Ambulance', ja: '救急車' } },
  { cat: 'emergency', local: 'தீ', roman: 'Thee', meaning: { en: 'Fire', ta: 'தீ', te: 'అగ్ని', hi: 'आग', ml: 'തീ', fr: 'Feu', ja: '火事' } },

  // ---- Polite ----
  { cat: 'polite', local: 'தயவுசெய்து', roman: 'Thayavu seithu', meaning: { en: 'Please', ta: 'தயவுசெய்து', te: 'దయచేసి', hi: 'कृपया', ml: 'ദയവായി', fr: "S'il vous plaît", ja: 'お願いします' } },
  { cat: 'polite', local: 'மன்னிக்கவும்', roman: 'Mannikkavum', meaning: { en: 'Sorry / Excuse me', ta: 'மன்னிக்கவும்', te: 'క్షమించండి', hi: 'माफ़ कीजिए', ml: 'ക്ഷമിക്കണം', fr: 'Excusez-moi', ja: 'すみません' } },
  { cat: 'polite', local: 'பரவாயில்லை', roman: 'Paravaayillai', meaning: { en: 'No problem / It\'s okay', ta: 'பரவாயில்லை', te: 'పర్వాలేదు', hi: 'कोई बात नहीं', ml: 'കുഴപ്പമില്ല', fr: 'Pas de problème', ja: '問題ありません' } },
  { cat: 'polite', local: 'எனக்கு தமிழ் தெரியாது', roman: 'Enakku Tamil theriyathu', meaning: { en: 'I do not know Tamil', ta: 'எனக்கு தமிழ் தெரியாது', te: 'నాకు తమిళం రాదు', hi: 'मुझे तमिल नहीं आती', ml: 'എനിക്ക് തമിഴ് അറിയില്ല', fr: 'Je ne parle pas tamoul', ja: 'タミル語がわかりません' } },
  { cat: 'polite', local: 'ஆங்கிலம் தெரியுமா?', roman: 'Angilam theriyuma?', meaning: { en: 'Do you know English?', ta: 'ஆங்கிலம் தெரியுமா?', te: 'ఇంగ్లీష్ తెలుసా?', hi: 'अंग्रेज़ी आती है?', ml: 'ഇംഗ്ലീഷ് അറിയാമോ?', fr: 'Parlez-vous anglais ?', ja: '英語を話せますか？' } },
];

// Helper: get all phrases in a category
function getPhrasesByCategory(cat) {
  if (cat === 'all') return phrasebook;
  return phrasebook.filter(p => p.cat === cat);
}

// Helper: get emergency card by id
function getEmergencyCard(id) {
  return emergencyPhrases.find(p => p.id === id) || null;
}

// Expose
window.emergencyPhrases = emergencyPhrases;
window.phrasebook = phrasebook;
window.getPhrasesByCategory = getPhrasesByCategory;
window.getEmergencyCard = getEmergencyCard;
