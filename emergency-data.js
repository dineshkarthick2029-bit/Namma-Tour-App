// Namma Tour — emergency-data.js
// Offline emergency directory for Tamil Nadu & Kerala.
//
// IMPORTANT: Only national/state-level helplines have guaranteed-correct
// numbers. Individual police stations and hospitals below list their
// public names + coordinates — the app should let users tap-to-call 112
// (unified emergency) or 108 (ambulance) rather than depend on a
// possibly-outdated direct number. Verify locally before shipping.

const nationalHelplines = [
  { id: 'all',       name: { en: 'All emergencies (unified)', ta: 'அனைத்து அவசரங்கள்', te: 'అన్ని అత్యవసరాలు', hi: 'सभी आपात स्थितियाँ', ml: 'എല്ലാ അടിയന്തിരങ്ങളും', fr: 'Toutes urgences', ja: 'すべての緊急' },          number: '112' },
  { id: 'police',    name: { en: 'Police',                    ta: 'காவல்துறை',          te: 'పోలీసు',              hi: 'पुलिस',                 ml: 'പോലീസ്',                     fr: 'Police',            ja: '警察' },              number: '100' },
  { id: 'ambulance', name: { en: 'Ambulance',                 ta: 'ஆம்புலன்ஸ்',         te: 'అంబులెన్స్',          hi: 'एम्बुलेंस',              ml: 'ആംബുലൻസ്',                  fr: 'Ambulance',         ja: '救急車' },             number: '108' },
  { id: 'fire',      name: { en: 'Fire',                      ta: 'தீயணைப்பு',          te: 'అగ్నిమాపక',          hi: 'अग्निशमन',              ml: 'അഗ്നിശമന',                   fr: 'Pompiers',          ja: '消防' },               number: '101' },
  { id: 'women',     name: { en: 'Women helpline',            ta: 'பெண்கள் உதவி',       te: 'మహిళల హెల్ప్‌లైన్',   hi: 'महिला हेल्पलाइन',        ml: 'വനിത ഹെൽപ്പ്‌ലൈൻ',          fr: 'Femmes',            ja: '女性相談' },            number: '1091' },
  { id: 'child',     name: { en: 'Child helpline',            ta: 'குழந்தை உதவி',       te: 'పిల్లల హెల్ప్‌లైన్',    hi: 'बाल हेल्पलाइन',          ml: 'ശിശു ഹെൽപ്പ്‌ലൈൻ',           fr: 'Enfants',           ja: '子ども相談' },          number: '1098' },
  { id: 'tourist',   name: { en: 'Tourist helpline (India)',  ta: 'சுற்றுலா உதவி',      te: 'పర్యాటక హెల్ప్‌లైన్',  hi: 'पर्यटक हेल्पलाइन',       ml: 'ടൂറിസ്റ്റ് ഹെൽപ്പ്‌ലൈൻ',     fr: 'Touristes',         ja: '観光客相談' },          number: '1363' },
  { id: 'tntourist', name: { en: 'TN Tourist Police',         ta: 'தமிழ்நாடு சுற்றுலா போலீஸ்', te: 'TN టూరిస్ట్ పోలీస్', hi: 'TN पर्यटक पुलिस',       ml: 'TN ടൂറിസ്റ്റ് പോലീസ്',       fr: 'Police touristique TN', ja: 'TN観光警察' },      number: '1800-425-4747' },
  { id: 'kltourist', name: { en: 'Kerala Tourist Police',     ta: 'கேரள சுற்றுலா போலீஸ்', te: 'కేరళ టూరిస్ట్ పోలీస్', hi: 'केरल पर्यटक पुलिस',     ml: 'കേരള ടൂറിസ്റ്റ് പോലീസ്',    fr: 'Police touristique KL', ja: 'KL観光警察' },      number: '1800-425-4747' },
  { id: 'highway',   name: { en: 'Highway assistance',        ta: 'நெடுஞ்சாலை உதவி',    te: 'హైవే సహాయం',          hi: 'हाईवे सहायता',           ml: 'ഹൈവേ സഹായം',                fr: 'Assistance routière', ja: '高速道路支援' },        number: '1033' },
];

