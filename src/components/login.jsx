import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate(`/chatting/${userId}`);
    };

    return (
        <>
            <h2>login 모달</h2>
            <p>
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력하세요"
                />
            </p>
            <button onClick={handleLogin}>login</button>
        </>
    )

}

export default Login