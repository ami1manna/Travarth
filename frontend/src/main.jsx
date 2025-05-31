import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from './component/theme-provider.js'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ThemeProvider>
    <AuthProvider>
    <App />
    <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)




