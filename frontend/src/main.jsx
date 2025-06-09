import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './components/theme-provider.js'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  </StrictMode>
);




