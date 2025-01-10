import ProfileCard from "@/app/components/ProfileCard";
import ReviewGrid from "./review-grid";
import Newsletter from "./newsletter";
import DetailCard from "@/app/components/DetailCard";

export default function RoommateProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const roommate = {
    id: params.id,
    name: "John Doe",
    age: 25,
    preferences: "Non-smoker, Quiet",
    description:
      "Hi, I’m John! I’m a software developer who loves cooking, hiking, and keeping my home clean.",
  };

  return (
    <div className="roommate-profile-container">
      <div className="profile-section">
        <ProfileCard
          name={roommate.name}
          age={roommate.age}
          preferences={roommate.preferences}
        />
        <DetailCard description={roommate.description} /> {/* New DetailCard */}
        <Newsletter />
      </div>
      <div className="reviews-section">
        <ReviewGrid />
      </div>
    </div>
  );
}
