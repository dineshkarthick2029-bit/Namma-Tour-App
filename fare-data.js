// Namma Tour — fare-data.js
// Auto-rickshaw fair fare data for Tamil Nadu & Kerala.
// Ranges are based on typical government-regulated per-km rates plus a
// common "tourism surcharge" that drivers legitimately apply in tourist
// areas. Meant as a reference for travelers, NOT a binding price.
//
// TN 2024 rates (approx): ₹40 first 1.8km + ₹18/km after
// KL 2024 rates (approx): ₹36 first 1.5km + ₹15/km after
// Tourist towns often apply ₹100-200 fixed for short hops.

// Common point-to-point routes travelers actually take.
// Each route: from stop -> to stop, distance in km, fair range in ₹,
// with optional note.
const fareRoutes = [
  // ============ MADURAI ============
  { from: 'Madurai Railway Station', to: 'Meenakshi Amman Temple', km: 1.4, min: 60, max: 100,
    note: 'Very short ride. Some drivers quote flat ₹150 to tourists — ₹80 is fair.' },
  { from: 'Madurai Railway Station', to: 'Madurai Airport', km: 12, min: 280, max: 400,
    note: 'Roughly 25–35 min. Prefer app-based cabs for this one.' },
  { from: 'Madurai Junction', to: 'Thirumalai Nayakkar Mahal', km: 1.2, min: 50, max: 90 },
  { from: 'Madurai Periyar Bus Stand', to: 'Meenakshi Temple', km: 1.5, min: 60, max: 100 },
  { from: 'Madurai Junction', to: 'Alagar Kovil', km: 21, min: 450, max: 700,
    note: 'Long ride into hills. Confirm the fare before boarding.' },
  { from: 'Madurai Junction', to: 'Thiruparankundram', km: 8, min: 180, max: 260 },

  // ============ CHENNAI ============
  { from: 'Chennai Central', to: 'Marina Beach', km: 4, min: 100, max: 150 },
  { from: 'Chennai Central', to: 'Kapaleeshwarar Temple (Mylapore)', km: 6, min: 140, max: 200 },
  { from: 'Chennai Airport', to: 'Chennai Central', km: 20, min: 500, max: 700,
    note: 'Consider Chennai Metro instead — faster and cheaper.' },
  { from: 'Chennai Airport', to: 'Marina Beach', km: 20, min: 500, max: 700 },
  { from: 'Chennai Egmore', to: 'Marina Beach', km: 6, min: 130, max: 200 },
  { from: 'Chennai Central', to: 'Elliot\'s Beach', km: 10, min: 220, max: 320 },
  { from: 'Chennai Central', to: 'Fort St. George', km: 2.5, min: 70, max: 110 },

  // ============ COIMBATORE ============
  { from: 'Coimbatore Railway Station', to: 'Coimbatore Airport', km: 11, min: 250, max: 380 },
  { from: 'Coimbatore Gandhipuram', to: 'Marudhamalai Temple', km: 15, min: 350, max: 500,
    note: 'Hill temple. Bus is cheaper but slow.' },
  { from: 'Coimbatore Junction', to: 'Gandhipuram Bus Stand', km: 3, min: 80, max: 130 },
  { from: 'Coimbatore Junction', to: 'Isha Yoga Center', km: 30, min: 700, max: 1100,
    note: 'Book a cab for this — auto drivers often refuse.' },

  // ============ OOTY / NILGIRIS ============
  { from: 'Ooty Bus Stand', to: 'Ooty Botanical Garden', km: 2, min: 70, max: 120 },
  { from: 'Ooty Bus Stand', to: 'Ooty Lake', km: 1.5, min: 60, max: 100 },
  { from: 'Ooty Bus Stand', to: 'Doddabetta Peak', km: 9, min: 220, max: 350 },
  { from: 'Ooty Bus Stand', to: 'Coonoor', km: 18, min: 400, max: 600,
    note: 'Toy train is more scenic and cheaper.' },
  { from: 'Coonoor Railway Station', to: 'Sim\'s Park', km: 1.5, min: 60, max: 100 },
  { from: 'Coonoor', to: 'Dolphin\'s Nose', km: 8, min: 200, max: 320 },

  // ============ KODAIKANAL ============
  { from: 'Kodaikanal Bus Stand', to: 'Kodaikanal Lake', km: 1, min: 50, max: 80 },
  { from: 'Kodaikanal Bus Stand', to: 'Coaker\'s Walk', km: 1.5, min: 60, max: 100 },
  { from: 'Kodaikanal', to: 'Pillar Rocks', km: 7, min: 180, max: 280 },
  { from: 'Kodaikanal', to: 'Berijam Lake', km: 20, min: 500, max: 800,
    note: 'Needs forest permit — auto cannot enter without it.' },

  // ============ RAMESWARAM ============
  { from: 'Rameswaram Railway Station', to: 'Ramanathaswamy Temple', km: 2, min: 70, max: 110 },
  { from: 'Rameswaram', to: 'Dhanushkodi', km: 18, min: 400, max: 650,
    note: 'One-way dirt road. Negotiate a round-trip rate.' },
  { from: 'Rameswaram', to: 'Pamban Bridge View Point', km: 12, min: 300, max: 450 },

  // ============ KANYAKUMARI ============
  { from: 'Kanyakumari Railway Station', to: 'Vivekananda Rock Ferry', km: 1.5, min: 60, max: 100 },
  { from: 'Kanyakumari', to: 'Padmanabhapuram Palace', km: 35, min: 800, max: 1200,
    note: 'Book a cab — auto drivers often refuse this distance.' },
  { from: 'Kanyakumari', to: 'Thirparappu Falls', km: 22, min: 500, max: 750 },

  // ============ TIRUCHIRAPPALLI (TRICHY) ============
  { from: 'Trichy Airport', to: 'Trichy Railway Station', km: 8, min: 200, max: 300 },
  { from: 'Trichy Junction', to: 'Rock Fort Temple', km: 2, min: 70, max: 110 },
  { from: 'Trichy Junction', to: 'Srirangam Temple', km: 8, min: 200, max: 300 },
  { from: 'Trichy Junction', to: 'Jambukeswarar Temple', km: 6, min: 160, max: 240 },

  // ============ THANJAVUR ============
  { from: 'Thanjavur Railway Station', to: 'Brihadeeswarar Temple', km: 2, min: 70, max: 110 },
  { from: 'Thanjavur', to: 'Thanjavur Maratha Palace', km: 1.5, min: 60, max: 100 },
  { from: 'Thanjavur', to: 'Darasuram (Airavatesvara Temple)', km: 4, min: 120, max: 180 },
  { from: 'Thanjavur', to: 'Kumbakonam', km: 40, min: 900, max: 1400,
    note: 'Bus is much cheaper (₹30–50).' },

  // ============ KUMBAKONAM ============
  { from: 'Kumbakonam Railway Station', to: 'Adi Kumbeswarar Temple', km: 1, min: 50, max: 90 },
  { from: 'Kumbakonam', to: 'Sarangapani Temple', km: 1.5, min: 60, max: 100 },
  { from: 'Kumbakonam', to: 'Mahamaham Tank', km: 1.2, min: 50, max: 90 },

  // ============ MAMALLAPURAM / CHENGALPATTU ============
  { from: 'Mahabalipuram Bus Stand', to: 'Shore Temple', km: 1.5, min: 60, max: 100 },
  { from: 'Mahabalipuram', to: 'Pancha Rathas', km: 1.2, min: 50, max: 90 },
  { from: 'Mahabalipuram', to: 'Krishna\'s Butterball', km: 1, min: 50, max: 80 },

  // ============ VELLORE ============
  { from: 'Vellore Katpadi Junction', to: 'Vellore Fort', km: 5, min: 130, max: 200 },
  { from: 'Vellore Katpadi Junction', to: 'Sripuram Golden Temple', km: 8, min: 200, max: 300 },

  // ============ TIRUVANNAMALAI ============
  { from: 'Tiruvannamalai Bus Stand', to: 'Arunachaleswarar Temple', km: 1.5, min: 60, max: 100 },
  { from: 'Tiruvannamalai', to: 'Gingee Fort', km: 60, min: 1400, max: 2000,
    note: 'Very long. Book a cab.' },

  // ============ PALANI ============
  { from: 'Palani Bus Stand', to: 'Palani Murugan Temple Ropeway', km: 2, min: 70, max: 120 },

  // ============ KERALA ============
  // ---- Kochi ----
  { from: 'Kochi Airport', to: 'Fort Kochi', km: 40, min: 900, max: 1300,
    note: 'Kochi Metro + ferry is cheaper. Auto is only for the last leg.' },
  { from: 'Ernakulam Junction', to: 'Fort Kochi', km: 12, min: 300, max: 450 },
  { from: 'Ernakulam Junction', to: 'Mattancherry Palace', km: 11, min: 280, max: 420 },
  { from: 'Fort Kochi', to: 'Chinese Fishing Nets', km: 0.8, min: 40, max: 70,
    note: 'Walking is faster than an auto for this one.' },

  // ---- Munnar ----
  { from: 'Munnar Bus Stand', to: 'Munnar Tea Museum', km: 3, min: 100, max: 160 },
  { from: 'Munnar', to: 'Eravikulam National Park', km: 13, min: 300, max: 450 },
  { from: 'Munnar', to: 'Top Station', km: 32, min: 800, max: 1200,
    note: 'Jeep is more common than auto for this route.' },
  { from: 'Munnar', to: 'Mattupetty Dam', km: 13, min: 300, max: 450 },

  // ---- Alleppey ----
  { from: 'Alleppey (Alappuzha) Railway Station', to: 'Alleppey Boat Jetty', km: 2, min: 70, max: 120 },
  { from: 'Alleppey', to: 'Marari Beach', km: 12, min: 300, max: 450 },

  // ---- Thiruvananthapuram ----
  { from: 'Thiruvananthapuram Central', to: 'Padmanabhaswamy Temple', km: 1.5, min: 60, max: 100 },
  { from: 'Thiruvananthapuram Central', to: 'Kovalam Beach', km: 16, min: 400, max: 600 },
  { from: 'Thiruvananthapuram Airport', to: 'Kovalam Beach', km: 20, min: 500, max: 750 },

  // ---- Varkala ----
  { from: 'Varkala Sivagiri Railway Station', to: 'Varkala Cliff', km: 4, min: 120, max: 200 },

  // ---- Thekkady ----
  { from: 'Thekkady Bus Stand', to: 'Periyar Boat Jetty', km: 1, min: 50, max: 90 },

  // ---- Wayanad ----
  { from: 'Kalpetta Bus Stand', to: 'Banasura Sagar Dam', km: 20, min: 500, max: 750 },
  { from: 'Kalpetta', to: 'Chembra Peak', km: 15, min: 350, max: 550 },
  { from: 'Kalpetta', to: 'Edakkal Caves', km: 12, min: 300, max: 450 },

  // ---- Kozhikode ----
  { from: 'Kozhikode Railway Station', to: 'Kozhikode Beach', km: 1.5, min: 60, max: 100 },
  { from: 'Kozhikode', to: 'Kappad Beach', km: 16, min: 400, max: 600 },

  // ---- Thrissur ----
  { from: 'Thrissur Railway Station', to: 'Vadakkunnathan Temple', km: 2, min: 70, max: 110 },
  { from: 'Thrissur', to: 'Athirappilly Falls', km: 60, min: 1400, max: 2000,
    note: 'Very long. Book a cab.' },
];

