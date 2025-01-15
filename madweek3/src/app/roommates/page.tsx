"use client";

import React, { useEffect, useState } from "react";
import RoommateCard from "../components/RoommateCard";
import { SERVER_URL, useUser } from "../UserContext";

interface Roommate {
  user_id: string;
  age: string;
  name?: string;
  photo_url?: string;
}

export default function Roommates() {
  const { loggedInUserId } = useUser(); // Fetch logged-in user ID
  const [roommates, setRoommates] = useState<Roommate[]>([]); // Store roommates
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error state
  const fetchGoodRoommates = async () => {
    if (!loggedInUserId) {
      setErrorMessage("User is not logged in.");
      setLoading(false);
      return;
    }

    try {
      // Fetch user_id and age
      const response1 = await fetch(`${SERVER_URL}/recommend_roommates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: loggedInUserId,
        }),
      });

      if (!response1.ok) {
        throw new Error("Failed to fetch user_id and age.");
      }

      const data1 = await response1.json();

      if (!data1.success) {
        throw new Error(
          data1.message || "An error occurred while fetching user_id and age."
        );
      }

      const ageData = data1.recommendations || []; // Assume data.users contains the age information
      console.log("ageData", ageData);

      // Fetch user_id and name
      const response2 = await fetch(`${SERVER_URL}/user_name`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (!response2.ok) {
        throw new Error("Failed to fetch user_id and name.");
      }

      const data2 = await response2.json();

      if (!data2.success) {
        throw new Error(
          data2.message || "An error occurred while fetching user_id and name."
        );
      }

      const nameData = data2.users || []; // Assume data.users contains the name information

      // Merge ageData and nameData based on user_id
      const mergedData = ageData
        .filter(
          (ageItem: any) =>
            ageItem.user_id !== loggedInUserId && ageItem.similarity > 0.5
        ) // Exclude loggedInUserId
        .map((ageItem: any) => {
          const nameItem = nameData.find(
            (name: any) => name.user_id === ageItem.user_id
          );
          return {
            user_id: ageItem.user_id,
            age: ageItem.age,
            name: nameItem ? nameItem.name : "Unknown",
            photo_url: ageItem.photo_base64,
          };
        });

      setRoommates(mergedData); // Store the merged data
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching roommates:", error);
      setErrorMessage("An error occurred while fetching roommates.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchRoommates = async () => {
      if (!loggedInUserId) {
        setErrorMessage("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user_id and age
        const response1 = await fetch(`${SERVER_URL}/all_users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (!response1.ok) {
          throw new Error("Failed to fetch user_id and age.");
        }

        const data1 = await response1.json();

        if (!data1.success) {
          throw new Error(
            data1.message || "An error occurred while fetching user_id and age."
          );
        }

        const ageData = data1.users || []; // Assume data.users contains the age information

        // Fetch user_id and name
        const response2 = await fetch(`${SERVER_URL}/user_name`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (!response2.ok) {
          throw new Error("Failed to fetch user_id and name.");
        }

        const data2 = await response2.json();

        if (!data2.success) {
          throw new Error(
            data2.message ||
              "An error occurred while fetching user_id and name."
          );
        }

        const nameData = data2.users || []; // Assume data.users contains the name information

        // Merge ageData and nameData based on user_id
        const mergedData = ageData
          .filter((ageItem: any) => ageItem.user_id !== loggedInUserId) // Exclude loggedInUserId
          .map((ageItem: any) => {
            const nameItem = nameData.find(
              (name: any) => name.user_id === ageItem.user_id
            );
            return {
              user_id: ageItem.user_id,
              age: ageItem.age,
              name: nameItem ? nameItem.name : "Unknown",
              photo_url: ageItem.photo_base64,
            };
          });

        setRoommates(mergedData); // Store the merged data
        setErrorMessage(null);
      } catch (error) {
        console.error("Error fetching roommates:", error);
        setErrorMessage("An error occurred while fetching roommates.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoommates();
  }, [loggedInUserId]); // Re-run effect if `loggedInUserId` changes

  if (loading) {
    return <div>Loading roommates...</div>;
  }

  if (errorMessage) {
    return <div className="error-container">{errorMessage}</div>;
  }

  return (
    <section className="roommates-container">
      <div className="roommates-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
          <div className="filter-buttons">
            <button
              className="btn-filter"
              onClick={fetchGoodRoommates} // Pass function reference, not invocation
            >
              추천 순
            </button>
          </div>
        </div>
      </div>

      <div className="roommates-grid">
        {roommates.map((roommate) => (
          <RoommateCard
            key={roommate.user_id} // Assuming `user_id` is unique
            id={Number(roommate.user_id)}
            name={roommate.name || "Unknown"}
            age={Number(roommate.age)}
            profileImage={roommate.photo_url || "/default-avatar.png"}
          />
        ))}
      </div>
    </section>
  );
}
