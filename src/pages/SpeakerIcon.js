import React, { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react"; // icon từ lucide-react

const SpeakerIcon = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audio));

  const togglePlay = () => {
    const audioEl = audioRef.current;

    if (isPlaying) {
      audioEl.pause();
    } else {
      audioEl.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
       style={{backgroundColor: "transparent", padding: "0", margin: "0", textAlign: "start", marginLeft: "1px"}}
      title={isPlaying ? "Tạm dừng" : "Phát âm thanh"}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
};

export default SpeakerIcon;
