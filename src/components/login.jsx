import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore'


const Login = () => {
    const [nickname, setUserId] = useState("");
    const navigate = useNavigate()
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    const handleLogin = async () => {

        try {
            // 1. LangChain 기반 백엔드 서비스에 POST 요청
            const response = await fetch('http://localhost:8000/login', { // 실제 백엔드 URL로 수정 필요
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ "nickname": nickname })
            });

            if (response.ok) {
                // 로그인 성공 시에만 채팅 페이지로 이동!
                const newSessionId = uuidv4();
                navigate(`/chatting/${nickname}/${newSessionId}`);
                const data = await response.json();
                setUserInfo(data.user_id, data.nickname)
            } else {
                alert("로그인 정보가 틀렸습니다.");
            }
        } catch (error) {
            <alert>로그인을 할 수 없습니다.!!!</alert>
            console.error(error);
        }
    };

    return (
        <>
            <h2>login 모달</h2>
            <p>
                <input
                    value={nickname}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력하세요"
                />
            </p>
            <button onClick={handleLogin}>login</button>
        </>
    )

}

export default Login