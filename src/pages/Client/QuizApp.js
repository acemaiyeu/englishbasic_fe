import React, { useState } from 'react';
import QuizRoom from './QuizRoom';
import HomeQuiz from './HomeQuiz';

function QuizApp() {
  // Trạng thái của ứng dụng
  const QUIZ_DATA = [
  {
    id: 1,
    question: "Thủ đô của Việt Nam là gì?",
    options: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Huế"],
    correctAnswer: "Hà Nội", // Dùng để kiểm tra đáp án
  },
  {
    id: 2,
    question: "Ngôn ngữ lập trình React được phát triển bởi công ty nào?",
    options: ["Google", "Microsoft", "Facebook (Meta)", "Amazon"],
    correctAnswer: "Facebook (Meta)",
  },
  // Thêm các câu hỏi khác...
];

  const [roomInfo, setRoomInfo] = useState({
    id: null,
    username: '',
    isHost: false, // Là Chủ phòng hay Người chơi
  });
  
  // Hàm xử lý khi người dùng tạo/tham gia phòng
  const handleRoomAction = (id, user, host) => {
    // ⚠️ Thực hiện gọi API/Socket.IO để kết nối/kiểm tra mật khẩu tại đây
    
    // Nếu kết nối thành công:
    setRoomInfo({
      id: id,
      username: user,
      isHost: host,
    });
  };

  // Hiển thị Home nếu chưa vào phòng, ngược lại hiển thị QuizRoom
  return (
    <div className="quiz-app-container">
      <h1>🏆 Realtime Quiz App</h1>
      {roomInfo.id ? (
        <QuizRoom 
          roomID={roomInfo.id} 
          username={roomInfo.username} 
          isHost={roomInfo.isHost} 
          quizData={QUIZ_DATA}
        />
      ) : (
        <HomeQuiz onJoinOrCreate={handleRoomAction} />
      )}
    </div>
  );
}

export default QuizApp;