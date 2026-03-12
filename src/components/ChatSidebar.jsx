import { useEffect, useState } from 'react';
import useUserStore from "../store/useUserStore.js"

const ChatSidebar = () => {

  const user_id = useUserStore((state) => state.user_id);
  const [ sessions, setSessions ] = useState([])

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

  return (
    <aside className="chat-sidebar">
      <button className="new-chat-btn" >+ 새 채팅</button>
      <ul className="history-list">
        {sessions?.map((sessions) => (
          <li key={sessions.session_id} className="history-item">{sessions.title}</li>
        ))}
      </ul>
    </aside>
  );
};
export default ChatSidebar;