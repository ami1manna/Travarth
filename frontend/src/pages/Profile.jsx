import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import LoadingScreen from "../components/LoadingScreen";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile");
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch profile data");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData?.username}</h1>
                <p className="text-gray-600">Member since {new Date(userData?._id).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{userData?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-gray-800 capitalize">{userData?.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded">
                    <Shield className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-gray-800">Active Sessions</p>
                    <p className="text-sm text-gray-500">{userData?.tokens?.length} active sessions</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout All Sessions</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/create-trip")}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors"
              >
                <span>Plan New Trip</span>
              </button>
              <button
                onClick={() => navigate("/my-trip")}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
              >
                <span>View My Trips</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 