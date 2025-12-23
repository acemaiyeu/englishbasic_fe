import React, { Component } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

class UserStatistics extends Component {
  // Hàm bổ trợ để tính toán dữ liệu
  calculateTotal = (data) => {
    return data.reduce((sum, item) => sum + item.count, 0);
  };

  render() {
    // Lấy data từ props
    const { data, language_type } = this.props;
    const totalNewUsers = this.calculateTotal(data);

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{language_type === "EN" ? "New User Statistics" : "Thống kê người dùng mới"}</h2>
          <p style={styles.subtitle}>
            {language_type === "EN" ? "Total" : "Tổng cộng"}: <span style={styles.count}>{totalNewUsers}</span> {language_type === "EN" ? "new users" : "người dùng mới"}
          </p>
        </div>

        <div style={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#888' }} 
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#888' }} 
                axisLine={false}
                tickLine={false} 
              />
              <Tooltip 
                cursor={{ fill: '#F9FAFB' }}
                contentStyle={styles.tooltip}
              />
              <Bar 
                dataKey="count" 
                fill="#10B981" // Màu xanh lá (Emerald)
                radius={[4, 4, 0, 0]} 
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

// Định nghĩa Style đối tượng (CSS-in-JS)
const styles = {
  container: {
    padding: '24px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    fontFamily: 'system-ui, sans-serif'
  },
  header: {
    marginBottom: '24px'
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    color: '#111827'
  },
  subtitle: {
    margin: '4px 0 0',
    color: '#6B7280',
    fontSize: '0.9rem'
  },
  count: {
    fontWeight: 'bold',
    color: '#10B981'
  },
  chartWrapper: {
    width: '100%',
    height: '320px'
  },
  tooltip: {
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }
};

export default UserStatistics;