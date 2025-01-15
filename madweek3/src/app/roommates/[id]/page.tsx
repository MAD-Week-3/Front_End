"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import ProfileCard from "@/app/components/ProfileCard";
import ReviewGrid from "../../components/review-grid";
import Newsletter from "../../components/newsletter";
import DetailCard from "@/app/components/DetailCard";
import { useUser, SERVER_URL } from "../../UserContext";

export default function RoommateProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // ID from route
  const [roommate, setRoommate] = useState<any>(null);
  const [reviews, setReviews] = useState<
    { content: string; created_at: string; rating: number }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileAndReviews = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/profile_detail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: id,
          }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            setErrorMessage("Roommate profile not found.");
          } else {
            throw new Error("Failed to fetch profile and reviews.");
          }
          return;
        }

        const data = await response.json();
        setRoommate(data.profile);
        if (data.success && Array.isArray(data.reviews)) {
          // Map the reviews array to extract content, created_at, and rating
          const formattedReviews = data.reviews.map((review: any) => ({
            content: review.content,
            created_at: review.created_at,
            rating: review.rating,
          }));
          setReviews(formattedReviews); // Set the state with the formatted data
        }
        setErrorMessage(null);
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred while fetching profile details.");
      }
    };

    if (id) {
      fetchProfileAndReviews();
    }
  }, [id]);

  if (errorMessage) {
    return (
      <div className="error-container">
        <h1>Roommate Not Found</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!roommate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="roommate-profile-container">
      <div className="profile-section">
        <ProfileCard
          name={roommate.name}
          age={roommate.age}
          introduction={roommate.introduction || "No preferences available"}
          profileId={roommate.user_id}
          profileImage={roommate.photo_base64 || ""} // Pass Base64 image
        />
        <DetailCard
          introduction={roommate.introduction || "No bio available."}
        />
        <Newsletter />
      </div>
      <div className="reviews-section">
        <ReviewGrid reviews={reviews} />
      </div>
    </div>
  );
}
