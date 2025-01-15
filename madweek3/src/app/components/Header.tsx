"use client";

import Link from "next/link";
import { useUser } from "../UserContext";

export default function Header() {
  const {
    loggedInUserId,
    loggedInUserName,
    setLoggedInUserId,
    setLoggedInUserName,
  } = useUser();

  const handleLogout = () => {
    setLoggedInUserId(""); // Clear user ID
    setLoggedInUserName(""); // Clear user name
    alert("You have been logged out.");
  };

  return (
    <header className="w-full py-4 bg-white shadow-md flex justify-between px-8">
      <nav className="container flex items-center justify-between">
        <h1 className="text-xl font-bold">ForRoom</h1>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            홈페이지
          </Link>
          <Link href="/roommates" className="text-gray-600 hover:text-gray-900">
            룸메이트
          </Link>
          <Link
            href="/mypageedit"
            className="text-gray-600 hover:text-gray-900"
          >
            프로필 수정
          </Link>
          {loggedInUserId ? (
            <>
              <Link
                href="/mypage"
                className="text-gray-600 hover:text-gray-900"
              >
                마이페이지
              </Link>
              <Link
                href="/estate"
                className="text-gray-600 hover:text-gray-900"
              >
                부동산
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                  로그인
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
