import { useParams } from 'react-router-dom';

const Chatting = () => {
    const { userId } = useParams();

    console.log({userId})

    return (
        <>
            <h2>Chatting</h2>
            <p>
                채팅이 이루어지는 페이지입니다.
                {userId}로 접속중입니다.
            </p>
        </>
    )
}

export default Chatting