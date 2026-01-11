import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioButton = ({ text, lang = "en-US", size = 32 }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    // Nếu đang nói thì dừng lại
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.5; // tốc độ nói (1 = bình thường)
    utterance.pitch = 2; // cao độ
    utterance.volume = 1; // âm lượng 0–1

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speakText}
      className="p-2 rounded-full hover:bg-gray-200 transition inline-flex items-center justify-center btn-audio"
      aria-label="Phát âm thanh"
    >
      {isSpeaking ? (
        <Volume2 size={size} className="text-blue-600" />
      ) : (
        <VolumeX size={size} className="text-gray-600" />
      )}
    </button>
  );
};

export default AudioButton;
