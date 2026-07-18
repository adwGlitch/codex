# 🚀 FlowRoute

> **AI-Powered Mobility Operating System**

FlowRoute is an intelligent journey planning platform that combines live maps, weather intelligence, route optimization, and AI reasoning to recommend the **most suitable journey** instead of simply finding the shortest route.

Unlike traditional navigation apps, FlowRoute considers contextual factors like weather, walking distance, accessibility, comfort, and user preferences before recommending a journey.

---

# 🌍 Problem Statement

Today's navigation applications primarily optimize for:

- Fastest Route
- Shortest Distance

However, real-world travel decisions also depend on:

- 🌦 Weather Conditions
- 🚶 Walking Distance
- ♿ Accessibility
- 💰 Budget
- 🎯 Journey Goal
- 🧳 Comfort
- 👤 User Preferences

Current navigation systems rarely explain *why* a route is recommended.

---

# 💡 Our Solution

FlowRoute is an AI-assisted mobility planning system that:

- Understands natural language travel requests
- Searches locations intelligently
- Generates optimized routes
- Analyzes live weather
- Scores multiple journey options
- Explains every recommendation

Instead of asking:

> "Which route is shortest?"

FlowRoute answers:

> **"Which route is best for you?"**

---

# ✨ Features

- 🤖 AI Journey Planning
- 🗺 Interactive Maps
- 📍 Smart Location Search
- 🛣 Route Generation
- 🌦 Live Weather Intelligence
- 📊 Deterministic Route Scoring
- 💬 AI Route Explanation
- 📱 Responsive UI
- 🌙 Modern Dark Theme

---

# 🧠 How It Works

```text
User Request
      │
      ▼
Natural Language Understanding
      │
      ▼
Location Search (Nominatim)
      │
      ▼
Route Generation (OSRM)
      │
      ▼
Weather Analysis (Open-Meteo)
      │
      ▼
Journey Scoring Engine
      │
      ▼
AI Explanation
      │
      ▼
Recommended Journey
```

---

# 🏗 System Architecture

```text
Frontend (Next.js)
        │
        ▼
Planner Interface
        │
        ▼
API Routes
        │
        ▼
Providers
 ├── Nominatim
 ├── OSRM
 ├── Open-Meteo
 └── OpenStreetMap
        │
        ▼
Scoring Engine
        │
        ▼
AI Explanation
        │
        ▼
Journey Recommendation
```

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- React Leaflet

## Backend

- Next.js API Routes
- TypeScript
- Axios
- Zod

## APIs

| Provider | Purpose |
|----------|----------|
| OpenStreetMap | Interactive Map |
| Leaflet | Map Rendering |
| Nominatim | Location Search & Geocoding |
| OSRM | Route Generation |
| Open-Meteo | Live Weather |

---

# ⚙ AI Decision Process

FlowRoute evaluates multiple journey factors:

- Travel Time
- Distance
- Weather
- Walking Distance
- Comfort
- Accessibility
- User Preferences

The recommendation is generated using a deterministic scoring engine, while AI understands user intent and explains the reasoning.

---

# 🌐 APIs Used

### 🗺 OpenStreetMap + Leaflet
Provides interactive maps and map rendering.

### 📍 Nominatim
Converts place names into geographic coordinates.

### 🛣 OSRM
Calculates routes, distance, travel time, and route geometry.

### 🌦 Open-Meteo
Provides real-time weather information.

---

# 📂 Project Structure

```text
flowroute/
│
├── app/
├── components/
├── features/
├── providers/
├── services/
├── stores/
├── hooks/
├── config/
├── types/
├── utils/
├── public/
├── app/api/
└── README.md
```

---

# 📊 Project Workflow

```text
User
 │
 ▼
Planner
 │
 ▼
Search Locations
 │
 ▼
Generate Route
 │
 ▼
Fetch Weather
 │
 ▼
Score Journey
 │
 ▼
Generate AI Explanation
 │
 ▼
Display Interactive Journey
```

---

# 🎯 Why FlowRoute?

| Traditional Navigation | FlowRoute |
|-------------------------|-----------|
| Shortest Route | ✅ |
| Live Weather Awareness | ✅ |
| AI Reasoning | ✅ |
| Accessibility Consideration | ✅ |
| User Intent Understanding | ✅ |
| Explains Recommendations | ✅ |
| Multi-Factor Route Evaluation | ✅ |

---

# 🚀 Getting Started

```bash
git clone https://github.com/your-username/FlowRoute.git

cd FlowRoute

npm install

npm run dev
```

---

# 📸 Screenshots

- Landing Page
- Journey Planner
- Interactive Map
- AI Recommendation
- Weather Dashboard

---

# 🛣 Roadmap

- [x] Landing Page
- [x] Interactive Map
- [x] Location Search
- [x] Route Generation
- [x] Weather Integration
- [x] AI Route Explanation
- [ ] Public Transit Integration
- [ ] Accessibility Improvements
- [ ] User Profiles

---

# 👨‍💻 Team

- Your Name
- College Name
- GitHub
- LinkedIn

---

# 📄 License

This project is licensed under the MIT License.
