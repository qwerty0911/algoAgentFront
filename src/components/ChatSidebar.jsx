import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from "../store/useUserStore.js"
import { v4 as uuidv4 } from 'uuid';

const ChatSidebar = () => {

  const user_id = useUserStore((state) => state.user_id);
  const user_nickname = useUserStore((state) => state.nickname);
  const [sessions, setSessions] = useState([])

  // 페이지에 들어오자마자 실행됨 (Initialize)
  useEffect(() => {
    if (!user_id || user_id === "null") {
      //uuid가 준비되면 실행
      return;
    }

    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getsessions?user_id=${user_id}`, { method: 'GET', });
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
          console.log(sessions)
        }

      } catch (error) {
        console.error("세션 목록 로드 실패:", error);
      }
    };

    fetchSessions();
  }, [user_id]);

  const navigate = useNavigate();

  const handleSessionClick = (sessionId) => {
    // 1. URL을 해당 세션 ID로 이동
    // 예: localhost:5173/chat/7d0ee318...
    navigate(`/chatting/${user_nickname}/${sessionId}`);
  };

  const newSessionClick = () => {
    // 1. URL을 새로운 세션 ID로 이동
    const newSessionId = uuidv4();
    // 예: localhost:5173/chat/7d0ee318...
    navigate(`/chatting/${user_nickname}/${newSessionId}`);
  };

  return (
    <aside className="chat-sidebar">
      <button className="new-chat-btn"
        onClick={() => newSessionClick()}>+ 새 채팅</button>
      <ul className="history-list">
        {sessions?.map((sessions) => (
          <li key={sessions.session_id}
            className="history-item"
            onClick={() => handleSessionClick(sessions.session_id)}
          >{sessions.title}</li>
        ))}
      </ul>
    </aside>
  );
};
export default ChatSidebar;