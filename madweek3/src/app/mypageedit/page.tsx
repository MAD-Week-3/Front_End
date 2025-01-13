"use client";

import React, { useState, useEffect } from "react";
import { useUser, SERVER_URL } from "../UserContext";

export default function MyPage() {
  const { loggedInUserId } = useUser();
  const [profile, setProfile] = useState({
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
    // Fetch user profile data
    async function fetchUserData() {
      let data;
      const id = loggedInUserId;
      try {
        const response = await fetch(`${SERVER_URL}/profile_detail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: id,
          }),
        });

        data = await response.json();
      } catch (err) {
        console.error(err);
      }

      if (data.profile) {
        setProfile({
          user_id: loggedInUserId || "",
          budget: data.profile.budget || "",
          phone: data.profile.phone || "",
          age: data.profile.age || "",
          is_smoking: data.profile.is_smoking === 1,
          wishes: data.profile.wishes || "",
          introduction: data.profile.introduction || "",
          profile_image:
            data.profile.profile_image || "/placeholder-avatar.png",
          snoring: data.profile.snoring || false,
          preferred_region: data.profile.preferred_region || "",
        });
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("vvvv", profile);
      const response = await fetch(`${SERVER_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile.");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="mypage-container">
      {/* Editable Inputs Section */}
      <form onSubmit={handleSubmit} className="profile-edit-form detail-card">
        <h3 className="form-section-title">Edit Profile</h3>

        <div className="form-group">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Budget</label>
          <input
            type="text"
            name="budget"
            value={profile.budget}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Preferred Region</label>
          <input
            type="text"
            name="preferred_region"
            value={profile.preferred_region}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Wishes</label>
          <textarea
            name="wishes"
            value={profile.wishes}
            onChange={handleChange}
            className="form-input"
            rows={2}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Introduction</label>
          <textarea
            name="introduction"
            value={profile.introduction}
            onChange={handleChange}
            className="form-input"
            rows={3}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Smoking</label>
          <select
            name="is_smoking"
            value={profile.is_smoking ? "1" : "0"}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                is_smoking: e.target.value === "1",
              }))
            }
            className="form-input"
          >
            <option value="1">흡연</option>
            <option value="0">비흡연</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Snoring</label>
          <select
            name="snoring"
            value={profile.snoring ? "1" : "0"}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                snoring: e.target.value === "1",
              }))
            }
            className="form-input"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}
