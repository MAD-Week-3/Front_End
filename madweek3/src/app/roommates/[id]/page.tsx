export const dynamic = "force-dynamic";
import ProfileCard from "@/app/components/ProfileCard";
import ReviewGrid from "../../components/review-grid";
import Newsletter from "../../components/newsletter";
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
    introduction: "aaaaaaa",
    bio: "bbbb",
  };

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
          introduction={roommate.introduction || "No preferences available"}
        />
        <DetailCard
          introduction={roommate.introduction || "No bio available."}
        />
        <Newsletter />
      </div>
      <div className="reviews-section">
        <ReviewGrid />
      </div>
    </div>
  );
}
