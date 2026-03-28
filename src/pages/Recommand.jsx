import ChatSidebar from '../components/ChatSidebar';
import './Chatting.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSolvedAcTierDisplay } from '../utils/solvedAcLevel.js';

function ProblemRecommendationCard({ problem_id, title, level, tags = [] }) {
  const { tierKey, label } = getSolvedAcTierDisplay(level);
  const goToProblem = (e) => {

    e.stopPropagation(); 
    window.open(`https://boj.ma/${problem_id}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="recommand-card">
      <div className="recommand-card-meta">
        <span className={`recommand-card-level recommand-tier--${tierKey}`}>
          {label}
        </span>
        <span className="recommand-card-id">#{problem_id}</span>
      </div>
      <h2 className="recommand-card-title">
        {title}
      </h2>
      <ul className="recommand-tag-list" aria-label="태그">
        {tags.map((tag) => (
          <li key={`${problem_id}-${tag}`} className="recommand-tag">
            {tag}
          </li>
        ))}
      </ul>

      <div className="recommand-footer">
        <button 
          type="button" 
          className="text-link-btn" 
          onClick={goToProblem}
        >
          문제 풀러 가기
        </button>
      </div>
    </article>
  );
}

// `Chatting` 화면에서도 동일한 로드맵 UI를 재사용하기 위해 페이지 래퍼를 제외한 콘텐츠만 분리합니다.
export const RecommandContent = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { session_id } = useParams();

  useEffect(() => {
    const fetchLoadmap = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/getLoadmap?session_id=${session_id}`,
          { method: 'GET' },
        );
        if (!response.ok) return;

        const data = await response.json();
        // 백엔드가 배열 그대로 주거나 { recommendations: [...] } 등으로 감싸도 처리
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.recommendations)
            ? data.recommendations
            : Array.isArray(data?.data)
              ? data.data
              : [];
        setRecommendations(list);
      } catch (error) {
        console.error('로드맵 로드 실패:', error);
      }
    };

    fetchLoadmap();
  }, [session_id]);

  return (
    <div className="recommand-panel-scroll">
      <div className="recommand-main">
        <header className="recommand-page-header">
          <h1 className="recommand-page-title">문제 추천</h1>
          <p className="recommand-page-desc">
            AI Agent 가 추천한 문제의 로드맵이 표시됩니다.
          </p>
        </header>
        <div className="recommand-grid">
          {recommendations.map((item) => (
            <ProblemRecommendationCard key={item.problem_id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Recommand = () => {
  return (
    <div className="chat-page-container">
      <ChatSidebar />
      <main className="chat-content recommand-content">
        <RecommandContent />
      </main>
    </div>
  );
};

export default Recommand;
