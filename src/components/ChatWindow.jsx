const WELCOME_MESSAGE = `안녕하세요! 당신의 알고리즘 성장을 돕는 AI 페이스메이커입니다. 🏃‍♂️

먼저 당신의 실력을 분석하고 딱 맞는 문제를 추천해 드리기 위해 백준(Solved.ac) 아이디를 알려주시겠어요? 아이디를 알려주시면 다음과 같은 도움을 드릴 수 있습니다.

📊 취약 유형 분석: 최근 풀이 이력을 바탕으로 보완이 필요한 알고리즘을 찾아냅니다.

🎯 맞춤형 문제 추천: 현재 티어에 딱 맞는, 하지만 도전적인 문제를 골라드려요.

💡 단계별 힌트 가이드: 문제를 풀다 막히면 정답 대신 사고의 흐름을 깨워주는 힌트를 드립니다.`;

const ChatWindow = ({ messages, isLoading}) => {
  const normalizeRole = (role) => {
    // 백엔드 응답에서 role 값이 달라져도 화면이 깨지지 않게 기본값을 assistant로 둡니다.
    if (role === 'user' || role === 'human') return 'user';
    if (role === 'assistant' || role === 'bot' || role === 'ai') return 'assistant';
    // role이 예상치와 다르면(예: 'system' 등) 일단 assistant 스타일로 렌더링합니다.
    return 'assistant';
  };

  const normalizeContent = (msg) => {
    const content =
      msg?.content ??
      msg?.text ??
      msg?.message ??
      msg?.reply ??
      '';
    return typeof content === 'string' ? content : String(content ?? '');
  };

  return (
    <div className="chat-window">

      <div className={"message-bubble assistant"}>
        <div className="avatar">🤖</div>
        <div className="text-content">{WELCOME_MESSAGE}</div>
      </div>
      {messages.map((msg, idx) => {
        const role = normalizeRole(msg?.role);
        const content = normalizeContent(msg);

        return (
          <div key={msg?.id ?? idx} className={`message-bubble ${role}`}>
            <div className="avatar">{role === 'user' ? '👤' : '🤖'}</div>
            <div className="text-content">{content}</div>
          </div>
        );
      })}
      {isLoading && (
        <div
          className="message-bubble assistant loading"
          role="status"
          aria-live="polite"
          aria-label="응답 생성 중"
        >
          <div className="avatar" aria-hidden>
            🤖
          </div>
          <div className="typing-indicator">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatWindow;