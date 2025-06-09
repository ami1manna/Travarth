import React, { useState, useContext } from "react";
import { Menu, X, Globe, Sun } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { name: "Plan Trip", href: "/create-trip" },
    { name: "My Trips", href: "/my-trip" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className=" z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white w-6 h-6"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
                <path d="M12 12 2.1 12.5" />
                <path d="m4.5 15 5 5" />
                <path d="m4.5 9 5-5" />
              </svg>
            </div>
          </div>
          <div>
            <div className="font-bold text-xl">Eco</div>
            <div className="font-bold text-xl flex items-center">
              Travel<span className="text-green-500 ml-1">AI</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-muted-foreground hover:text-foreground transition-all hover:underline underline-offset-4 ${
                  isActive ? "font-semibold text-foreground underline" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {user ? (
            <>
              <span className="text-muted-foreground">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {/* Icons */}
          
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-muted-foreground hover:text-foreground py-2 ${
                    isActive ? "font-semibold text-foreground" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {user ? (
              <>
                <span className="text-muted-foreground py-2 text-center">
                  Hi, {user.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="py-2 px-4 rounded-md border border-border hover:bg-muted text-center transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-4 border border-border rounded-md text-center hover:bg-muted transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-4 bg-green-500 text-white rounded-md text-center hover:bg-green-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
