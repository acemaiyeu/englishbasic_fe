
import React, { useEffect, useRef, useCallback } from 'react';

// Hàm hỗ trợ: Biến chuỗi text thành chuỗi HTML với các thẻ <span> bọc từng từ
const wrapTextWithClickableSpans = (htmlContent) => {
    // Tách chuỗi thành các từ
    const words = htmlContent.split(/\s+/g).filter(word => word.length > 0);

    // Bọc mỗi từ trong <span> có class nhận dạng
    return words
        .map(word => `<span class="clickable-word">${word}</span>`)
        .join(' '); // Nối lại bằng khoảng trắng
};

function HtmlRenderer({ htmlContent }) {
    const containerRef = useRef(null);

    // 1. Định nghĩa hàm logic (Không dùng 'this' trong Functional Component)
    const noti = useCallback((word) => {
        // Đây là nơi bạn đặt logic thông báo của mình (ví dụ: alert)

        alert(`${word}`);
    }, []);

    // 2. Chuyển đổi chuỗi HTML
    const wrappedHtml = wrapTextWithClickableSpans(htmlContent);
    const renderHtml = { __html: wrappedHtml };

    // 3. Gắn Event Listener sau khi render bằng DOM thuần
    useEffect(() => {
        if (!containerRef.current) return;

        const clickableWords = containerRef.current.querySelectorAll('.clickable-word');

        // Hàm xử lý sự kiện DOM thuần
        const handleClick =async (event) => {
            // const word = event.target.textContent;
            // Gọi hàm logic của Component (noti)
            // await axios.post(`${API_URL}/chat-ai`, {
            //     message: `Nghĩa của từ: ${word} trong tiếng anh là gì? trả lời bằng tiếng việt`
            // }).then((res) => {
            //     console.log(res.data.reply);
            //     noti(res.data.reply); 
            // }).catch((e) => {
            //     noti("Error get meaning from AI"); 
            // })
            
        };

        // Gắn sự kiện click DOM thuần túy
        clickableWords.forEach(span => {
            span.addEventListener('click', handleClick);
        });

        // Hàm Cleanup: Gỡ bỏ sự kiện khi component bị huỷ hoặc re-render
        return () => {
            clickableWords.forEach(span => {
                span.removeEventListener('click', handleClick);
            });
        };
    }, [wrappedHtml, noti]); // Chạy lại khi wrappedHtml hoặc noti thay đổi

    return (
        <div className="html-renderer-container">
            <div 
                ref={containerRef} // Gắn ref để tìm phần tử DOM
                dangerouslySetInnerHTML={renderHtml} 
            />
        </div>
    );
}

export default HtmlRenderer;