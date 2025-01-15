import React, { useState } from "react";

interface PopupProps {
  title: string; // Title of the popup
  isVisible: boolean; // Whether the popup is visible
  onClose: () => void; // Function to close the popup
  onSubmit: (review: { content: string; rating: number }) => void; // Function to handle the submitted review
}

export default function Popup({
  title,
  isVisible,
  onClose,
  onSubmit,
}: PopupProps) {
  const [content, setContent] = useState(""); // Review content
  const [rating, setRating] = useState(1); // Rating value

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5.");
      return;
    }

    if (!content.trim()) {
      alert("Review content cannot be empty.");
      return;
    }

    onSubmit({ content, rating });
    setContent("");
    setRating(1);
  };

  if (!isVisible) return null;

  return (
    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="popup-dialog bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <textarea
          className="w-full h-24 border p-2 rounded mb-4"
          placeholder="Write your review here..."
          value={content}
          onChange={handleContentChange}
        />
        <select
          value={rating}
          onChange={handleRatingChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
