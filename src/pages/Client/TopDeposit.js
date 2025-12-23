import React, { Component } from 'react';

class TopDeposit extends Component {
  render() {
    // 1. Lấy dữ liệu từ props (giả sử là mảng 'users')
    const { users } = this.props;

    // 2. Sắp xếp dữ liệu từ cao đến thấp dựa trên thuộc tính 'amount'
    // Lưu ý: .sort() làm thay đổi mảng gốc nên ta dùng [...users] để tạo bản sao
    const sortedUsers = [...users].sort((a, b) => b.amount - a.amount);

    return (
      <div className="top-deposit-container" style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h2 style={{ textAlign: 'center', color: '#d4af37' }}>🏆 BẢNG XẾP HẠNG NẠP TIỀN</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>Hạng</th>
              <th style={tableHeaderStyle}>Người dùng</th>
              <th style={tableHeaderStyle}>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.id} style={tableRowStyle(index)}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{user.name}</td>
                <td style={{ ...tableCellStyle, fontWeight: 'bold', color: '#2ecc71' }}>
                  {user.amount.toLocaleString()} VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// --- Các styles cơ bản ---
const tableHeaderStyle = { padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' };
const tableCellStyle = { padding: '12px', borderBottom: '1px solid #ddd' };
const tableRowStyle = (index) => ({
  backgroundColor: index === 0 ? '#fff9c4' : 'transparent', // Highlight người đứng đầu
});

export default TopDeposit;