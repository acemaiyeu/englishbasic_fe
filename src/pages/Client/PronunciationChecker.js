import React, { useState, useEffect, useRef } from 'react';

// Giả định: Bạn có một hàm/API bên ngoài để đánh giá phát âm
// Hàm này sẽ trả về một mảng các đối tượng chỉ định phần nào đúng/sai
// Ví dụ: [{ text: 'Wor', isCorrect: true }, { text: 'ld', isCorrect: false }]
const mockAnalyzePronunciation = (targetWord, recognizedText) => {
  // Logic đơn giản MOCK: Giả sử lỗi ở ký tự thứ 3
  if (recognizedText.length > 2 && recognizedText.toLowerCase() !== targetWord.toLowerCase()) {
    return [
      { text: recognizedText.substring(0, 2), isCorrect: true },
      { text: recognizedText.substring(2), isCorrect: false }, // Phần sai (báo đỏ)
    ];
  }
  // Nếu đúng hoặc quá ngắn, coi như đúng cả
  return [{ text: targetWord, isCorrect: recognizedText.toLowerCase() === targetWord.toLowerCase() }];
};

const PronunciationChecker = ({ word }) => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // 1. Khởi tạo SpeechRecognition (Chỉ dùng cho các trình duyệt hỗ trợ)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Trình duyệt không hỗ trợ Web Speech API.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Ngừng sau khi phát hiện giọng nói
    recognition.interimResults = false; // Chỉ trả về kết quả cuối cùng
    recognition.lang = 'en-US'; // Thiết lập ngôn ngữ

    recognition.onstart = () => {
      setIsListening(true);
      setResult([{ text: 'Đang nghe...', isCorrect: true }]);
    };

    recognition.onresult = (event) => {
      const recognizedText = event.results[0][0].transcript;
      console.log('Đã nhận dạng:', recognizedText);
      // GỌI HÀM PHÂN TÍCH (THAY THẾ BẰNG API/ML THỰC TẾ CỦA BẠN)
      const analysisResult = mockAnalyzePronunciation(word, recognizedText); 
      setResult(analysisResult);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Lỗi nhận dạng giọng nói:', event.error);
      setResult([{ text: 'Lỗi: Vui lòng thử lại.', isCorrect: false }]);
      setIsListening(false);
    };

    recognition.onend = () => {
      if(isListening) { // Chỉ đặt lại nếu chưa có kết quả
         setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    // Cleanup
    return () => {
      recognition.stop();
    };
  }, [word]); // Re-run effect nếu từ thay đổi

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setResult([]); // Xóa kết quả cũ
      recognitionRef.current.start();
    }
  };

  return (
    <div className="speak-modal" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Từ: <strong style={{ color: 'blue' }}>{word}</strong></h3>
      <p>Hãy phát âm từ này:</p>
      
      <button 
        onClick={startListening} 
        disabled={isListening}
        style={{ padding: '10px 20px', backgroundColor: isListening ? '#ccc' : 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {isListening ? '...Đang nghe' : 'Bắt đầu nói'}
      </button>

      <hr />

      {/* HIỂN THỊ KẾT QUẢ ĐÃ PHÂN TÍCH */}
      <div style={{ marginTop: '15px', fontSize: '1.5em' }}>
        <strong>Kết quả:</strong>{' '}
        {result.length > 0 ? (
          result.map((item, index) => (
            <span
              key={index}
              style={{
                color: item.isCorrect ? 'green' : 'red', // Đánh dấu màu
                fontWeight: 'bold',
                marginRight: '2px',
                textDecoration: item.isCorrect ? 'none' : 'underline', // Gạch chân để làm nổi bật lỗi
              }}
            >
              {item.text}
            </span>
          ))
        ) : (
          <span>Chưa có kết quả.</span>
        )}
      </div>
    </div>
  );
};

export default PronunciationChecker;