import json

# (place, district, state, category, lat, lng, best_time, blurb)
places = [
# ---------------- TAMIL NADU: TEMPLES ----------------
("Meenakshi Amman Temple","Madurai","Tamil Nadu","temple",9.9195,78.1193,"Oct-Mar","Iconic twin-towered temple complex with over 14 gopurams, famed for its sculpture and evening 'palli arai' ceremony."),
("Brihadeeswarar Temple","Thanjavur","Tamil Nadu","temple",10.7828,79.1318,"Oct-Mar","UNESCO World Heritage Chola-era temple, over 1000 years old, known for its massive vimana tower."),
("Ramanathaswamy Temple","Rameswaram","Tamil Nadu","temple",9.2882,79.3129,"Oct-Mar","One of the Char Dham sites, famous for its 1200m corridor lined with carved pillars."),
("Arunachaleswarar Temple","Tiruvannamalai","Tamil Nadu","temple",12.2253,79.0693,"Nov-Feb","Major Shiva temple at the base of Arunachala hill, site of the Karthigai Deepam festival."),
("Kapaleeshwarar Temple","Chennai","Tamil Nadu","temple",13.0338,80.2697,"Nov-Feb","Colourful Dravidian-style temple in Mylapore, one of Chennai's oldest."),
("Nataraja Temple","Chidambaram","Tamil Nadu","temple",11.3994,79.6936,"Dec-Feb","Temple dedicated to Shiva as the cosmic dancer, famous for its golden-roofed sanctum."),
("Ranganathaswamy Temple","Srirangam","Tamil Nadu","temple",10.8624,78.6905,"Dec-Feb","One of the largest functioning temple complexes in the world, on an island in the Kaveri."),
("Palani Murugan Temple","Palani","Tamil Nadu","temple",10.4470,77.5222,"Oct-Feb","Hilltop temple reached by winch/ropeway or steps, one of Murugan's six abodes."),
("Ekambareswarar Temple","Kanchipuram","Tamil Nadu","temple",12.8447,79.7006,"Nov-Feb","Massive Shiva temple with a thousand-pillar hall and an ancient mango tree shrine."),
("Kailasanathar Temple","Kanchipuram","Tamil Nadu","temple",12.8378,79.6944,"Nov-Feb","Oldest structural temple in Kanchipuram, built by the Pallavas, known for its sandstone carvings."),
("Airavatesvara Temple","Darasuram","Tamil Nadu","temple",10.9598,79.3193,"Oct-Mar","UNESCO-listed Chola temple famous for its stone chariot-shaped mandapa."),
("Vaitheeswaran Koil","Sirkazhi","Tamil Nadu","temple",11.1794,79.6520,"Nov-Feb","Temple associated with astrology and Navagraha (planetary) worship."),
("Suchindram Thanumalayan Temple","Kanyakumari","Tamil Nadu","temple",8.1719,77.4406,"Nov-Feb","Rare temple honouring the Trimurti together, known for its musical stone pillars."),
("Padmanabhapuram Palace","Thuckalay","Tamil Nadu","heritage",8.2450,77.3350,"Nov-Feb","Beautifully preserved wooden Travancore-era royal palace with intricate carvings."),
# ---------------- TAMIL NADU: HILLS ----------------
("Ooty (Udhagamandalam)","The Nilgiris","Tamil Nadu","hill",11.4064,76.6932,"Sep-May","Queen of hill stations with botanical gardens, a toy train and Ooty Lake."),
("Kodaikanal","Dindigul","Tamil Nadu","hill",10.2381,77.4892,"Sep-May","Misty hill town centred on a star-shaped lake, pine forests and Coaker's Walk."),
("Yercaud","Salem","Tamil Nadu","hill",11.7753,78.2101,"Oct-May","Quiet coffee-growing hill station with a lake, orange groves and viewpoints."),
("Coonoor","The Nilgiris","Tamil Nadu","hill",11.3530,76.7959,"Sep-May","Tea-estate hill town with Sim's Park and the Dolphin's Nose viewpoint."),
("Kotagiri","The Nilgiris","Tamil Nadu","hill",11.4235,76.8659,"Sep-May","Oldest Nilgiri hill station, quieter than Ooty, surrounded by tea gardens."),
("Valparai","Coimbatore","Tamil Nadu","hill",10.3273,76.9550,"Oct-Feb","Remote plateau of tea estates in the Anamalai hills, good for wildlife sightings."),
("Yelagiri","Vellore","Tamil Nadu","hill",12.5827,78.6389,"Oct-Mar","Small laid-back hill station popular for trekking and paragliding."),
("Kolli Hills","Namakkal","Tamil Nadu","hill",11.2497,78.3288,"Oct-Mar","Remote hill range reached via 70 hairpin bends, home to Agaya Gangai falls."),
# ---------------- TAMIL NADU: BEACHES ----------------
("Marina Beach","Chennai","Tamil Nadu","beach",13.0500,80.2824,"Nov-Feb","One of the world's longest urban beaches, a Chennai evening institution."),
("Elliot's Beach","Chennai","Tamil Nadu","beach",13.0011,80.2707,"Nov-Feb","Calmer alternative to Marina, popular with joggers and cafe-hoppers."),
("Kanyakumari Beach","Kanyakumari","Tamil Nadu","beach",8.0788,77.5385,"Oct-Mar","Southern tip of India where three seas meet, famous for sunrise and sunset views."),
("Dhanushkodi Beach","Rameswaram","Tamil Nadu","beach",9.1500,79.4167,"Oct-Mar","Ghost-town beach at the narrow tip of Rameswaram, where the sea splits in two colours."),
("Mahabalipuram Beach","Chengalpattu","Tamil Nadu","beach",12.6167,80.1931,"Nov-Feb","Beach beside the famous Shore Temple and rock-cut monuments."),
("Covelong (Kovalam) Beach TN","Chengalpattu","Tamil Nadu","beach",12.7925,80.2513,"Nov-Feb","Fishing-village beach near Chennai known for surfing schools."),
# ---------------- TAMIL NADU: BACKWATER / WETLAND ----------------
("Pichavaram Mangrove Forest","Cuddalore","Tamil Nadu","backwater",11.4275,79.7867,"Nov-Feb","Second-largest mangrove forest in the world, explored by boat through narrow water channels."),
("Muthupet Lagoon","Tiruvarur","Tamil Nadu","backwater",10.3833,79.4667,"Nov-Feb","Coastal mangrove lagoon and estuary, a haven for migratory birds."),
# ---------------- TAMIL NADU: WILDLIFE ----------------
("Mudumalai National Park","The Nilgiris","Tamil Nadu","wildlife",11.5680,76.5360,"Feb-May","Tiger reserve on the Kerala-Karnataka border known for elephant herds."),
("Indira Gandhi Wildlife Sanctuary (Anamalai)","Coimbatore","Tamil Nadu","wildlife",10.4667,76.9333,"Dec-Apr","Tiger reserve in the Anamalai hills bordering Valparai's tea estates."),
("Vedanthangal Bird Sanctuary","Chengalpattu","Tamil Nadu","wildlife",12.5432,79.8590,"Nov-Feb","One of India's oldest bird sanctuaries, home to thousands of migratory waterbirds."),
("Kalakad Mundanthurai Tiger Reserve","Tirunelveli","Tamil Nadu","wildlife",8.5667,77.3833,"Dec-Mar","Biodiverse tiger reserve in the southern Western Ghats."),
("Point Calimere Wildlife Sanctuary","Nagapattinam","Tamil Nadu","wildlife",10.2917,79.8500,"Nov-Feb","Coastal sanctuary known for blackbuck and flocks of flamingos."),
# ---------------- TAMIL NADU: WATERFALLS ----------------
("Courtallam Falls","Tenkasi","Tamil Nadu","waterfall",8.9333,77.2833,"Jun-Sep","Known as the 'Spa of South India', a cluster of falls believed to have healing properties."),
("Hogenakkal Falls","Dharmapuri","Tamil Nadu","waterfall",12.1167,77.7833,"Jul-Jan","Cascades on the Kaveri river, famous for coracle boat rides."),
("Silver Cascade Falls","Kodaikanal","Tamil Nadu","waterfall",10.2650,77.4850,"Jun-Sep","Roadside waterfall on the Kodaikanal ghat road, easy to reach."),
("Pykara Falls","The Nilgiris","Tamil Nadu","waterfall",11.4833,76.6167,"Jun-Sep","Waterfall and lake near Ooty popular for boating."),
("Thirparappu Falls","Kanyakumari","Tamil Nadu","waterfall",8.2833,77.3167,"Jun-Dec","Horseshoe-shaped falls on the Kodayar river."),
# ---------------- TAMIL NADU: HERITAGE ----------------
("Shore Temple","Mahabalipuram","Tamil Nadu","heritage",12.6169,80.1998,"Nov-Feb","UNESCO-listed 8th-century rock-cut temple standing right on the shoreline."),
("Gingee Fort","Villupuram","Tamil Nadu","heritage",12.2547,79.4142,"Nov-Feb","Massive hill fort spread across three hills, called the 'Troy of the East'."),
("Vellore Fort","Vellore","Tamil Nadu","heritage",12.9186,79.1325,"Nov-Feb","16th-century fort with a moat, temple and the site of the 1806 Vellore mutiny."),
("Thanjavur Maratha Palace","Thanjavur","Tamil Nadu","heritage",10.8052,79.1354,"Oct-Mar","Former royal residence housing a durbar hall and the Saraswathi Mahal Library."),
("Chettinad Mansions","Karaikudi","Tamil Nadu","heritage",10.0730,78.7830,"Oct-Feb","Grand 19th-century mansions of the Chettiar merchant community, famed for tilework."),
("Fort St. George","Chennai","Tamil Nadu","heritage",13.0797,80.2870,"Nov-Feb","First English fortress in India, now housing a museum and the Tamil Nadu Assembly."),
# ---------------- TAMIL NADU: NATURE / MUSEUM / ADVENTURE ----------------
("Ooty Botanical Garden","The Nilgiris","Tamil Nadu","nature",11.4144,76.7125,"Sep-May","Terraced Victorian-era garden with a fossilised tree trunk over 20 million years old."),
("Berijam Lake","Kodaikanal","Tamil Nadu","nature",10.1333,77.4167,"Sep-May","Pristine forest lake accessible only with a permit, a quiet escape from Kodaikanal town."),
("Government Museum Chennai","Chennai","Tamil Nadu","museum",13.0700,80.2578,"Nov-Feb","One of India's oldest museums, with a renowned bronze gallery."),
("Gandhi Memorial Museum","Madurai","Tamil Nadu","museum",9.9252,78.1198,"Oct-Mar","Museum tracing India's freedom struggle, housed in a former Rani Mangammal palace."),
("Yelagiri Paragliding Point","Vellore","Tamil Nadu","adventure",12.5850,78.6450,"Oct-Mar","Popular paragliding launch point overlooking the Yelagiri valley."),
("Top Slip","Coimbatore","Tamil Nadu","adventure",10.5833,76.9333,"Dec-Apr","Gateway to the Anamalai Tiger Reserve, offering jungle safaris and trekking."),
# ---------------- KERALA: TEMPLES ----------------
("Sabarimala Temple","Pathanamthitta","Kerala","temple",9.4325,77.0817,"Nov-Jan","Major pilgrimage hill shrine of Lord Ayyappa, reached by forest trek."),
("Padmanabhaswamy Temple","Thiruvananthapuram","Kerala","temple",8.4828,76.9436,"Nov-Feb","Historic temple famed for its vast treasure vaults and Dravidian architecture."),
("Guruvayur Sri Krishna Temple","Thrissur","Kerala","temple",10.5946,76.0393,"Nov-Feb","One of Kerala's most revered Krishna temples, known for its elephant processions."),
("Vadakkunnathan Temple","Thrissur","Kerala","temple",10.5276,76.2144,"Nov-Feb","Ancient Shiva temple at the heart of Thrissur, centre of the Pooram festival."),
("Chottanikkara Temple","Ernakulam","Kerala","temple",9.9333,76.4167,"Nov-Feb","Popular Devi temple known for its healing rituals."),
("Ambalappuzha Krishna Temple","Alappuzha","Kerala","temple",9.3833,76.3500,"Nov-Feb","Temple famous for its ceremonial 'palpayasam' milk pudding offering."),
# ---------------- KERALA: HILLS ----------------
("Munnar","Idukki","Kerala","hill",10.0889,77.0595,"Sep-May","Rolling tea-estate hills, home to the rare Neelakurinji flower and Eravikulam park."),
("Wayanad (Kalpetta)","Wayanad","Kerala","hill",11.6854,76.1320,"Oct-May","Green plateau of forests, spice plantations and caves in northern Kerala."),
("Ponmudi","Thiruvananthapuram","Kerala","hill",8.7500,77.1167,"Sep-May","Compact hill station with hairpin roads and views over the Western Ghats."),
("Vagamon","Idukki","Kerala","hill",9.6833,76.9333,"Sep-May","Meadowed hill town known for paragliding and pine forests."),
("Nelliampathy","Palakkad","Kerala","hill",10.4833,76.6667,"Nov-Apr","Lesser-visited hills of orange orchards and cardamom estates."),
("Devikulam","Idukki","Kerala","hill",10.0500,77.0833,"Sep-May","Quiet hill town near Munnar with the sacred Sita Devi Lake."),
("Peermade","Idukki","Kerala","hill",9.5667,76.9667,"Sep-May","Plantation town on the old spice route, gateway to Periyar."),
# ---------------- KERALA: BEACHES ----------------
("Kovalam Beach","Thiruvananthapuram","Kerala","beach",8.4004,76.9787,"Sep-Mar","Crescent-shaped beach with a lighthouse, one of Kerala's most famous."),
("Varkala Beach","Thiruvananthapuram","Kerala","beach",8.7379,76.7163,"Sep-Mar","Dramatic red-cliff beach lined with cafes, also a pilgrimage spot."),
("Cherai Beach","Ernakulam","Kerala","beach",10.1440,76.1810,"Sep-Mar","Wide beach near Kochi where backwaters and sea nearly meet."),
("Marari Beach","Alappuzha","Kerala","beach",9.6008,76.2933,"Sep-Mar","Quiet fishing-village beach known for laid-back resorts."),
("Bekal Beach","Kasaragod","Kerala","beach",12.3961,75.0308,"Oct-Mar","Beach beneath the historic Bekal Fort in northern Kerala."),
("Kappad Beach","Kozhikode","Kerala","beach",11.3833,75.6833,"Oct-Mar","Historic beach where Vasco da Gama first landed in India in 1498."),
# ---------------- KERALA: BACKWATERS ----------------
("Alleppey Backwaters","Alappuzha","Kerala","backwater",9.4981,76.3388,"Sep-Mar","Kerala's houseboat capital, a maze of canals, lagoons and paddy fields."),
("Kumarakom Backwaters","Kottayam","Kerala","backwater",9.6150,76.4300,"Sep-Mar","Backwater village on Vembanad Lake, known for its bird sanctuary."),
("Kollam Backwaters (Ashtamudi Lake)","Kollam","Kerala","backwater",8.9500,76.5833,"Sep-Mar","Eight-armed lake offering quieter houseboat cruises than Alleppey."),
("Munroe Island","Kollam","Kerala","backwater",8.9500,76.6167,"Sep-Mar","Cluster of islands where the backwaters meet, popular for canoe tours."),
# ---------------- KERALA: WILDLIFE ----------------
("Periyar Tiger Reserve (Thekkady)","Idukki","Kerala","wildlife",9.4667,77.1667,"Oct-Apr","Forested reserve around Periyar Lake, famous for boat safaris and elephants."),
("Wayanad Wildlife Sanctuary","Wayanad","Kerala","wildlife",11.6333,76.4167,"Oct-Apr","Sanctuary linking Nagarhole and Bandipur, home to elephants and tigers."),
("Eravikulam National Park","Idukki","Kerala","wildlife",10.1936,77.0631,"Sep-Mar","Home to the endangered Nilgiri Tahr and rolling grassland peaks near Munnar."),
("Silent Valley National Park","Palakkad","Kerala","wildlife",11.1333,76.4333,"Dec-Apr","One of the last undisturbed tracts of tropical evergreen forest in India."),
("Parambikulam Tiger Reserve","Palakkad","Kerala","wildlife",10.4167,76.8167,"Dec-Apr","Reserve known for its ancient trees and eco-tourism treks."),
("Chinnar Wildlife Sanctuary","Idukki","Kerala","wildlife",10.3000,77.1167,"Dec-Apr","Dry scrub sanctuary near Munnar, home to the endangered grizzled giant squirrel."),
# ---------------- KERALA: WATERFALLS ----------------
("Athirappilly Falls","Thrissur","Kerala","waterfall",10.2851,76.5695,"Jun-Jan","Kerala's largest waterfall, often called the 'Niagara of India'."),
("Vazhachal Falls","Thrissur","Kerala","waterfall",10.3167,76.5833,"Jun-Jan","Wide cascading falls a short drive past Athirappilly."),
("Meenmutty Falls","Wayanad","Kerala","waterfall",11.5667,76.2167,"Jun-Nov","Wayanad's tallest waterfall, reached via a forest trek."),
("Soochipara Falls","Wayanad","Kerala","waterfall",11.5333,76.1833,"Jun-Nov","Three-tiered falls popular for a short trek and a swim at the base."),
("Thommankuthu Falls","Idukki","Kerala","waterfall",9.7833,76.8500,"Jun-Nov","Seven-step cascading falls set in dense forest."),
("Palaruvi Falls","Kollam","Kerala","waterfall",8.9667,77.1667,"Jun-Jan","'Stream of Milk' falls dropping 300 feet through the Western Ghats."),
# ---------------- KERALA: HERITAGE ----------------
("Fort Kochi","Ernakulam","Kerala","heritage",9.9658,76.2422,"Oct-Mar","Colonial-era waterfront quarter with Chinese fishing nets and colonial architecture."),
("Mattancherry Palace","Ernakulam","Kerala","heritage",9.9580,76.2593,"Oct-Mar","16th-century Dutch Palace with Kerala mural paintings depicting Hindu epics."),
("Paradesi Synagogue","Ernakulam","Kerala","heritage",9.9573,76.2597,"Oct-Mar","Oldest active synagogue in the Commonwealth, in Kochi's historic Jew Town."),
("Bekal Fort","Kasaragod","Kerala","heritage",12.3961,75.0308,"Oct-Mar","Kerala's largest fort, a laterite structure overlooking the Arabian Sea."),
("Hill Palace","Tripunithura","Kerala","heritage",9.9403,76.3467,"Oct-Mar","Former royal residence of the Kochi royal family, now an archaeological museum."),
# ---------------- KERALA: NATURE / MUSEUM / ADVENTURE ----------------
("Vembanad Lake","Kottayam","Kerala","nature",9.6167,76.4333,"Sep-Mar","Kerala's longest lake, the heart of the backwater houseboat network."),
("Bolgatty Island","Ernakulam","Kerala","nature",10.0167,76.2667,"Oct-Mar","Small island in Kochi harbour with a Dutch-era palace and gardens."),
("Napier Museum","Thiruvananthapuram","Kerala","museum",8.5074,76.9550,"Oct-Mar","19th-century museum in an ornate Indo-Saracenic building, with bronze and ivory collections."),
("Kerala Folklore Museum","Ernakulam","Kerala","museum",9.9700,76.2900,"Oct-Mar","Museum built from salvaged wooden temple and palace architecture, showcasing folk art."),
("Kolukkumalai Tea Estate","Idukki","Kerala","adventure",10.1512,77.2233,"Nov-Feb","One of the world's highest tea plantations, famous for its jeep-track sunrise trek."),
("Top Station","Idukki","Kerala","adventure",10.1167,77.2000,"Sep-May","Highest viewpoint near Munnar on the old Kundala Valley Railway route."),
("Vagamon Paragliding Point","Idukki","Kerala","adventure",9.6833,76.9333,"Sep-May","Meadow-top launch site for tandem paragliding over the Vagamon hills."),
]

out = []
for i, (place, district, state, cat, lat, lng, best, text) in enumerate(places, start=1):
    out.append({
        "id": f"p{i:03d}",
        "place": place,
        "district": district,
        "state": state,
        "category": cat,
        "lat": lat,
        "lng": lng,
        "best": best,
        "text": text,
    })

with open("/home/claude/build/places-data.js", "w", encoding="utf-8") as f:
    f.write("// Namma Tour — curated directory of real Tamil Nadu & Kerala tourist places.\n")
    f.write("// Loaded as a plain global (no build step / bundler) so it works with the\n")
    f.write("// app's zero-server, phone-only setup. Read by the Explore tab in app.js.\n")
    f.write("const curatedPlaces = ")
    f.write(json.dumps(out, ensure_ascii=False, indent=2))
    f.write(";\n")

print("Total places:", len(out))
from collections import Counter
print(Counter(p["state"] for p in out))
print(Counter(p["category"] for p in out))
