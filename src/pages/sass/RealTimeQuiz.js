import React, { Component } from 'react';
import io from 'socket.io-client';

// URL của máy chủ Socket.io của bạn
const SOCKET_SERVER_URL = 'http://localhost:3001'; 

class RealTimeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 1. Trạng thái kết nối và phòng
      isConnected: false,
      roomId: '',
      password: '',
      isJoined: false, // Đã tham gia phòng thành công
      isHost: false,   // Là Host của phòng hay không
      error: null,
      
      // 2. Trạng thái Quiz
      currentQuestion: null, // Dữ liệu câu hỏi hiện tại
      scores: {},            // Bảng điểm {socketId: score}
      answerLocked: false,   // Khóa nút trả lời sau khi gửi
    };
    // Khởi tạo Socket.io client
    this.socket = io(SOCKET_SERVER_URL);
  }
  
  // -------------------------------------------------------------------
  // LIFECYCLE VÀ XỬ LÝ SỰ KIỆN SOCKET
  // -------------------------------------------------------------------

  componentDidMount() {
    // 1. Kết nối và ngắt kết nối
    this.socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    this.socket.on('disconnect', () => {
      this.setState({ isConnected: false, isJoined: false });
    });

    // 2. Xử lý sự kiện ROOM (Từ Server)
    this.socket.on('ROOM_STATE', (data) => {
      // Nhận trạng thái phòng (isHost, câu hỏi hiện tại, scores)
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

    // 3. Xử lý sự kiện QUIZ (Từ Server)
    this.socket.on('NEW_QUESTION', (question) => {
      // Nhận câu hỏi mới
      this.setState({ 
        currentQuestion: question, 
        answerLocked: false // Mở khóa trả lời cho câu hỏi mới
      });
    });

    this.socket.on('UPDATE_SCORES', (scores) => {
      // Cập nhật điểm của tất cả người chơi
      this.setState({ scores });
    });
  }

  componentWillUnmount() {
    // Dọn dẹp và ngắt kết nối Socket khi component bị hủy
    this.socket.disconnect();
  }

  // -------------------------------------------------------------------
  // HANDLERS (Xử lý tương tác người dùng)
  // -------------------------------------------------------------------

  handleJoinRoom = (e) => {
    e.preventDefault();
    const { roomId, password } = this.state;
    // Gửi yêu cầu tham gia phòng lên Server
    this.socket.emit('JOIN_ROOM', { roomId, password });
  };
  
  handleCreateRoom = () => {
      const { roomId, password } = this.state;
      // Gửi yêu cầu tạo phòng lên Server
      this.socket.emit('CREATE_ROOM', { roomId, password });
  }

  handleAnswer = (answerIndex) => {
    if (this.state.answerLocked || !this.state.currentQuestion) return;

    this.setState({ answerLocked: true }); // Khóa nút ngay lập tức

    // Gửi câu trả lời lên Server
    this.socket.emit('SUBMIT_ANSWER', {
      questionId: this.state.currentQuestion.id,
      answerIndex: answerIndex,
    });
  };

  handleStartQuiz = () => {
      // Chỉ Host mới gửi lệnh bắt đầu
      if (this.state.isHost) {
          this.socket.emit('START_QUIZ', { roomId: this.state.roomId });
      }
  };

  // -------------------------------------------------------------------
  // RENDER (Hiển thị UI)
  // -------------------------------------------------------------------

  renderJoinForm() {
    // Hiển thị form để nhập Room ID và Mật khẩu
    return (
        <form onSubmit={this.handleJoinRoom}>
            <h3>Tham gia phòng Quiz</h3>
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
              autocomplete="current-password" // Thêm gợi ý từ cảnh báo trước
            />
            <button type="submit">Tham gia (Join)</button>
            <button type="button" onClick={this.handleCreateRoom}>Tạo phòng (Create)</button>
            {this.state.error && <p style={{ color: 'red' }}>Lỗi: {this.state.error}</p>}
        </form>
    );
  }

  renderQuiz() {
    const { currentQuestion, scores, isHost, answerLocked } = this.state;

    return (
        <div>
            <h2>Phòng: {this.state.roomId}</h2>
            {isHost && <button onClick={this.handleStartQuiz}>BẮT ĐẦU QUIZ</button>}

            {/* Hiển thị Câu hỏi */}
            {currentQuestion ? (
                <div>
                    <h4>{currentQuestion.text}</h4>
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => this.handleAnswer(index)}
                        disabled={answerLocked}
                      >
                        {option}
                      </button>
                    ))}
                    {answerLocked && <p>Đã gửi câu trả lời!</p>}
                </div>
            ) : (
                <p>Đang chờ Host bắt đầu Quiz...</p>
            )}

            {/* Hiển thị Bảng điểm */}
            <h3>📊 Bảng điểm:</h3>
            <ul>
                {Object.entries(scores).map(([socketId, score]) => (
                    <li key={socketId}>Người chơi ({socketId.substring(0, 5)}...): **{score} điểm**</li>
                ))}
            </ul>
        </div>
    );
  }

  render() {
    const { isConnected, isJoined } = this.state;
    
    return (
      <div className="quiz-container">
        <h1>Quiz Real-Time 🚀</h1>
        <p>Trạng thái Socket: {isConnected ? '✅ Đã kết nối' : '❌ Đang ngắt kết nối'}</p>
        
        {isJoined ? this.renderQuiz() : this.renderJoinForm()}
      </div>
    );
  }
}

export default RealTimeQuiz;