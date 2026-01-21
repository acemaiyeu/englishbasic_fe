import React, { Component } from 'react';
import DOMPurify from 'dompurify';

class DisplayContent extends Component {
  render() {
    // Giả sử đây là nội dung HTML lấy từ Database hoặc State
    const rawHTML = this.props.htmlFromEditor;

    // Tiến hành làm sạch HTML (loại bỏ các thẻ script, sự kiện onclick, onerror...)
    let cleanHTML = DOMPurify.sanitize(rawHTML);
    cleanHTML = cleanHTML.replace("<table>", "<table border='1' style='width: 100%'>")
    return (
      <div className="content-container">
        {/* <h3>Nội dung an toàn:</h3> */}
        {/* Trong React, dùng dangerouslySetInnerHTML để hiển thị HTML chuỗi */}
        <div 
          dangerouslySetInnerHTML={{ __html: cleanHTML }} 
        />
      </div>
    );
  }
}
export default DisplayContent;