import { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input); // 부모의 함수 실행
    setInput('');
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button type="submit">전송</button>
    </form>
  );
};
export default ChatInput;