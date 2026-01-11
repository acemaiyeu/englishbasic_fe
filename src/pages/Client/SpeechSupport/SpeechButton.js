import React, { Component } from 'react';

class SpeechButton extends Component {
  handleSpeak = () => {
    let type = this.props.type_speech || "nomal";
    let rate_speed = 0.8;
    const text = this.props.text || "Các con đọc theo cô nhé Elephant là con voi đó";
    if(type === "fast"){
        rate_speed = 1.5
    }
    if(type === "slow"){
        rate_speed = 0.5
    }
    // Kiểm tra xem thư viện đã load chưa
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(text, "Vietnamese Female", {
        pitch: 1,
        rate: rate_speed, // Đọc chậm vừa phải cho bé
        volume: 1
      });
    } else {
      console.error("Thư viện ResponsiveVoice chưa được tải!");
      // Fallback sang SpeechSynthesis nếu không có thư viện
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

  render() {
    return (
      <button 
        onClick={this.handleSpeak}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '50px',
          cursor: 'pointer',
          padding: '20px'
        }}
        title="Nghe cô giảng bài"
      >
        🔊
      </button>
    );
  }
}

export default SpeechButton;