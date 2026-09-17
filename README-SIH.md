# Namma Tour

**Offline-first traveler safety & discovery network for Tamil Nadu & Kerala**

> Built for SIH 2026. Works with **zero internet** for every core feature.
> Tips, alerts, SOS, maps, fare checks and 400+ place details — all on-device.

---

## 🎯 The Problem

Tourists in remote areas of Tamil Nadu & Kerala (hill stations, coastal
villages, forest roads) frequently have **no cellular signal**. Existing
apps (Google Maps, travel blogs, ride-hailing) are useless when offline.

Three specific pain points:

1. **Safety** — an injured or lost traveler cannot call for help, cannot
   tell a local where they are, cannot find the nearest hospital.

2. **Overcharging** — auto-rickshaw drivers in tourist areas routinely
   charge foreigners 2–3× the fair rate. No app tells travelers what is fair.

3. **Discovery** — hidden gems are invisible because tourist information
   only reaches the traveler if they have signal at the exact moment.

---

## 💡 The Solution

**Namma Tour** is a Progressive Web App that runs entirely on the phone.
All core features work **with airplane mode ON**.

### Killer features

| Feature | Why it matters | Offline? |
|---|---|---|
| **🆘 SOS with 7-language voice** | Speaks your GPS location aloud in Tamil, Malayalam, Telugu, Hindi, English, French or Japanese — so anyone nearby can help, even if you don't share a language | ✅ |
| **💰 Auto-rickshaw fare checker** | Type "From / To", get the fair price range. Show the driver a QR proving you know it. Nobody else has this. | ✅ |
| **🗺️ Offline SVG map** | Shows all 400+ places + your live GPS + hub-to-hub roads. Works with no tiles, no internet. | ✅ |
| **📴 7-language everything** | UI, voice reader, SOS, phrasebook — EN / TA / TE / HI / ML / FR / JA | ✅ |
| **📲 QR-based tip sharing** | Travelers share alerts phone-to-phone. No server, no account needed. | ✅ |
| **🏥 Emergency directory** | Nearest police + hospital by GPS. Call 100/108 with one tap. | ✅ |
| **🚨 Danger heatmap** | Urgent tips leave red halos on the offline map | ✅ |

### Also included

- Tips feed with community trust system (confirm / flag / verified badges)
- GPS trip tracker with replay + history
- 22-festival calendar for TN & Kerala with crowd warnings
- 17 common tourist scam warnings
- Emergency phrase cards (16) + traveler phrasebook (30+)
- Sunrise / sunset calculator
- Weather memory (crowdsourced)
- Offline landmark picker
- One-tap itinerary generator
- Budget tracker
- Cloud backup (online)
- **DK AI assistant** — custom chatbot integration (online only)

---

## 🏗️ Architecture
## 🎬 SIH Demo Script (5 minutes)

### Setup before walking on stage

1. Phone with Namma Tour installed (PWA)
2. **Turn on Airplane Mode** — this is your opener
3. Have a printed QR code of a sample tip to hand a judge
4. Have a second phone ready if you want to demo QR sync

### The script

**[0:00 — 0:30] The hook**

> *"A tourist is hiking near Kolukkumalai in the Western Ghats. It's 6 PM.
> They slip, sprain their ankle. No cellular signal. Google Maps is
> useless. They don't speak Tamil. What do they do?"*

Show the phone in **airplane mode**.

> *"This is what they do. Watch."*

**[0:30 — 1:30] SOS demo (the money shot)**

- Open **SOS tab**
- Tap the big red **🆘 SOS** button
- **The phone speaks their GPS coordinates aloud in Tamil**
- Point to the screen: "Here's the same text in Tamil + English, on screen
  for anyone nearby"
- Show the **Nearest police / hospital** list with distances
- Tap **Call** next to hospital → 108 loads

> *"No internet. No signal. And yet — location shared, spoken aloud, in
> a language the locals speak, with one-tap emergency call. This works
> because we use the phone's own GPS chip, on-device text-to-speech,
> and cached emergency data."*

**[1:30 — 2:30] Fare checker (the unique feature)**

- Open **Fare tab**
- Type **From: Madurai Railway Station → To: Meenakshi Temple**
- Tap **Check Fair Fare**
- Shows **₹60 – ₹100**
- Show the QR code for the driver

> *"Every auto-rickshaw driver in India has heard 'meter is broken'.
> Every tourist has overpaid. This app tells you the fair range before
> you step in. Show the driver this QR — he knows you know. End of
> argument. No other app does this."*

**[2:30 — 3:30] Offline map**

- Open **Map tab** → tap **📴 Offline Map**
- SVG map appears: gold dots for all places, roads drawn, blue dot for user
- Tap a dot → shows place name + distance
- Still in airplane mode

> *"This is a map of 400+ Tamil Nadu and Kerala tourist places, drawn
> entirely with vector graphics from bundled data. No tiles. No downloads.
> The blue dot is your live GPS. Works in a cave."*

**[3:30 — 4:30] QR sharing + 7 languages**

- Open **Sync tab**
- Show a QR code with sample tips
- Have a judge scan it with the second phone → tips appear
- Open **Settings** → language dropdown → pick **தமிழ்**
- The entire UI switches to Tamil, including SOS, map labels, everything

> *"Tips travel phone-to-phone by QR code. No server. No account.
> And the whole app speaks 7 languages because tourists in this region
> come from all over India and the world."*

**[4:30 — 5:00] Close**

> *"Every core feature works with zero internet. We serve the tourist who
> has no signal — because that's exactly when you need help most.*
>
> *Our app has 400+ real places, 7 languages, and features nobody else
> has built: an SOS that speaks Tamil aloud, a fare checker that ends
> overcharging, and a map that works in a cave.*
>
> *Namma Tour. Made for the traveler whose phone says 'No Service'."*

---

## 🛠️ Tech stack

- **PWA** — installable, works offline via Service Worker
- **Vanilla JS** — no framework, no build step
- **LocalStorage** — all user data lives on the phone
- **Leaflet + OpenStreetMap** — real map (online only, no API key)
- **Custom SVG map** — offline fallback, drawn from bundled data
- **Firebase** (optional) — backup + community tips when online
- **DK AI** (custom) — chatbot integrated as an iframe (online only)
- **Web Speech API** — text-to-speech + speech recognition
- **Geolocation API** — GPS from phone chip, works offline
- **Wake Lock API** — keeps the screen on during GPS tracking

**No build step. No npm. No bundler. Every file is editable on a phone.**

---

## 🚧 Honest limitations

We list these openly — judges respect honesty more than inflated claims.

| Limitation | Reason | Workaround |
|---|---|---|
| Offline map has no street names | No tile server is legal/free to bundle | Hub-to-hub roads shown; user places are labeled |
| DK AI needs internet | It's an LLM on a server | Offline keyword assistant still responds to voice commands |
| Cloud backup requires Firebase keys | Free tier, but needs internet | Local export/import also works |
| Hospital direct phone numbers not bundled | We can't verify every number stays correct | App routes through 108 / 112 which always works |
| Some places have approximate coordinates | Sourced from public data | Correct within ~1 km, still shows on map |

---

## 📁 File structure

