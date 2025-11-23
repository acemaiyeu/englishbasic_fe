import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player'; // Import thư viện gốc
import '../sass/YoutubeVideoController.css'; // Import file CSS

const YouTubeVideoController = ({ youtubeUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0); // 0 đến 1, phần trăm đã phát
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);

  // Tính toán phần trăm đã phát cho CSS (0-100)
  const playedPercentage = played * 100;

  // Format thời gian từ giây sang mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes().toString().padStart(2, '0');
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // Xử lý Play/Pause
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // Cập nhật thanh tiến trình khi đang phát
  const handleProgress = useCallback((state) => {
    // Chỉ cập nhật state khi không đang tua thủ công
    if (playerRef.current) {
      setPlayed(state.played);
    }
  }, []);

  // Xử lý tua (seek)
  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };

  // Xử lý khi video đã sẵn sàng (lấy thời lượng)
  const handleReady = useCallback(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration());
      console.log('✅ Video Player is READY. Duration:', playerRef.current.getDuration());
      // Tự động play khi sẵn sàng, nếu bạn muốn
      // setPlaying(true); 
    }
  }, []);
  
  // Xử lý khi kết thúc phát
  const handleEnded = () => {
    setPlaying(false);
    setPlayed(0); // Reset về đầu
  };

  // Đảm bảo dừng phát khi component unmount
  useEffect(() => {
      return () => {
          setPlaying(false);
      }
  }, []);

  // Không hiển thị nếu URL không hợp lệ
  if (!youtubeUrl) {
    return <p>Vui lòng cung cấp URL YouTube hợp lệ.</p>;
  }


  return (
    <div className="video-controller-container">
      {/* 1. Player ẩn hoặc thu nhỏ tối đa */}
      <div className="player-minimal">
        <ReactPlayer
          ref={playerRef}
          url={youtubeUrl}
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={setDuration}
          onReady={handleReady}
          onEnded={handleEnded}
          config={{
            youtube: {
              playerVars: { 
                controls: 0, // Ẩn controls mặc định của YouTube
                modestbranding: 1 
              }
            }
          }}
          playsinline
          width="1px" // Thu nhỏ tối đa
          height="1px"
        />
      </div>

      {/* 2. Controls tùy chỉnh */}
      <div className="custom-video-controls-wrapper">
        <p className="current-video-url">Đang điều khiển: **{youtubeUrl}**</p>
        
        {/* Nút Play/Pause */}
        <button onClick={handlePlayPause} className="control-button play-pause">
          {playing ? '⏸ Dừng' : '▶ Phát'}
        </button>

        {/* Thanh tiến trình / Tua */}
        <div className="seek-bar-container">
          {/* Thời gian hiện tại */}
          <span className="time-display current-time">{formatTime(duration * played)}</span>
          
          <input
            type="range"
            min={0}
            max={0.999999} 
            step="any"
            value={played}
            onChange={handleSeekChange}
            disabled={!duration}
            // Thêm inline style để truyền biến CSS cho thanh tiến trình
            style={{ '--played-percentage': `${playedPercentage}%` }} 
          />
          
          {/* Tổng thời lượng */}
          <span className="time-display total-time">{formatTime(duration)}</span>
        </div>

        {/* Các nút điều khiển phụ */}
        <div className="secondary-controls">
            {/* Nút Tua về 0 */}
            <button onClick={() => playerRef.current.seekTo(0)} className="control-button">
                ↺ Tua lại
            </button>

            {/* Điều khiển Volume */}
            <div className="volume-control">
                <button 
                    onClick={() => setMuted(!muted)} 
                    className="control-button volume-mute"
                >
                    {muted || volume === 0 ? '🔇' : '🔊'}
                </button>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.01"
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setMuted(false);
                    }}
                    className="volume-slider"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoController;