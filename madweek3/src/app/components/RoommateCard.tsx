import React from "react";
import Link from "next/link";

interface RoommateCardProps {
  id: number;
  name: string;
  age: number;
  profileImage: string;
}

export default function RoommateCard({ id, name, age }: RoommateCardProps) {
  return (
    <div className="roommate-card">
      <div className="roommate-avatar">
        <img src="/placeholder-avatar.png" alt={`${name} avatar`} />
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
