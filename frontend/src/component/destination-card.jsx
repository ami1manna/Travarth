import { ArrowRight } from "lucide-react";

function DestinationCard({ image, title, description, ecoScore }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full flex items-center">
          <Leaf className="w-3 h-3 mr-1" />
          {ecoScore}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <a
          href={`/destinations/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium flex items-center"
        >
          Explore <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}

function Leaf(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export default DestinationCard;
