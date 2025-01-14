"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReviewCard from "./components/ReviewCard";
import Image from "next/image";

export default function Home() {
  const [showModal, setShowModal] = useState(false); // 팝업 상태 관리
  const router = useRouter();

  const reviews = [
    {
      title: "Great Roommate",
      body: "Very clean and respectful.",
      reviewer: "John",
      date: "2023-01-01",
      stars: 5,
    },
    {
      title: "Great Roommate",
      body: "Very clean and respectful.",
      reviewer: "John",
      date: "2023-01-01",
      stars: 5,
    },
    {
      title: "Great Roommate",
      body: "Very clean and respectful.",
      reviewer: "John",
      date: "2023-01-01",
      stars: 5,
    },
    {
      title: "Friendly",
      body: "Always helpful and fun to live with.",
      reviewer: "Jane",
      date: "2023-01-02",
      stars: 4,
    },
    {
      title: "Friendly",
      body: "Always helpful and fun to live with.",
      reviewer: "Jane",
      date: "2023-01-02",
      stars: 4,
    },
    {
      title: "Friendly",
      body: "Always helpful and fun to live with.",
      reviewer: "Jane",
      date: "2023-01-02",
      stars: 4,
    },
    {
      title: "Friendly",
      body: "Always helpful and fun to live with.",
      reviewer: "Jane",
      date: "2023-01-02",
      stars: 4,
    },
  ];

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
    <div className="home-container">
      {/* Hero Section */}
      <main className="hero-section">
      <div className="hero-logo">
      <Image
        src="/icon2.png" // public 폴더를 기준으로 한 경로
        alt="ForRoom Logo"
        width={50}
        height={50}
        className="hero-logo-image"
      />
        <h2 className="hero-title">ForRoom</h2>
        </div>
        <p className="hero-subtitle">나와 맞는 룸메이트 찾기</p>
        <div className="hero-buttons">
          <button
            onClick={handleOpenModal}
            className="hero-button hero-button-primary"
          >
            소개
          </button>
          <button
            onClick={handleStartClick}
            className="hero-button hero-button-secondary"
          >
            시작하기
          </button>
        </div>
      </main>

      {/* Background Section */}
      <div
        className="background-section"
        style={{ backgroundImage: "url('/background.png')" }}
      >
      
      </div>

      {/* Review Section */}
      <section className="review-section">
        <h3 className="review-title">리뷰</h3>
        <p className="review-subtitle">최근 가입 사용자들의 리뷰에요.</p>
        <div className="main-review-grid">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">ForRoom 소개</h3>
            <p className="modal-description">
              당신에게 딱 맞는 룸메이트, ForRoom에서 찾아보세요! 🏠
            </p>
            <h4 className="modal-subtitle">ForRoom이란?</h4>
            <p className="modal-description">
              ForRoom은 새로운 룸메이트를 찾고자 하는 사람들을 위한 맞춤형 매칭
              웹 서비스입니다. 흡연 여부, 나이, 생활 습관, 선호도 등 함께 살 때
              중요한 정보를 바탕으로, 나와 잘 맞는 룸메이트를 쉽게 찾을 수
              있도록 돕습니다.
            </p>
            <h4 className="modal-subtitle">ForRoom의 특징</h4>
            <ul className="modal-list">
              <li>
                <strong>선호도 기반 매칭:</strong> 나이, 흡연 여부, 생활 습관 등
                자신에게 중요한 기준을 선택하세요. 입력한 정보를 바탕으로 가장
                잘 맞는 사람들을 추천합니다.
              </li>
              <li>
                <strong>쌍방 찜(Like) 시스템:</strong> 서로의 프로필을 확인하고,
                마음에 든다면 찜하세요! 양쪽 모두 찜 상태가 될 때에만 연락처가
                공개되므로 안전하고 부담 없이 시작할 수 있습니다.
              </li>
              <li>
                <strong>자유로운 의사 결정:</strong> 룸메이트를 찾고 연락하는
                과정은 100% 사용자에게 맡깁니다. 법적인 보증이나 부동산 추천은
                제공하지 않으며, 간단히 룸메이트 찾기 플랫폼 역할만 합니다.
              </li>
              <li>
                <strong>개인정보 보호:</strong> 연락처는 쌍방 찜 상태가 되기
                전까지 절대 공유되지 않습니다. 사용자의 안전과 프라이버시를
                최우선으로 생각합니다.
              </li>
            </ul>
            <h4 className="modal-subtitle">어떻게 시작하나요?</h4>
            <ol className="modal-list">
              <li>회원가입 후 프로필을 작성합니다.</li>
              <li>자신이 원하는 룸메이트의 조건을 설정합니다.</li>
              <li>추천된 프로필을 둘러보고 찜(Like)하세요.</li>
              <li>쌍방 찜이 되면 서로 연락하고 룸메이트를 결정하세요!</li>
            </ol>
            <p className="modal-footer-text">
              새로운 시작을 함께할 룸메이트를 찾는 것이 더 이상 어렵지 않습니다.
              당신의 라이프 스타일에 딱 맞는 사람과 함께 살아보세요! 🏡
            </p>
            <button onClick={handleCloseModal} className="modal-close-button">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
