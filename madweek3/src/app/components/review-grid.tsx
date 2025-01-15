"use client";

import React from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewGrid({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="review-grid">
        <h3>Reviews</h3>
        <p>No reviews available for this user.</p>
      </section>
    );
  }

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
