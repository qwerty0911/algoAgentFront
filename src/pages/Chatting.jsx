import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import './Chatting.css'; 
import useUserStore from "../store/useUserStore.js"


const Chatting = () => {
    //const { userId } = useParams();
    const user_id = useUserStore((state) => state.user_id);
    const { session_id } = useParams();

    const [messages, setMessages] = useState([]);
    
    // 페이지에 들어오자마자 실행됨 (Initialize)
  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getMessages?session_id=${session_id}`, { method: 'GET', });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
          console.log(data)
        }

      } catch (error) {
        console.error("메시지 로드 실패:", error);
      }
    };

    fetchSessions();
  }, [session_id]);

    // AI가 답변 중인지 확인하는 상태 (로딩 처리용)
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (text) => {
        
        if (isLoading) return; // 이미 답변 중이면 중복 요청 방지

        // 1. 내 메시지를 먼저 화면에 추가
        const newUserMsg = { id: Date.now(), role: 'user', content: text };
        setMessages((prev) => [...prev, newUserMsg]);
        
        setIsLoading(true); // 로딩 시작

        try {
            // 2. LangChain 기반 백엔드 서비스에 POST 요청
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

            // 3. 서버에서 받은 AI 답변을 화면에 추가
            const aiMsg = { 
                id: Date.now() + 1, 
                role: 'assistant', 
                content: data.content // 백엔드에서 주는 key값에 맞춰서 수정 (예: data.content)
            };
            setMessages((prev) => [...prev, aiMsg]);

        } catch (error) {
            console.error("통신 에러:", error);
            // 에러 메시지도 채팅창에 띄워주면 좋습니다.
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
                <ChatWindow messages={messages} />
                <ChatInput onSend={sendMessage} />
            </main>
        </div>
    );
}

export default Chatting