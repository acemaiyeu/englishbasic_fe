// src/components/Gamequiz.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom'; 

import echo from './Echo'; // Đảm bảo Echo đã được cấu hình đúng
import axios from 'axios'; 
import { API_URL } from '../const/const'; 
import '../sass/Gamequiz.scss';
import IntervalLogger from './IntervalLogger'; 
import { toast } from 'react-toastify';

function Gamequiz(props) {
    const { channelId } = useParams();
    
    // State cho danh sách tin nhắn và câu hỏi
    const [messagesList, setMessagesList] = useState([]); 
    const [questionList, setQuestionsList] = useState([]); 
    const [indexQuestion, setIndexQuestion] = useState(0); 
    const [inputValue, setInputValue] = useState(""); 
    const [isQuizActive, setIsQuizActive] = useState(false); 

    const channelName = channelId || 'default-gamequiz-channel';
    const eventName = 'quiz.message.sent'; 

    // Hàm lấy danh sách câu hỏi
    const getQuestions = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/questions`);
            setQuestionsList(response.data.data);
            console.log("Đã tải xong danh sách câu hỏi.");
        } catch (error) {
            console.error("Lỗi khi lấy câu hỏi từ API Laravel:", error);
        }
    }, []);

    // --- 1. LOGIC GỬI LỆNH ĐẾN SERVER (Được dùng chung cho tin nhắn và lệnh Next) ---
    const sendMessageToServer = useCallback(async (message, nextIndex = indexQuestion) => {
        // Chỉ gửi khi Quiz đang hoạt động
        if (!isQuizActive) return; 

        try {
            await axios.post(`${API_URL}/send-message`, {
                message: message,
                channel: channelName, 
                event: eventName,
                index_question: nextIndex, // Gửi chỉ số câu hỏi mới/hiện tại
            });
            // Xóa input value nếu không phải là lệnh "next"
            if (message !== "next") {
                setInputValue("");
            }
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn đến API Laravel:", error);
            alert("Gửi lệnh thất bại!");
        }
    }, [isQuizActive, channelName, eventName, indexQuestion]);

    // --- 2. LOGIC LẮNG NGHE REAL-TIME (Chỉ hoạt động khi isQuizActive là true) ---
    useEffect(() => {
        getQuestions();

        if (!isQuizActive || !channelName) {
            console.log('Quiz chưa bắt đầu hoặc chưa có channelId. Dừng lắng nghe.');
            if (channelName) {
                echo.leave(channelName);
            }
            return; 
        }

        console.log(`Bắt đầu lắng nghe kênh: ${channelName}`);
        
        // Bắt đầu lắng nghe kênh
        echo.channel(channelName)
            .listen(`.${eventName}`, (data) => {
                console.log('✅ Sự kiện tin nhắn mới nhận được:', data);
                
                // Cập nhật danh sách tin nhắn
                if (data.message) {
                    setMessagesList(prevMessages => [...prevMessages, data.message]);
                }
                
                // 💡 LOGIC QUAN TRỌNG: Cập nhật chỉ số câu hỏi từ SERVER
                // Đây là cách duy nhất để chuyển câu hỏi trên UI
                if (data.index_question !== undefined) {
                    // Chuyển đổi thành số nguyên trước khi cập nhật (đề phòng)
                    setIndexQuestion(parseInt(data.index_question, 10)); 
                    console.log(`✅ Index câu hỏi đã cập nhật: ${data.index_question}`);
                }
            })
            .subscribed(() => {
                console.log(`📡 Đã đăng ký kênh: ${channelName}`);
            });
            
        // Hàm clean-up
        return () => {
            echo.leave(channelName);
            console.log(`Dừng lắng nghe kênh: ${channelName}`);
        };
    // Chỉ chạy lại khi channelName hoặc isQuizActive thay đổi
    }, [isQuizActive, channelName, eventName, getQuestions]); 

    // --- 3. HÀM KÍCH HOẠT VÀ DỪNG GAME ---
    const startQuiz = () => {
        // Khởi động lại index về 0 khi bắt đầu game mới
        setIndexQuestion(0); 
        setMessagesList([]); 
        setIsQuizActive(true); 
        console.log('Kích hoạt Game Quiz!');
    }

    const stopQuiz = () => {
        setIsQuizActive(false); 
        console.log('Dừng Game Quiz!');
    }
    
    // --- 4. HÀM CHUYỂN CÂU HỎI (Gửi lệnh Next) ---
    const handleNextQuestion = () => {
        if (!isQuizActive || questionList.length === 0) return;

        // Tính toán chỉ số câu hỏi tiếp theo
        const nextIndex = (indexQuestion + 1) % questionList.length; 

        // Gửi lệnh "next" kèm theo chỉ số câu hỏi tiếp theo đến Server
        // Server sẽ broadcast, sau đó useEffect sẽ bắt và cập nhật indexQuestion
        sendMessageToServer("next", nextIndex);
    };

    // Hàm xử lý khi người dùng chọn câu trả lời
    const handleAnswerClick = (answer) => {
        // if (!isQuizActive) return;
        // Gửi câu trả lời (ví dụ: "A") đến Server
        // sendMessageToServer(answer, indexQuestion);
        // console.log(`Đã gửi câu trả lời: ${answer}`);
        // console.log(`Đã gửi câu trả lời: `, questionList[indexQuestion]);
        if(answer){
            // sendMessageToServer(`Câu trả lời đúng! Đáp án là ${answer}`, questionList[indexQuestion]);
            toast.success('Chúc mừng bạn đã trả lời đúng!');
        }else{
            // sendMessageToServer(`Câu trả lời sai!`, indexQuestion);
        toast.error('Câu trả lời sai rồi bạn ơi!')
        }
    }

    // --- 5. Giao diện ---
    const currentQuestion = questionList[indexQuestion];
    
    return (
        <div style={{display: "flex", flexDirection: "column", width: "80vw", maxWidth: "800px", margin: "0 auto", padding: "20px"}}>
            <h1>🕹️ GAMEQUIZ: Kênh **{channelName}** INDEX: {indexQuestion}</h1>
            
            <div style={{ border: "1px solid #ddd", padding: "20px", marginBottom: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", margin: "0 0 10px 0" }}>
                    Trạng thái: {isQuizActive ? '🟢 Đang diễn ra' : '🔴 Chưa bắt đầu'}
                </p>
                <p style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", color: "#333" }}>
                    Câu hỏi {indexQuestion + 1}: {currentQuestion ? currentQuestion.title_english : 'Đang tải câu hỏi...'}
                </p>
            </div>
            
            <div className="answer-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '15px' }}>
                {questionList[indexQuestion]?.answers[0] && 
                    <button disabled={!isQuizActive} onClick={() => handleAnswerClick(questionList[indexQuestion].answers[0].id === questionList[indexQuestion].answer)}>A. {questionList[indexQuestion].answers[0].title || 'Loading...'}</button>
                }
                {questionList[indexQuestion]?.answers[1] && 
                    <button disabled={!isQuizActive} onClick={() => handleAnswerClick(questionList[indexQuestion].answers[1].id === questionList[indexQuestion].answer)}>B. {questionList[indexQuestion].answers[1].title || 'Loading...'}</button>
                }
                {questionList[indexQuestion]?.answers[2] && 
                    <button disabled={!isQuizActive} onClick={() => handleAnswerClick(questionList[indexQuestion].answers[2].id === questionList[indexQuestion].answer)}>C. {questionList[indexQuestion].answers[2].title || 'Loading...'}</button>
                }
                {questionList[indexQuestion]?.answers[3] && 
                    <button disabled={!isQuizActive} onClick={() => handleAnswerClick(questionList[indexQuestion].answers[3].id === questionList[indexQuestion].answer)}>D. {questionList[indexQuestion].answers[3].title || 'Loading...'}</button>
                }

            </div>

            <h2 style={{marginTop: "15px"}}>Tin nhắn Real-time nhận được:</h2>
            <div style={{ height: "150px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px", backgroundColor: "#fff", marginBottom: "15px" }}>
                {messagesList.slice(-5).map((msg, index) => ( // Hiển thị 5 tin nhắn gần nhất
                    <div key={index} style={{ borderBottom: "1px dotted #eee", padding: "5px 0" }}>
                        **[{new Date().toLocaleTimeString()}]**: {msg}
                    </div>
                ))}
            </div>
            
            <IntervalLogger /> 
            
            <button 
                onClick={isQuizActive ? stopQuiz : startQuiz} 
                style={{
                    padding: "10px", 
                    marginTop: "10px", 
                    background: isQuizActive ? '#F44336' : '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                {isQuizActive ? 'DỪNG QUIZ VÀ NGẮT KẾT NỐI' : 'BẮT ĐẦU QUIZ VÀ KẾT NỐI'}
            </button>

            <button 
                onClick={handleNextQuestion} 
                disabled={!isQuizActive}
                style={{
                    padding: "10px", 
                    marginTop: "5px", 
                    background: isQuizActive ? '#2196F3' : '#aaa', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Chuyển Câu Hỏi Kế Tiếp (Gửi lệnh đến Server)
            </button>
        </div>
    );
}

export default Gamequiz;