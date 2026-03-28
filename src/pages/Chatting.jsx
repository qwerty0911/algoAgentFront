import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import { RecommandContent } from './Recommand.jsx';
import './Chatting.css'; 
import useUserStore from "../store/useUserStore.js"


const Chatting = () => {
    //const { userId } = useParams();
    const user_id = useUserStore((state) => state.user_id);
    const { session_id } = useParams();

    const [messages, setMessages] = useState([]);
    const [activePanel, setActivePanel] = useState('chat'); // 'chat' | 'roadmap'
    
    // 페이지에 들어오자마자 실행됨 (Initialize)
  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getMessages?session_id=${session_id}`, { method: 'GET', });
        if (response.ok) {
          const data = await response.json();
          // 백엔드 응답이 배열이거나 { messages: [...] } 처럼 감싸져 있어도 동작하도록 처리
          const normalizedMessages = Array.isArray(data)
            ? data
            : Array.isArray(data?.messages)
              ? data.messages
              : Array.isArray(data?.data)
                ? data.data
                : [];
          setMessages(normalizedMessages);
          console.log('getMessages normalized:', normalizedMessages);
        }

      } catch (error) {
        console.error("메시지 로드 실패:", error);
      }
    };

    fetchSessions();
  }, [session_id]);

    // AI가 답변 중인지 확인하는 상태 (로딩 처리용)
    const [isLoading, setIsLoading] = useState(false);

    const displayUserId = user_id && user_id !== 'null' ? user_id : 'Unknown';

    const sendMessage = async (text) => {
        
        if (isLoading) return; // 이미 답변 중이면 중복 요청 방지

        const newUserMsg = { id: Date.now(), role: 'user', content: text };
        setMessages((prev) => [...prev, newUserMsg]);
        
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/sendmessage', { // 실제 백엔드 URL로 수정 필요
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: session_id,
                    user_id: user_id,
                    content: text,
                }),
            });

            if (!response.ok) throw new Error('네트워크 응답에 문제가 있습니다.');

            const data = await response.json();

            console.log(data)

            const aiText =
              data?.content ??
              data?.message ??
              data?.reply ??
              data?.text ??
              '';

            const aiMsg = { 
                id: Date.now() + 1, 
                role: 'assistant', 
                content: aiText
            };
            setMessages((prev) => [...prev, aiMsg]);

        } catch (error) {
            console.error("통신 에러:", error);
            setMessages((prev) => [...prev, { 
                id: Date.now() + 2, 
                role: 'assistant', 
                content: '죄송합니다. 서버와 연결할 수 없습니다.' 
            }]);
        } finally {
            setIsLoading(false); // 성공하든 실패하든 로딩 종료
        }
    };

    return (
        <div className="chat-page-container">
            <ChatSidebar />{/* 왼쪽 사이드바 */}

            <main className="chat-content">{/* 오른쪽 메인 채팅 영역 */}
                <div className="chat-top-panel">
                    <div className="chat-top-tabs">
                        <button
                            type="button"
                            className={`chat-tab-btn ${activePanel === 'chat' ? 'active' : ''}`}
                            onClick={() => setActivePanel('chat')}
                        >
                            채팅영역
                        </button>
                        <button
                            type="button"
                            className={`chat-tab-btn ${activePanel === 'roadmap' ? 'active' : ''}`}
                            onClick={() => setActivePanel('roadmap')}
                        >
                            문제 로드맵
                        </button>
                    </div>
                    <div className="chat-user-id">
                        user_id: {displayUserId}
                    </div>
                </div>

                {activePanel === 'chat' ? (
                    <>
                        <ChatWindow messages={messages} isLoading={isLoading} />
                        <ChatInput onSend={sendMessage} />
                    </>
                ) : (
                    <RecommandContent />
                )}
            </main>
        </div>
    );
}

export default Chatting