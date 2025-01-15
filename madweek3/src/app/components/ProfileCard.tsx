"use client";

import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { useUser, SERVER_URL } from "../UserContext";

interface ProfileCardProps {
  name: string;
  age: number;
  introduction: string;
  profileId: number; // ID of the profile being displayed
  profileImage?: string; // Base64 image string
}

export default function ProfileCard({
  name,
  age,
  introduction,
  profileId,
  profileImage,
}: ProfileCardProps) {
  const { loggedInUserId } = useUser(); // Get the logged-in user ID from context
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [isLiked, setIsLiked] = useState(false); // Follow state
  const [loading, setLoading] = useState(true); // Loading state for follow status

  const imageUrl = profileImage
    ? `data:image/jpeg;base64,${profileImage}` // Combine server URL with the relative path
    : ""; // Default to empty if no image provided
  console.log("imageurl", imageUrl);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!loggedInUserId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${SERVER_URL}/following`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            follower_id: loggedInUserId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching following list:", errorData.message);
          return;
        }

        const data = await response.json();
        const followingIds = data.following_ids || [];
        setIsLiked(followingIds.includes(profileId)); // Check if profileId is in the list
      } catch (error) {
        console.error("Error checking if liked:", error);
      } finally {
        setLoading(false);
      }
    };

    checkIfLiked();
  }, [loggedInUserId, profileId]);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const toggleLike = async () => {
    try {
      const url = isLiked ? `${SERVER_URL}/unfollow` : `${SERVER_URL}/follow`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          follower_id: loggedInUserId,
          following_id: profileId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          `Failed to ${isLiked ? "unfollow" : "follow"}: ${errorData.message}`
        );
        return;
      }

      const message = isLiked
        ? "Unfollowed successfully!"
        : "Followed successfully!";
      alert(message);

      // Toggle the follow state
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling follow state:", error);
      alert("An error occurred while updating the follow state.");
    }
  };

  const handleSubmitReview = async (review: {
    content: string;
    rating: number;
  }) => {
    if (!loggedInUserId) {
      alert("You must be logged in to submit a review.");
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewer_id: loggedInUserId, // The logged-in user ID
          reviewee_id: profileId, // The ID of the profile being reviewed
          rating: review.rating, // Rating between 1-5
          content: review.content, // Review text
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to submit review: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      alert("Review submitted successfully!");
      console.log("Review submitted:", data);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review.");
    } finally {
      setIsPopupVisible(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-card">
      <div className="avatar">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "100px", height: "100px", background: "#ccc" }}>
            No Image
          </div>
        )}
      </div>
      <div className="details">
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>Introduction: {introduction}</p>
        <button
          className="heart-button text-2xl hover:scale-110 transition-transform"
          onClick={toggleLike}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
        {isLiked && (
          <button
            className="write-review-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleOpenPopup}
          >
            Write a Review
          </button>
        )}
        <Popup
          title="Write a Review"
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          onSubmit={handleSubmitReview}
        />
      </div>
    </div>
  );
}
