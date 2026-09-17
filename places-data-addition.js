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
    { place: "Mukkombu (Upper Anicut)", district: "Tiruchirappalli", state: "Tamil Nadu", category: "nature", lat: 10.9333, lng: 78.6167, best: "Nov-Feb", text: "Riverside park at the point where the Kaveri splits into the Kollidam." },
    { place: "Puliyancholai Falls", district: "Tiruchirappalli", state: "Tamil Nadu", category: "nature", lat: 10.9333, lng: 78.6333, best: "Jun-Sep", text: "Small seasonal falls and picnic spot in the hills near Trichy." },

    // ═══════════════ KERALA — TEMPLES ═══════════════
    { place: "Kodungallur Bhagavathy Temple", district: "Thrissur", state: "Kerala", category: "temple", lat: 10.2333, lng: 76.1833, best: "Nov-Feb", text: "Ancient Devi temple known for its energetic Bharani festival." },
    { place: "Sree Poornathrayeesa Temple", district: "Ernakulam", state: "Kerala", category: "temple", lat: 9.9436, lng: 76.3475, best: "Nov-Feb", text: "Krishna temple in Tripunithura famous for its elephant-led Vrischikolsavam festival." },
    { place: "Thiruvalla Sri Vallabha Temple", district: "Pathanamthitta", state: "Kerala", category: "temple", lat: 9.3833, lng: 76.5667, best: "Nov-Feb", text: "One of Kerala's oldest Vishnu temples, mentioned in ancient Tamil literature." },
    { place: "Ettumanoor Mahadeva Temple", district: "Kottayam", state: "Kerala", category: "temple", lat: 9.6833, lng: 76.5500, best: "Nov-Feb", text: "Shiva temple renowned for its mural paintings and annual Ettumanoor Arattu." },
    { place: "Kottiyoor Temple", district: "Kannur", state: "Kerala", category: "temple", lat: 11.8667, lng: 75.9333, best: "Apr-Jun", text: "Forest shrine active only during an annual festival, reached by trekking through a river." },
    { place: "Ananthapura Lake Temple", district: "Kasaragod", state: "Kerala", category: "temple", lat: 12.5500, lng: 74.9667, best: "Oct-Mar", text: "Only lake temple in Kerala — a cave shrine in the middle of a pond, home to a vegetarian crocodile." },
    { place: "Mannarasala Sree Nagaraja Temple", district: "Alappuzha", state: "Kerala", category: "temple", lat: 9.3167, lng: 76.4500, best: "Oct-Mar", text: "Ancient serpent-worship temple in a grove of 30,000+ snake idols." },
    { place: "Chottanikkara Bhagavathy Temple", district: "Ernakulam", state: "Kerala", category: "temple", lat: 9.9333, lng: 76.4167, best: "Nov-Feb", text: "Popular Devi temple known for its healing rituals." },
    { place: "Ambalappuzha Sree Krishna Temple", district: "Alappuzha", state: "Kerala", category: "temple", lat: 9.3833, lng: 76.3500, best: "Nov-Feb", text: "Temple famous for its ceremonial 'palpayasam' milk pudding offering." },
    { place: "Kaviyoor Rock Cut Temple", district: "Pathanamthitta", state: "Kerala", category: "temple", lat: 9.3000, lng: 76.7000, best: "Oct-Mar", text: "8th-century rock-cut cave temple — one of the oldest in Kerala." },
    { place: "Parthasarathy Temple, Aranmula", district: "Pathanamthitta", state: "Kerala", category: "temple", lat: 9.3167, lng: 76.6833, best: "Nov-Feb", text: "Krishna temple at Aranmula, tied to Kerala's grandest boat race." },

    // ═══════════════ KERALA — HILLS ═══════════════
    { place: "Chembra Peak", district: "Wayanad", state: "Kerala", category: "hill", lat: 11.5000, lng: 76.1000, best: "Sep-Mar", text: "Wayanad's highest peak, famous for its heart-shaped lake on the trekking route." },
    { place: "Ramakkalmedu", district: "Idukki", state: "Kerala", category: "hill", lat: 9.7000, lng: 77.0333, best: "Sep-May", text: "Windswept viewpoint lined with wind turbines, on the border with Tamil Nadu." },
    { place: "Gavi", district: "Pathanamthitta", state: "Kerala", category: "nature", lat: 9.3167, lng: 77.1667, best: "Sep-Apr", text: "Remote eco-tourism forest reserve near Periyar, reachable only with prior permits." },
    { place: "Anamudi Peak", district: "Idukki", state: "Kerala", category: "adventure", lat: 10.1667, lng: 77.0667, best: "Sep-Apr", text: "Highest peak in South India — a permitted trek through Eravikulam National Park." },
    { place: "Meesapulimala", district: "Idukki", state: "Kerala", category: "adventure", lat: 10.1500, lng: 77.1333, best: "Sep-Mar", text: "Second-highest peak in South India, a popular overnight trekking route from Munnar." },
    { place: "Banasura Sagar Dam", district: "Wayanad", state: "Kerala", category: "nature", lat: 11.6667, lng: 76.0500, best: "Sep-Mar", text: "Largest earthen dam in India, with boating and island trekking nearby." },
    { place: "Pakshipathalam", district: "Wayanad", state: "Kerala", category: "adventure", lat: 11.8667, lng: 76.0667, best: "Oct-Mar", text: "Ancient bird-watching cave site deep in Wayanad forests, reachable only by guided trek." },
    { place: "Silent Valley Viewpoint (Sairandhri)", district: "Palakkad", state: "Kerala", category: "nature", lat: 11.1000, lng: 76.4333, best: "Dec-Apr", text: "Watchtower view into Silent Valley National Park — one of India's last untouched rainforests." },

    // ═══════════════ KERALA — BEACHES ═══════════════
    { place: "Payyambalam Beach", district: "Kannur", state: "Kerala", category: "beach", lat: 11.8745, lng: 75.3704, best: "Oct-Mar", text: "Long, clean beach with a sculpture park on the edge of Kannur town." },
    { place: "Muzhappilangad Drive-in Beach", district: "Kannur", state: "Kerala", category: "beach", lat: 11.7167, lng: 75.4667, best: "Oct-Mar", text: "India's longest drive-in beach — a 4 km stretch open to vehicles at low tide." },
    { place: "Thirumullavaram Beach", district: "Kollam", state: "Kerala", category: "beach", lat: 8.9167, lng: 76.5833, best: "Oct-Mar", text: "Quiet rocky-cove beach near Kollam town, popular with locals at sunset." },
    { place: "Kozhikode Beach", district: "Kozhikode", state: "Kerala", category: "beach", lat: 11.2497, lng: 75.7804, best: "Oct-Mar", text: "City beach with a pier and lighthouse — a lively evening spot in Kozhikode." },
    { place: "Somatheeram Beach", district: "Thiruvananthapuram", state: "Kerala", category: "beach", lat: 8.4167, lng: 76.9500, best: "Sep-Mar", text: "Quiet beach south of Kovalam, home to a famous ayurvedic resort." },
    { place: "Chowara Beach", district: "Thiruvananthapuram", state: "Kerala", category: "beach", lat: 8.3833, lng: 76.9833, best: "Sep-Mar", text: "Peaceful fishing-village beach between Kovalam and Kanyakumari." },
    { place: "Alappuzha Beach", district: "Alappuzha", state: "Kerala", category: "beach", lat: 9.4833, lng: 76.3167, best: "Sep-Mar", text: "Historic beach with a 150-year-old pier extending into the sea." },

    // ═══════════════ KERALA — WATERFALLS ═══════════════
    { place: "Chethalayam Falls", district: "Wayanad", state: "Kerala", category: "waterfall", lat: 11.6167, lng: 76.0667, best: "Jun-Nov", text: "Forest waterfall near Kalpetta — a short trek from the main road." },
    { place: "Kanthanpara Falls", district: "Wayanad", state: "Kerala", category: "waterfall", lat: 11.5833, lng: 76.1000, best: "Jun-Nov", text: "Family-friendly falls with a shallow pool, popular for a quick dip." },
    { place: "Cheeyappara & Valara Falls", district: "Idukki", state: "Kerala", category: "waterfall", lat: 10.0500, lng: 76.8833, best: "Jun-Nov", text: "Twin roadside waterfalls on the Munnar highway — an easy photo stop." },
    { place: "Aruvikuzhy Falls", district: "Kottayam", state: "Kerala", category: "waterfall", lat: 9.6167, lng: 76.7833, best: "Jun-Nov", text: "Small waterfall near Kottayam town, popular with local families." },
    { place: "Adyanpara Falls", district: "Malappuram", state: "Kerala", category: "waterfall", lat: 11.2000, lng: 76.3500, best: "Jun-Nov", text: "Small cascade in a rubber and teak plantation near Nilambur." },
    { place: "Aruvi Waterfalls, Thiruvananthapuram", district: "Thiruvananthapuram", state: "Kerala", category: "waterfall", lat: 8.6333, lng: 77.1333, best: "Jun-Dec", text: "Trek-only waterfall in the Neyyar forest — reached by a 3 km forest walk." },
    { place: "Marmala Waterfalls", district: "Pathanamthitta", state: "Kerala", category: "waterfall", lat: 9.5833, lng: 76.8500, best: "Jun-Dec", text: "Hidden waterfall near Erattupetta, reached by a short rocky trek." },

    // ═══════════════ KERALA — HERITAGE ═══════════════
    { place: "St. Angelo Fort", district: "Kannur", state: "Kerala", category: "heritage", lat: 11.8760, lng: 75.3568, best: "Oct-Mar", text: "16th-century Portuguese sea fort overlooking Kannur's harbour." },
    { place: "Thalassery Fort", district: "Kannur", state: "Kerala", category: "heritage", lat: 11.7500, lng: 75.4833, best: "Oct-Mar", text: "British-era fort in a town famous as the birthplace of Kerala's circus tradition." },
    { place: "Krishnapuram Palace", district: "Alappuzha", state: "Kerala", category: "heritage", lat: 9.2833, lng: 76.4833, best: "Oct-Mar", text: "Travancore-era palace museum housing the large 'Gajendra Moksham' mural." },
    { place: "Kuthiramalika Palace Museum", district: "Thiruvananthapuram", state: "Kerala", category: "museum", lat: 8.4833, lng: 76.9450, best: "Oct-Mar", text: "19th-century palace named for its 122 carved wooden horses, built by a Travancore king." },
    { place: "Dutch Palace (Mattancherry)", district: "Ernakulam", state: "Kerala", category: "heritage", lat: 9.9580, lng: 76.2593, best: "Oct-Mar", text: "16th-century Dutch Palace with Kerala mural paintings depicting Hindu epics." },
    { place: "Vasco da Gama Square", district: "Ernakulam", state: "Kerala", category: "heritage", lat: 9.9667, lng: 76.2417, best: "Oct-Mar", text: "Historic seafront square in Fort Kochi, home to the iconic Chinese fishing nets." },
    { place: "Pierce Leslie Bungalow", district: "Ernakulam", state: "Kerala", category: "heritage", lat: 9.9652, lng: 76.2408, best: "Oct-Mar", text: "Restored colonial-era bungalow in Fort Kochi, fine example of Indo-European architecture." },

    // ═══════════════ KERALA — NATURE ═══════════════
    { place: "Vembanad Lake", district: "Kottayam", state: "Kerala", category: "nature", lat: 9.6167, lng: 76.4333, best: "Sep-Mar", text: "Kerala's longest lake — the heart of the backwater houseboat network." },
    { place: "Bolgatty Island", district: "Ernakulam", state: "Kerala", category: "nature", lat: 10.0167, lng: 76.2667, best: "Oct-Mar", text: "Small island in Kochi harbour with a Dutch-era palace and gardens." },
    { place: "Kadalundi Bird Sanctuary", district: "Kozhikode", state: "Kerala", category: "wildlife", lat: 11.1333, lng: 75.8167, best: "Nov-Feb", text: "Estuarine sanctuary where migratory shorebirds gather among mangrove islands." },
    { place: "Thattekad Bird Sanctuary", district: "Ernakulam", state: "Kerala", category: "wildlife", lat: 10.1167, lng: 76.7167, best: "Nov-Feb", text: "Kerala's first bird sanctuary — renowned among birdwatchers for its density of species." },
    { place: "Neyyar Wildlife Sanctuary", district: "Thiruvananthapuram", state: "Kerala", category: "wildlife", lat: 8.5667, lng: 77.1167, best: "Dec-Apr", text: "Forest sanctuary around Neyyar Dam with a lion safari park and crocodile farm." },
    { place: "Aralam Wildlife Sanctuary", district: "Kannur", state: "Kerala", category: "wildlife", lat: 11.8500, lng: 75.9500, best: "Dec-Apr", text: "Remote northern Kerala sanctuary bordering Karnataka's Western Ghats forests." },
    { place: "Peppara Wildlife Sanctuary", district: "Thiruvananthapuram", state: "Kerala", category: "wildlife", lat: 8.7167, lng: 77.1667, best: "Dec-Apr", text: "Forest and reservoir sanctuary in the Western Ghats, near Ponmudi." },
    { place: "Idukki Wildlife Sanctuary", district: "Idukki", state: "Kerala", category: "wildlife", lat: 9.8333, lng: 76.9667, best: "Dec-Apr", text: "Sanctuary around the Idukki Arch Dam — one of Asia's tallest arch dams." },
    { place: "Peechi-Vazhani Wildlife Sanctuary", district: "Thrissur", state: "Kerala", category: "wildlife", lat: 10.5333, lng: 76.3833, best: "Dec-Apr", text: "Sanctuary around Peechi Dam, a favourite with Thrissur day-trippers." },

    // ═══════════════ KERALA — ADVENTURE ═══════════════
    { place: "Athirappilly Falls (Bahubali Falls)", district: "Thrissur", state: "Kerala", category: "waterfall", lat: 10.2851, lng: 76.5695, best: "Jun-Jan", text: "Kerala's largest waterfall — famous as the 'Niagara of India' and backdrop for many films." },
    { place: "Vazhachal Falls", district: "Thrissur", state: "Kerala", category: "waterfall", lat: 10.3167, lng: 76.5833, best: "Jun-Jan", text: "Wide cascading falls a short drive past Athirappilly." },
    { place: "Kolukkumalai Tea Estate", district: "Idukki", state: "Kerala", category: "adventure", lat: 10.1512, lng: 77.2233, best: "Nov-Feb", text: "One of the world's highest tea plantations — famous for its jeep-track sunrise trek." },
    { place: "Top Station", district: "Idukki", state: "Kerala", category: "adventure", lat: 10.1167, lng: 77.2000, best: "Sep-May", text: "Highest viewpoint near Munnar, on the old Kundala Valley Railway route." },
    { place: "Vagamon Paragliding Point", district: "Idukki", state: "Kerala", category: "adventure", lat: 9.6833, lng: 76.9333, best: "Sep-May", text: "Meadow-top launch site for tandem paragliding over the Vagamon hills." },
    { place: "Parambikulam Tiger Reserve", district: "Palakkad", state: "Kerala", category: "wildlife", lat: 10.4167, lng: 76.8167, best: "Dec-Apr", text: "Reserve known for its ancient trees and eco-tourism treks." },
    { place: "Nelliyampathy Hills", district: "Palakkad", state: "Kerala", category: "hill", lat: 10.5333, lng: 76.6833, best: "Sep-Mar", text: "Remote tea and cardamom hills with a scenic ghat road of 10 hairpin bends." },
    { place: "Athirappilly Vazhachal Trail", district: "Thrissur", state: "Kerala", category: "adventure", lat: 10.3000, lng: 76.5750, best: "Jun-Jan", text: "Short forest trail connecting the two great waterfalls — closed during peak monsoon." },
    { place: "Periyar Tiger Trail", district: "Idukki", state: "Kerala", category: "adventure", lat: 9.4667, lng: 77.1667, best: "Oct-Apr", text: "Guided overnight trek inside Periyar Tiger Reserve — advance booking required." },
  ];

  // Attach IDs and push to curatedPlaces
  let added = 0;
  additions.forEach(a => {
    // Skip if place with same name already exists (safety)
    if (curatedPlaces.some(p => p.place === a.place)) return;
    curatedPlaces.push(Object.assign({ id: nextId() }, a));
    added++;
  });

  console.log('places-data-addition.js loaded: ' + added + ' new places. Total: ' + curatedPlaces.length + '.');
}

window.curatedPlaces = (typeof curatedPlaces !== 'undefined') ? curatedPlaces : window.curatedPlaces;
