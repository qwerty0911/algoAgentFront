import Login from '../components/login';

const Home = () => (
  <div className="home-page">
    <div className="home-hero">
      <div className="home-hero-text">
        <p className="home-badge">AI Algorithm Pace Maker</p>
        <h1 className="home-title">
          알고리즘 성장에 집중하세요.
          <br />
          문제 선정과 피드백은 에이전트가 맡습니다.
        </h1>
        <p className="home-subtitle">
          Solved.ac 프로필 기반 실력 분석, 맞춤 문제 로드맵, 단계별 힌트까지.
          <br />
          당신만의 인공지능 알고리즘 코치와 함께 훈련을 시작해 보세요.
        </p>
        <ul className="home-feature-list">
          <li>취약 알고리즘 유형 자동 분석</li>
          <li>티어/목표에 맞는 난이도 조절 추천</li>
          <li>정답 대신 사고 과정을 열어주는 힌트</li>
        </ul>
      </div>
      <div className="home-hero-panel">
        <div className="home-hero-panel-header">
          <span className="home-hero-panel-title">시작하기</span>
          <span className="home-hero-panel-desc">
            Solved.ac 아이디로 로그인하고,
            <br />
            나만의 세션을 생성하세요.
          </span>
        </div>
        <div className="home-hero-panel-body">
          <Login />
        </div>
      </div>
    </div>
    <footer className="home-footer">
      <p>알고리즘 연습에 필요한 건 집중 뿐입니다. 나머지는 에이전트가 도와줄게요.</p>
    </footer>
  </div>
);

export default Home;