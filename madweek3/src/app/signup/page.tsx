"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVER_URL, useUser } from "../UserContext";

export default function SignUpPage() {
  const router = useRouter();
  const { setLoggedInUserId, setLoggedInUserName } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    user_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let user_id, user_name;

    try {
      const response = await fetch(`${SERVER_URL}/add_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          user_id: formData.user_id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("회원가입 실패");
        return;
      }

      alert("회원가입 성공!");

      try {
        const response = await fetch(`${SERVER_URL}/profile_detail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: formData.user_id,
          }),
        });
        const result = await response.json();
        user_id = result.user_id;
        user_name = result.name;

        router.push("/");
      } catch (error) {
        console.error("Error:", error);
        alert("오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    }

    setLoggedInUserId(user_id);
    setLoggedInUserName(user_name);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">회원가입</h2>
        <form onSubmit={handleSubmit} className="signup-fields">
          {/* Username */}
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input
              type="text"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              required
            />
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="submit-button">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
