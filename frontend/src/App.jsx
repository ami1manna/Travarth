import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import RootLayout from './layout/RootLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Provider from './pages/Provider';
import PlanTrip from './pages/PlanTrip';
import Itinerary from './pages/Iterinary';
import CustomerDashboard from './pages/CustomerDashboard';
import Profile from './pages/Profile';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected / Nested Routes under RootLayout */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Home />} />
          <Route path="my-trip" element={<CustomerDashboard />} />
          <Route path="provider" element={<Provider />} />
          <Route path="create-trip" element={<PlanTrip />} />
          <Route path="iterinary/:id" element={<Itinerary />} />
          <Route path="profile" element={<Profile />} />
          <Route path="map" element={<Map/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
