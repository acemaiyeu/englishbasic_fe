import React, { Component } from 'react';
import '../sass/AdminLogin.scss'; // See CSS section below
import axios from 'axios';
import { API_URL, setCookie } from '../const/const';

class AdminLogin extends Component {
  // 1. Constructor: Initialize State
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      isLoading: false,
      isLoggedIn: false
    };
  }

  // 2. Handle Input Changes
  // Uses computed property names [e.target.name] to handle multiple inputs
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: '' // Clear errors when user starts typing again
    });
  };

  // 3. Handle Form Submission
  handleSubmit = async (event) => {
    event.preventDefault(); // Stop browser from reloading

    const { username, password } = this.state;

    // Basic Validation
    if (!username || !password) {
      this.setState({ error: 'Please fill in all fields.' });
      return;
    }

    // Start Loading
    this.setState({ isLoading: true, error: '' });

    await axios.post(`${API_URL}/auth/login-admin`, {
        email: username, password
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        sessionStorage.setItem("S_ADMIN", res.data.access_token);
        setCookie("S_ADMIN", res.data.access_token, 1);
        this.setState({ isLoggedIn: true, isLoading: false });
        window.location.href = "/pages/admin/"
    }).catch((e) => {
        this.setState({ error: 'Invalid username or password.', isLoading: false });
    });
    
  };

  render() {
    const { username, password, error, isLoading, isLoggedIn } = this.state;

    // Simple redirect simulation
    if (isLoggedIn) {
      return (
        <div className="login-success-container">
          <h2>Welcome, Admin!</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      );
    }


    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Admin Portal</h2>
          <p className="subtitle">Please sign in to continue</p>

          <form onSubmit={this.handleSubmit}>
            {/* Username Field */}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                placeholder="Enter admin username"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                placeholder="Enter password"
                disabled={isLoading}
              />
            </div>

            {/* Error Message Display */}
            {error && <div className="error-message">{error}</div>}

            {/* Submit Button */}
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminLogin;