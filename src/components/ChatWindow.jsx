const ChatWindow = ({ messages }) => {

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-bubble ${msg.role}`}>
          <div className="avatar">{msg.role === 'user' ? '👤' : '🤖'}</div>
          <div className="text-content">{msg.content}</div>
        </div>
      ))}
    </div>
  );
};
export default ChatWindow;