import React from "react";

export default function Roommates() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <section className="w-full px-8 py-6">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search"
            className="border px-4 py-2 rounded w-72"
          />
          <div>
            <button className="px-4 py-2 bg-gray-300 rounded mr-2">최근 가입 순</button>
            <button className="px-4 py-2 bg-gray-300 rounded">추천 순</button>
          </div>
        </div>
      </section>

      <section className="w-full px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="border p-4 rounded shadow flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 mb-4"></div>
            <p className="text-lg font-semibold">이름 {index + 1}</p>
            <p className="text-gray-500">Age: {20 + index}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
