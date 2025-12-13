import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Gán Pusher vào window (có thể bỏ qua nếu bạn đang dùng module bundler hiện đại)
window.Pusher = Pusher;

// Biến để lưu trữ thể hiện của Echo
let echoInstance = null;

// Hàm khởi tạo Echo
export const initializeEcho = () => {
    // Nếu Echo đã được khởi tạo, không làm gì nữa
    if (echoInstance) {
        console.log("Echo instance đã tồn tại.");
        return echoInstance;
    }

    // Lấy cấu hình của bạn
    echoInstance = new Echo({
        broadcaster: 'pusher',
        key: 'mykey', 
        cluster: 'mt1', 
        
        wsHost: '127.0.0.1', 
        wsPort: 6001,       
        
        forceTLS: false,    
        enabledTransports: ['ws', 'wss'],
        disableStats: true, 
    });

    console.log("Laravel Echo đã được khởi tạo.");
    return echoInstance;
};

// Hàm lấy thể hiện Echo (để sử dụng sau khi khởi tạo)
export const getEcho = () => {
    if (!echoInstance) {
        console.error("Lỗi: Echo chưa được khởi tạo! Hãy gọi initializeEcho() trước.");
    }
    return echoInstance;
};

// Hàm hủy kết nối (rất quan trọng khi rời trang)
export const disconnectEcho = () => {
    if (echoInstance) {
        echoInstance.disconnect();
        echoInstance = null; // Đặt lại về null để có thể khởi tạo lại
        console.log("Laravel Echo đã ngắt kết nối.");
    }
};