import { useContext, useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User, Globe, Sun } from "lucide-react"
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [role, setRole] = useState("customer")

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/'); // Redirect after successful signup
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col text-gray-900 dark:text-white">
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white w-4 h-4"
                >
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                  <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
                  <path d="M12 12 2.1 12.5" />
                  <path d="m4.5 15 5 5" />
                  <path d="m4.5 9 5-5" />
                </svg>
              </div>
            </div>
            <div className="font-bold text-lg">EcoTravelAI</div>
          </Link>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Globe className="w-5 h-5" />
              <span className="sr-only">Change Language</span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Sun className="w-5 h-5" />
              <span className="sr-only">Toggle Theme</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join our sustainable travel community</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-2 mb-4 border rounded overflow-hidden">
              <button
                className={`py-2 px-4 text-center ${
                  role === "customer"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-transparent text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setRole("customer")}
              >
                Customer
              </button>
              <button
                className={`py-2 px-4 text-center ${
                  role === "provider"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-transparent text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setRole("provider")}
              >
                Service Provider
              </button>
            </div>

            {role === "customer" && (
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block mb-1 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <Link href="/terms" className="text-green-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-green-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Create Account
                </button>
              </form>
            )}

            {role === "provider" && (
              <form className="space-y-4">
                <div>
                  <label htmlFor="provider-name" className="block mb-1 font-medium">
                    Business Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="provider-name"
                      type="text"
                      placeholder="Your Business Name"
                      className="pl-10 w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="provider-email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="provider-email"
                      type="email"
                      placeholder="business@email.com"
                      className="pl-10 w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="provider-password" className="block mb-1 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="provider-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <input type="checkbox" id="provider-terms" required />
                  <label htmlFor="provider-terms">
                    I agree to the{" "}
                    <Link href="/terms" className="text-green-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-green-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Create Account
                </button>
              </form>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="w-full border rounded py-2 flex justify-center items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="..." fill="#4285F4" />
                  {/* Google SVG paths trimmed for brevity */}
                </svg>
                Google
              </button>
              <button className="w-full border rounded py-2 flex justify-center items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="..." fill="currentColor" />
                  {/* LinkedIn SVG paths trimmed for brevity */}
                </svg>
                LinkedIn
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
