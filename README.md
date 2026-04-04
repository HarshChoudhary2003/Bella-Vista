<div align="center">

<!-- HERO BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,14,20&height=220&section=header&text=Bella%20Vista&fontSize=72&fontColor=fff&fontAlignY=38&desc=Authentic%20Italian%20Cuisine%20%E2%80%B7%20Premium%20Glassmorphic%20Web%20Experience&descAlignY=60&descSize=18&animation=fadeIn" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-ca8a04?style=for-the-badge&labelColor=0f172a)](https://harshchoudhary2003.github.io/Bella-Vista)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)

<br/>

> *Bella Vista* is a **production-ready**, **zero-dependency** restaurant website  
> engineered with a bleeding-edge **glassmorphic design system** — pure HTML, CSS & JavaScript.  
> Animating. Breathing. Alive.

<br/>

</div>

---

## ✦ Preview

<div align="center">

| 🏠 Hero | 📊 Stats | 🍽️ Menu |
|:---:|:---:|:---:|
| Animated particles, floating glass card, shimmer text | Live counter animations, glass stat tiles | Tabbed menu system with 3D tilt cards |

| 👨‍🍳 Chefs | 🖼️ Gallery | 📅 Events |
|:---:|:---:|:---:|
| Interactive chef cards with tilt physics | Masonry grid + fullscreen lightbox | Upcoming events with date badges |

| 💬 Reviews | 📬 Reservation | 🌑 Theme |
|:---:|:---:|:---:|
| Auto-sliding testimonials with swipe support | Floating label inputs with validation | Deep navy + gold glassmorphism dark mode |

</div>

---

## 🚀 Feature Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│  BELLA VISTA · FEATURE MATRIX                                           │
├────────────────────────────┬────────────────────────────────────────────┤
│  VISUAL DESIGN             │  INTERACTIVE MODULES                       │
│  ✦ Glassmorphism System    │  ✦ Particle Canvas w/ Line Connections    │
│  ✦ Animated Blob BG        │  ✦ Animated Stats Counter (easeOutCubic)  │
│  ✦ Gold Shimmer Typography │  ✦ 3D Tilt Effect with Mouse Shine        │
│  ✦ Playfair + Outfit Fonts │  ✦ Tabbed Menu System (4 categories)      │
│  ✦ CSS Variable Tokens     │  ✦ Gallery Masonry + Lightbox             │
│                            │  ✦ Testimonials Slider (Auto + Swipe)      │
│  ANIMATIONS                │  ✦ Reservation Form with Toast             │
│  ✦ Preloader (SVG Spin)    │  ✦ Mobile Navigation (Animated Hamburger) │
│  ✦ Scroll Reveal (IO API)  │  ✦ Keyboard Lightbox Navigation           │
│  ✦ Badge Pulse Glow        │  ✦ Active Nav Link Tracking               │
│  ✦ Hero Scroll Indicator   │  ✦ Back-to-Top with Fade                  │
│  ✦ CSS Keyframe Rich       │                                            │
└────────────────────────────┴────────────────────────────────────────────┘
```

---

## 🎨 Design System

### Color Palette

<div align="center">

| Token | Value | Usage |
|:------|:------|:------|
| `--bg` | `#020617` | Page background |
| `--surface` | `rgba(255,255,255,0.04)` | Glass card fill |
| `--border` | `rgba(255,255,255,0.08)` | Glass card border |
| `--accent` | `#ca8a04` | Gold primary accent |
| `--accent-light` | `#fde047` | Gold shimmer highlight |
| `--text-1` | `#f8fafc` | Primary text |
| `--text-2` | `#94a3b8` | Secondary text |

</div>

### Typography

```
Headings   →  Playfair Display  (Italic Serif — Elegance)
Body       →  Outfit            (Variable Sans — Modern Clarity)
```

### Glassmorphism Formula

```css
.glass-card {
  background:       rgba(255,255,255,0.04);
  backdrop-filter:  blur(20px);
  border:           1px solid rgba(255,255,255,0.08);
  box-shadow:       0 8px 32px rgba(0,0,0,0.4);
  border-radius:    20px;
}
```

---

## 🏗️ Architecture

```
bella-vista/
│
├── index.html          ← Single-page app structure (8 semantic sections)
├── styles.css          ← 700+ line design system (vars, components, responsive)
└── script.js           ← 13 self-contained JavaScript modules
```

### Section Map

```
#home       →  Hero (Particle Canvas, Glass Card, Shimmer Title, Awards)
#stats      →  Legacy Numbers (Animated Counters, 4 Stat Tiles)
#menu       →  Menu (4 Tab Categories, 3D Tilt Cards, Badges)
#chefs      →  Chef Showcase (Photos, Tilt Cards, Specialties)
#gallery    →  Photo Gallery (Masonry Grid, Hover Overlay, Lightbox)
#events     →  Upcoming Events (Date Badges, Meta Info, CTA)
#reviews    →  Testimonials (Auto-Slider, Swipe, Dot Navigation)
#about      →  Restaurant Story (Grid Layout, Features List)
#contact    →  Reservation Form (Floating Labels, Toast Feedback)
```

