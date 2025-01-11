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
  const roommate = {
    name: "dylan",
    age: 21,
    preference: "aaaaaaa",
    bio: "bbbb",
  }

  if (!id) {
    return (
      <div className="error-container">
        <h1>Roommate Not Found</h1>
        <p>Invalid roommate ID provided.</p>
      </div>
    );
  }

  return (
    <div className="roommate-profile-container">
      <div className="profile-section">
        <ProfileCard
          name={roommate.name}
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
