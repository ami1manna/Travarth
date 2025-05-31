import { Link } from "react-router-dom"
import { ChevronRight, Globe, Sun } from "lucide-react"

import NewsletterSignup from "../component/newsletter-signup"
import FeatureCard from "../component/feature-card"
import DestinationCard from "../component/destination-card"
import ReviewCard from "../component/review-card"
import Navbar from "../components/Navbar"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export default function HomePage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="min-h-screen bg-background text-foreground">


      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/travel/600/400"
            alt="Sustainable travel"
            className="object-cover w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover the World Sustainably. Let AI Guide You.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Plan eco-friendly trips, connect with local communities, and make a positive impact on the planet while creating unforgettable memories.
            </p>
            {(user == null || user.role === "user") && (
              <Link
                to="/create-trip"
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Plan Your Trip
              </Link>
            )}

            {(user == null || user.role === "provider") && (
              <button className="px-6 py-3 border border-border rounded-md text-lg hover:bg-muted transition-colors">
                Offer Your Services
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How We Make Travel Better</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="ai"
              title="AI-based Trip Planning"
              description="Our advanced AI analyzes your preferences and creates personalized itineraries that match your interests and values."
            />
            <FeatureCard
              icon="eco"
              title="Eco-friendly Recommendations"
              description="Discover accommodations, activities, and transportation options that minimize your environmental footprint."
            />
            <FeatureCard
              icon="community"
              title="Local Community Support"
              description="Connect with local guides, artisans, and businesses that benefit from sustainable tourism practices."
            />
            <FeatureCard
              icon="personalized"
              title="Personalized Travel Guides"
              description="Access detailed guides tailored to your interests, with insider tips from locals and fellow travelers."
            />
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Destinations</h2>
            <Link href="/destinations" className="text-green-500 hover:text-green-600 flex items-center">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DestinationCard
              image="https://picsum.photos/seed/costa-rica/600/400"
              title="Costa Rica"
              description="Rainforests, beaches, and biodiversity"
              ecoScore={92}
            />
            <DestinationCard
              image="https://picsum.photos/seed/slovenia/600/400"
              title="Slovenia"
              description="Alpine lakes, forests, and sustainable cities"
              ecoScore={95}
            />
            <DestinationCard
              image="https://picsum.photos/seed/bhutan-monastery/600/400"
              title="Bhutan"
              description="Carbon-negative country with pristine landscapes"
              ecoScore={98}
            />
          </div>
        </div>
      </section>

      {/* Community Reviews */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard
              name="Sarah J."
              location="New York, USA"
              review="EcoTravelAI helped me plan a zero-waste trip to Bali. The local connections and sustainable accommodations made all the difference!"
              rating={5}
              avatar="https://randomuser.me/api/portraits/women/75.jpg"
            />
            <ReviewCard
              name="Miguel R."
              location="Barcelona, Spain"
              review="As a homestay owner, this platform has connected me with conscious travelers who appreciate our sustainable practices."
              rating={5}
              avatar="https://randomuser.me/api/portraits/men/75.jpg"
            />
            <ReviewCard
              name="Aisha K."
              location="Nairobi, Kenya"
              review="The AI recommendations were spot on! I discovered hidden gems and supported local communities throughout my journey."
              rating={4.5}
              avatar="https://ui-avatars.com/api/?name=Aisha+K"
            />
          </div>
        </div>
      </section>

      {/* Eco-Score Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Real-time Eco-Score Indicators</h2>
                <p className="text-muted-foreground mb-6">
                  Our proprietary Eco-Score system helps you understand the environmental impact of your travel choices.
                  Make informed decisions that align with your values and minimize your carbon footprint.
                </p>
                <button className="bg-green-600 hover:bg-green-700">Learn How It Works</button>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full border-8 border-green-200 dark:border-green-800/30"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent animate-spin-slow"></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-5xl font-bold text-green-600 dark:text-green-400">85</span>
                    <span className="text-sm text-muted-foreground">Global Average Eco-Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  )
}
