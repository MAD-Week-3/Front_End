import Link from "next/link";
import React from "react";
import RoommateCard from "../components/RoommateCard";

export default function Roommates() {
  const roommates = [
    {
      id: 1,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 2,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 3,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 4,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 5,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 6,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 7,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 8,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 9,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
    {
      id: 10,
      name: "dylan",
      age: 21,
      preference: "aaaaaaa",
      bio: "bbbb",
    },
  ];

  return (
    <section className="roommates-container">
      <div className="roommates-header">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
          <div className="filter-buttons">
            <button className="btn-filter">최근 가입 순</button>
            <button className="btn-filter">높은 평점 순</button>
            <button className="btn-filter">낮은 평점 순</button>
            <button className="btn-filter">추천 순</button>
          </div>
        </div>
      </div>

      <div className="roommates-grid">
        {roommates.map((roommate) => (
          <RoommateCard
            key={roommate.id}
            id={roommate.id}
            name={roommate.name}
            age={roommate.age}
          />
        ))}
      </div>
    </section>
  );
}
