// Namma Tour — places-data-addition.js
// Additional real Tamil Nadu & Kerala tourist places, appended to the
// curatedPlaces array already defined by places-data.js.
//
// This file MUST load AFTER places-data.js in index.html.
//
// Only real, verifiable places with coordinates I'm confident about.
// No fake entries.

if (typeof curatedPlaces === 'undefined') {
  console.warn('places-data-addition.js: curatedPlaces not found. Make sure places-data.js loads first.');
} else {
  // Determine starting ID by finding the highest existing pNNN
  let maxNum = 0;
  curatedPlaces.forEach(p => {
    const m = /^p(\d+)$/.exec(p.id || '');
    if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
  });
  const nextId = () => 'p' + String(++maxNum).padStart(3, '0');

  const additions = [
    // ═══════════════ TAMIL NADU — TEMPLES ═══════════════
    { place: "Nellaiappar Temple", district: "Tirunelveli", state: "Tamil Nadu", category: "temple", lat: 8.7139, lng: 77.7567, best: "Oct-Feb", text: "Ancient Shiva temple famous for its musical pillars carved from single stones." },
    { place: "Kasi Viswanathar Temple", district: "Tenkasi", state: "Tamil Nadu", category: "temple", lat: 8.9596, lng: 77.3152, best: "Oct-Feb", text: "Large Shiva temple giving Tenkasi its name — the 'Kasi of the South'." },
    { place: "Marundeeswarar Temple", district: "Chennai", state: "Tamil Nadu", category: "temple", lat: 12.9834, lng: 80.2667, best: "Oct-Feb", text: "Coastal Shiva temple in Thiruvanmiyur, said to house healing herbs." },
    { place: "Parthasarathy Temple", district: "Chennai", state: "Tamil Nadu", category: "temple", lat: 13.0592, lng: 80.2792, best: "Oct-Feb", text: "One of Chennai's oldest Vishnu temples, over a thousand years old, in Triplicane." },
    { place: "Marudhamalai Murugan Temple", district: "Coimbatore", state: "Tamil Nadu", category: "temple", lat: 11.0733, lng: 76.8894, best: "Oct-Feb", text: "Hilltop Murugan temple overlooking Coimbatore, reached by road or steps." },
    { place: "Tirutani Murugan Temple", district: "Tiruvallur", state: "Tamil Nadu", category: "temple", lat: 13.1846, lng: 79.6104, best: "Oct-Feb", text: "Hilltop Murugan temple, one of his six sacred abodes, on the Chennai-Tirupati road." },
    { place: "Kundrakudi Murugan Temple", district: "Sivaganga", state: "Tamil Nadu", category: "temple", lat: 10.0489, lng: 78.6142, best: "Oct-Feb", text: "Hilltop Murugan shrine known for its large flagstaff and rock steps." },
    { place: "Sripuram Golden Temple", district: "Vellore", state: "Tamil Nadu", category: "temple", lat: 12.6333, lng: 79.1500, best: "Nov-Feb", text: "Modern Mahalakshmi shrine famous for its gold-plated exterior, set amid landscaped gardens." },
    { place: "Nagaraja Temple", district: "Nagercoil", state: "Tamil Nadu", category: "temple", lat: 8.1833, lng: 77.4333, best: "Oct-Feb", text: "Unique temple giving Nagercoil its name, dedicated to the serpent deity." },
    { place: "Tiruchendur Murugan Temple", district: "Thoothukudi", state: "Tamil Nadu", category: "temple", lat: 8.4967, lng: 78.1200, best: "Oct-Feb", text: "One of Murugan's six abodes, uniquely built facing the sea." },
    { place: "Srivilliputhur Andal Temple", district: "Virudhunagar", state: "Tamil Nadu", category: "temple", lat: 9.5167, lng: 77.6333, best: "Oct-Feb", text: "Temple to the poet-saint Andal — its tower is on Tamil Nadu's state emblem." },
    { place: "Namakkal Anjaneyar Temple", district: "Namakkal", state: "Tamil Nadu", category: "temple", lat: 11.2231, lng: 78.1653, best: "Oct-Feb", text: "Famed for a towering monolithic Hanuman statue carved into a rock." },
    { place: "Adi Kumbeswarar Temple", district: "Kumbakonam", state: "Tamil Nadu", category: "temple", lat: 10.9601, lng: 79.3788, best: "Oct-Feb", text: "Ancient Shiva temple at the heart of Kumbakonam, centre of the Mahamaham festival." },
    { place: "Sarangapani Temple", district: "Kumbakonam", state: "Tamil Nadu", category: "temple", lat: 10.9615, lng: 79.3805, best: "Oct-Feb", text: "Chariot-shaped Vishnu temple with an imposing 12-tier gopuram." },
    { place: "Thiruvaiyaru Panchanatheeswarar Temple", district: "Thanjavur", state: "Tamil Nadu", category: "temple", lat: 10.8829, lng: 79.1047, best: "Oct-Feb", text: "Riverside Shiva temple famed for its annual Thyagaraja music festival." },
    { place: "Pillaiyarpatti Karpaga Vinayagar Temple", district: "Sivaganga", state: "Tamil Nadu", category: "temple", lat: 10.1333, lng: 78.6667, best: "Oct-Feb", text: "Rock-cut Ganesha temple — one of the oldest cave temples in the Chettinad region." },
    { place: "Koodal Azhagar Temple", district: "Madurai", state: "Tamil Nadu", category: "temple", lat: 9.9167, lng: 78.1167, best: "Oct-Feb", text: "Ancient Vishnu temple in Madurai, mentioned in early Sangam-era Tamil literature." },
    { place: "Thiruvattar Adikesava Perumal Temple", district: "Kanyakumari", state: "Tamil Nadu", category: "temple", lat: 8.3167, lng: 77.2667, best: "Oct-Feb", text: "One of the oldest Vishnu temples in South India, with a rare reclining deity." },
    { place: "Perur Pateeswarar Temple", district: "Coimbatore", state: "Tamil Nadu", category: "temple", lat: 10.9925, lng: 76.9183, best: "Oct-Feb", text: "Riverside Shiva temple known for its elaborate stone and wood carvings." },
    { place: "Bhavani Sangameswarar Temple", district: "Erode", state: "Tamil Nadu", category: "temple", lat: 11.4456, lng: 77.6833, best: "Oct-Feb", text: "Temple at the sacred confluence of the Kaveri and Bhavani rivers." },
    { place: "Kalahasti Temple (Srikalahasti)", district: "Chittoor border", state: "Andhra Pradesh", category: "temple", lat: 13.7494, lng: 79.6986, best: "Oct-Feb", text: "Major Shiva temple near the TN border, one of the Pancha Bhoota Sthalams (wind)." },
    { place: "Nagore Dargah", district: "Nagapattinam", state: "Tamil Nadu", category: "temple", lat: 10.8167, lng: 79.8500, best: "Nov-Feb", text: "Revered Sufi shrine drawing pilgrims of all faiths, with towering minarets." },
    { place: "Poondi Madha Basilica", district: "Thanjavur", state: "Tamil Nadu", category: "temple", lat: 10.7667, lng: 79.0000, best: "Sep-Oct", text: "Major Catholic pilgrimage church, known for its annual September festival." },
    { place: "San Thome Basilica", district: "Chennai", state: "Tamil Nadu", category: "heritage", lat: 13.0336, lng: 80.2775, best: "Nov-Feb", text: "Neo-Gothic basilica built over the tomb of the apostle St. Thomas." },

    // ═══════════════ TAMIL NADU — HERITAGE ═══════════════
    { place: "Vattakottai Fort", district: "Kanyakumari", state: "Tamil Nadu", category: "heritage", lat: 8.1167, lng: 77.4833, best: "Nov-Feb", text: "Coastal granite fort built by the Travancore kingdom, with sweeping sea views." },
    { place: "Thirumalai Nayakkar Mahal", district: "Madurai", state: "Tamil Nadu", category: "heritage", lat: 9.9195, lng: 78.1225, best: "Oct-Mar", text: "17th-century Indo-Saracenic palace known for its massive courtyard and pillars." },
    { place: "Sankagiri Fort", district: "Salem", state: "Tamil Nadu", category: "heritage", lat: 11.4747, lng: 77.8703, best: "Nov-Feb", text: "Hilltop fort with a history under Chola, Vijayanagara and British rule." },
    { place: "Namakkal Fort", district: "Namakkal", state: "Tamil Nadu", category: "heritage", lat: 11.2189, lng: 78.1674, best: "Nov-Feb", text: "Ancient hill fort with rock-cut chambers, later used by Vijayanagara and the British." },
    { place: "Dindigul Fort", district: "Dindigul", state: "Tamil Nadu", category: "heritage", lat: 10.3622, lng: 77.9761, best: "Nov-Feb", text: "Rock hill fort built by Vijayanagara, later held by Hyder Ali and Tipu Sultan." },
    { place: "Vellore Government Museum", district: "Vellore", state: "Tamil Nadu", category: "museum", lat: 12.9186, lng: 79.1325, best: "Nov-Feb", text: "Small museum inside Vellore Fort displaying regional artefacts and history." },
    { place: "Jalakandeswarar Temple, Vellore Fort", district: "Vellore", state: "Tamil Nadu", category: "temple", lat: 12.9186, lng: 79.1325, best: "Oct-Feb", text: "Vijayanagara-era Shiva temple built inside the walls of Vellore Fort." },
    { place: "Kallanai (Grand Anicut)", district: "Tiruchirappalli", state: "Tamil Nadu", category: "heritage", lat: 10.8197, lng: 78.8244, best: "Nov-Feb", text: "One of the world's oldest water-diversion dams still in use, built by the Cholas nearly 2000 years ago." },
    { place: "Vivekananda Rock Memorial", district: "Kanyakumari", state: "Tamil Nadu", category: "heritage", lat: 8.0778, lng: 77.5511, best: "Nov-Feb", text: "Memorial on a rock islet reached by ferry, where Swami Vivekananda meditated." },
    { place: "Thiruvalluvar Statue", district: "Kanyakumari", state: "Tamil Nadu", category: "heritage", lat: 8.0764, lng: 77.5514, best: "Nov-Feb", text: "133-foot statue of the Tamil poet-philosopher, beside the Vivekananda Rock." },
    { place: "Vellore Fort", district: "Vellore", state: "Tamil Nadu", category: "heritage", lat: 12.9186, lng: 79.1325, best: "Nov-Feb", text: "16th-century fort with a moat — site of the 1806 Vellore mutiny." },
    { place: "Vettuvan Koil", district: "Kalugumalai", state: "Tamil Nadu", category: "heritage", lat: 9.1667, lng: 77.8833, best: "Oct-Feb", text: "Unfinished 8th-century monolithic rock-cut temple, carved top-down from a single boulder." },
    { place: "Kudumiyanmalai Temple", district: "Pudukkottai", state: "Tamil Nadu", category: "temple", lat: 10.3833, lng: 78.7833, best: "Oct-Feb", text: "Rock-cut Shiva temple with a rare ancient inscription of musical notation." },
    { place: "Sittanavasal Cave Temple", district: "Pudukkottai", state: "Tamil Nadu", category: "heritage", lat: 10.4486, lng: 78.7292, best: "Nov-Feb", text: "2nd-century Jain cave shrine with rare, faded fresco paintings on its ceiling." },
    { place: "Tirumalai Jain Temple Caves", district: "Tiruvannamalai", state: "Tamil Nadu", category: "heritage", lat: 12.5000, lng: 79.1667, best: "Nov-Feb", text: "12th-century rock-cut Jain temple complex with a reclining Tirthankara sculpture." },
    { place: "Fort Dansborg (Tranquebar Fort)", district: "Mayiladuthurai", state: "Tamil Nadu", category: "heritage", lat: 11.0297, lng: 79.8500, best: "Nov-Feb", text: "17th-century Danish colonial fort right on the Tharangambadi shoreline." },
    { place: "Fort Museum, Fort St. George", district: "Chennai", state: "Tamil Nadu", category: "museum", lat: 13.0797, lng: 80.2870, best: "Nov-Feb", text: "Museum inside the fort walls housing colonial-era artefacts, weapons and paintings." },
    { place: "Saraswathi Mahal Library", district: "Thanjavur", state: "Tamil Nadu", category: "museum", lat: 10.8052, lng: 79.1354, best: "Oct-Mar", text: "Historic royal library housing rare palm-leaf manuscripts and Chola-era paintings." },
    { place: "Mel Sithamur Jain Math", district: "Perambalur", state: "Tamil Nadu", category: "heritage", lat: 11.3667, lng: 78.8333, best: "Nov-Feb", text: "Historic Jain monastery — one of the oldest surviving Jain centres in Tamil Nadu." },
    { place: "Thirumayam Fort", district: "Pudukkottai", state: "Tamil Nadu", category: "heritage", lat: 10.2472, lng: 78.7414, best: "Nov-Feb", text: "18th-century fort built by a local chieftain, with cannons and a temple inside." },
    { place: "Valluvar Kottam", district: "Chennai", state: "Tamil Nadu", category: "heritage", lat: 13.0538, lng: 80.2425, best: "Nov-Feb", text: "Memorial to the Tamil poet Thiruvalluvar, shaped like a temple chariot." },
    { place: "Isha Yoga Center (Adiyogi Statue)", district: "Coimbatore", state: "Tamil Nadu", category: "heritage", lat: 10.9772, lng: 76.7386, best: "Oct-Mar", text: "Spiritual centre at the Velliangiri foothills, home to a 112-foot Adiyogi Shiva statue." },

    // ═══════════════ TAMIL NADU — HILLS ═══════════════
    { place: "Meghamalai", district: "Theni", state: "Tamil Nadu", category: "hill", lat: 9.7333, lng: 77.3333, best: "Sep-Mar", text: "Remote 'cloud mountains' cardamom hills bordering Kerala, known for tea estates." },
    { place: "Sirumalai", district: "Dindigul", state: "Tamil Nadu", category: "hill", lat: 10.2667, lng: 77.9833, best: "Oct-Mar", text: "Small hill station near Dindigul known for its orchards and cool climate." },
    { place: "Manjolai", district: "Tirunelveli", state: "Tamil Nadu", category: "hill", lat: 8.6167, lng: 77.2667, best: "Sep-Feb", text: "High tea-estate plateau in the southern Western Ghats bordering Kerala." },
    { place: "Javadi Hills", district: "Tiruvannamalai", state: "Tamil Nadu", category: "hill", lat: 12.5167, lng: 78.8333, best: "Oct-Mar", text: "Lesser-visited hill range dotted with small tribal settlements and viewpoints." },
    { place: "Kalrayan Hills", district: "Salem", state: "Tamil Nadu", category: "hill", lat: 11.7833, lng: 78.5667, best: "Oct-Mar", text: "Remote hill range known for its waterfalls and terrace farming." },
    { place: "Vattakanal", district: "Dindigul", state: "Tamil Nadu", category: "hill", lat: 10.2167, lng: 77.4833, best: "Sep-May", text: "Small backpacker village near Kodaikanal known for its cliffside views." },
    { place: "Poombarai", district: "Dindigul", state: "Tamil Nadu", category: "hill", lat: 10.3167, lng: 77.4667, best: "Sep-May", text: "Terraced-farm village on the Kodaikanal plateau with sweeping valley views." },
    { place: "Anaikatti", district: "Coimbatore", state: "Tamil Nadu", category: "hill", lat: 11.0500, lng: 76.7500, best: "Oct-Mar", text: "Foothill town on the Kerala border, gateway to the Siruvani hills." },
    { place: "Doddabetta Peak", district: "The Nilgiris", state: "Tamil Nadu", category: "hill", lat: 11.4064, lng: 76.7397, best: "Sep-May", text: "Highest peak in the Nilgiris, with a telescope house offering panoramic views." },

    // ═══════════════ TAMIL NADU — BEACHES ═══════════════
    { place: "Silver Beach", district: "Cuddalore", state: "Tamil Nadu", category: "beach", lat: 11.7167, lng: 79.7833, best: "Nov-Feb", text: "One of India's widest beaches, a quiet stretch near Cuddalore town." },
    { place: "Tranquebar (Tharangambadi) Beach", district: "Mayiladuthurai", state: "Tamil Nadu", category: "beach", lat: 11.0297, lng: 79.8500, best: "Nov-Feb", text: "Former Danish colonial beach town with a fort right on the shore." },
    { place: "Manapad Beach", district: "Thoothukudi", state: "Tamil Nadu", category: "beach", lat: 8.4167, lng: 78.0333, best: "Nov-Feb", text: "Historic fishing village beach with a centuries-old church on a rocky point." },
    { place: "Poompuhar Beach", district: "Mayiladuthurai", state: "Tamil Nadu", category: "beach", lat: 11.1333, lng: 79.8500, best: "Nov-Feb", text: "Historic beach town, believed to be the site of an ancient submerged Chola port." },
    { place: "Marakkanam Beach", district: "Villupuram", state: "Tamil Nadu", category: "beach", lat: 12.2000, lng: 79.9333, best: "Nov-Feb", text: "Quiet beach town known for its salt pans and old Dutch-era pond." },
    { place: "Colachel Beach", district: "Kanyakumari", state: "Tamil Nadu", category: "beach", lat: 8.1667, lng: 77.2667, best: "Nov-Feb", text: "Historic fishing-town beach — site of a notable 1741 naval battle." },
    { place: "Sanguthurai Beach", district: "Kanyakumari", state: "Tamil Nadu", category: "beach", lat: 8.0667, lng: 77.5667, best: "Nov-Feb", text: "Small, calmer beach near Kanyakumari town, popular with local families." },
    { place: "Muttom Beach", district: "Kanyakumari", state: "Tamil Nadu", category: "beach", lat: 8.1333, lng: 77.3167, best: "Nov-Feb", text: "Rocky beach with a lighthouse — quieter than nearby Kanyakumari town." },

    // ═══════════════ TAMIL NADU — WATERFALLS ═══════════════
    { place: "Kumbakkarai Falls", district: "Dindigul", state: "Tamil Nadu", category: "waterfall", lat: 10.1167, lng: 77.5833, best: "Jun-Sep", text: "Multi-tiered falls near Kodaikanal, popular for its natural rock pools." },
    { place: "Monkey Falls (Aliyar)", district: "Coimbatore", state: "Tamil Nadu", category: "waterfall", lat: 10.4333, lng: 76.9833, best: "Jun-Sep", text: "Roadside falls on the way to Valparai, named for the resident macaques." },
    { place: "Suruli Falls", district: "Theni", state: "Tamil Nadu", category: "waterfall", lat: 9.9667, lng: 77.3167, best: "Jun-Sep", text: "Falls beside an ancient cave temple, believed to have medicinal properties." },
    { place: "Manimuthar Falls", district: "Tirunelveli", state: "Tamil Nadu", category: "waterfall", lat: 8.6833, lng: 77.3167, best: "Jun-Dec", text: "Scenic falls near Manimuthar dam in the southern Western Ghats." },
    { place: "Agaya Gangai Falls", district: "Namakkal", state: "Tamil Nadu", category: "waterfall", lat: 11.2497, lng: 78.3288, best: "Jul-Jan", text: "Kolli Hills' main waterfall, reached via a steep forest staircase." },
    { place: "Vattaparai Falls", district: "Coimbatore", state: "Tamil Nadu", category: "waterfall", lat: 10.4667, lng: 77.0000, best: "Jun-Sep", text: "Rocky cascade near Pollachi, popular with local day-trippers." },
    { place: "Agasthiyar Falls (Papanasam)", district: "Tirunelveli", state: "Tamil Nadu", category: "waterfall", lat: 8.6167, lng: 77.4000, best: "Jun-Dec", text: "Sacred falls near the Papanasam dam, believed to wash away sins." },
    { place: "Tiger Falls, Courtallam", district: "Tenkasi", state: "Tamil Nadu", category: "waterfall", lat: 8.9300, lng: 77.2750, best: "Jun-Sep", text: "One of the five Courtallam falls, named for the roar of its water." },
    { place: "Old Falls, Courtallam", district: "Tenkasi", state: "Tamil Nadu", category: "waterfall", lat: 8.9200, lng: 77.2700, best: "Jun-Sep", text: "The original and most-visited of the Courtallam falls cluster." },
    { place: "Amirthi Falls", district: "Vellore", state: "Tamil Nadu", category: "waterfall", lat: 12.7333, lng: 78.7667, best: "Jun-Sep", text: "Small forest waterfall beside the Amirthi zoological park near Vellore." },
    { place: "Catherine Falls", district: "The Nilgiris", state: "Tamil Nadu", category: "waterfall", lat: 11.3167, lng: 76.7667, best: "Jun-Sep", text: "Two-tiered waterfall near Coonoor, visible from the Dolphin's Nose viewpoint." },
    { place: "Law's Falls", district: "The Nilgiris", state: "Tamil Nadu", category: "waterfall", lat: 11.3333, lng: 76.8000, best: "Jun-Sep", text: "Roadside falls on the old Coonoor-Mettupalayam ghat road." },
    { place: "Thoovanam Falls", district: "Coimbatore", state: "Tamil Nadu", category: "waterfall", lat: 10.3500, lng: 76.9500, best: "Jun-Sep", text: "Remote falls inside the Indira Gandhi Wildlife Sanctuary near Top Slip." },

    // ═══════════════ TAMIL NADU — WILDLIFE ═══════════════
    { place: "Vallanadu Blackbuck Sanctuary", district: "Thoothukudi", state: "Tamil Nadu", category: "wildlife", lat: 8.7500, lng: 77.8500, best: "Nov-Feb", text: "Scrub-forest sanctuary protecting one of Tamil Nadu's blackbuck populations." },
    { place: "Koonthankulam Bird Sanctuary", district: "Tirunelveli", state: "Tamil Nadu", category: "wildlife", lat: 8.4833, lng: 77.7667, best: "Nov-Feb", text: "Village tank sanctuary famous for nesting painted storks and pelicans." },
    { place: "Karikili Bird Sanctuary", district: "Kanchipuram", state: "Tamil Nadu", category: "wildlife", lat: 12.6333, lng: 79.9333, best: "Nov-Feb", text: "Small wetland sanctuary near Vedanthangal — good for a quieter birding visit." },
    { place: "Guindy National Park", district: "Chennai", state: "Tamil Nadu", category: "wildlife", lat: 13.0067, lng: 80.2206, best: "Nov-Feb", text: "Rare city-limits national park with blackbuck and spotted deer." },
    { place: "Mukurthi National Park", district: "The Nilgiris", state: "Tamil Nadu", category: "wildlife", lat: 11.3667, lng: 76.5333, best: "Feb-May", text: "High-altitude shola-grassland park protecting the Nilgiri tahr." },
    { place: "Sathyamangalam Tiger Reserve", district: "Erode", state: "Tamil Nadu", category: "wildlife", lat: 11.5000, lng: 77.2500, best: "Dec-Apr", text: "Forested tiger reserve connecting the Western and Eastern Ghats corridors." },
    { place: "Mahendragiri Wildlife Sanctuary", district: "Kanyakumari", state: "Tamil Nadu", category: "wildlife", lat: 8.3000, lng: 77.3000, best: "Dec-Mar", text: "Forested hill sanctuary near Kanyakumari, part of the Western Ghats belt." },
    { place: "Srivilliputhur Grizzled Squirrel Sanctuary", district: "Virudhunagar", state: "Tamil Nadu", category: "wildlife", lat: 9.6167, lng: 77.6333, best: "Dec-Mar", text: "Protected forest for the endangered grizzled giant squirrel." },

    // ═══════════════ TAMIL NADU — NATURE ═══════════════
    { place: "Emerald Lake", district: "The Nilgiris", state: "Tamil Nadu", category: "nature", lat: 11.3667, lng: 76.5667, best: "Sep-May", text: "Secluded reservoir in the upper Nilgiris surrounded by dense shola forest." },
    { place: "Avalanche Lake", district: "The Nilgiris", state: "Tamil Nadu", category: "nature", lat: 11.3000, lng: 76.5500, best: "Sep-May", text: "Remote forest lake near Ooty, named after a historic landslide in the area." },
    { place: "Aliyar Dam", district: "Coimbatore", state: "Tamil Nadu", category: "nature", lat: 10.4667, lng: 76.9667, best: "Nov-Feb", text: "Reservoir and garden park at the foot of the Anamalai hills near Pollachi." },
    { place: "Amaravathi Dam", district: "Tiruppur", state: "Tamil Nadu", category: "nature", lat: 10.4167, lng: 77.2667, best: "Nov-Feb", text: "Reservoir with a crocodile farm on the edge of the Anamalai reserve." },
    { place: "Stanley Reservoir (Mettur Dam)", district: "Salem", state: "Tamil Nadu", category: "nature", lat: 11.7833, lng: 77.8000, best: "Nov-Feb", text: "One of India's largest dams, forming a vast reservoir on the Kaveri river." },
    { place: "Krishnagiri Dam", district: "Krishnagiri", state: "Tamil Nadu", category: "nature", lat: 12.5167, lng: 78.2167, best: "Nov-Feb", text: "Reservoir and garden park popular for weekend picnics near Krishnagiri town." },
    { place: "Sathanur Dam", district: "Tiruvannamalai", state: "Tamil Nadu", category: "nature", lat: 12.2333, lng: 78.9667, best: "Nov-Feb", text: "Dam and crocodile park on the Thenpennai river, with a small amusement park." },
    { place: "Bhavanisagar Dam", district: "Erode", state: "Tamil Nadu", category: "nature", lat: 11.4667, lng: 77.1000, best: "Nov-Feb", text: "Large reservoir at the confluence feeding the Bhavani river." },
    { place: "Guna Caves (Devil's Kitchen)", district: "Dindigul", state: "Tamil Nadu", category: "nature", lat: 10.2333, lng: 77.4667, best: "Sep-May", text: "Mysterious rock-cave formation near Kodaikanal, named after a popular Tamil film." },
    { place: "Pillar Rocks", district: "Dindigul", state: "Tamil Nadu", category: "nature", lat: 10.2167, lng: 77.4667, best: "Sep-May", text: "Three vertical rock formations rising dramatically from the Kodaikanal hillside." },
    { place: "Kodaikanal Lake", district: "Dindigul", state: "Tamil Nadu", category: "nature", lat: 10.2381, lng: 77.4892, best: "Sep-May", text: "Star-shaped artificial lake at the centre of Kodaikanal town, popular for boating." },
    { place: "VOC Park & Zoo", district: "Coimbatore", state: "Tamil Nadu", category: "nature", lat: 11.0000, lng: 76.9667, best: "Nov-Feb", text: "City park and small zoo in central Coimbatore, popular with families." },
    { place: "Kovai Kutralam Falls", district: "Coimbatore", state: "Tamil Nadu", category: "nature", lat: 11.3333, lng: 76.9500, best: "Jun-Sep", text: "Waterfall and forest park near Coimbatore — a popular monsoon getaway." },
    { place: "Siruvani Falls & Dam", district: "Coimbatore", state: "Tamil Nadu", category: "nature", lat: 11.0333, lng: 76.6333, best: "Jun-Sep", text: "Forest dam near the Kerala border, said to have some of the sweetest water in India." },
    { place: "Poondi Reservoir", district: "Tiruvallur", state: "Tamil Nadu", category: "nature", lat: 13.2833, lng: 79.9167, best: "Nov-Feb", text: "Major reservoir supplying Chennai's drinking water, with a scenic dam-top road." },
    { place: "Kodiveri Dam", district: "Erode", state: "Tamil Nadu", category: "nature", lat: 11.2500, lng: 77.1833, best: "Nov-Feb", text: "Small dam and garden on the Bhavani river, popular for a short family outing." },
