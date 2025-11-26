import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client'; // ⚠️ Cần cài đặt socket.io-client

// const socket = io('http://localhost:4000'); // Thay bằng địa chỉ server của bạn

function QuizRoom({ roomID, username, isHost, quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizData[currentQuestionIndex];
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  // ----------------------------------------------------
  // ⚠️ LOGIC KẾT NỐI REALTIME (Socket.IO) SẼ ĐẶT Ở ĐÂY
  // ----------------------------------------------------
  useEffect(() => {
    // 1. Kết nối Socket.IO
    // socket.emit('joinRoom', { roomID, username, isHost });

    // 2. Lắng nghe sự kiện từ server (ví dụ: chuyển câu hỏi, cập nhật điểm,...)
    // socket.on('nextQuestion', (newIndex) => {
    //   setCurrentQuestionIndex(newIndex);
    //   setHasAnswered(false);
    // });

    // return () => {
    //   socket.off('nextQuestion');
    //   socket.emit('leaveRoom', { roomID, username });
    // };
  }, [roomID, username, isHost]);


  // Hàm xử lý khi người chơi chọn đáp án
  const handleAnswer = (selectedOption) => {
    if (hasAnswered || isHost) return;
    setHasAnswered(true);

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
        setScore(prevScore => prevScore + 10);
    }
    
    // ⚠️ LOGIC BACKEND: Gửi đáp án lên server
    // socket.emit('submitAnswer', { roomID, username, questionId: currentQuestion.id, isCorrect });
    
    // Có thể dùng setTimeout để hiển thị kết quả một lúc rồi chờ Host chuyển câu
    // setTimeout(() => {
    //   // Chờ server phản hồi hoặc Host chuyển câu hỏi
    // }, 3000);
  };

  // Hàm dành cho Chủ phòng để chuyển câu hỏi
  const handleNextQuestion = () => {
    if (!isHost) return;
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < quizData.length) {
      // ⚠️ LOGIC BACKEND: Thông báo cho tất cả người chơi trong phòng chuyển câu
      // socket.emit('hostNextQuestion', { roomID, nextIndex });
      setCurrentQuestionIndex(nextIndex);
      setHasAnswered(false);
    } else {
      alert('Quiz đã kết thúc!');
      // ⚠️ LOGIC BACKEND: Gửi yêu cầu server hiển thị kết quả cuối cùng
    }
  };

  if (!currentQuestion) return <h2>Quiz Đã Kết Thúc! Điểm của bạn: {score}</h2>;

  return (
    <div className="quiz-room-container">
      <h2>Phòng: {roomID} | Bạn: {username} ({isHost ? 'Chủ Phòng' : 'Người Chơi'})</h2>
      <h3>Điểm của bạn: {score}</h3>
      <hr />

      {/* Hiển thị Câu hỏi hiện tại */}
      <Question 
        question={currentQuestion} 
        handleAnswer={handleAnswer} 
        hasAnswered={hasAnswered}
        isHost={isHost}
      />
      
      {/* Điều khiển dành cho Chủ phòng */}
      {isHost && (
        <div className="host-controls">
          <p>Chế độ Chủ phòng. Bạn có thể chuyển câu hỏi.</p>
          <button 
            onClick={handleNextQuestion} 
            disabled={hasAnswered && currentQuestionIndex < quizData.length - 1} // Hoặc dựa trên trạng thái của tất cả người chơi
          >
            {currentQuestionIndex < quizData.length - 1 ? '➡️ Câu hỏi Tiếp theo' : '🏁 Kết thúc Quiz'}
          </button>
        </div>
      )}

      {/* ⚠️ HIỂN THỊ DANH SÁCH NGƯỜI CHƠI VÀ ĐIỂM SỐ (Cần dữ liệu từ Socket.IO) */}
    </div>
  );
}

// Component phụ để hiển thị câu hỏi và đáp án
const Question = ({ question, handleAnswer, hasAnswered, isHost }) => (
  <div className="question-card">
    <h4>Câu {question.id}: {question.question}</h4>
    <div className="options">
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          disabled={hasAnswered || isHost}
          // Thêm class 'correct' hoặc 'incorrect' nếu đã trả lời để hiển thị kết quả
          style={{
            backgroundColor: hasAnswered 
              ? (option === question.correctAnswer ? 'lightgreen' : (option !== question.correctAnswer ? 'lightcoral' : 'white')) 
              : 'white',
            cursor: hasAnswered || isHost ? 'not-allowed' : 'pointer',
          }}
        >
          {option}
        </button>
      ))}
    </div>
    {hasAnswered && !isHost && <p>Bạn đã trả lời. Chờ Chủ phòng chuyển câu.</p>}
  </div>
);

export default QuizRoom;