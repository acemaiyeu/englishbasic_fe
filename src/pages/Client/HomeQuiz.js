import React, { useState } from 'react';

function HomeQuiz({ onJoinOrCreate }) {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');
  const [password, setPassword] = useState('');

  // Xử lý tạo phòng
  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Vui lòng nhập tên và mật khẩu!');
    
    // ⚠️ LOGIC BACKEND: Gửi yêu cầu lên server để tạo phòng mới, 
    // server sẽ trả về một ID phòng mới (nếu thành công)
    
    const newRoomID = Math.random().toString(36).substring(2, 8).toUpperCase(); // ID giả định
    
    alert(`Phòng mới được tạo: ${newRoomID}`);
    onJoinOrCreate(newRoomID, username, true); // true = là Host
  };

  // Xử lý tham gia phòng
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!username || !roomID || !password) return alert('Vui lòng nhập đầy đủ thông tin!');

    // ⚠️ LOGIC BACKEND: Gửi yêu cầu lên server để kiểm tra roomID và password.
    // Nếu hợp lệ:
    
    alert(`Tham gia phòng ${roomID} thành công!`);
    onJoinOrCreate(roomID, username, false); // false = là Player
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Nhập Tên của bạn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      {/* --- Tạo Phòng --- */}
      <h3>➕ Tạo Phòng Mới (Bạn là Chủ phòng)</h3>
      <form onSubmit={handleCreateRoom}>
        <input
          type="password"
          placeholder="Đặt Mật khẩu Phòng (Bắt buộc)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Tạo Phòng</button>
      </form>

      {/* --- Tham gia Phòng --- */}
      <h3>➡️ Tham gia Phòng Đã Có</h3>
      <form onSubmit={handleJoinRoom}>
        <input
          type="text"
          placeholder="Nhập ID Phòng"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Tham Gia</button>
      </form>
    </div>
  );
}

export default HomeQuiz;