// Police stations near major tourist spots.
// Coordinates are approximate to the station location — verify locally.
const policeStations = [
  // ---- CHENNAI ----
  { name: 'Chennai Central Police Station',       district: 'Chennai',          state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, phone: '100' },
  { name: 'Marina Beach Police Station',          district: 'Chennai',          state: 'Tamil Nadu', lat: 13.0500, lng: 80.2824, phone: '100' },
  { name: 'Mylapore Police Station',              district: 'Chennai',          state: 'Tamil Nadu', lat: 13.0338, lng: 80.2697, phone: '100' },
  { name: 'Chennai Airport Police Station',       district: 'Chennai',          state: 'Tamil Nadu', lat: 12.9941, lng: 80.1709, phone: '100' },
  { name: 'Adyar Police Station',                 district: 'Chennai',          state: 'Tamil Nadu', lat: 13.0067, lng: 80.2570, phone: '100' },

  // ---- MADURAI ----
  { name: 'Madurai City Police HQ',               district: 'Madurai',          state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198, phone: '100' },
  { name: 'Meenakshi Temple Police Station',      district: 'Madurai',          state: 'Tamil Nadu', lat: 9.9195, lng: 78.1193, phone: '100' },
  { name: 'Madurai Railway Police Station',       district: 'Madurai',          state: 'Tamil Nadu', lat: 9.9192, lng: 78.1126, phone: '100' },
  { name: 'Madurai Airport Police Station',       district: 'Madurai',          state: 'Tamil Nadu', lat: 9.8342, lng: 78.0934, phone: '100' },

  // ---- COIMBATORE ----
  { name: 'Coimbatore City Police HQ',            district: 'Coimbatore',       state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, phone: '100' },
  { name: 'Coimbatore Railway Police Station',    district: 'Coimbatore',       state: 'Tamil Nadu', lat: 10.9985, lng: 76.9674, phone: '100' },
  { name: 'Coimbatore Airport Police Station',    district: 'Coimbatore',       state: 'Tamil Nadu', lat: 11.0280, lng: 77.0434, phone: '100' },

  // ---- KANYAKUMARI ----
  { name: 'Kanyakumari Police Station',           district: 'Kanyakumari',      state: 'Tamil Nadu', lat: 8.0833,  lng: 77.5385, phone: '100' },
  { name: 'Nagercoil Police Station',             district: 'Kanyakumari',      state: 'Tamil Nadu', lat: 8.1833,  lng: 77.4333, phone: '100' },

  // ---- RAMESWARAM ----
  { name: 'Rameswaram Police Station',            district: 'Rameswaram',       state: 'Tamil Nadu', lat: 9.2882,  lng: 79.3129, phone: '100' },
  { name: 'Dhanushkodi Police Outpost',           district: 'Rameswaram',       state: 'Tamil Nadu', lat: 9.1500,  lng: 79.4167, phone: '100' },

  // ---- KODAIKANAL ----
  { name: 'Kodaikanal Police Station',            district: 'Dindigul',         state: 'Tamil Nadu', lat: 10.2381, lng: 77.4892, phone: '100' },

  // ---- OOTY / NILGIRIS ----
  { name: 'Ooty Police Station',                  district: 'The Nilgiris',     state: 'Tamil Nadu', lat: 11.4064, lng: 76.6932, phone: '100' },
  { name: 'Coonoor Police Station',               district: 'The Nilgiris',     state: 'Tamil Nadu', lat: 11.3530, lng: 76.7959, phone: '100' },

  // ---- TIRUCHIRAPPALLI ----
  { name: 'Trichy City Police HQ',                district: 'Tiruchirappalli',  state: 'Tamil Nadu', lat: 10.7905, lng: 78.7047, phone: '100' },
  { name: 'Srirangam Police Station',             district: 'Tiruchirappalli',  state: 'Tamil Nadu', lat: 10.8624, lng: 78.6905, phone: '100' },

  // ---- THANJAVUR / KUMBAKONAM ----
  { name: 'Thanjavur Police Station',             district: 'Thanjavur',        state: 'Tamil Nadu', lat: 10.7870, lng: 79.1378, phone: '100' },
  { name: 'Kumbakonam Police Station',            district: 'Thanjavur',        state: 'Tamil Nadu', lat: 10.9601, lng: 79.3845, phone: '100' },

  // ---- MAHABALIPURAM ----
  { name: 'Mahabalipuram Police Station',         district: 'Chengalpattu',     state: 'Tamil Nadu', lat: 12.6269, lng: 80.1927, phone: '100' },

  // ---- VELLORE ----
  { name: 'Vellore Police Station',               district: 'Vellore',          state: 'Tamil Nadu', lat: 12.9165, lng: 79.1325, phone: '100' },

  // ---- KERALA: KOCHI ----
  { name: 'Kochi City Police HQ',                 district: 'Ernakulam',        state: 'Kerala',     lat: 9.9700,  lng: 76.2900, phone: '100' },
  { name: 'Fort Kochi Police Station',            district: 'Ernakulam',        state: 'Kerala',     lat: 9.9658,  lng: 76.2422, phone: '100' },
  { name: 'Kochi Airport Police Station',         district: 'Ernakulam',        state: 'Kerala',     lat: 10.1520, lng: 76.4010, phone: '100' },

  // ---- KERALA: MUNNAR / IDUKKI ----
  { name: 'Munnar Police Station',                district: 'Idukki',           state: 'Kerala',     lat: 10.0889, lng: 77.0595, phone: '100' },
  { name: 'Thekkady Police Station',              district: 'Idukki',           state: 'Kerala',     lat: 9.6000,  lng: 77.1600, phone: '100' },

  // ---- KERALA: ALLEPPEY ----
  { name: 'Alappuzha Police Station',             district: 'Alappuzha',        state: 'Kerala',     lat: 9.4981,  lng: 76.3388, phone: '100' },

  // ---- KERALA: TRIVANDRUM ----
  { name: 'Thiruvananthapuram City Police HQ',    district: 'Thiruvananthapuram', state: 'Kerala',   lat: 8.5241,  lng: 76.9366, phone: '100' },
  { name: 'Kovalam Police Station',               district: 'Thiruvananthapuram', state: 'Kerala',   lat: 8.4004,  lng: 76.9787, phone: '100' },

  // ---- KERALA: KOZHIKODE ----
  { name: 'Kozhikode Police Station',             district: 'Kozhikode',        state: 'Kerala',     lat: 11.2588, lng: 75.7804, phone: '100' },

  // ---- KERALA: WAYANAD ----
  { name: 'Kalpetta Police Station',              district: 'Wayanad',          state: 'Kerala',     lat: 11.6092, lng: 76.0834, phone: '100' },

  // ---- KERALA: THRISSUR ----
  { name: 'Thrissur Police Station',              district: 'Thrissur',         state: 'Kerala',     lat: 10.5276, lng: 76.2144, phone: '100' },
];

