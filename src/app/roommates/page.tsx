import Link from "next/link";

export default async function RoommatesPage() {
  // Fetch all roommates
  let roommates;
  try {
    const res = await fetch("http://localhost:3000/api/roommates");
    if (!res.ok) throw new Error("Failed to fetch roommates");
    roommates = await res.json();
  } catch (error) {
    console.error("Error loading roommates:", error);
    return <div>Error loading roommates. Please try again later.</div>;
  }

  return (
    <div className="container">
      <h1>Available Roommates</h1>
      <ul>
        {roommates.map((roommate: any) => (
          <li key={roommate.user_id}>
            <Link
              href={`/roommates/${roommate.user_id}`}
              className="roommate-link"
            >
              {roommate.username} - {roommate.age} years old
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
