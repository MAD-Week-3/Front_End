import React from "react";
import Link from "next/link";

interface RoommateCardProps {
  id: number;
  name: string;
  age: number;
  profileImage: string;
}

export default function RoommateCard({
  id,
  name,
  age,
  profileImage,
}: RoommateCardProps) {
  const imageUrl = profileImage
    ? `data:image/jpeg;base64,${profileImage}` // Combine server URL with the relative path
    : ""; // Default to empty if no image provided
  console.log(imageUrl);
  return (
    <div className="roommate-card">
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
      <div className="roommate-details">
        <Link href={`/roommates/${id}`}>
          <h3 className="roommate-name">{name}</h3>
        </Link>
        <p className="roommate-age">Age: {age}</p>
      </div>
    </div>
  );
}
