import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 bg-white shadow-md flex justify-between px-8">
      <nav className="container">
        <h1 className="text-xl font-bold">ForRoom</h1>
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
  );
}