---

## ⚙️ JavaScript Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Preloader** | SVG spinning plate animation, fades out on `window.load` |
| 2 | **Particle Canvas** | 130+ particles with connecting line network, custom `requestAnimationFrame` loop |
| 3 | **Navbar Scroll** | Glass nav with `scrolled` class, pixel-perfect padding transitions |
| 4 | **Mobile Nav** | Animated hamburger toggle with overlay nav list |
| 5 | **Scroll Reveal** | `IntersectionObserver` with staggered `data-delay` support |
| 6 | **Stats Counter** | `easeOutCubic` animation — counts from 0 to target value in 2s |
| 7 | **Menu Tabs** | Tab switching with CSS `fadeIn` transition between panels |
| 8 | **3D Tilt + Shine** | Physics-based card tilt from mouse position + radial light shine |
| 9 | **Gallery Lightbox** | Full-screen image viewer, prev/next nav, keyboard (`←→Esc`), touch swipe |
| 10 | **Testimonials Slider** | Auto-sliding every 5s, dot navigation, touch swipe on mobile |
| 11 | **Reservation Form** | Loading spinner, simulated API call, success toast notification |
| 12 | **Back to Top** | Smooth scroll, appears after 400px scroll depth |
| 13 | **Active Nav Links** | Live scroll tracking, underline indicator per section |

---

## 🚀 Getting Started

### Option 1 — Open directly

```bash
# Clone the repository
git clone https://github.com/HarshChoudhary2003/Bella-Vista.git

# Navigate into the project
cd Bella-Vista/bella-vista

# Open in browser (Windows)
start index.html

# Open in browser (macOS)
open index.html
```

### Option 2 — Local server (recommended)

```bash
# Using Python (no install needed)
python -m http.server 8000

# Using Node.js (npx serve)
npx serve .

# Visit
http://localhost:8000
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|:-----------|:-------|
| `> 1100px` | Full desktop — 4-column stats, 3-column chefs, events, gallery |
| `≤ 1100px` | 2-column stats, 2-column events |
| `≤ 900px`  | 2-column chefs, 2-column gallery, stacked about/contact |
| `≤ 768px`  | Mobile nav overlay, single column, swipe-enabled slider |
| `≤ 500px`  | Ultra-mobile, single column gallery, adjusted hero font size |

---

## 🎬 Animations Overview

| Animation | Trigger | Effect |
|:----------|:--------|:-------|
| Floaty Blobs | Page Load | 3 radial gradient blobs float with `blobFloat` keyframe |
| Particle Network | Page Load | 130 particles animate with connecting lines |
| Badge Pulse | Always | Gold glow box-shadow breathing loop |
| Gold Shimmer | Always | `background-position` animation on hero title |
| Scroll Wheel | Always | Wheel element scrolls inside mouse icon |
| Preloader Spin | Page Load | SVG dashed circle spins, fades on load |
| Stat Counter | Scroll Into View | Cubic ease-out count animation |
| Tilt + Shine | Mouse Hover | 3D perspective transform + radial gradient shine |
| Lightbox Fade | Click Gallery | Full-screen overlay with opacity transition |
| Reveal | Scroll | `translateY(40px) → 0` with `opacity 0 → 1` |
| Slider Auto | Timed (5s) | Transform-based slides with dot sync |

---

## 🔮 Roadmap

- [ ] **Online Ordering** — Add a cart system and Stripe payment integration
- [ ] **CMS Integration** — Connect menu data to Contentful or Sanity
- [ ] **Blog / Stories** — Chef blog section with article pages
- [ ] **Loyalty Program** — Points system for returning guests
- [ ] **Live Availability** — Real-time table availability checker
- [ ] **Multi-language** — Italian / English / French toggle
- [ ] **PWA Support** — Offline-capable progressive web app

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feat/your-amazing-feature

# 3. Commit your changes
git commit -m "feat: add your amazing feature"

# 4. Push to the branch
git push origin feat/your-amazing-feature

# 5. Open a Pull Request
```

---

## 📄 License

```
MIT License — © 2026 Bella Vista Restaurant
Free to use, modify, and distribute with attribution.
```

---

## 👨‍💻 Author

<div align="center">

**Harsh Choudhary**

[![GitHub](https://img.shields.io/badge/GitHub-HarshChoudhary2003-181717?style=for-the-badge&logo=github)](https://github.com/HarshChoudhary2003)

*Built with ☕, passion, and a deep love for Italian food.*

</div>

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,14,20&height=120&section=footer&animation=fadeIn" width="100%"/>

**⭐ If you find this project impressive, please star the repository!**

</div>
