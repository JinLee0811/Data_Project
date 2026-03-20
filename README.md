# 🏠 Where Should I Live?
### A Full-Stack Web Service for Subway-Based Neighborhood Recommendations

> Recommends the best neighborhoods in Seoul by calculating **perceived commute time** — combining real estate transaction data with live subway congestion weights.

[![Demo](https://img.shields.io/badge/Live%20Demo-Available-02C39A?style=flat-square)](http://kdt-ai6-team02.elicecoding.com)
[![Award](https://img.shields.io/badge/🏆%20Award%20of%20Excellence-Elice%20AI%20Track%206th-F9C74F?style=flat-square)](#-award)

---

## 📎 Project Resources

| Resource | Link |
|---|---|
| 🌐 Live Demo | [http://kdt-ai6-team02.elicecoding.com](http://kdt-ai6-team02.elicecoding.com) |
| 📊 Original Slides (KR) | [Google Slides (Korean)](https://docs.google.com/presentation/d/1cdXpzReZPP-u3LL88jjQt4yrrxkILBKLJMLSab121ks/edit?usp=sharing) |
| 🌍 Portfolio Page (EN) | [Google Slides (English)]([https://www.notion.so/329c73f3548f8191a344d39a18a4fb29](https://docs.google.com/presentation/d/1mwGey5Xk7QGv-g6pizgOYg8fIaPBAZtL/edit?usp=sharing&ouid=103284082716674627235&rtpof=true&sd=true)) |
| 📋 API Spec | [Google Sheets](https://docs.google.com/spreadsheets/d/1ClWtcq0ayfmQKbjAQk9e1KyxtVXRy8rUkJ_-awIyw1Y/edit#gid=418297014) |

<details>
<summary>🔑 Demo Credentials</summary>

| Role | Email | Password |
|---|---|---|
| Admin | admin@admin.com | 1111 |
| User | user@user.com | 1234 |

</details>

---

## 🏆 Award

> **Award of Excellence** — Elice AI Full-Stack Engineer Track 6th (2023.04.03)
> Certified for achieving the **highest performance** in the Data Analysis Web Service Project, organized by the Ministry of Employment and Labor and operated by Elice Group Inc.

- 🥇 **Team Excellence Award** — 2사가게? team (Jeongjin Lee, Sunghun Kang, Nayeon Ahn, Seungeun Lee, Jongyeol Jung, Hoyeol Choi)
- 👑 **Leadership Award** — Jeongjin Lee (2023.05.20)

---

## 💡 Overview

Most housing services in Seoul show price data or raw commute distances — but ignore the fact that a crowded subway makes the same trip *feel* much longer.

**Where Should I Live?** solves this by:
1. Pulling **real estate transaction data** to surface actual rent/deposit/lease prices per subway station
2. Analyzing **subway congestion data** by time, station, and direction to derive crowdedness weights
3. Running **Dijkstra's algorithm** on the station graph to calculate both raw travel time and **perceived commute time**
4. Ranking and recommending neighborhoods based on the commute you will actually experience

---

## 🚀 Key Features

### Core
| Feature | Description |
|---|---|
| 🗺️ Smart Recommendation | Drop a pin or search a workplace address — get ranked neighborhood suggestions |
| ⏱️ Perceived Time | Dijkstra + congestion weights give a realistic commute estimate, not just distance |
| 🕐 Time-of-Day Toggle | Recalculate rankings based on AM/PM rush hour congestion |
| 📊 Station Detail Panel | Average rent, nearby facilities (1km), rush-hour heatmap, Naver Real Estate link |

### User
| Feature | Description |
|---|---|
| 🔐 Auth | JWT (HTTP-only cookie) + Kakao Social Login (OAuth 2.0) |
| ❤️ Favorites | Save and manage favorite stations |
| ✍️ Reviews | Write/read community reviews per station |
| 👤 My Page | View saved stations, reviews, update profile |

### Admin
| Feature | Description |
|---|---|
| 🛠️ Admin Dashboard | Manage users and reviews with paginated tables |

---

## 🧮 Algorithm

```js
const perceivedTime = travelTime * congestionWeight;
```

- **Data sources**: Inter-station travel times (official schedules + interpolation for gaps) · congestion by station, time slot, direction
- **Pathfinding**: Dijkstra's algorithm — each station is a node, travel time is the edge weight
- Traverses the graph tracking both raw time and perceived time per node
- Stops when all nodes within the user's max time limit are explored
- Returns a ranked list of reachable neighborhoods

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React** | Component-based UI, state management |
| **Styled Components** | CSS-in-JS scoped styling |
| **Chart.js** + **react-chartjs-2** | Interactive data visualizations |
| **Naver Maps API** | Map canvas, marker placement |
| **Google Geocoding API** | Address to lat/lng coordinate conversion |
| **Kakao Social Login API** | OAuth 2.0 authentication |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** + **Express** | REST API server, business logic |
| **Prisma ORM** | Type-safe DB access + Prisma Studio GUI |
| **AWS RDS (MySQL)** | Cloud-hosted relational database |
| **JWT** (cookie-based) | Stateless authentication |

### Data Analysis
| Technology | Purpose |
|---|---|
| **Google Colab** | Exploratory data analysis, congestion weight derivation |

---

## 🗂️ Architecture

### Frontend Structure
```
App
├── SideBar          — search filters & ranked results list
├── Map              — Naver Maps canvas
├── Station Info     — station detail panel
└── Station Review   — community reviews

User Flows
├── Login / Register
├── My Page          — favorites, reviews, profile
└── Admin Panel      — user & review management

Info
└── About            — data-driven project introduction
```

### Backend — 3-Layer Architecture
```
Presentation Layer  →  Routes
  adminRouter / userRouter / mainRouter / stationRouter

Application Layer   →  Services
  adminService / userService / mainService / stationService

Data Layer          →  Prisma + MySQL
  Data modules: station · crowdedness · travel_time · facilities
  Middlewares: errorHandler · isAdmin · isUser · checkPassword
```

---

## 🗄️ Database Design

| Table | Description |
|---|---|
| User | Profiles, preferences, favorite stations |
| Station | Station info, congestion data, real estate prices |
| Review | User reviews and station ratings |
| Facilities | Nearby amenities per station |

---

## 🤝 Team

| Role | Members |
|---|---|
| **Team Lead + FE** | Jeongjin Lee |
| **Frontend** | Hoyeol Choi, Nayeon Ahn |
| **Backend** | Seungeun Lee, Jongyeol Jung, Seonghun Kang |

---

## 📝 Commit Convention

**Format**: `Type: YYYY-MM-DD Name - Summary`

| Type | Usage |
|---|---|
| `Feat` | New feature or enhancement |
| `Fix` | Bug fix |
| `Docs` | Documentation update |
| `Style` | Code formatting / styling |
| `Refactor` | Code refactor (no behavior change) |
| `Test` | Add or modify tests |

---

*Original presentation slides and all data/web image sources: [Google Slides (Korean)](https://docs.google.com/presentation/d/1cdXpzReZPP-u3LL88jjQt4yrrxkILBKLJMLSab121ks/edit?usp=sharing)*
