"use client";

import { useState } from "react";
import Popup from "./popup";

interface ProfileCardProps {
  name: string;
  age: number;
  preferences: string;
}

export default function ProfileCard({
  name,
  age,
  preferences,
}: ProfileCardProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSubmitReview = () => {
    console.log("Review submitted!");
    setIsPopupVisible(false);
  };

  return (
    <div className="profile-card">
      <div className="avatar"></div>
      <div className="details">
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>Preferences: {preferences}</p>
        <div className="dropdowns">
          <select>
            <option>Recent Rating</option>
          </select>
          <select>
            <option>Preferred Value</option>
          </select>
        </div>
        <button>❤️</button>
        <button
          className="write-review-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleOpenPopup}
        >
          Write Review
        </button>
        <Popup
          title="write a review"
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          onSubmit={handleSubmitReview}
        />
      </div>
    </div>
  );
}
