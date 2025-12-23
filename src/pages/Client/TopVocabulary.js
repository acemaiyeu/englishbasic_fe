import React, { Component } from 'react';

class TopVocabulary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: 'day'
    };
  }

  // Định nghĩa Styles ngay trong class hoặc một object cố định
  styles = {
    container: {
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif'
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '25px',
      padding: '5px'
    },
    list: {
      display: 'flex',
      flexDirection: 'column'
    },
    countText: {
      fontWeight: 'bold',
      color: '#4CAF50',
      fontSize: '18px'
    }
  };

  // Helper để lấy style cho Tab
  getTabStyle = (active) => ({
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: '0.3s',
    backgroundColor: active ? '#4CAF50' : 'transparent',
    color: active ? 'white' : '#555',
    fontWeight: active ? 'bold' : 'normal'
  });

  // Helper cho Rank icon
  getRankStyle = (index) => {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32']; // Vàng, Bạc, Đồng
    return {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: index < 3 ? colors[index] : '#eee',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      color: index < 3 ? '#fff' : '#666'
    };
  };

  render() {
    const { dataDay = [], dataMonth = [], language_type = "EN" } = this.props;
    const { viewMode } = this.state;

    const currentData = viewMode === 'day' ? dataDay : dataMonth;
    const sortedData = [...currentData].sort((a, b) => b.wordCount - a.wordCount);

    return (
      <div style={this.styles.container}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>🏆 {language_type === "EN" ? "TOP VOCABULARY LEARNING" : " BXH HỌC TỪ VỰNG"}</h2>

        <div style={this.styles.tabContainer}>
          <button 
            onClick={() => this.setState({ viewMode: 'day' })}
            style={this.getTabStyle(viewMode === 'day')}
          >
            {language_type === "EN" ? "Today" : "Hôm nay"}
          </button>
          <button 
            onClick={() => this.setState({ viewMode: 'month' })}
            style={this.getTabStyle(viewMode === 'month')}
          >
            {language_type === "EN" ? "This Month" : "Tháng này"}
          </button>
        </div>

        <div style={this.styles.list}>
          {sortedData.map((user, index) => (
            <div key={user.id || index} style={{
              display: 'flex', 
              alignItems: 'center', 
              padding: '12px', 
              borderBottom: '1px solid #eee'
            }}>
              <div style={this.getRankStyle(index)}>{index + 1}</div>
              
              <div style={{ flex: 1, marginLeft: '15px' }}>
                <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>{language_type === "EN" ? (viewMode === 'day' ? 'Learned today' : 'Total this month') : (viewMode === 'day' ? 'Học hôm nay' : 'Tổng tháng')}</div>
              </div>

              <div style={this.styles.countText}>
                {user.wordCount} <span style={{ fontSize: '12px', fontWeight: 'normal' }}>{language_type === "EN" ? "words" : "từ"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TopVocabulary;