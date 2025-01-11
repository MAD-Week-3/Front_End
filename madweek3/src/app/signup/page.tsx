"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("username", formData.username);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("name", formData.name);

    try {
      const response = await fetch("http://localhost:5001/add_user", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("회원가입 실패");
        return;
      }

      alert("회원가입 성공!");
      localStorage.setItem("username", formData.username);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    }
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
