const ChatSidebar = () => {
  const history = ['이전 대화 1', '이전 대화 2', 'LangChain 에이전트 서칭'];

  return (
    <aside className="chat-sidebar">
      <button className="new-chat-btn">+ 새 채팅</button>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">{item}</li>
        ))}
      </ul>
    </aside>
  );
};
export default ChatSidebar;