import Link from "next/link";

export default function RoommatesPage() {
  const roommates = [
    { id: 1, name: "John Doe", age: 25, preferences: "Non-smoker, Quiet" },
    { id: 2, name: "Jane Smith", age: 30, preferences: "Loves pets, Quiet" },
  ];

  return (
    <div className="container">
      <h1>Available Roommates</h1>
      <ul>
        {roommates.map((roommate) => (
          <li key={roommate.id}>
            <Link href={`/roommates/${roommate.id}`}>
              {roommate.name} - {roommate.age} years old
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
