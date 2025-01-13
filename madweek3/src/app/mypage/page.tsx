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

  const [roommate, setRoommate] = useState({
    user_id: loggedInUserId,
    age: "",
    budget: "",
    is_smoking: false,
    preferred_region: "",
    wishes: "",
    introduction: "",
    profile_image: "",
    phone: "",
    snoring: false,
  });

  useEffect(() => {
    const id = loggedInUserId;
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/profile_detail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: id,
          }),
        });

        const data = await response.json();
        console.log(data, "bbbb");
        setRoommate(data.profile);
        console.log(roommate, "aaaa");
      } catch (err) {
        console.error(err);
      }
    };

    if (loggedInUserId) {
      fetchProfile();
    }
  }, [loggedInUserId]);

  if (!roommate) {
    return <div>Loading...</div>;
  }
  console.log(loggedInUserName, "nnnaaammmeee");

  return (
    <div className="roommate-profile-container">
      <div className="profile-section">
        <ProfileCard
          name={loggedInUserName ? loggedInUserName : ""}
          age={Number(roommate.age)}
          introduction={roommate.introduction || "No introduction available"}
        />
        <DetailCard
          introduction={roommate.introduction || "No bio available."}
        />
        <Newsletter />
      </div>
      <div className="reviews-section">
        <ReviewGrid />
      </div>
    </div>
  );
}
