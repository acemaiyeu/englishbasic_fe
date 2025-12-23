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

export const getSettings = () => {
    let data = JSON.parse(localStorage.getItem("settings")) ?? [];

    if(data?.length > 0){
        return data;
    }else{
        setSettingDefault();
        data = JSON.parse(localStorage.getItem("settings")) ?? [];
        return data;
    }
}
export const setSetting = (title_vie, title_eng, status, type) => {
    let data = JSON.parse(localStorage.getItem("settings"));
    let ob = {
        "title_vietnamese": title_vie,
        "title_english": title_eng,
        "status": status
    }
    if(type === "basic"){
        data[0].data.push(ob)
    }
    if(type === "advandced"){
        data[1].data.push(ob)
    }
    data.push(ob)
    return localStorage.setItem("settings", JSON.stringify(data));
}
export const updateSetting = (title_eng, status, type) => {
    // 1. Cleanly coerce status to a boolean
    const isEnabled = Boolean(status);
    
    // 2. Get current data
    let data = getSettings();
    
    // 3. Determine which category index to use
    // Using a map makes the code more scalable than multiple if-statements
    const categoryIndex = type === "basic" ? 0 : (type === "advandced" ? 1 : null);

    if (categoryIndex !== null && data[categoryIndex]?.data) {
        const targetCategory = data[categoryIndex].data;
        const itemIndex = targetCategory.findIndex((item) => item.title_english === title_eng);

        // 4. Critical Check: Only update if the item was actually found
        if (itemIndex !== -1) {
            targetCategory[itemIndex].status = isEnabled;
            localStorage.setItem("settings", JSON.stringify(data));
            // console.log(`Updated ${type} setting: ${title_eng}`, targetCategory[itemIndex]);
        } else {
            console.error(`Setting "${title_eng}" not found in ${type} category.`);
        }
    } else {
        console.error(`Invalid type or data structure for type: ${type}`);
    }

    return data;
};
export const setSettingDefault = () => {
    let data = JSON.parse(localStorage.getItem("settings")) ?? [];
    if (!data || data.length === 0){
        data = [
        {
            "type": "basic",
            "data": [
            ]
        },{
            "type": "Advanced",
            "data": [
                {
                "title_english": "Learning 5 word everyday",
                "title_vietnamese": "Học ít nhất 5 từ vựng mỗi ngày",
                "status": false
                }
            ]
        }
        ]
    }
    localStorage.setItem("settings", JSON.stringify(data)) 
}
