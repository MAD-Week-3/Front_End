"use client";

import React, { useEffect, useState } from "react";
import "../styles/footer.css";
import { SERVER_URL } from "../UserContext";

interface Article {
  title: string;
  link: string;
}

export default function Footer() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/search`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        // 반환 데이터를 Article[] 타입으로 명시적으로 캐스팅
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <footer>
      <p>&copy; 2025 Roommate Finder. All Rights Reserved.</p>
      <div className="links">
        {articles.length > 0 ? (
          articles.slice(0, 5).map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title.replace(/<b>|<\/b>/g, "")}
            </a>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </footer>
  );
}
