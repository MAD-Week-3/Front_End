interface ReviewCardProps {
    title: string;
    body: string;
    reviewer: string;
    date: string;
    stars: number;
  }
  
  export default function ReviewCard({
    title,
    body,
    reviewer,
    date,
    stars,
  }: ReviewCardProps) {
    return (
      <div className="review-card">
        <div className="stars">
          {"★".repeat(stars)}
          {"☆".repeat(5 - stars)}
        </div>
        <h4>{title}</h4>
        <p>{body}</p>
        <footer>
          {reviewer} - {date}
        </footer>
      </div>
    );
  }
  