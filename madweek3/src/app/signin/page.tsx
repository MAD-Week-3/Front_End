"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch(
        "https://4e2f-2001-2d8-6480-408d-30ce-2347-7370-aa7f.ngrok-free.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();
      console.log("로그인 응답:", result);

      if (!response.ok || !result.success) {
        setErrorMsg(result.message || "로그인 실패");
        return;
      }

      localStorage.setItem("username", result.username);
      localStorage.setItem("name", result.name);

      alert("로그인 성공!");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setErrorMsg("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signin-container">
      <main className="signin-form">
        <h1 className="signin-title">ForRoom</h1>
        <p className="signin-subtitle">로그인</p>

        <form className="signin-fields" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">ID</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="form-input"
              required
            />
          </div>

          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <button type="submit" className="submit-button">
            로그인
          </button>
        </form>
      </main>
    </div>
  );
}
