import React, { Component } from 'react';
import '../sass/ZaloChatApp.css'
import { chatWithGPT } from '../../service/openai';

// Giả lập dữ liệu
let dummyChats = [
  { id: 1, name: 'AI', lastMessage: 'Bạn: Đã gửi tài liệu mới.', avatar: '👥', messages: [
    { id: 101, text: 'Chào mọi người, cuộc họp sẽ bắt đầu lúc 10h.', sender: 'other' },
    // { id: 102, text: 'Đã gửi tài liệu mới.', sender: 'user' }
  ] },
  // { id: 2, name: 'Anh Minh', lastMessage: 'Anh Minh: OK.', avatar: '🧑', messages: [
  //   { id: 201, text: 'Em đã hoàn thành báo cáo chưa?', sender: 'other' },
  //   { id: 202, text: 'Em đang kiểm tra lại lần cuối, anh ạ.', sender: 'user' },
  //   { id: 203, text: 'OK.', sender: 'other' }
  // ] },
  // { id: 3, name: 'Chị Thảo', lastMessage: 'Chị Thảo: Mai gặp nhé.', avatar: '👩', messages: [] },
];


class ZaloChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: dummyChats,
      selectedChatId: 1, // Mặc định chọn cuộc trò chuyện đầu tiên
      newMessage: '',
    };
    this.messagesEndRef = React.createRef();
  }

  // Cuộn xuống tin nhắn cuối cùng mỗi khi component update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedChatId !== this.state.selectedChatId || 
        prevState.chats[0].messages.length !== this.state.chats.find(c => c.id === this.state.selectedChatId).messages.length) {
      this.scrollToBottom();
    }
  }


  
AIReply = async (message) => {
    return await chatWithGPT(message);
} 

  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // Xử lý chọn cuộc trò chuyện mới
  handleSelectChat = (id) => {
    this.setState({ selectedChatId: id, newMessage: '' });
  }

  // Xử lý thay đổi nội dung input
  handleInputChange = (event) => {
    this.setState({ newMessage: event.target.value });
  }

  // Xử lý gửi tin nhắn
  handleSubmit =async (event) => {
    event.preventDefault();
    const { newMessage, selectedChatId, chats } = this.state;

    if (newMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: 'user',
    };
    let reply = await this.AIReply(newMessage.trim());

    const aiMessage = {
      id: Date.now(),
      text: reply.trim(),
      sender: 'other',
    };

    const newChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage],
          lastMessage: `Bạn: ${userMessage.text}`,
        };
      }
      return chat;
    });
    const newChats2 = newChats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, aiMessage],
          lastMessage: `AI: ${userMessage.text}`,
        };
      }
      return chat;
    });

    // this.setState({
    //   chats: newChats,
    //   newMessage: '',
    // });
     this.setState({
      chats: newChats2,
      newMessage: '',
    });
  }

  // Render Sidebar (Danh sách cuộc trò chuyện)
  renderSidebar = () => {
    const { chats, selectedChatId } = this.state;
    return (
      <div className="sidebar">
        <h2 className="sidebar-header">Tin nhắn</h2>
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === selectedChatId ? 'selected' : ''}`}
            onClick={() => this.handleSelectChat(chat.id)}
          >
            <span className="avatar">{chat.avatar}</span>
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="last-message">{chat.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render Khu vực Chat chính
  renderChatMain = () => {
    const { chats, selectedChatId, newMessage } = this.state;
    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    if (!selectedChat) {
      return <div className="chat-main empty">Vui lòng chọn một cuộc trò chuyện</div>;
    }

    return (
      <div className="chat-main">
        {/* Header */}
        <div className="chat-header">
          <h3>{selectedChat.name}</h3>
        </div>

        {/* Message List */}
        <div className="message-list">
          {selectedChat.messages.map(msg => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={this.messagesEndRef} />
        </div>

        {/* Input Form */}
        <form className="message-input-form" onSubmit={this.handleSubmit}>
          <textarea
            value={newMessage}
            onChange={this.handleInputChange}
            placeholder="Nhập tin nhắn..."
            rows="1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit(e);
              }
            }}
          />
          <button type="submit" disabled={!newMessage.trim()}>
            Gửi
          </button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="zalo-chat-container">
        {this.renderSidebar()}
        {this.renderChatMain()}

        
      </div>
    );
  }
}

export default ZaloChatApp;