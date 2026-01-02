import React, { cache, Component } from 'react';
import '../sass/AuthContainer.scss';
import axios from 'axios';
import { API_URL, setCookie } from '../const/const';
import { toast } from 'react-toastify';

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
    login = () => {
    let { email, password} = this.state;
    if(!email){
        toast.error("Please input email");
        return;
    }
    if(!password){
        toast.error("Please input password");
        return;
    }
    axios.post(`${API_URL}/login`, {
      email, password
    }).then((res) => {
        // localStorage.setItem("ca_cli_", "S_CLIENT");
        // sessionStorage.setItem("S_CLIENT",res.data.access_token); 
        setCookie("S_CLIENT", res.data.access_token, 1);
        this.props.history.push("/");
    }).catch((e) => {
      toast.error("Login fail! Email or Password not correct!");
      console.log(e)
    })
  }
  register = () => {
    let { email, password, name} = this.state;
    if(email === ""){
        toast.error("Please input email");
        return;
    }
    if(password === ""){
        toast.error("Please input password");
        return;
    }
    axios.post(`${API_URL}/register`, {
      email, password, name
    }).then((res) => {
        localStorage.setItem("ca_cli_", "S_CLIENT");
        sessionStorage.setItem("S_CLIENT",res.data.access_token); 
        this.props.history.push("/");
    }).catch((e) => {
      toast.error("Register fail!");
    })
  }
  render() {
    const { isLoginFormActive } = this.state;
    const containerClass = isLoginFormActive ? 'container' : 'container right-panel-active';

    return (
      <div className="auth-page">
        <div className={containerClass} id="container">
          {/* Form Đăng ký (Signup) */}
          <div className="form-container sign-up-container">
            <div className="form-s">
              <h1>Tạo tài khoản</h1>
              <input type="text" placeholder="Tên" onChange={(e) => this.setState({
                name: e.target.value
              })}/>
              <input type="email" placeholder="Email" onChange={(e) => this.setState({
                email: e.target.value
              })}
              />
              <input type="password" onChange={(e) => this.setState({
                password: e.target.value
              })} placeholder="Mật khẩu" />
              <button onClick={() => this.register()}>Đăng ký</button>
            </div>
          </div>

          {/* Form Đăng nhập (Login) */}
          <div className="form-container sign-in-container">
             <div className="form-s">
              <h1>Đăng nhập</h1>
              <input type="email" placeholder="Email" onChange={(e) => this.setState({
                email: e.target.value
              })}/>
              <input type="password" placeholder="Mật khẩu" onChange={(e) => this.setState({
                password: e.target.value
              })}/>
              <a href="#">Quên mật khẩu?</a>
              <button onClick={() => this.login()}>Đăng nhập</button>
            </div>
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