// Look up a route. Returns best match by from/to substring, or null.
// Kept intentionally simple — no fuzzy matching needed for a fixed list.
function findFareRoute(fromQuery, toQuery) {
  if (!fromQuery || !toQuery) return null;
  const f = fromQuery.toLowerCase().trim();
  const t = toQuery.toLowerCase().trim();
  // Exact-ish match first
  let match = fareRoutes.find(r =>
    r.from.toLowerCase().includes(f) && r.to.toLowerCase().includes(t)
  );
  if (match) return match;
  // Reverse direction also valid (same fare, roughly)
  match = fareRoutes.find(r =>
    r.from.toLowerCase().includes(t) && r.to.toLowerCase().includes(f)
  );
  if (match) return match;
  // Looser — match just "from" and see if any routes exist
  return null;
}

// Estimate a fare for arbitrary distance (used when no exact route exists).
// Uses TN/KL rates + tourist buffer.
function estimateFare(km) {
  if (!km || km <= 0) return { min: 0, max: 0, rough: true };
  const base = 40;         // first 1.8 km
  const perKm = 18;
  const touristMarkup = 1.3; // tourist areas frequently charge above meter
  const min = Math.round((base + Math.max(0, km - 1.8) * perKm) * 1.0);
  const max = Math.round((base + Math.max(0, km - 1.8) * perKm) * touristMarkup * 1.15);
  return { min: Math.max(60, min), max: Math.max(100, max), rough: true };
}

// Get a fair route between any two place IDs from curatedPlaces (used by
// the itinerary generator and map "route to this place" features).
function fareForPlaces(fromPlace, toPlace) {
  if (!fromPlace || !toPlace) return null;
  // Try named route match first
  const named = findFareRoute(fromPlace.place, toPlace.place);
  if (named) return named;
  // Fall back to straight-line haversine estimate
  const R = 6371;
  const dLat = (toPlace.lat - fromPlace.lat) * Math.PI / 180;
  const dLng = (toPlace.lng - fromPlace.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(fromPlace.lat*Math.PI/180) * Math.cos(toPlace.lat*Math.PI/180) *
            Math.sin(dLng/2)**2;
  const km = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const est = estimateFare(km);
  return { from: fromPlace.place, to: toPlace.place, km: Math.round(km * 10) / 10,
           min: est.min, max: est.max, estimated: true };
}

// Expose
window.fareRoutes = fareRoutes;
window.findFareRoute = findFareRoute;
window.estimateFare = estimateFare;
window.fareForPlaces = fareForPlaces;
