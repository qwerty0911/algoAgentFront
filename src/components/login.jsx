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
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname })
            });

            if (response.ok) {
                const newSessionId = uuidv4();
                const data = await response.json();

                setUserInfo(data.user_id, data.nickname);
                navigate(`/chatting/${data.nickname}/${newSessionId}`);
            } else {
                alert("로그인 정보가 틀렸습니다.");
            }
        } catch (error) {
            alert("로그인을 할 수 없습니다. 잠시 후 다시 시도해주세요.");
            console.error(error);
        }
    };

    return (
        <form
            className="login-form"
            onSubmit={(e) => {
                e.preventDefault();
                if (!nickname.trim()) return;
                handleLogin();
            }}
        >
            <label className="login-label">
                <span className="login-label-text">Solved.ac 닉네임</span>
                <input
                    className="login-input"
                    value={nickname}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="예: beom_kim"
                />
            </label>
            <button type="submit" className="login-button">
                에이전트와 시작하기
            </button>
        </form>
    )

}

export default Login