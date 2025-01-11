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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // FormData로 변환
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

      // 회원가입 성공
      alert("회원가입 성공!");

      // 현재 아이디를 localStorage에 저장 => 로그인 상태로 간주
      localStorage.setItem("username", formData.username);

      // 홈화면으로 이동
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              아이디
            </label>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              이름
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
