import React, { Component } from 'react';
import '../sass/AuthContainer.scss';

class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginFormActive: true, // true: hiển thị Login, false: hiển thị Signup
    };
  }

  // Phương thức để chuyển đổi giữa Login và Signup
  toggleForm = () => {
    this.setState(prevState => ({
      isLoginFormActive: !prevState.isLoginFormActive,
    }));
  };

  render() {
    const { isLoginFormActive } = this.state;
    const containerClass = isLoginFormActive ? 'container' : 'container right-panel-active';

    return (
      <div className="auth-page">
        <div className={containerClass} id="container">
          {/* Form Đăng ký (Signup) */}
          <div className="form-container sign-up-container">
            <form>
              <h1>Tạo tài khoản</h1>
              <input type="text" placeholder="Tên" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Mật khẩu" />
              <button>Đăng ký</button>
            </form>
          </div>

          {/* Form Đăng nhập (Login) */}
          <div className="form-container sign-in-container">
            <form>
              <h1>Đăng nhập</h1>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Mật khẩu" />
              <a href="#">Quên mật khẩu?</a>
              <button>Đăng nhập</button>
            </form>
          </div>

          {/* Phần Overlay (Phần chuyển đổi) */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Chào mừng trở lại!</h1>
                <p>Để giữ kết nối, hãy đăng nhập bằng tài khoản của bạn.</p>
                <button className="ghost" onClick={this.toggleForm}>Đăng nhập</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Bạn chưa có tài khoản?</h1>
                <p>Đăng ký và bắt đầu hành trình của bạn với chúng tôi.</p>
                <button className="ghost" onClick={this.toggleForm}>Đăng ký</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthContainer;