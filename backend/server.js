import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/AuthRoutes.js';
import travelPlanRoutes from './routes/TravelPlanRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import chatRoutes from './routes/chatBotRoute.js';
const app = express();

// Middleware

app.use(express.json());


app.use(cors({
  origin: ['https://travart.netlify.app', 'http://localhost:5173'], // Allow both production and local frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true 
}));

// Connect to MongoDB
connectDB();

// Sample route
app.get('/api', (req, res) => {
    res.send('Hello from MERN backend!');
});


// User Operation
app.use('/api/auth', userRoutes);
app.use("/api/travelplans", travelPlanRoutes);
app.use("/api/map", placeRoutes);
app.use("/api/chat", chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // Default Route

// // Export for Vercel
// At the end of server.js, replace the export with:
export const handler = (req, res) => {
  return app(req, res);
};
export default app;