import React, { Component } from 'react';
import Prev from './Prev';
import '../sass/AccountProfile.scss'; // Import file scss tại đây
import { connect } from 'react-redux';
import { API_URL } from '../const/const';
import { toast } from 'react-toastify';
import api from './api';

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
      },
      language_type: "EN",
      isEditing: false,
      tempUser: { fullName: "", email: "", avatar: "" }
    };
  }

  componentDidMount() {
    this.setState({ tempUser: { ...this.state.user } });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      tempUser: { ...this.state.tempUser, [name]: value }
    });
  };
  componentDidUpdate(prevProps) {
        if (prevProps.language_type !== this.props.language_type) {
            this.setState({
                language_type: this.props.language_type,
            });
        }
        if (prevProps.profile !== this.props.profile) {
            this.setState({
                profile: this.props.profile,
            });
        }
    }

  handleSave = async () => {
    let { language_type } = this.state;
    await api.put(`${API_URL}/auth/user`, {
            avatar: this.state.tempUser.avatar,
            name: this.state.tempUser.name,
            email: this.state.tempUser.email
    }).then((res) => {
        this.props.setProfile(res.data.data)
         this.setState({
            isEditing: false
        });
        toast.success("Cập nhật thông tin thành công!");
    }).catch((err) => {
            if(language_type === "EN"){
                toast.warn("Update fail!")
            }else{
                toast.warn("Cập nhật thất bại!")
            }
    })
   
  };

  render() {
    const { profile, isEditing, tempUser } = this.state;

    return (
      <div className="profile-container">
        <Prev uri=""/>
        <div className="profile-card">
          
          {/* Khu vực Avatar */}
          <div className="avatar-wrapper">
            <img src={profile.avatar} alt="Avatar" className="avatar-img" />
            {isEditing && (
              <input 
                type="text" 
                placeholder="Dán link ảnh mới..." 
                defaultValue={tempUser.avatar}
                onChange={(e) => this.setState({
                    tempUser: {
                        ...this.state.tempUser,
                        avatar: e.target.value
                    }
                })}
                className="input-small"
              />
            )}
          </div>

          {/* Khu vực Thông tin */}
          <div className="info-section">
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  defaultValue={tempUser.name} 
                  onChange={(e) => this.setState({
                    tempUser: {
                        ...this.state.tempUser,
                        name: e.target.value
                    }
                })}
                  className="input-field"
                  placeholder="Họ và tên"
                />
                <input 
                  type="email" 
                  defaultValue={tempUser.email} 
                  onChange={(e) => this.setState({
                    tempUser: {
                        ...this.state.tempUser,
                        email: e.target.value
                    }
                })}
                  className="input-field"
                  placeholder="Email"
                />
                <div className="button-group">
                  <button onClick={this.handleSave} className="btn-save">Lưu</button>
                  <button onClick={() => this.setState({ isEditing: false })} className="btn-cancel">Hủy</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="name">{profile.name}</h2>
                <p className="email-text">{profile.email}</p>
                <div class="input-group mb-3 profile-money">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="text" class="form-control" value={"3.000.000"} aria-label="Amount (to the nearest dollar)"/>
                    <div class="input-group-append">
                        <span class="input-group-text">VNĐ</span>
                    </div>
                </div>
                <button 
                  onClick={() => this.setState({ isEditing: true, tempUser: { ...profile } })}
                  className="btn-edit"
                >
                  Chỉnh sửa hồ sơ
                </button>
              </>
            )}
          </div>

          <hr className="divider" />

          {/* Điều hướng Quản lý tiêu dùng */}
          <a href="/quan-ly-tieu-dung" className="spending-link">
            <span className="icon">📊</span>
            <span>Quản lý tiêu dùng cá nhân</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: (profile) => dispatch({ type: 'SET_PROFILE', payload: profile }),
    logout: () => dispatch({ type: 'LOGOUT' })
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(AccountProfile);