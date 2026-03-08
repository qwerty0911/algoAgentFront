import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import './Chatting.css'; // 레이아웃용 CSS

const Chatting = () => {
    const { userId } = useParams();

    console.log({ userId })

    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: '안녕하세요! 무엇을 도와드릴까요?' }
    ]);

    const sendMessage = (text) => {
        const newUserMsg = { id: Date.now(), role: 'user', content: text };
        setMessages((prev) => [...prev, newUserMsg]);

        // TODO: LangChain API 호출 로직 추가
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