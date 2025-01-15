interface ReviewCardProps {
  content: string;
  created_at: string;
  rating: number;
}

export default function ReviewCard({
  content,
  created_at,
  rating,
}: ReviewCardProps) {
  return (
    <div className="review-card">
      <div className="stars">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
      <p>{content}</p>
      <footer>{created_at}</footer>
    </div>
  );
}
