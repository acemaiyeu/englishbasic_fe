// src/components/QuizHost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import echo from '../echo.js';

const API_BASE_URL = 'http://localhost:8000/api'; // Thay bằng URL Laravel BE của bạn

function QuizHost({ quizId }) {
  const [sessionId, setSessionId] = useState(null);
  const [gameStatus, setGameStatus] = useState('INIT'); // INIT, LOBBY, IN_PROGRESS
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [players, setPlayers] = useState([]);

  // Hàm tạo phòng (Session)
  const createSession = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/quizzes/${quizId}/session`);
      const newSessionId = response.data.sessionId;
      setSessionId(newSessionId);
      setGameStatus('LOBBY');
      listenForUpdates(newSessionId); // Bắt đầu lắng nghe sự kiện
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  // Hàm bắt đầu game
  const startGame = async () => {
    try {
      await axios.post(`${API_BASE_URL}/session/${sessionId}/start`);
      // Backend sẽ phát sự kiện NEW_QUESTION, component sẽ tự cập nhật qua Echo
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  // Lắng nghe sự kiện Real-time
  const listenForUpdates = (id) => {
    echo.channel(`quiz.${id}`) // Kết nối đến kênh riêng của phòng
      .listen('.session.update', (e) => {
        console.log('Real-time event received:', e);
        
        // Logic cập nhật giao diện dựa trên type của event
        if (e.data.type === 'PLAYER_JOINED') {
          setPlayers(prev => [...prev, e.data.player]);
        } else if (e.data.type === 'NEW_QUESTION') {
          setGameStatus('IN_PROGRESS');
          setCurrentQuestion(e.data.question);
        } else if (e.data.type === 'LEADERBOARD_UPDATE') {
          // Xử lý cập nhật bảng xếp hạng
        }
      });
  };

  if (!sessionId) {
    return <button onClick={createSession}>Tạo Phòng Quiz Mới</button>;
  }

  return (
    <div className="quiz-host">
      <h2>Mã Phòng: **{sessionId}**</h2>
      <p>Trạng thái: **{gameStatus}**</p>

      {gameStatus === 'LOBBY' && (
        <>
          <p>Đang chờ người chơi tham gia...</p>
          <button onClick={startGame} disabled={players.length === 0}>
            Bắt đầu Game ({players.length} người chơi)
          </button>
        </>
      )}

      {gameStatus === 'IN_PROGRESS' && currentQuestion && (
        <div>
          <h3>Câu hỏi hiện tại: {currentQuestion.content}</h3>
          <p>Người chơi đang trả lời...</p>
        </div>
      )}
    </div>
  );
}

export default QuizHost;