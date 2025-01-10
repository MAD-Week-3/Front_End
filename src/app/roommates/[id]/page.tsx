import ProfileCard from "../../components/ProfileCard";
import ReviewGrid from "./review-grid";
import Newsletter from "./newsletter";
import "../../styles/roommate.css";

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
  };

  return (
    <div className="roommate-profile-container">
      <div className="profile-section">
        <ProfileCard {...roommate} />
        <Newsletter />
      </div>
      <div className="reviews-section">
        <ReviewGrid />
      </div>
    </div>
  );
}
