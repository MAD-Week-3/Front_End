"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import ProfileCard from "@/app/components/ProfileCard";
import ReviewGrid from "../components/review-grid";
import Newsletter from "../components/newsletter";
import DetailCard from "@/app/components/DetailCard";
import { useUser, SERVER_URL } from "../UserContext";

export default function MyPage() {
  const { loggedInUserId, loggedInUserName } = useUser();
  const [reviews, setReviews] = useState<
    { content: string; created_at: string; rating: number }[]
  >([]);
  const [roommate, setRoommate] = useState<any>(null); // Start with `null` for better error handling
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message

  useEffect(() => {
    const fetchProfile = async () => {
      if (!loggedInUserId) {
        setErrorMessage("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${SERVER_URL}/profile_detail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: loggedInUserId,
          }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            setErrorMessage("No profile found for the logged-in user.");
          } else {
            throw new Error(`Error fetching profile: ${response.statusText}`);
          }
          setLoading(false);
          return;
        }

        const data = await response.json();

        console.log("data", data);
        if (data && data.profile) {
          setRoommate(data.profile);
          setErrorMessage(null);
        } else {
          setErrorMessage("Failed to load profile data.");
        }
        
        if (data.success && Array.isArray(data.reviews)) {
          // Map the reviews array to extract content, created_at, and rating
          const formattedReviews = data.reviews.map((review: any) => ({
            content: review.content,
            created_at: review.created_at,
            rating: review.rating,
          }));
          console.log("formmatedreviews", formattedReviews);

          setReviews(formattedReviews); // Set the state with the formatted data
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [loggedInUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!roommate) {
    return (
      <div className="error-container">
        <h1>No Profile Data</h1>
        <p>Something went wrong while loading the profile.</p>
      </div>
    );
  }

  console.log("reviews", reviews);

  return (
    <div className="roommate-profile-container">
      <div className="profile-section">
        <ProfileCard
          name={roommate.name || loggedInUserName || "Anonymous"}
          age={roommate.age || "N/A"}
          introduction={roommate.introduction || "No introduction available"}
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
