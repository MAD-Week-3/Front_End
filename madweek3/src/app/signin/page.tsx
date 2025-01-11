"use client";
// 클라이언트 컴포넌트여야 fetch나 localStorage 같은 브라우저 기능 사용 가능

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // input 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // 서버에 JSON 요청
      const response = await fetch("https://4e2f-2001-2d8-6480-408d-30ce-2347-7370-aa7f.ngrok-free.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log("로그인 응답:", result);

      if (!response.ok || !result.success) {
        // 로그인 실패
        setErrorMsg(result.message || "로그인 실패");
        return;
      }

      // 로그인 성공 -> localStorage에 보관
      localStorage.setItem("username", result.username);
      localStorage.setItem("name", result.name);

      // 홈으로 이동
      alert("로그인 성공!");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setErrorMsg("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <main className="w-full max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-4">ForRoom</h1>
        <p className="text-center text-gray-600 mb-8">로그인</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* username */}
          <div>
            <label className="block text-gray-700 mb-2">ID</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          {/* password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          {/* 에러 메시지 표시 */}
          {errorMsg && (
            <div className="text-red-500 text-sm">{errorMsg}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            로그인
          </button>
        </form>
      </main>

      <footer className="w-full mt-16 py-6 bg-gray-100 text-center text-gray-600">
        &copy; 2025 ForRoom. All rights reserved.
      </footer>
    </div>
  );
}
