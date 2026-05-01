# RehabAI: AI-Powered Rehabilitation Platform

RehabAI is an AI-based home physical therapy coaching system designed to assist patients in performing rehabilitation exercises correctly without continuous supervision from a physical therapist.

The system uses computer vision and machine learning techniques to detect human body posture, analyze movements in real time, and provide instant feedback on exercise accuracy. RehabAI aims to make physical therapy more accessible, affordable, and effective for patients recovering from injuries or mobility issues.

---

## ✨ Fully Connected Application

All pages are seamlessly connected with:
- ✅ Unified navigation menu on every page
- ✅ Exercise dashboard linking to AI tracking
- ✅ Automatic result saving
- ✅ Progress monitoring across sessions
- ✅ Pain assessment integration
- ✅ Physiotherapist directory access
- ✅ Responsive design for all devices

**Start with the home page → Select exercises → Track with AI → View progress → All from intuitive navigation!**

See [QUICK_START.md](QUICK_START.md) for immediate setup instructions.

---

## 🚀 Key Features
- Real-time pose detection using MediaPipe
- Exercise recognition and repetition counting
- Posture correction feedback
- Accuracy and progress tracking
- Pain level assessment
- Physiotherapist directory
- Progress monitoring
- Home-based therapy assistance
- User-friendly web interface

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **AI**: MediaPipe Pose Detection
- **Authentication**: JWT
- **Database**: MongoDB with Mongoose

---

## 📋 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Webcam for pose detection

---

## 🏃‍♂️ Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd RehabAI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/rehabai
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Seed Sample Data (Optional)
You can add sample exercises and doctors via the API endpoints:
- POST `/api/exercises` to add exercises
- POST `/api/physio` to add physiotherapists

### 6. Run the Application
```bash
npm start
```

### 7. Access the Application
Open your browser and go to `http://localhost:5000`

---

## 📱 Usage
1. **Dashboard**: View available exercises
2. **Start Exercise**: Click on an exercise to begin AI-tracked session
3. **Camera Validation**: Grant camera permissions for pose detection
4. **Track Progress**: View your exercise history and accuracy
5. **Pain Assessment**: Rate your pain level for personalized recommendations
6. **Find Physiotherapists**: Search for local physiotherapy services

---

## 📌 API Endpoints
- `GET /api/exercises` - Get all exercises
- `POST /api/exercises` - Add new exercise
- `GET /api/physio` - Get physiotherapists
- `POST /api/physio` - Add physiotherapist
- `POST /api/results` - Save exercise results
- `GET /api/results` - Get user results

---

## 📂 Project Structure
```
RehabAI/
├── server.js              # Main server file
├── package.json           # Dependencies
├── routes/                # API routes
│   ├── authRoutes.js
│   ├── exerciseRoutes.js
│   ├── physioRoutes.js
│   ├── result.js
│   └── sessionRoutes.js
├── models/                # MongoDB models
│   ├── User.js
│   ├── Exercise.js
│   ├── Session.js
│   └── doctors.js
├── middleware/
│   └── authMiddleware.js
├── frontend/              # Static web files
│   ├── index.html         # Landing page
│   ├── dashboard.html     # Main dashboard
│   ├── camera.html        # Exercise tracking
│   ├── progress.html      # Progress view
│   ├── pain.html          # Pain assessment
│   ├── physio.html        # Physiotherapist search
│   ├── style.css          # Global styles
│   └── *.js               # Frontend scripts
└── README.md
```

---

## 🔧 Development
- Use `npm run dev` for development with nodemon
- Frontend files are served statically from `/frontend`
- API responses use JSON format
- Authentication uses JWT tokens stored in localStorage

---

## 📌 Use Cases
- Post-injury rehabilitation
- Elderly physical therapy assistance
- Remote patient monitoring
- Home workout posture correction
- Chronic pain management

---

## 📂 Project Status
✅ Core functionality implemented  
🔧 Currently under development  
Future updates will include voice feedback and personalized exercise plans.

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License.
