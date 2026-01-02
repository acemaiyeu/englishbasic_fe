import React, { Component } from 'react';
import '../sass/AuthContainer.scss';
import axios from 'axios';
import { API_URL, setCookie } from '../const/const';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; // Thêm withRouter nếu cần history

class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginFormActive: true,
      email: '',
      password: '',
      name: ''
    };
  }

  toggleForm = () => {
    this.setState(prevState => ({
      isLoginFormActive: !prevState.isLoginFormActive,
      // Reset lỗi hoặc dữ liệu cũ khi chuyển form
      email: '',
      password: '',
      name: ''
    }));
  };

  login = () => {
    let { email, password } = this.state;
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    axios.post(`${API_URL}/login`, { email, password })
      .then((res) => {
        // Lưu token vào Cookie
        setCookie("S_CLIENT", res.data.access_token, 1);
        // Cập nhật Profile vào Redux ngay lập tức

        toast.success("Đăng nhập thành công!");
        
        // Điều hướng
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((e) => {
        toast.error("Đăng nhập thất bại! Kiểm tra lại thông tin.");
        console.error(e);
      });
  }

  register = () => {
    let { email, password, name } = this.state;
    if (!email || !password || !name) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    axios.post(`${API_URL}/register`, { email, password, name })
      .then((res) => {
        setCookie("S_CLIENT", res.data.access_token, 1);
        
        // Cập nhật Redux trước khi chuyển trang

        toast.success("Đăng ký thành công!");
        this.props.history.push("/");
        
        // Hạn chế window.location.reload() nếu đã có Redux quản lý state
      })
      .catch((e) => {
        toast.error("Đăng ký thất bại!");
        console.error(e);
      });
  }

  render() {
    const { isLoginFormActive } = this.state;
    const containerClass = isLoginFormActive ? 'container' : 'container right-panel-active';

    return (
      <div className="auth-page">
        <div className={containerClass} id="container">
          {/* Form Signup */}
          <div className="form-container sign-up-container">
            <div className="form-s">
              <h1>Tạo tài khoản</h1>
              <input type="text" placeholder="Tên" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
              <input type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
              <input type="password" placeholder="Mật khẩu" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
              <button onClick={this.register}>Đăng ký</button>
            </div>
          </div>

          {/* Form Login */}
          <div className="form-container sign-in-container">
            <div className="form-s">
              <h1>Đăng nhập</h1>
              <input type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
              <input type="password" placeholder="Mật khẩu" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
              <a href="#">Quên mật khẩu?</a>
              <button onClick={this.login}>Đăng nhập</button>
            </div>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Chào mừng trở lại!</h1>
                <button className="ghost" onClick={this.toggleForm}>Đăng nhập</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Bạn chưa có tài khoản?</h1>
                <button className="ghost" onClick={this.toggleForm}>Đăng ký</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth // Hoặc cấu trúc state của bạn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: (data) => dispatch({ type: 'SET_PROFILE', payload: data })
  };
};

// Sử dụng withRouter để đảm bảo this.props.history không bị undefined
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthContainer));