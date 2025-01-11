import Link from "next/link";
import React from "react";

export default function Roommates() {
  const roommate = {
    id: 1,
    name: "dylan",
    age: 21,
    preference: "aaaaaaa",
    bio: "bbbb",
  };

  return (
    <div className="roommates-container">
      <section className="roommates-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
          <div className="filter-buttons">
            <button className="btn-filter">최근 가입 순</button>
            <button className="btn-filter">추천 순</button>
          </div>
        </div>
      </section>

      <section className="roommates-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="roommate-card">
            <div className="roommate-avatar"></div>
            <Link href={`/roommates/${roommate.id}`} className="roommate-link">
              {roommate.name} - {roommate.age} years old
            </Link>
            <p className="roommate-name">이름 {index + 1}</p>
            <p className="roommate-age">Age: {20 + index}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
