import { createContext, useState, useEffect } from "react";
import axios from "../services/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            axios.get("/api/auth/profile")
            .then(response => setUser(response.data.user))
            .catch(() => {
                localStorage.removeItem("authToken");
                setUser(null);
                toast.error("Session expired. Please log in again.");
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // In AuthContext.jsx, modify the login function:
const login = async (email, password) => {
    try {
        // Debug what you're sending
        console.log("Attempting login with:", { email, password });
        
        // Make sure both values exist
        if (!email || !password) {
            toast.error("Email and password are required");
            throw new Error("Email and password are required");
        }
        
        const response = await axios.post("/api/auth/login", { 
            email: email.trim(), 
            password: password.trim()
        });
        
        const { token } = response.data;
        localStorage.setItem("authToken", token);

        const profile = await axios.get("/api/auth/profile");

        setUser(profile.data.user);
        toast.success("Logged in successfully!");
    } catch (error) {
        console.error("Login failed:", error);
        toast.error(
            error?.response?.data?.message || 
            "Login failed. Please check your credentials and try again."
        );
        throw error;
    }
};

    const register = async (username ,email, password , role ) => {
        try {
            // console.log("Attempting registration with:", { email, username, password });
            const response = await axios.post("/api/auth/register", { email,username, password,role });
            const { token } = response.data;

            localStorage.setItem("authToken", token);

            const profile = await axios.get("/api/auth/profile");

            setUser(profile.data.user);
            toast.success("Account created successfully!");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error(error?.response?.data?.message || "Registration failed. Try again.");
            throw error;
        }
    };

    const logout = async () => {
        const token = localStorage.getItem("authToken");
        try {
            if (token) {
                await axios.post("/api/auth/logout");
            }
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed. Please try again.");
        } finally {
            localStorage.removeItem("authToken");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
