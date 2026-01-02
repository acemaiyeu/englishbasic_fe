import React from "react";
import '../sass/MenuV2.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { API_URL, auth, getDarkMode } from "../const/const";
import api from "./api";
import { setProfile } from "../../reduce/actions";
import { toast } from "react-toastify";

class MenuV2 extends React.Component {

    state =  {
        language_type: "EN",
        dark_mode: false,
        profile: {}
    }
    componentDidMount(){
        this.getProfile();
        this.setState({
            language_type: this.props.language_type,
            dark_mode: getDarkMode()
        })
    }
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
   getProfile = async () => {
        await api.get(`${API_URL}/auth/profile`).then((res) => {
            this.props.setProfile(res.data.data);
        }).catch((err) => {
            console.log("Profile err", err)
            // toast.warn("Not get profile")
        })
   } 
   handleLogout = () => {
    let { language_type } = this.state;
       api.post(`${API_URL}/auth/logout`).then((res) => {
            this.props.setProfile({});
            
            if(language_type === "EN"){
                toast.success("Logout Successfully!")
            }else{
                toast.success("Đăng xuất thành công!")
            }
       }).catch((err) => {
            if(language_type === "EN"){
                toast.warn("Logout fail!");
            }else{
                toast.warn("Đăng xuất lỗi!");
            }
       }) 
   }
    render(){
        let { language_type, dark_mode, profile } = this.state;
        return (
            <div className={`menu-container-v2 ${dark_mode ? 'dark-mode':''}`} id="nav-menu">
                {/* <i class="bi bi-bar-chart-steps"></i> */}
                
                <nav className="nav-menu" style={{ textAlign: "center"}}>  
                    <div className="nav-menu-item">
                    <div className="auth-title"><b onClick={() => {
                    window.location.href = "/"
                }}>English Basic <i>by #{auth}</i></b> </div>
                </div>
                    <div className="nav-menu-item">
                        <Link to="/">{language_type === "EN" ? "Statistics V2" : "Thống kê"}</Link>
                    <Link to="/subjects" >{language_type === "EN" ? "Subjects" : "Chủ đề"}</Link>
                    <Link to="/games" >{language_type === "EN" ?"Games":"Trò chơi"}</Link>
                    
                    <div className="nav-menu-box"> <span className="nav-menu-box-title">{language_type === "EN" ? "More"  : "Khác"}</span>
                        <div className="submenu">
                            <Link to="/vocabularybox" >{language_type === "EN" ? "Vocabulary" : "Từ vựng"}</Link>
                            <Link to="/grammarbox" >{language_type === "EN" ?"Grammar":"Ngữ Pháp"}</Link>
                            <Link to="/ipa" >{language_type === "EN" ?"IPA":"Phiên âm IPA"}</Link>
                            <Link to="/ed-es" >{language_type === "EN" ?"Pronunciation ED, ES":"Phát âm  ED, ES"}</Link>
                            <Link to="/listen-write-list" >{language_type === "EN" ?"Listen and Write":"Nghe và viết lại"}</Link>
                            <Link to="/phrasal-verbs" >{language_type === "EN" ?"Phrasal verbs":"Cụm động từ"}</Link>
                            <Link to="/chat-app" >{language_type === "EN" ?"Chat app":"Chat"}</Link>
                            <Link to="/reading" >{language_type === "EN" ?"Reading":"Đọc đoạn văn bản"}</Link>
                        </div>
                    </div>
                    </div>
                      <div className="nav-menu-item" style={{justifyContent: "right"}}> 
                        {profile.name ? <div className="nav-account">
                            <div className="auth-avatar">
                                    <img src={`${profile.avatar == "" ? "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" : profile.avatar}`} alt="avatar" />
                                    <div className="auth-username">
                                        {profile.name ?? "Đặng Nguyễn Tùng Dương"}
                                    </div>  
                            </div>
                            <div className="auth-modal">
                                <div className="auth-modal-item">
                                    <Link to="/profile" >{language_type === "EN" ?"Profile":"Hồ sơ cá nhân"}</Link>
                                </div>
                                <div className="auth-modal-item">
                                    <Link to="#" onClick={() => this.handleLogout()}>{language_type === "EN" ?"Logout":"Đăng Xuất"}</Link>
                                </div> 
                                <div className="auth-modal-item">
                                    <Link to="/setting" >{language_type === "EN" ?"Setting":"Cài đặt"}</Link>
                                </div> 
                                
                            </div>
                        </div> :
                       <Link to="/login" >{language_type === "EN" ?"Login":"Đăng nhập"}</Link>  }
                        

                       </div>
                    
                    
                    {/* <Link to="/chat-app" >{language_type === "EN" ?"Chat app":"Chat"}</Link> */}
                  </nav>
            </div>
        )  
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuV2);
