import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const PronunciationChecker = ({ targetPhrase, accent = 'en-US' }) => {
  // accent: 'en-US' (Mỹ) hoặc 'en-GB' (Anh)
  
  const [resultMsg, setResultMsg] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Hàm chuẩn hóa chuỗi: bỏ viết hoa, bỏ dấu chấm phẩy để so sánh chính xác
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Bỏ dấu câu
      .replace(/\s{2,}/g, " ") // Bỏ khoảng trắng thừa
      .trim();
  };

  // Xử lý khi người dùng ngừng nói
  useEffect(() => {
    if (!listening && transcript) {
      checkPronunciation();
    }
  }, [listening, transcript]);

  const checkPronunciation = () => {
    const cleanTranscript = normalizeText(transcript);
    const cleanTarget = normalizeText(targetPhrase);

    if (cleanTranscript === cleanTarget) {
      setResultMsg("🎉 Tuyệt vời! Bạn phát âm rất chuẩn.");
      setIsCorrect(true);
    } else {
      setResultMsg("⚠️ Chưa chính xác lắm. Hãy thử lại nhé!");
      setIsCorrect(false);
    }
  };

  const handleStart = () => {
    resetTranscript();
    setResultMsg(null);
    setIsCorrect(null);
    // startListening với ngôn ngữ được truyền vào từ props
    SpeechRecognition.startListening({ continuous: false, language: accent });
  };

  // Hàm cho máy đọc mẫu (Text-to-Speech)
  const speakSample = () => {
    const utterance = new SpeechSynthesisUtterance(targetPhrase);
    utterance.lang = accent;
    window.speechSynthesis.speak(utterance);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Trình duyệt không hỗ trợ.</span>;
  }

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '20px', 
      borderRadius: '8px', 
      maxWidth: '500px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* 1. Hiển thị từ cần đọc */}
      <h3>Thử thách: <span style={{ color: '#2980b9' }}>"{targetPhrase}"</span></h3>
      
      {/* Badge hiển thị giọng đang chọn */}
      <div style={{ marginBottom: '15px' }}>
        <span style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
          Giọng: {accent === 'en-US' ? '🇺🇸 Anh - Mỹ' : '🇬🇧 Anh - Anh'}
        </span>
      </div>

      {/* 2. Các nút điều khiển */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={speakSample} style={{ cursor: 'pointer' }}>
          🔊 Nghe mẫu
        </button>
        
        <button 
          onClick={handleStart} 
          disabled={listening}
          style={{ 
            backgroundColor: listening ? '#e74c3c' : '#27ae60', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            cursor: listening ? 'default' : 'pointer',
            borderRadius: '4px'
          }}
        >
          {listening ? '🎙️ Đang nghe...' : '🎤 Bắt đầu nói'}
        </button>
      </div>

      {/* 3. Hiển thị kết quả so sánh */}
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>Bạn đã nói:</p>
        <p style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: isCorrect === false ? '#c0392b' : '#2c3e50' 
          }}>
          {transcript || "..."}
        </p>

        {/* Phần hiển thị lỗi sai chi tiết */}
        {isCorrect === false && (
          <div style={{ marginTop: '10px', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
            <p style={{ color: '#c0392b', margin: 0 }}>So sánh:</p>
            <p>🎯 Mẫu: <strong>{normalizeText(targetPhrase)}</strong></p>
            <p>❌ Bạn: <strong>{normalizeText(transcript)}</strong></p>
          </div>
        )}

        {/* Thông báo kết quả */}
        {resultMsg && (
          <div style={{ 
            marginTop: '15px', 
            color: isCorrect ? '#27ae60' : '#d35400', 
            fontWeight: 'bold' 
          }}>
            {resultMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationChecker;