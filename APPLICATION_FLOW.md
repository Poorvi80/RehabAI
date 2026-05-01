# RehabAI - Application Flow Guide

## 🚀 Getting Started

Your RehabAI application is now fully connected! Here's how everything flows together:

### **Home Page** (`index.html`)
- **Entry Point**: This is where all users start
- **Action**: Click "🚀 Get Started" button
- **Flow**: Takes you to → **Dashboard**

---

### **Dashboard** (`dashboard.html`)
- **Purpose**: View all available exercises and start your session
- **Features**:
  - View progress statistics (Total Reps, Accuracy, Sessions, Streak)
  - Browse all available exercises
  - Click "🎯 Start Exercise" on any exercise card
- **Flow**: Clicking an exercise → **Camera Exercise Page**

---

### **Camera Exercise Page** (`camera.html`)
- **Purpose**: Real-time AI-powered exercise tracking
- **Features**:
  - Live camera feed with AI pose detection
  - Real-time feedback on form and accuracy
  - Rep counter and stage tracking
  - Exercise timer
- **Controls**:
  - Start camera and exercise
  - Stop and end session
  - Results are automatically saved

---

### **Pain Assessment** (`pain.html`)
- **Purpose**: Track and rate your pain levels
- **Features**:
  - Visual pain scale (1-10)
  - Log pain for different body parts
  - Track pain progression over time
- **Access**: From the navigation menu at the top

---

### **Progress Tracker** (`progress.html`)
- **Purpose**: View detailed exercise history and progress
- **Features**:
  - View all completed exercises
  - Accuracy metrics
  - Rep counts
  - Exercise timeline
- **Access**: From the navigation menu at the top

---

### **Physiotherapist Directory** (`physio.html`)
- **Purpose**: Find and contact physiotherapists
- **Features**:
  - Browse available physiotherapists
  - View qualifications
  - Contact information
- **Access**: From the navigation menu at the top

---

## 📱 Navigation

Every page has a **Navigation Bar** at the top with links to:
- **Home** → index.html
- **Dashboard** → dashboard.html (Main hub for exercises)
- **Pain Assessment** → pain.html
- **Progress** → progress.html
- **Find Physio** → physio.html
- **Logout** → Clears data and returns to home

---

## 🔄 Application Flow Diagram

```
┌──────────────────┐
│   index.html     │ (Home Page)
│   (Entry Point)  │
└────────┬─────────┘
         │ "Get Started"
         ▼
┌──────────────────┐
│  dashboard.html  │ (Exercise Hub)
│  (Select Exercise)
└────────┬─────────┘
         │ "Start Exercise"
         ▼
┌──────────────────┐
│  camera.html     │ (AI Tracking)
│  (Do Exercise)   │
└────────┬─────────┘
         │ "End Session"
         ▼
┌──────────────────┐
│  → Save Results  │
│  → Back to Dashboard
└──────────────────┘

Accessible from Anywhere:
├─ pain.html (Rate pain)
├─ progress.html (View history)
├─ physio.html (Find therapist)
└─ index.html (Home)
```

---

## 🛠️ Backend Integration

All pages connect to these API endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/exercises` | GET | Fetch available exercises |
| `/api/exercises` | POST | Create new exercise |
| `/api/sessions` | GET/POST | Save exercise sessions |
| `/api/results` | GET/POST | Track exercise results |
| `/api/physio` | GET | Fetch physiotherapists |

---

## 📦 Key Files

**Core Application:**
- `index.html` - Home page
- `app.js` - Shared navigation and utilities
- `script.js` - Page-specific logic

**Exercise Pages:**
- `dashboard.html` - Exercise selection
- `camera.html` - AI pose tracking
- `camera.js` - Camera and pose detection logic

**Supporting Pages:**
- `pain.html` - Pain assessment
- `progress.html` - Progress tracking
- `physio.html` - Physiotherapist directory
- `style.css` - Global styling

---

## ✨ Features Connected

1. ✅ **Home Page** - Welcoming entry point
2. ✅ **Dashboard** - Exercise listing with stats
3. ✅ **Exercise Tracking** - Real-time AI pose detection
4. ✅ **Navigation** - Seamless page switching
5. ✅ **Pain Tracking** - Assessment tool
6. ✅ **Progress Monitoring** - History and analytics
7. ✅ **Physiotherapist Directory** - Professional finder

---

## 🎯 User Journey

1. User opens `index.html` (home page)
2. Clicks "🚀 Get Started" →  dashboard.html
3. Views available exercises on dashboard
4. Selects exercise → camera.html with AI tracking
5. Completes exercise and saves results
6. Can navigate to any page using top menu
7. Logout clears session and returns to home

---

## 🔐 Local Storage

The app uses browser localStorage for:
- Selected exercise name
- Session tokens
- User progress data

---

## 💡 Tips

- All pages have a **consistent navigation bar** at the top
- Use **"🚀 Get Started"** on home page to begin
- Results are **automatically saved** after each exercise
- Navigate freely between any pages using the **top menu**
- **Logout** clears all session data

---

**Your RehabAI application is ready to use! Start with the home page and follow the flow. 🎉**
