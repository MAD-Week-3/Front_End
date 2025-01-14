"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false); // 팝업 상태 관리
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/roommates");
  };
  
  const handleSignUpClick = () => {
    router.push("/signup");
  };
  
  const handleEstateClick = () => {
    router.push("/estate"); // 부동산 페이지로 이동
  };


  const handleOpenModal = () => {
    setShowModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-16">
        <h2 className="text-4xl font-bold">ForRoom</h2>
        <p className="text-gray-600 mt-2">나와 맞는 룸메이트 찾기</p>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            소개
          </button>
          <button
            onClick={handleStartClick}
            className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-400"
          >
            시작하기
          </button>
        </div>
      </main>

      {/* Background Section */}
      <div
        className="w-full h-64 bg-cover bg-center mt-12"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
            배경 이미지가 있는 섹션입니다.
          </p>
        </div>
      </div>

      {/* Review Section */}
      <section className="mt-16 w-full px-8">
        <h3 className="text-2xl font-bold mb-4">리뷰</h3>
        <p className="text-gray-600 mb-8">최근 가입 사용자들의 리뷰에요.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-sm flex flex-col items-start"
            >
              <p className="text-xl font-semibold">&quot;Quote&quot;</p>
              <p className="mt-2 text-gray-500">Title</p>
              <p className="text-gray-400">Description</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">ForRoom 소개</h3>
            <p className="text-gray-700 mb-4">
              당신에게 딱 맞는 룸메이트, ForRoom에서 찾아보세요! 🏠
            </p>
            <h4 className="text-xl font-semibold mt-4 mb-2">ForRoom이란?</h4>
            <p className="text-gray-600 mb-4">
              ForRoom은 새로운 룸메이트를 찾고자 하는 사람들을 위한 맞춤형 매칭 웹
              서비스입니다. 흡연 여부, 나이, 생활 습관, 선호도 등 함께 살 때 중요한 정보를
              바탕으로, 나와 잘 맞는 룸메이트를 쉽게 찾을 수 있도록 돕습니다.
            </p>
            <h4 className="text-xl font-semibold mt-4 mb-2">ForRoom의 특징</h4>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>
                <strong>선호도 기반 매칭:</strong> 나이, 흡연 여부, 생활 습관 등 자신에게 중요한 기준을
                선택하세요. 입력한 정보를 바탕으로 가장 잘 맞는 사람들을 추천합니다.
              </li>
              <li>
                <strong>쌍방 찜(Like) 시스템:</strong> 서로의 프로필을 확인하고, 마음에 든다면 찜하세요!
                양쪽 모두 찜 상태가 될 때에만 연락처가 공개되므로 안전하고 부담 없이 시작할 수
                있습니다.
              </li>
              <li>
                <strong>자유로운 의사 결정:</strong> 룸메이트를 찾고 연락하는 과정은 100% 사용자에게
                맡깁니다. 법적인 보증이나 부동산 추천은 제공하지 않으며, 간단히 룸메이트 찾기
                플랫폼 역할만 합니다.
              </li>
              <li>
                <strong>개인정보 보호:</strong> 연락처는 쌍방 찜 상태가 되기 전까지 절대 공유되지
                않습니다. 사용자의 안전과 프라이버시를 최우선으로 생각합니다.
              </li>
            </ul>
            <h4 className="text-xl font-semibold mt-4 mb-2">어떻게 시작하나요?</h4>
            <ol className="list-decimal pl-6 text-gray-600 mb-4">
              <li>회원가입 후 프로필을 작성합니다.</li>
              <li>자신이 원하는 룸메이트의 조건을 설정합니다.</li>
              <li>추천된 프로필을 둘러보고 찜(Like)하세요.</li>
              <li>쌍방 찜이 되면 서로 연락하고 룸메이트를 결정하세요!</li>
            </ol>
            <p className="text-gray-700 mb-6">
              새로운 시작을 함께할 룸메이트를 찾는 것이 더 이상 어렵지 않습니다. 당신의 라이프
              스타일에 딱 맞는 사람과 함께 살아보세요! 🏡
            </p>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
