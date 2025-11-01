import React, { useState } from "react";

const PronunciationPractice = ({ word, language_type}) => {
  const [result, setResult] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [log, setLog] = useState("");

  // ✅ Phát âm chuẩn từ (dùng SpeechSynthesis)
  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // ✅ Hàm so sánh chuỗi và tô màu đúng/sai
  const highlightDiff = (expected, actual) => {
    let output = "";
    let correctCount = 0;
    const maxLen = Math.max(expected.length, actual.length);

    for (let i = 0; i < maxLen; i++) {
      const e = expected[i] || "";
      const a = actual[i] || "";

      if (e.toLowerCase() === a.toLowerCase()) {
        output += `<span style="color:green;">${a}</span>`;
        correctCount++;
      } else {
        output += `<span style="color:red;">${a}</span>`;
      }
    }

    const percent = Math.round((correctCount / expected.length) * 100);
    setAccuracy(percent);
    return output;
  };

  // ✅ Nhận giọng nói người dùng (SpeechRecognition)
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setResult("⚠️ Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói!");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // hoặc "vi-VN" nếu muốn thử bằng tiếng Việt
    recognition.continuous = false; // nghe 1 lần
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setLog("🎤 Bắt đầu nghe...");
    setIsListening(true);
    setResult("");
    setHighlighted("");
    setAccuracy(null);

    recognition.start();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.trim();
      setLog(`🔍 Nhận được: "${spoken}"`);
      const htmlDiff = highlightDiff(word, spoken);
      setHighlighted(htmlDiff);

      if (spoken.toLowerCase() === word.toLowerCase()) {
        setResult("✅ Chính xác!");
      } else {
        setResult("❌ Sai hoặc phát âm chưa chuẩn!");
      }
      setIsListening(false);
    };

    recognition.onerror = (e) => {
      let msg = "";
      switch (e.error) {
        case "no-speech":
          msg = "😶 Không nghe thấy gì, hãy thử lại!";
          break;
        case "audio-capture":
          msg = "🎙️ Không tìm thấy micro!";
          break;
        case "not-allowed":
          msg = "🚫 Bạn cần cho phép truy cập micro!";
          break;
        default:
          msg = `⚠️ Lỗi: ${e.error}`;
      }
      setResult(msg);
      setIsListening(false);
      setLog("");
    };

    recognition.onend = () => {
      setIsListening(false);
      setLog("🛑 Dừng nghe");
    };
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 text-center mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-3">🎧 {language_type === "EN" ? "Practice pronunciation" :"Luyện phát âm"}: <span className="text-blue-600">{word}</span></h2>

      <div className="space-x-2 mb-4">
        <button
          onClick={speakWord}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          🔊 {language_type === "EN" ? "Listen" : "Nghe từ"}
        </button>
        <button
          onClick={startListening}
          disabled={isListening}
          className={`${
            isListening ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded-md`}
        >
          🎤  {isListening ? (language_type === "EN" ? "Listening..." : "Đang nghe...") : (language_type === "EN" ? "Try to" : "Phát âm thử")}
        </button>
      </div>

      {result && <p className="text-lg font-semibold mt-2">{result}</p>}
      {accuracy !== null && (
        <p className="text-md mt-1">🎯 Độ chính xác: <span className="font-bold">{accuracy}%</span></p>
      )}
      {highlighted && (
        <p
          className="mt-3 text-xl font-mono"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      )}
      {log && <p className="mt-3 text-sm text-gray-500">{log}</p>}
    </div>
  );
};

export default PronunciationPractice;
