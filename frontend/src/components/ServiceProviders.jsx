import React from "react";
import vendors from "../data/vendors.json";
import guides from "../data/guides.json";
import artisans from "../data/artisans.json";
import homestays from "../data/homestays.json";
import { MapPin, Star, IndianRupee } from "lucide-react";

const Card = ({ item, type }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-xs mx-auto border-2 border-green-100 hover:border-green-300">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="h-52 w-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {type}
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-green-200 pb-2">{item.name}</h2>
        
        {/* Vendor */}
        {type === "vendor" && (
          <>
            <p className="text-sm text-gray-600 font-medium">{item.tagline}</p>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <MapPin size={16} className="text-green-500" />
              <span>{item.location}</span>
            </div>
            <p className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full inline-block">{item.category}</p>
          </>
        )}

        {/* Guide */}
        {type === "guide" && (
          <>
            <p className="text-sm text-gray-600 font-medium">{item.specialty}</p>
            <p className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">Languages: {item.languages.join(", ")}</p>
            <div className="flex items-center text-sm text-green-700 gap-1 font-medium">
              <IndianRupee size={16} className="text-green-600" />
              <span>{item.price}</span>
            </div>
          </>
        )}

        {/* Artisan */}
        {type === "artisan" && (
          <>
            <p className="text-sm text-gray-600 font-medium">{item.craft}</p>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <MapPin size={16} className="text-green-500" />
              <span>{item.location}</span>
            </div>
            <p className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full inline-block">{item.priceRange}</p>
          </>
        )}

        {/* Homestay */}
        {type === "homestay" && (
          <>
            <p className="text-sm text-gray-600 font-medium">{item.tagline}</p>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <MapPin size={16} className="text-green-500" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center text-sm text-green-700 gap-1 font-medium">
              <IndianRupee size={16} className="text-green-600" />
              <span>{item.pricePerNight} / night</span>
            </div>
          </>
        )}

        <div className="flex items-center gap-1 text-green-600 font-medium mt-2 bg-green-50 px-3 py-1 rounded-full inline-block">
          <Star size={18} fill="currentColor" className="text-green-500" />
          <span>{item.rating}</span>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data, type }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold mb-6 text-green-800 border-l-4 border-green-500 pl-4">{title}</h2>
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => (
        <Card key={item.id} item={item} type={type} />
      ))}
    </div>
  </div>
);

const TravelCards = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-green-50 to-white min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Discover Local Experiences</h1>
        <p className="text-green-600 max-w-2xl mx-auto">Connect with authentic local vendors, guides, artisans, and homestays for an unforgettable travel experience.</p>
      </header>
      <Section title="Local Vendors" data={vendors} type="vendor" />
      <Section title="Guides" data={guides} type="guide" />
      <Section title="Artisans" data={artisans} type="artisan" />
      <Section title="Homestays" data={homestays} type="homestay" />
      <footer className="mt-16 pt-8 border-t border-green-200 text-center text-green-600 text-sm">
        <p>© 2025 Green Travel Experiences</p>
      </footer>
    </div>
  );
};

export default TravelCards;