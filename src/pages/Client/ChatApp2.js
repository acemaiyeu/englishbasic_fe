// src/components/ChatApp2.js
import React, { useEffect, useState } from 'react';
import echo from './Echo'; // Đảm bảo đường dẫn đến file Echo.js là chính xác
import axios from 'axios'; // Cần cài đặt axios: npm install axios
import { API_URL } from '../const/const';

function ChatApp2() {
    // Trạng thái cho toàn bộ danh sách tin nhắn (Real-time + Tin nhắn đã gửi)
    const [messagesList, setMessagesList] = useState([]); 
    
    // Trạng thái cho input của người dùng
    const [inputValue, setInputValue] = useState(""); 

    const channelName = 'chat.1.2'; 
    const eventName = 'message.sent'; 
    
    // URL API Laravel của bạn để xử lý việc gửi tin nhắn
    // Ví dụ: http://localhost:8000/api/send-message (Cần định nghĩa trong Laravel)
    

    // --- 1. LOGIC LẮNG NGHE REAL-TIME ---
    useEffect(() => {
        
        // Bắt đầu lắng nghe kênh công khai
        echo.channel(channelName)
            .listen(`.${eventName}`, (data) => {
                console.log('✅ Sự kiện tin nhắn mới nhận được:', data);
                
                // Cập nhật danh sách tin nhắn với dữ liệu từ WebSocket
                setMessagesList(prevMessages => [...prevMessages, data.message]);
            })
            .subscribed(() => {
                console.log(`📡 Đã đăng ký kênh: ${channelName}`);
            });
            
        // Hàm clean-up khi component bị unmount
        return () => {
            echo.leave(channelName);
            console.log(`Dừng lắng nghe kênh: ${channelName}`);
        };
    }, []); // Chỉ chạy một lần khi mount


    // --- 2. LOGIC GỬI TIN NHẮN (Gửi đến Laravel API) ---
    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        // 1. Gửi tin nhắn đến Laravel API
        try {
            // Laravel API sẽ nhận tin nhắn, sau đó phát sự kiện WebSocket
            await axios.post(`${API_URL}/send-message`, {
                message:  inputValue,
                channel: channelName, // Gửi kèm tên kênh để backend biết phát đi đâu
                event: eventName
            });

            // 2. Xóa input sau khi gửi thành công
            setInputValue("");
            
            // Lưu ý: Chúng ta KHÔNG cập nhật messagesList ở đây. 
            // Danh sách sẽ được cập nhật tự động khi sự kiện được phát (từ useEffect ở trên)
            
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn đến API Laravel:", error);
            alert("Gửi tin nhắn thất bại!");
        }
    };
    // const sendMessage2 = async () => {
    //     let time = 30;
    //     setInterval(() => {
    //        sendMessage(time--)
    //     }, 1000)

    // }
    // sendMessage2()
    // Xử lý phím Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };


    // --- 3. Giao diện ---
    return (
        <div style={{display: "flex", flexDirection: "column", width: "50vw", margin: "0 auto"}}>
            <h1>Chat App Real-time</h1>
            <ul style={{height: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px"}}>
                {messagesList.length === 0 && <p style={{color: '#999'}}>Chưa có tin nhắn nào...</p>}
                {messagesList.map((msg, index) => (
                    // Giả định tin nhắn nhận được là một chuỗi
                    <li key={index} style={{ listStyleType: 'none', margin: '5px 0', padding: '5px', background: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0', borderRadius: '5px' }}>
                        {msg}
                    </li>
                ))}
            </ul>
            <textarea 
                style={{padding: "10px", marginTop: "10px"}} 
                cols="30" rows="3" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
            />
            <button 
                onClick={sendMessage} 
                style={{padding: "10px", marginTop: "5px", background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer'}}
            >
                Gửi
            </button>
        </div>
    );
}

export default ChatApp2;