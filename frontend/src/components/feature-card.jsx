import { BrainCircuit, Leaf, Users, Map } from "lucide-react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon === "ai" && <BrainCircuit className="w-6 h-6 text-green-600 dark:text-green-400" />}
        {icon === "eco" && <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />}
        {icon === "community" && <Users className="w-6 h-6 text-green-600 dark:text-green-400" />}
        {icon === "personalized" && <Map className="w-6 h-6 text-green-600 dark:text-green-400" />}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeatureCard;
