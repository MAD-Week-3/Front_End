import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Roommate Finder</h1>
      <Link href="/roommates">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          View Roommates
        </button>
      </Link>
    </div>
  );
}
