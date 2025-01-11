"use client"; 
// 클라이언트 컴포넌트: localStorage / useEffect 등 브라우저 기능 사용 가능

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./globals.css";

// -------------------
// [1] 비로그인 Layout
// -------------------
function LoggedOutLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="w-full py-4 bg-white shadow-md flex justify-between px-8">
          <h1 className="text-lg font-bold">ForRoom</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              홈페이지
            </Link>
            <Link href="/roommates" className="text-gray-600 hover:text-gray-900">
              룸메이트
            </Link>
            <Link href="/support" className="text-gray-600 hover:text-gray-900">
              고객센터
            </Link>
            {/* 비로그인 상태: Sign In / Sign Up 버튼 */}
            <Link href="/signin">
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">
                Sign Up
              </button>
            </Link>
          </nav>
        </header>

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="w-full mt-16 py-4 bg-gray-100 text-center text-gray-600">
          &copy; 2025 ForRoom. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

// -----------------
// [2] 로그인 Layout
// -----------------
function LoggedInLayout({
  username,
  onLogout,
  children,
}: {
  username: string;
  onLogout: () => void;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="w-full py-4 bg-white shadow-md flex justify-between px-8">
          <h1 className="text-lg font-bold">ForRoom</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              홈페이지
            </Link>
            <Link href="/roommates" className="text-gray-600 hover:text-gray-900">
              룸메이트
            </Link>
            <Link href="/support" className="text-gray-600 hover:text-gray-900">
              고객센터
            </Link>
            {/* 로그인 상태: "안녕하세요, username님" + Logout 버튼 */}
            <span className="text-gray-600">안녕하세요, {username}님</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Logout
            </button>
          </nav>
        </header>

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="w-full mt-16 py-4 bg-gray-100 text-center text-gray-600">
          &copy; 2025 ForRoom. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

// --------------------------------------
// [3] 최종 Layout.tsx (로그인 분기 처리)
// --------------------------------------
export default function Layout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  // 컴포넌트 마운트 시 localStorage에서 username 가져오기
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  // username 여부로 레이아웃 분기
  if (username) {
    return (
      <LoggedInLayout username={username} onLogout={handleLogout}>
        {children}
      </LoggedInLayout>
    );
  } else {
    return <LoggedOutLayout>{children}</LoggedOutLayout>;
  }
}
