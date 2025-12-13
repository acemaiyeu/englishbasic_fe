import axios from "axios";

// export const API_URL = "http://192.168.1.108:8000/api";
export const API_URL = "https://themeforstudents.io.vn/api";
export const auth = "Almo"
// export const MAIN_DOMAIN = "themeforstudents.io.vn";
export const MAIN_DOMAIN = "127.0.0.1";

export const getCookie = (name) => {
    // 1. Chuẩn bị tên cookie: Thêm dấu bằng và khoảng trắng vào tên
    const nameEQ = name + "=";
    
    // 2. Tách chuỗi document.cookie thành các phần tử (mỗi phần tử là một cookie)
    // Sau đó, loại bỏ các khoảng trắng ở đầu mỗi phần tử
    const ca = document.cookie.split(';');
    
    // 3. Lặp qua các phần tử
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        
        // Loại bỏ khoảng trắng thừa ở đầu chuỗi (nếu có)
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        
        // 4. Kiểm tra xem chuỗi cookie hiện tại có bắt đầu bằng tên cookie chúng ta tìm không
        if (c.indexOf(nameEQ) === 0) {
            // Nếu có, trả về giá trị (value) của cookie
            // Bằng cách cắt bỏ phần 'name=' khỏi chuỗi
            return c.substring(nameEQ.length, c.length);
        }
    }
    // 5. Nếu không tìm thấy, trả về null hoặc chuỗi rỗng
    return null; 
}
export const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }   
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const eraseCookie = (name) => {   
    document.cookie = name + '=; Max-Age=-99999999; path=/';  
}