// Major hospitals near tourist spots.
// Direct phone numbers deliberately omitted — the app should let users
// call 108 (ambulance) which will route to the nearest hospital dispatch.
// Names + coordinates below are for offline "nearest hospital" lookup.
const hospitals = [
  // ---- CHENNAI ----
  { name: 'Government General Hospital, Chennai',   district: 'Chennai',       state: 'Tamil Nadu', lat: 13.0826, lng: 80.2762, type: 'government' },
  { name: 'Apollo Hospitals, Greams Road',          district: 'Chennai',       state: 'Tamil Nadu', lat: 13.0605, lng: 80.2538, type: 'private' },
  { name: 'MIOT International',                     district: 'Chennai',       state: 'Tamil Nadu', lat: 13.0060, lng: 80.1835, type: 'private' },

  // ---- MADURAI ----
  { name: 'Government Rajaji Hospital',             district: 'Madurai',       state: 'Tamil Nadu', lat: 9.9279,  lng: 78.1343, type: 'government' },
  { name: 'Meenakshi Mission Hospital',             district: 'Madurai',       state: 'Tamil Nadu', lat: 9.9312,  lng: 78.1610, type: 'private' },
  { name: 'Apollo Hospitals, Madurai',              district: 'Madurai',       state: 'Tamil Nadu', lat: 9.9252,  lng: 78.1556, type: 'private' },

  // ---- COIMBATORE ----
  { name: 'Coimbatore Medical College Hospital',    district: 'Coimbatore',    state: 'Tamil Nadu', lat: 11.0168, lng: 76.9686, type: 'government' },
  { name: 'Kovai Medical Center',                   district: 'Coimbatore',    state: 'Tamil Nadu', lat: 11.0300, lng: 76.9974, type: 'private' },
  { name: 'PSG Hospitals',                          district: 'Coimbatore',    state: 'Tamil Nadu', lat: 11.0247, lng: 76.9976, type: 'private' },

  // ---- KANYAKUMARI ----
  { name: 'Kanyakumari Government Medical College', district: 'Kanyakumari',   state: 'Tamil Nadu', lat: 8.1833,  lng: 77.4300, type: 'government' },

  // ---- RAMESWARAM ----
  { name: 'Rameswaram Government Hospital',         district: 'Rameswaram',    state: 'Tamil Nadu', lat: 9.2875,  lng: 79.3145, type: 'government' },

  // ---- OOTY ----
  { name: 'Government Hospital, Ooty',              district: 'The Nilgiris',  state: 'Tamil Nadu', lat: 11.4125, lng: 76.6985, type: 'government' },
  { name: 'Coonoor Government Hospital',            district: 'The Nilgiris',  state: 'Tamil Nadu', lat: 11.3483, lng: 76.7972, type: 'government' },

  // ---- KODAIKANAL ----
  { name: 'Government Hospital, Kodaikanal',        district: 'Dindigul',      state: 'Tamil Nadu', lat: 10.2356, lng: 77.4869, type: 'government' },

  // ---- TIRUCHIRAPPALLI ----
  { name: 'Government Hospital, Trichy',            district: 'Tiruchirappalli', state: 'Tamil Nadu', lat: 10.8296, lng: 78.6892, type: 'government' },

  // ---- THANJAVUR ----
  { name: 'Thanjavur Medical College Hospital',     district: 'Thanjavur',     state: 'Tamil Nadu', lat: 10.7833, lng: 79.1333, type: 'government' },

  // ---- KERALA: KOCHI ----
  { name: 'Government Medical College, Ernakulam',  district: 'Ernakulam',     state: 'Kerala',     lat: 9.9700,  lng: 76.2900, type: 'government' },
  { name: 'Amrita Institute of Medical Sciences',   district: 'Ernakulam',     state: 'Kerala',     lat: 10.0370, lng: 76.2885, type: 'private' },
  { name: 'Aster Medcity',                          district: 'Ernakulam',     state: 'Kerala',     lat: 10.0420, lng: 76.2687, type: 'private' },

  // ---- KERALA: MUNNAR ----
  { name: 'Government Hospital, Munnar',            district: 'Idukki',        state: 'Kerala',     lat: 10.0889, lng: 77.0595, type: 'government' },

  // ---- KERALA: ALLEPPEY ----
  { name: 'Government Medical College, Alappuzha',  district: 'Alappuzha',     state: 'Kerala',     lat: 9.5100,  lng: 76.3400, type: 'government' },

  // ---- KERALA: TRIVANDRUM ----
  { name: 'Government Medical College, TVM',        district: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241,  lng: 76.9366, type: 'government' },
  { name: 'KIMS Hospital',                          district: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241,  lng: 76.9500, type: 'private' },

  // ---- KERALA: KOZHIKODE ----
  { name: 'Government Medical College, Kozhikode',  district: 'Kozhikode',     state: 'Kerala',     lat: 11.2588, lng: 75.7804, type: 'government' },

  // ---- KERALA: WAYANAD ----
  { name: 'Government Hospital, Kalpetta',          district: 'Wayanad',       state: 'Kerala',     lat: 11.6092, lng: 76.0834, type: 'government' },

  // ---- KERALA: THRISSUR ----
  { name: 'Government Medical College, Thrissur',   district: 'Thrissur',      state: 'Kerala',     lat: 10.5276, lng: 76.2144, type: 'government' },
];

// Haversine for nearest lookup
function _km(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function nearestPolice(lat, lng, n) {
  n = n || 3;
  return policeStations
    .map(p => Object.assign({}, p, { distanceKm: _km(lat, lng, p.lat, p.lng) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, n);
}

function nearestHospital(lat, lng, n) {
  n = n || 3;
  return hospitals
    .map(h => Object.assign({}, h, { distanceKm: _km(lat, lng, h.lat, h.lng) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, n);
}

window.nationalHelplines = nationalHelplines;
window.policeStations    = policeStations;
window.hospitals         = hospitals;
window.nearestPolice     = nearestPolice;
window.nearestHospital   = nearestHospital;
