import ReviewCard from "../../components/ReviewCard";

export default function ReviewGrid() {
  const reviews = [
    {
      title: "Great Roommate",
      body: "Very clean and respectful.",
      reviewer: "John",
      date: "2023-01-01",
      stars: 5,
    },
    {
      title: "Friendly",
      body: "Always helpful and fun to live with.",
      reviewer: "Jane",
      date: "2023-01-02",
      stars: 4,
    },
  ];

  return (
    <section className="review-grid">
      <h3>Reviews</h3>
      <div className="grid">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
}
