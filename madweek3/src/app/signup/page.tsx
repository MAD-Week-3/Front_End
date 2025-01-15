"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SERVER_URL, useUser } from "../UserContext";

export default function SignUpPage() {
  const router = useRouter();
  const { loggedInUserId, setLoggedInUserId, setLoggedInUserName } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    user_id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Redirect to home if the user is already logged in
    if (loggedInUserId) {
      router.push("/");
    }
  }, [loggedInUserId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    let user_id, user_name;

    try {
      const response = await fetch(`${SERVER_URL}/add_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "회원가입 실패");
        return;
      }

      const result = await response.json();
      console.log("result", result);
      user_id = result.user_id;
      user_name = result.name;

      alert("회원가입 성공!");

      // Log the user in after signup
      console.log(loggedInUserId);

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
    }

    setLoggedInUserId(user_id);
    setLoggedInUserName(user_name);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">회원가입</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

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
