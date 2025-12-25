import React from "react";
import '../sass/MenuV2.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class MenuV2 extends React.Component {

    state =  {
        language_type: "EN"
    }
    componentDidMount(){
        this.setState({
            language_type: this.props.language_type,
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.language_type !== this.props.language_type) {
            this.setState({
                language_type: this.props.language_type,
            });
        }
    }
    render(){
        let { language_type } = this.state;
        return (
            <div className="menu-container-v2">
                {/* <i class="bi bi-bar-chart-steps"></i> */}
                <i className="bi bi-card-list icon-menu"></i>
                <nav className="nav-menu" style={{ textAlign: "center"}}>  
                    <div className="nav-menu-item">
                        <Link to="/">{language_type === "EN" ? "Statistics V2" : "Thống kê"}</Link>
                    <Link to="/subjects" >{language_type === "EN" ? "Subjects" : "Chủ đề"}</Link>
                    <Link to="/games" >{language_type === "EN" ?"Games":"Trò chơi"}</Link>
                    
                    <div className="nav-menu-box"> {language_type === "EN" ? "More" : "Khác"}
                        <div className="submenu">
                            <Link to="/vocabularybox" >{language_type === "EN" ? "Vocabulary" : "Từ vựng"}</Link>
                            <Link to="/grammarbox" >{language_type === "EN" ?"Grammar":"Ngữ Pháp"}</Link>
                            <Link to="/ipa" >{language_type === "EN" ?"IPA":"Phiên âm IPA"}</Link>
                            <Link to="/ed-es" >{language_type === "EN" ?"Pronunciation ED, ES":"Phát âm  ED, ES"}</Link>
                            <Link to="/listen-write-list" >{language_type === "EN" ?"Listen and Write":"Nghe và viết lại"}</Link>
                            <Link to="/phrasal-verbs" >{language_type === "EN" ?"Phrasal verbs":"Cụm động từ"}</Link>
                            <Link to="/chat-app" >{language_type === "EN" ?"Chat app":"Chat"}</Link>
                            <Link to="/reading" >{language_type === "EN" ?"Reading":"Đọc đoạn văn bản"}</Link>
                            <Link to="/setting" >{language_type === "EN" ?"Setting":"Cài đặt"}</Link>
                        </div>
                    </div>
                    </div>
                      <div className="nav-menu-item" style={{justifyContent: "right"}}> 
                        <Link to="/login" >{language_type === "EN" ?"Login":"Đăng nhập"}</Link>
                        <Link to="/profile" >{language_type === "EN" ?"Profile":"Hồ sơ cá nhân"}</Link>
                        <Link to="/login" >{language_type === "EN" ?"Logout":"Đăng Xuất"}</Link>
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
export default connect(mapStateToProps)(MenuV2);
