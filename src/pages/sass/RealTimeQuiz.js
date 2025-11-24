import React, { Component } from 'react';
import io from 'socket.io-client';

// Khởi tạo kết nối Socket.io
const SOCKET_SERVER_URL = 'http://localhost:3001'; // Thay bằng URL server của bạn

class RealTimeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 1. Trạng thái kết nối
      isConnected: false,
      // 2. Thông tin phòng
      roomId: '',
      password: '',
      isJoined: false,
      isHost: false,
      error: null,
      // 3. Trạng thái Quiz
      currentQuestion: null, // {id: 1, text: '...', options: ['A', 'B']}
      scores: {}, // {socketId1: 10, socketId2: 20}
      myScore: 0,
      answerLocked: false,
    };
    // Khởi tạo socket trong constructor
    this.socket = io(SOCKET_SERVER_URL);
  }

  // --- 3. LIFECYCLE METHODS ---

  componentDidMount() {
    this.socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    this.socket.on('disconnect', () => {
      this.setState({ isConnected: false, isJoined: false });
    });

    // --- Xử lý sự kiện từ Server ---

    this.socket.on('ROOM_STATE', (data) => {
      // Nhận trạng thái phòng sau khi JOIN_ROOM thành công
      this.setState({
        isJoined: true,
        isHost: data.isHost,
        currentQuestion: data.question || null,
        scores: data.scores || {},
        error: null,
      });
    });

    this.socket.on('JOIN_ERROR', (message) => {
      this.setState({ error: message });
    });

    this.socket.on('NEW_QUESTION', (question) => {
      this.setState({ currentQuestion: question, answerLocked: false });
      alert('Câu hỏi mới đã đến!');
    });

    this.socket.on('UPDATE_SCORES', (scores) => {
      // Cập nhật điểm và điểm của bản thân
      const myScore = scores[this.socket.id] || 0;
      this.setState({ scores, myScore });
    });
  }

  componentWillUnmount() {
    // Ngắt kết nối khi component bị hủy
    this.socket.disconnect();
  }

  // --- 4. HANDLERS (Xử lý sự kiện UI) ---

  handleJoinRoom = (e) => {
    e.preventDefault();
    const { roomId, password } = this.state;
    this.socket.emit('JOIN_ROOM', { roomId, password });
  };

  handleCreateRoom = (e) => {
    e.preventDefault();
    const { roomId, password } = this.state;
    this.socket.emit('CREATE_ROOM', { roomId, password });
  };

  handleAnswer = (answerIndex) => {
    if (this.state.answerLocked) return;

    this.setState({ answerLocked: true });
    this.socket.emit('SUBMIT_ANSWER', {
      questionId: this.state.currentQuestion.id,
      answerIndex: answerIndex,
    });
  };

  handleStartQuiz = () => {
    this.socket.emit('START_QUIZ', { roomId: this.state.roomId });
  };

  // --- 5. RENDER LOGIC ---

  renderJoinForm() {
    // ... Phần giao diện nhập Room ID và Mật khẩu
    return (
        <form onSubmit={this.handleJoinRoom}>
            <input
              type="text"
              placeholder="Room ID"
              onChange={(e) => this.setState({ roomId: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => this.setState({ password: e.target.value })}
              required
            />
            <button type="submit">Tham gia (Join)</button>
            <button onClick={this.handleCreateRoom}>Tạo phòng (Create)</button>
            {this.state.error && <p style={{ color: 'red' }}>Lỗi: {this.state.error}</p>}
        </form>
    );
  }

  renderQuiz() {
    const { currentQuestion, scores, myScore, isHost } = this.state;

    // ... Hiển thị nút Start Quiz cho Host
    const HostControls = isHost && (
        <button onClick={this.handleStartQuiz}>BẮT ĐẦU QUIZ</button>
    );

    // ... Hiển thị Câu hỏi và các lựa chọn
    const QuestionUI = currentQuestion ? (
        <div>
            <h3>{currentQuestion.text}</h3>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => this.handleAnswer(index)}
                disabled={this.state.answerLocked}
              >
                {option}
              </button>
            ))}
            {this.state.answerLocked && <p>Đã gửi câu trả lời!</p>}
        </div>
    ) : (
        <p>Đang chờ Host bắt đầu Quiz...</p>
    );
    
    // ... Hiển thị Bảng điểm
    const Scoreboard = (
        <div>
            <h4>Bảng điểm (Điểm của tôi: {myScore})</h4>
            <ul>
                {Object.entries(scores).map(([id, score]) => (
                    <li key={id}>{id.substring(0, 5)}...: {score} điểm</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div>
            <h2>Phòng: {this.state.roomId}</h2>
            {HostControls}
            {QuestionUI}
            {Scoreboard}
        </div>
    );
  }

  render() {
    return (
      <div className="quiz-container">
        <h1>Quiz Real-Time (Socket.io)</h1>
        <p>Trạng thái kết nối: {this.state.isConnected ? '✅ Đã kết nối' : '❌ Mất kết nối'}</p>
        
        {this.state.isJoined ? this.renderQuiz() : this.renderJoinForm()}
      </div>
    );
  }
}

export default RealTimeQuiz;