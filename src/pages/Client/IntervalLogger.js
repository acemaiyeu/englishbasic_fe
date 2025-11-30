import React, { useEffect, useState } from 'react';

const IntervalLogger = () => {
  // useEffect để quản lý side effect (thiết lập interval)
  const [time, setTime] = useState([]); 
  useEffect(() => {
      
    // Hàm được gọi mỗi 10 giây
    const logTime = () => {
      // Hàm now() là một hàm bạn phải tự định nghĩa
      // Ở đây, tôi sẽ dùng Date.now() hoặc new Date().toLocaleTimeString() 
      // để thay thế và minh họa.
      
      const now = () => new Date().toLocaleTimeString('vi-VN');
      
    //   console.log(`Thời gian hiện tại (sau 10s): ${now()}`);
      setTime([now()]);
    };

    // Thiết lập interval để gọi hàm logTime mỗi 10000 milliseconds (10 giây)
    const intervalId = setInterval(logTime, 1000);

    // Hàm cleanup (dọn dẹp)
    // Hàm này sẽ chạy khi component bị unmount hoặc trước khi effect chạy lại
    return () => {
      console.log('Dọn dẹp interval...');
      clearInterval(intervalId);
    };
  }, 
  // Dependency array rỗng ([]) đảm bảo effect chỉ chạy 1 lần sau khi component mount
  []
  );

  return (
    <div>
      <p>{time}</p>
    </div>
  );
};

export default IntervalLogger;