// Namma Tour — scams-data.js
// Common tourist scams in Tamil Nadu & Kerala. Offline data.
// Each scam has: id, category, region (where it happens most), title,
// description, and how-to-avoid. Multilingual titles.

const scams = [
  // ============ AUTO / TRANSPORT ============
  {
    id: 'auto-meter',
    cat: 'transport',
    regions: ['Chennai', 'Madurai', 'Coimbatore', 'Kochi', 'Thiruvananthapuram'],
    title: { en: 'Auto meter "not working"', ta: 'ஆட்டோ மீட்டர் "வேலை செய்யவில்லை"', te: 'ఆటో మీటర్ "పని చేయడం లేదు"', hi: 'ऑटो मीटर "काम नहीं कर रहा"', ml: 'ഓട്ടോ മീറ്റർ "പ്രവർത്തിക്കുന്നില്ല"', fr: 'Compteur d\'auto "en panne"', ja: 'オートメーターが「壊れている」' },
    desc: 'Driver claims the meter is broken and quotes a fixed price 2–3x the fair rate. Very common at railway stations and airports.',
    avoid: 'Insist on the meter. If refused, walk away — there is always another auto. Use our Fare Checker tab to know the fair range.'
  },
  {
    id: 'auto-long-route',
    cat: 'transport',
    regions: ['Chennai', 'Madurai', 'Bengaluru border towns'],
    title: { en: 'Long route detour', ta: 'நீண்ட வழி திருப்பம்', te: 'పొడవైన మార్గం మళ్ళింపు', hi: 'लंबा रास्ता घुमाव', ml: 'ദീർഘ വഴി തിരിവ്', fr: 'Détour par un long chemin', ja: '遠回りルート' },
    desc: 'Driver takes a longer route to inflate the fare. Common for tourists who don\'t know the city.',
    avoid: 'Use the offline map or Google Maps to check the route. Ask driver to follow the shortest path.'
  },
  {
    id: 'auto-shared',
    cat: 'transport',
    regions: ['Chennai', 'Madurai', 'Coimbatore'],
    title: { en: 'Shared auto charges full fare', ta: 'பகிர்வு ஆட்டோ முழு கட்டணம்', te: 'షేర్ ఆటో పూర్తి ఛార్జీ', hi: 'शेयर ऑटो पूरा किराया', ml: 'ഷെയർ ഓട്ടോ പൂർണ്ണ ചാർജ്', fr: 'Auto partagé facture plein tarif', ja: '相乗りオートで満額請求' },
    desc: 'Auto is "shared" but driver charges you as if private. Or drops another passenger and still charges full.',
    avoid: 'Clarify upfront: "Shared or private?" If shared, pay shared rate (usually ₹20–40).'
  },

  // ============ TEMPLES ============
  {
    id: 'temple-closed',
    cat: 'temple',
    regions: ['Madurai', 'Rameswaram', 'Kanchipuram', 'Srirangam'],
    title: { en: '"Temple is closed" trick', ta: '"கோவில் மூடப்பட்டுள்ளது" தந்திரம்', te: '"గుడి మూసివేయబడింది" ట్రిక్', hi: '"मंदिर बंद है" चाल', ml: '"ക്ഷേത്രം അടച്ചിരിക്കുന്നു" തന്ത്രം', fr: 'Astuce du "temple fermé"', ja: '「寺院は閉まっている」詐欺' },
    desc: 'A "helpful" stranger tells you the temple is closed today and offers to take you to a "better" temple or shop. The real temple is open.',
    avoid: 'Ignore unsolicited help. Check the temple signboard or walk to the entrance yourself. Do not follow strangers.'
  },
  {
    id: 'temple-priest-blessing',
    cat: 'temple',
    regions: ['Madurai', 'Kanchipuram', 'Rameswaram', 'Srirangam'],
    title: { en: 'Fake "priest" blessing fee', ta: 'போலி "பூசாரி" ஆசி கட்டணம்', te: 'నకిలీ "పూజారి" ఆశీర్వాద రుసుము', hi: 'नकली "पुजारी" आशीर्वाद शुल्क', ml: 'വ്യാജ "പൂജാരി" ആശിർവാദ ഫീസ്', fr: 'Faux "prêtre" demande un don', ja: '偽の「僧侶」の祝福料' },
    desc: 'A person claims to be a temple priest, performs a small ritual, then demands a large "donation" (₹500+). Real temple priests never demand payment this way.',
    avoid: 'Say no firmly. Walk away. Donations at temples are voluntary and go in official hundis (donation boxes).'
  },
  {
    id: 'temple-shoe',
    cat: 'temple',
    regions: ['Madurai', 'Srirangam', 'Rameswaram'],
    title: { en: 'Overcharged shoe deposit', ta: 'அதிக கால் செருப்பு வைப்பு கட்டணம்', te: 'అధిక షూ డిపాజిట్', hi: 'अधिक जूता जमा शुल्क', ml: 'അധിക ഷൂ ഡെപ്പോസിറ്റ്', fr: 'Dépôt de chaussures surfacturé', ja: '靴預かりの過剰請求' },
    desc: 'Shoe-stand operator outside the temple charges ₹50–100 per pair. Fair rate is ₹5–10.',
    avoid: 'Look for the official temple shoe stand. Or carry a cloth bag and keep your shoes with you.'
  },
  {
    id: 'temple-prasadam',
    cat: 'temple',
    regions: ['Tirupati border', 'Rameswaram', 'Kanchipuram'],
    title: { en: 'Fake prasadam seller', ta: 'போலி பிரசாதம் விற்பவர்', te: 'నకిలీ ప్రసాదం విక్రేత', hi: 'नकली प्रसाद विक्रेता', ml: 'വ്യാജ പ്രസാദ വിൽപ്പനക്കാരൻ', fr: 'Faux vendeur de prasadam', ja: '偽のプラサダム売り' },
    desc: 'Someone sells "temple prasadam" outside at high price. Actual prasadam is usually free or very cheap inside the temple.',
    avoid: 'Buy prasadam only from inside temple counters. Refuse street sellers.'
  },

  // ============ SHOPPING ============
  {
    id: 'gem-scam',
    cat: 'shopping',
    regions: ['Chennai', 'Madurai', 'Thanjavur', 'Kochi'],
    title: { en: 'Gem & jewellery scam', ta: 'ரத்தின & நகை மோசடி', te: 'రత్నం & ఆభరణాల మోసం', hi: 'रत्न और आभूषण घोटाला', ml: 'രത്നം & ആഭരണ തട്ടിപ്പ്', fr: 'Arnaque aux bijoux', ja: '宝石・ジュエリー詐欺' },
    desc: 'A shop "exporter" offers to sell gems/jewellery at "wholesale price" as an "investment". The gems are worthless or fake.',
    avoid: 'Never buy gems from someone who approached you. Only buy from reputable shops you chose yourself. Indian customs will confiscate unexported gems anyway.'
  },
  {
    id: 'carpet-textile',
    cat: 'shopping',
    regions: ['Chennai', 'Kanchipuram', 'Madurai', 'Kochi'],
    title: { en: 'Textile "factory" scam', ta: 'ஜவுளி "தொழிற்சாலை" மோசடி', te: 'వస్త్ర "ఫ్యాక్టరీ" మోసం', hi: 'कपड़ा "फैक्ट्री" घोटाला', ml: 'വസ്ത്ര "ഫാക്ടറി" തട്ടിപ്പ്', fr: 'Arnaque à la "fabrique" de tissus', ja: '織物「工場」詐欺' },
    desc: 'Auto driver takes you to a "factory outlet" with fixed high prices. Salespeople pressure you to buy silk sarees at inflated rates.',
    avoid: 'Ask to be dropped at a specific shop you chose. If they insist on a "factory", refuse — it\'s a commission scam.'
  },
  {
    id: 'spice-scam',
    cat: 'shopping',
    regions: ['Kochi', 'Munnar', 'Kumily', 'Thekkady'],
    title: { en: 'Spice shop overcharging', ta: 'மசாலா கடை அதிக விலை', te: 'మసాలా దుకాణం అధిక ధర', hi: 'मसाला दुकान अधिक दाम', ml: 'മസാല കട അധിക വില', fr: 'Épices surfacturées', ja: 'スパイス店の過剰請求' },
    desc: 'Tourist-area spice shops charge 5–10x fair price for cardamom, pepper, vanilla. Common in Munnar and Thekkady.',
    avoid: 'Buy from local markets (not tourist streets). Compare prices at 2–3 shops. Fair prices: cardamom ₹2,500–3,500/kg, pepper ₹600–900/kg.'
  },
  {
    id: 'pashmina-scam',
    cat: 'shopping',
    regions: ['Ooty', 'Kodaikanal'],
    title: { en: 'Fake "pashmina" shawls', ta: 'போலி "பஷ்மினா" சால்வை', te: 'నకిలీ "పష్మినా" శాలువలు', hi: 'नकली "पश्मीना" शॉल', ml: 'വ്യാജ "പഷ്മിന" ഷാളുകൾ', fr: 'Faux châles "pashmina"', ja: '偽「パシュミナ」ショール' },
    desc: 'Shawls sold as "genuine pashmina" but are actually acrylic or polyester. Common in hill stations.',
    avoid: 'Real pashmina costs ₹8,000+. If it\'s under ₹3,000, it\'s not pashmina. Buy from government emporia for authenticity.'
  },
  {
    id: 'fake-ayurveda',
    cat: 'shopping',
    regions: ['Kovalam', 'Varkala', 'Kochi', 'Munnar'],
    title: { en: 'Fake ayurveda products', ta: 'போலி ஆயுர்வேத பொருட்கள்', te: 'నకిలీ ఆయుర్వేద ఉత్పత్తులు', hi: 'नकली आयुर्वेद उत्पाद', ml: 'വ്യാജ ആയുർവേദ ഉൽപ്പന്നങ്ങൾ', fr: 'Produits ayurvédiques faux', ja: '偽アーユルヴェーダ製品' },
    desc: 'Shop sells "traditional ayurvedic" oils and medicines with fake labels. Real ayurveda products have proper licensing.',
    avoid: 'Buy from reputable ayurveda pharmacies (Kottakkal Arya Vaidya Sala, SNA Oushadhasala). Check for license numbers.'
  },

  // ============ GUIDES / TOURS ============
  {
    id: 'fake-guide',
    cat: 'guides',
    regions: ['Madurai', 'Hampi border', 'Mahabalipuram', 'Kochi', 'Fort Kochi'],
    title: { en: 'Unauthorized "guide"', ta: 'அனுமதியற்ற "வழிகாட்டி"', te: 'అనధికార "గైడ్"', hi: 'अनधिकृत "गाइड"', ml: 'അനധികൃത "ഗൈഡ്"', fr: 'Faux guide non autorisé', ja: '無許可の「ガイド」' },
    desc: 'Someone offers to be your tour guide for ₹500–2000, tells wrong history, and walks you into commission shops.',
    avoid: 'Use official guides only (available at major monuments for fixed rates). Or use a guidebook/audio guide.'
  },
  {
    id: 'boat-ride',
    cat: 'guides',
    regions: ['Alleppey', 'Kumarakom', 'Kollam', 'Kochi'],
    title: { en: 'Backwater boat overcharging', ta: 'பின்னீர் படகு அதிக கட்டணம்', te: 'బ్యాక్‌వాటర్ బోట్ అధిక ఛార్జీ', hi: 'बैकवाटर नाव अधिक किराया', ml: 'ബാക്ക്വാട്ടർ ബോട്ട് അധിക ചാർജ്', fr: 'Bateau backwater surfacturé', ja: 'バックウォーターボートの過剰請求' },
    desc: 'Boat operators at the jetty quote inflated rates for houseboats and shikara rides. Multiple touts swarm tourists.',
    avoid: 'Book through official Kerala Tourism or your hotel. Standard shikara: ₹400–600/hour. Houseboat: ₹8,000–15,000/night depending on size.'
  },
  {
    id: 'elephant-ride',
    cat: 'guides',
    regions: ['Thekkady', 'Munnar', 'Wayanad', 'Kodanad'],
    title: { en: 'Unethical elephant ride', ta: 'அநீதியான யானை சவாரி', te: 'అనైతిక ఏనుగు సవారీ', hi: 'अनैतिक हाथी सवारी', ml: 'അനൈതിക ആന സവാരി', fr: 'Balade à dos d\'éléphant non éthique', ja: '非倫理的な象乗り' },
    desc: 'Elephant rides offered at camps with poor animal welfare. Some are illegal. Many are now banned in Kerala.',
    avoid: 'Do not ride elephants. Visit ethical sanctuaries instead (Wildlife Trust of India, forest dept sanctuaries).'
  },

  // ============ MONEY / ATM ============
  {
    id: 'atm-skim',
    cat: 'money',
    regions: ['All cities', 'Tourist areas'],
    title: { en: 'ATM skimming / card cloning', ta: 'ATM ஸ்கிம்மிங்', te: 'ATM స్కిమ్మింగ్', hi: 'ATM स्किमिंग', ml: 'ATM സ്കിമ്മിംഗ്', fr: 'Skimming de carte', ja: 'ATMスキミング' },
    desc: 'Fake card readers on ATMs steal your card details. Common in tourist-heavy areas.',
    avoid: 'Use ATMs inside bank branches or hotels. Cover the keypad when entering PIN. Prefer UPI/cash over card in small shops.'
  },
  {
    id: 'change-short',
    cat: 'money',
    regions: ['All cities', 'Tourist areas'],
    title: { en: 'Short-changing on change', ta: 'சில்லறையில் ஏமாற்று', te: 'చిల్లరలో మోసం', hi: 'खुल्ले पैसे में धोखा', ml: 'ചില്ലറയിൽ വഞ്ചന', fr: 'Rendu de monnaie incorrect', ja: 'お釣りのごまかし' },
    desc: 'Shop or driver claims you gave ₹100 when you gave ₹500. Or returns less change.',
    avoid: 'Count change before leaving. Say the amount out loud when handing over. Keep small notes ready.'
  },
  {
    id: 'currency-tout',
    cat: 'money',
    regions: ['Airports', 'Railway stations', 'Border towns'],
    title: { en: 'Black-market currency exchange', ta: 'கருப்பு சந்தை நாணய பரிமாற்றம்', te: 'బ్లాక్ మార్కెట్ కరెన్సీ మార్పిడి', hi: 'काला बाज़ार मुद्रा विनिमय', ml: 'കറുത്ത വിപണി കറൻസി വിനിമയം', fr: 'Change au marché noir', ja: '闇両替' },
    desc: 'Someone offers better rates than official exchange. Notes are fake or you get counted short.',
    avoid: 'Use only official exchange counters, banks, or ATMs. There is no legitimate reason to use touts.'
  },

  // ============ HOTEL / STAY ============
  {
    id: 'hotel-bait',
    cat: 'hotel',
    regions: ['Madurai', 'Kochi', 'Munnar', 'Ooty'],
    title: { en: '"Hotel is full" bait', ta: '"ஹோட்டல் நிரம்பியது" தூண்டில்', te: '"హోటల్ నిండిపోయింది"', hi: '"होटल भरा है" चारा', ml: '"ഹോട്ടൽ നിറഞ്ഞു"', fr: '"Hôtel complet" appât', ja: '「ホテル満室」の罠' },
    desc: 'Auto driver says your booked hotel is closed/full and offers a "friend\'s hotel" at higher price. Your real hotel is fine.',
    avoid: 'Call your hotel directly. Do not let driver change your booking. If needed, walk away and use GPS.'
  },
  {
    id: 'hotel-extra-charges',
    cat: 'hotel',
    regions: ['Tourist areas'],
    title: { en: 'Hidden hotel charges', ta: 'மறைந்த ஹோட்டல் கட்டணங்கள்', te: 'దాచిన హోటల్ ఛార్జీలు', hi: 'छिपे होटल शुल्क', ml: 'മറഞ്ഞിരിക്കുന്ന ഹോട്ടൽ ചാർജുകൾ', fr: 'Frais d\'hôtel cachés', ja: '隠れたホテル料金' },
    desc: 'Extra "service charge", "tourism tax", "AC charge" added at checkout that wasn\'t disclosed at booking.',
    avoid: 'Ask for total charges at check-in in writing. Take a photo of the room rate sign. Refuse undisclosed charges.'
  },

  // ============ DIGITAL / PHONE ============
  {
    id: 'whatsapp-job',
    cat: 'money',
    regions: ['Online'],
    title: { en: 'Fake WhatsApp tour deals', ta: 'போலி WhatsApp சுற்றுலா ஒப்பந்தங்கள்', te: 'నకిలీ WhatsApp టూర్ డీల్స్', hi: 'नकली WhatsApp टूर डील', ml: 'വ്യാജ WhatsApp ടൂർ ഡീലുകൾ', fr: 'Fausses offres de voyage WhatsApp', ja: '偽WhatsAppツアー' },
    desc: 'Someone on WhatsApp offers a great deal on a tour, hotel, or taxi. Once you pay the deposit, they disappear.',
    avoid: 'Book only through official websites or apps with reviews. Never pay advance to unknown WhatsApp numbers.'
  },
  {
    id: 'fake-police',
    cat: 'money',
    regions: ['Tourist areas'],
    title: { en: 'Fake police / "fine"', ta: 'போலி போலீஸ் "அபராதம்"', te: 'నకిలీ పోలీసు "జరిమానా"', hi: 'नकली पुलिस "जुर्माना"', ml: 'വ്യാജ പോലീസ് "പിഴ"', fr: 'Faux policier "amende"', ja: '偽警官の「罰金」' },
    desc: 'Person claiming to be police says you broke a rule and demands an on-the-spot "fine". Real Indian police issue written challans, never cash.',
    avoid: 'Ask to see official ID. Say you will only pay at the police station. Walk towards a crowd or shop if uncomfortable.'
  },
];

function getScamsByCategory(cat) {
  if (!cat || cat === 'all') return scams;
  return scams.filter(s => s.cat === cat);
}

function scamsForPlace(placeName) {
  if (!placeName) return scams;
  const p = placeName.toLowerCase();
  return scams.filter(s => s.regions.some(r => r.toLowerCase().includes(p) || p.includes(r.toLowerCase())));
}

window.scams = scams;
window.getScamsByCategory = getScamsByCategory;
window.scamsForPlace = scamsForPlace;
