import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { MAIN_DOMAIN } from '../const/const';

// Gán Pusher vào window
window.Pusher = Pusher;

// Lấy các biến môi trường từ .env.development (hoặc tương tự) của React
// Đảm bảo bạn đã định nghĩa chúng (ví dụ: REACT_APP_PUSHER_KEY, REACT_APP_WSS_HOST)
const echo = new Echo({
    broadcaster: 'pusher',
    key: 'mykey', // Hoặc PUSHER_APP_KEY của bạn
    cluster: 'mt1', 
    
    // 👇 RẤT QUAN TRỌNG: Cấu hình để sử dụng HTTP/WS
    // wsHost: '127.0.0.1', 
    wsHost: `${MAIN_DOMAIN}`, // Thay thế {MAIN_DOMAIN} bằng tên miền chính của bạn
    wsPort: 6001,       
    
    // 👇 Cần đặt là FALSE để sử dụng giao thức WS (không bảo mật)
    forceTLS: false,    
    
    // 👇 Đảm bảo bạn đang sử dụng các giao thức không bảo mật cho HTTP
    enabledTransports: ['ws', 'wss'], // Tốt nhất nên giữ lại wss
    
    // Cài đặt này cũng có thể giúp nếu lỗi vẫn xảy ra
    disableStats: true, 
    // ... các tùy chọn khác
});
export default echo;