import { Star, StarHalf } from "lucide-react";

function ReviewCard({ name, location, review, rating, avatar }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={avatar || "/placeholder.svg"} alt={name} className="object-cover w-full h-full" />
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">"{review}"</p>
      <div className="flex">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        ))}
        {rating % 1 !== 0 && <StarHalf className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
      </div>
    </div>
  );
}

export default ReviewCard;
