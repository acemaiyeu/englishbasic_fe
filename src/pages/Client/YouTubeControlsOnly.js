import React from 'react';
import '../sass/YouTubeControlsOnly.css'; 

// Hàm tiện ích (đặt nó bên ngoài component hoặc import từ file utils)
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
};


/**
 * Component hiển thị thanh điều khiển (tua) của video YouTube.
 * * @param {object} props
 * @param {string} props.videoSource - URL HOẶC ID của video YouTube.
 * @param {number} [props.width='100%'] - Chiều rộng của component
 */
const YouTubeControlsOnly = ({ videoSource, width = '100%' }) => {
  
  // 1. Trích xuất ID video từ videoSource (có thể là ID hoặc URL)
  let videoId;
  
  // Kiểm tra nếu videoSource là URL (chứa 'http') thì trích xuất ID
  if (videoSource && videoSource.includes('http')) {
    videoId = getYouTubeVideoId(videoSource);
  } else {
    // Ngược lại, giả định nó là ID trực tiếp
    videoId = videoSource;
  }

  // 2. Kiểm tra tính hợp lệ của ID
  if (!videoId) {
    return (
      <div style={{color: 'red', border: '1px solid red', padding: '10px'}}>
        Lỗi: URL/ID YouTube không hợp lệ.
      </div>
    );
  }

  // 3. Tạo URL nhúng
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0`;

  const containerStyle = {
    width: width
  };

  return (
    <div 
      className="youtube-player-controls"
      style={containerStyle}
      title="YouTube Player Controls">
      <iframe 
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeControlsOnly;