// Namma Tour — festivals-data.js
// Festival calendar for Tamil Nadu & Kerala. Offline data, no API.
// Dates are recurring (month + typical date). Some festivals follow the
// Hindu lunar calendar, so actual dates shift year-to-year — the "approx"
// field notes the common Gregorian window.

const festivals = [
  // ============ TAMIL NADU ============
  {
    name: 'Pongal', state: 'Tamil Nadu', month: 1, approx: 'Jan 14–17',
    places: ['Madurai', 'Thanjavur', 'Chennai', 'Coimbatore', 'Salem'],
    desc: 'The biggest Tamil harvest festival. 4 days of celebration — Bhogi, Thai Pongal, Maattu Pongal, Kaanum Pongal. Streets full of kolam, sugarcane and jaggery.',
    warning: 'Expect huge crowds, higher hotel prices, and full trains. Book travel 3+ weeks ahead.',
  },
  {
    name: 'Jallikattu', state: 'Tamil Nadu', month: 1, approx: 'Jan 15–16',
    places: ['Madurai', 'Tiruchirappalli', 'Theni', 'Sivaganga', 'Pudukkottai'],
    desc: 'Traditional bull-taming sport held during Maattu Pongal. Controversial but iconic Tamil cultural event with massive local attendance.',
    warning: 'Very crowded. Tourist viewing areas limited and can be unsafe. Skip unless you have local contacts.',
  },
  {
    name: 'Thaipusam', state: 'Tamil Nadu', month: 1, approx: 'Jan/Feb (full moon)',
    places: ['Palani', 'Tiruchirappalli', 'Chennai'],
    desc: 'Murugan devotees carry kavadis (decorated burdens) in penance. Colourful, intense, deeply devotional.',
    warning: 'Crowds at Palani are heavy — 200k+ pilgrims. Book accommodation early.',
  },
  {
    name: 'Chithirai Festival', state: 'Tamil Nadu', month: 4, approx: 'Apr/May',
    places: ['Madurai'],
    desc: 'Madurai\'s biggest festival — re-enactment of the celestial wedding of Meenakshi and Sundareswarar. Massive processions through the city.',
    warning: 'Meenakshi Temple area is packed. Hotel rates double. Worth seeing if you plan ahead.',
  },
  {
    name: 'Karthigai Deepam', state: 'Tamil Nadu', month: 11, approx: 'Nov/Dec',
    places: ['Tiruvannamalai', 'Madurai', 'Chennai'],
    desc: 'Festival of lights. At Tiruvannamalai, a giant beacon is lit on top of Arunachala hill, visible for miles.',
    warning: 'Tiruvannamalai crowd is heavy. Girivalam (circumambulation) route takes 3–4 hours on foot.',
  },
  {
    name: 'Mahamaham', state: 'Tamil Nadu', month: 2, approx: 'Feb/Mar (every 12 years)',
    places: ['Kumbakonam'],
    desc: 'Once-in-12-years festival where millions bathe in the Mahamaham tank. Considered the "Kumbh Mela of the South".',
    warning: 'Extremely crowded. Only visit if you\'re prepared for lakhs of pilgrims.',
  },
  {
    name: 'Natyanjali Dance Festival', state: 'Tamil Nadu', month: 2, approx: 'Feb/Mar (Mahashivaratri)',
    places: ['Chidambaram', 'Thanjavur'],
    desc: 'Classical Bharatanatyam performances offered to Shiva at major temples. Beautiful for dance enthusiasts.',
    warning: 'Moderate crowds. Advance booking for the main venue recommended.',
  },
  {
    name: 'Margazhi Music Season', state: 'Tamil Nadu', month: 12, approx: 'Dec–mid Jan',
    places: ['Chennai'],
    desc: 'The world\'s largest Carnatic music festival. Hundreds of concerts across Chennai sabhas (halls).',
    warning: 'Hotels in central Chennai sell out weeks ahead. Book early.',
  },
  {
    name: 'Puthandu (Tamil New Year)', state: 'Tamil Nadu', month: 4, approx: 'Apr 14',
    places: ['Madurai', 'Chennai', 'Thanjavur'],
    desc: 'Tamil New Year. Families gather, temples are busy, streets decorated with kolam.',
    warning: 'Moderate crowds everywhere. Many shops closed in the morning.',
  },
  {
    name: 'Velankanni Feast', state: 'Tamil Nadu', month: 9, approx: 'Aug 29 – Sep 8',
    places: ['Velankanni', 'Nagapattinam'],
    desc: 'Major Catholic pilgrimage at the Basilica of Our Lady of Good Health. Lakhs of pilgrims, all faiths welcome.',
    warning: 'Extremely crowded. Book trains/buses far in advance.',
  },
  {
    name: 'Aadi Perukku', state: 'Tamil Nadu', month: 8, approx: 'Aug 2–3',
    places: ['Hogenakkal', 'Thanjavur', 'Tiruchirappalli'],
    desc: 'River-worship festival celebrating the Kaveri\'s monsoon flow. Families gather at riverbanks.',
    warning: 'Rivers can be dangerous during monsoon. Do not enter the water.',
  },
  {
    name: 'Panguni Uthiram', state: 'Tamil Nadu', month: 3, approx: 'Mar/Apr',
    places: ['Palani', 'Madurai', 'Tiruchirappalli'],
    desc: 'Murugan festival celebrated at his six abodes (Arupadai Veedu). Processions and temple festivities.',
    warning: 'Heavy crowds at Palani and Thiruparankundram.',
  },

  // ============ KERALA ============
  {
    name: 'Onam', state: 'Kerala', month: 8, approx: 'Aug/Sep (Chingam)',
    places: ['Thiruvananthapuram', 'Kochi', 'Thrissur', 'Alleppey', 'Kozhikode'],
    desc: 'Kerala\'s biggest festival. 10 days of pookalam (flower carpets), boat races, Onasadya (feast), and Pulikali (tiger dance).',
    warning: 'Peak tourist season. Hotels and houseboats book out 2+ months in advance. Prices 2–3x normal.',
  },
  {
    name: 'Thrissur Pooram', state: 'Kerala', month: 4, approx: 'Apr/May',
    places: ['Thrissur'],
    desc: 'The "mother of all Poorams". A spectacular elephant procession with 30+ caparisoned elephants, drumming ensembles, and fireworks at Vadakkunnathan Temple.',
    warning: 'Extremely crowded (lakhs attend). Arrive early, leave late. Book accommodation months ahead.',
  },
  {
    name: 'Nehru Trophy Boat Race', state: 'Kerala', month: 8, approx: 'Aug (2nd Sat)',
    places: ['Alleppey'],
    desc: 'Iconic snake-boat race on Punnamada Lake. Chundan vallams with 100+ rowers racing to rhythmic chanting.',
    warning: 'Crowds fill Alleppey. Book houseboats and stay early.',
  },
  {
    name: 'Attukal Pongala', state: 'Kerala', month: 2, approx: 'Feb/Mar',
    places: ['Thiruvananthapuram'],
    desc: 'The world\'s largest gathering of women — lakhs cook pongala offering in the streets around Attukal Temple.',
    warning: 'Extremely crowded. Only women participate in the ritual cooking.',
  },
  {
    name: 'Aranmula Uthrattathi Vallamkali', state: 'Kerala', month: 9, approx: 'Sep',
    places: ['Aranmula'],
    desc: 'Snake-boat race on the Pamba river. Held at Aranmula Parthasarathy Temple since ancient times.',
    warning: 'Crowds fill Aranmula village. Parking is difficult — arrive by early morning.',
  },
  {
    name: 'Theyyam Season', state: 'Kerala', month: 12, approx: 'Dec–Mar',
    places: ['Kannur', 'Kasaragod', 'Kozhikode'],
    desc: 'Ritual dance-worship where performers become the deity. Elaborate costumes, fire, trance. Awe-inspiring North Kerala tradition.',
    warning: 'Held in small village shrines, not tourist venues. Check local schedules — many are midnight performances.',
  },
  {
    name: 'Vishu', state: 'Kerala', month: 4, approx: 'Apr 14',
    places: ['Thiruvananthapuram', 'Kochi', 'Thrissur', 'Kozhikode'],
    desc: 'Malayalam New Year. Vishukkani (auspicious sight) at dawn, Vishukkaineettam (gift money to elders and children).',
    warning: 'Moderate. Many temples hold special morning poojas.',
  },
  {
    name: 'Chettikulangara Bharani', state: 'Kerala', month: 2, approx: 'Feb/Mar',
    places: ['Kayamkulam', 'Alappuzha'],
    desc: 'Grand temple festival with massive Kettukazhcha — giant decorated effigies of bulls and chariots carried in procession.',
    warning: 'Very crowded in the small town. Traffic jams on approach roads.',
  },
  {
    name: 'Sabarimala Pilgrimage Season', state: 'Kerala', month: 11, approx: 'Nov–Jan (Mandala & Makaravilakku)',
    places: ['Pathanamthitta', 'Pamba'],
    desc: 'Millions of Ayyappa devotees trek to the hill shrine. Pilgrims observe 41-day vratham (vow) before.',
    warning: 'Extremely crowded Nov–Jan. Non-Hindu visitors not permitted to enter the shrine. Women of menstruating age historically restricted (rules vary — check current status).',
  },
  {
    name: 'Pulikali', state: 'Kerala', month: 9, approx: 'Sep (4th day of Onam)',
    places: ['Thrissur'],
    desc: 'Tiger dance performed by men painted as tigers, dancing to drums through Thrissur streets.',
    warning: 'Crowded but manageable. Best viewed from Swaraj Round.',
  },
];

// Get festivals happening in a given month (1-12)
function festivalsInMonth(month) {
  return festivals.filter(f => f.month === month);
}

// Get festivals for a state
function festivalsInState(state) {
  return festivals.filter(f => f.state === state);
}

// Get festivals that mention a specific place
function festivalsAtPlace(placeName) {
  if (!placeName) return [];
  const p = placeName.toLowerCase();
  return festivals.filter(f =>
    f.places.some(pl => pl.toLowerCase().includes(p) || p.includes(pl.toLowerCase()))
  );
}

// Warn about festivals near a place right now (or in given month)
function currentFestivalWarning(placeName, month) {
  const list = festivalsAtPlace(placeName).filter(f => !month || f.month === month);
  if (!list.length) return null;
  return list.map(f => f.name + ' (' + f.approx + ')').join(', ');
}

window.festivals = festivals;
window.festivalsInMonth = festivalsInMonth;
window.festivalsInState = festivalsInState;
window.festivalsAtPlace = festivalsAtPlace;
window.currentFestivalWarning = currentFestivalWarning;
