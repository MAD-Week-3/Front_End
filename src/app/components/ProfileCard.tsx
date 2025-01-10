interface ProfileCardProps {
  name: string;
  age: number;
  preferences: string;
}

export default function ProfileCard({
  name,
  age,
  preferences,
}: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="avatar"></div>
      <div className="details">
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>Preferences: {preferences}</p>
        <div className="dropdowns">
          <select>
            <option>Recent Rating</option>
          </select>
          <select>
            <option>Preferred Value</option>
          </select>
        </div>
        <button>Chat</button>
      </div>
    </div>
  );
}
