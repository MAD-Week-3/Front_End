export const dynamic = "force-dynamic";
import ProfileCard from "@/app/components/ProfileCard";
import ReviewGrid from "./review-grid";
import Newsletter from "./newsletter";
import DetailCard from "@/app/components/DetailCard";

export default async function RoommateProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log(id);

  if (!id) {
    return (
      <div className="error-container">
        <h1>Roommate Not Found</h1>
        <p>Invalid roommate ID provided.</p>
      </div>
    );
  }

  // Fetch roommate details
  let roommate;
  try {
    const res = await fetch(`http://localhost:3000/api/roommates/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch roommate details: ${res.statusText}`);
    }
    roommate = await res.json();
    console.log("Roommate Details:", roommate);
  } catch (error) {
    console.error("Error fetching roommate details:", error);
    return (
      <div className="error-container">
        <h1>Error Loading Roommate</h1>
        <p>We couldn't load the roommate details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="roommate-profile-container">
      <div className="profile-section">
        <ProfileCard
          name={roommate.username}
          age={roommate.age}
          preferences={roommate.preference || "No preferences available"}
        />
        <DetailCard description={roommate.bio || "No bio available."} />
        <Newsletter />
      </div>
      <div className="reviews-section">
        <ReviewGrid />
      </div>
    </div>
  );
}
