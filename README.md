# Travarth 🌍

> **Your Intelligent Travel Companion** - A comprehensive travel planning application that transforms the way you plan, organize, and experience your journeys.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com/)

## ✨ Features

### 🎯 Smart Trip Planning
- **AI-Powered Assistant**: Integrated Gemini AI chatbot for personalized travel recommendations
- **Interactive Itinerary Builder**: Day-by-day schedule creation with activity management
- **Budget Tracking**: Real-time expense monitoring and budget optimization
- **Weather Integration**: Live weather updates for your destinations

### 🗺️ Location Intelligence
- **Interactive Maps**: Leaflet-powered mapping with place discovery
- **Location Search**: Advanced place search and recommendation system
- **Route Planning**: Optimized travel route suggestions

### 👥 User Experience
- **Dual User Roles**: Customer and Service Provider dashboards
- **Real-time Collaboration**: Share and collaborate on travel plans
- **Export Functionality**: Generate PDF itineraries for offline access
- **Responsive Design**: Seamless experience across all devices

### 🔒 Security & Performance
- **JWT Authentication**: Secure token-based authentication system
- **Protected Routes**: Role-based access control
- **Response Caching**: Optimized performance with intelligent caching
- **CORS Protection**: Enhanced security for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travarth.git
   cd travarth
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   
   # AI Integration
   GEMINI_API_KEY=your_gemini_api_key
   
   # Server
   PORT=5000
   NODE_ENV=development
   ```

4. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd ../frontend
   
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

## 🏗️ Architecture

### Backend (Node.js + Express)
```
backend/
├── controllers/          # Business logic
│   └── chatBotController.js
├── models/              # Database schemas
│   ├── UserModel.js
│   └── TravelPlanModel.js
├── routes/              # API endpoints
│   ├── AuthRoutes.js
│   ├── TravelPlanRoutes.js
│   └── placeRoutes.js
├── middleware/          # Custom middleware
├── utils/              # Utility functions
├── config/             # Configuration files
└── server.js           # Application entry point
```

### Frontend (React + Vite)
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # State management
│   ├── services/      # API integration
│   ├── layout/        # Layout components
│   └── assets/        # Static assets
├── public/            # Public files
└── configuration files
```

## 🔗 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile |
| POST | `/api/auth/logout` | User logout |

### Travel Plan Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/travelplans` | Get all travel plans |
| POST | `/api/travelplans` | Create new travel plan |
| GET | `/api/travelplans/:id` | Get specific travel plan |
| PUT | `/api/travelplans/:id` | Update travel plan |
| DELETE | `/api/travelplans/:id` | Delete travel plan |

### Location Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/map/places` | Search places |
| GET | `/api/map/places/:id` | Get place details |

### AI Chatbot
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Interact with travel assistant |

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Google Gemini AI
- **Deployment**: Vercel

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Maps**: Leaflet
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Notifications**: React Toastify

## 🎨 Key Features Deep Dive

### AI-Powered Travel Assistant
The integrated Gemini AI chatbot provides:
- Personalized destination recommendations
- Real-time travel advice
- Context-aware responses based on your travel plans
- Budget optimization suggestions
- Weather-based activity recommendations

### Comprehensive Travel Planning
- **Multi-day Itineraries**: Create detailed day-by-day schedules
- **Budget Management**: Track expenses across categories
- **Weather Integration**: Plan activities based on forecasts
- **Sustainability Scoring**: Eco-friendly travel options
- **Emergency Contacts**: Safety-first approach to travel planning

### Interactive Maps & Location Services
- **Place Discovery**: Find attractions, restaurants, and accommodations
- **Route Optimization**: Smart travel route suggestions
- **Real-time Location Data**: Up-to-date place information
- **Custom Markers**: Personalize your travel map

## 🚀 Deployment

### Backend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel --prod
```

### Frontend Deployment
```bash
# Build for production
cd frontend
npm run build

# Deploy to your preferred platform
npm run deploy
```

### Environment Variables (Production)
Ensure these environment variables are set in your deployment platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `NODE_ENV=production`

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

# Run e2e tests
npm run test:e2e
```

## 📱 Screenshots

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Dashboard | ![image](https://github.com/user-attachments/assets/5e7a665e-fd8e-49f6-be16-736d3653a103)| ![image](https://github.com/user-attachments/assets/a5008569-c78c-4dc2-b01f-2db4684b6eb9)
|
| Trip Planning | ![Planning](screenshots/planning.png) | ![Mobile Planning](screenshots/mobile-planning.png) |
| AI Assistant | ![Chatbot](screenshots/chatbot.png) | ![Mobile Chat](screenshots/mobile-chat.png) |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

### Phase 1 (Current)
- [x] Core travel planning functionality
- [x] AI chatbot integration
- [x] User authentication
- [x] Basic trip management

### Phase 2 (In Progress)
- [ ] Enhanced mobile responsiveness
- [ ] Offline functionality (PWA)
- [ ] Social sharing features
- [ ] Multi-language support

### Phase 3 (Planned)
- [ ] Advanced analytics
- [ ] Real-time collaboration
- [ ] Third-party integrations (booking APIs)
- [ ] Machine learning recommendations

## 🐛 Known Issues

- [ ] Enhanced password validation needed
- [ ] Rate limiting implementation pending
- [ ] Comprehensive error logging required

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for intelligent travel assistance
- [Leaflet](https://leafletjs.com/) for interactive mapping
- [React Community](https://reactjs.org/community/support.html) for excellent documentation
- All contributors who help make Travarth better

## 📞 Support

- 📧 Email: support@travarth.com
- 💬 Discord: [Join our community](https://discord.gg/travarth)
- 📖 Documentation: [docs.travarth.com](https://docs.travarth.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/travarth/issues)

---

<div align="center">
  <p>Made with ❤️ for travelers worldwide</p>
  <p>
    <a href="#top">⬆️ Back to Top</a>
  </p>
</div>
