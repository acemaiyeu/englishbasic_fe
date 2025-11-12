import React from "react";
import '../sass/Menu.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Menu extends React.Component {

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
            <div className="menu-container">
                <i class="bi bi-bar-chart-steps"></i>
                
                <nav className="nav-menu" style={{ textAlign: "center"}}>
                    <Link to="/">{language_type === "EN" ? "Statistics" : "Thống kê"}</Link>
                    <Link to="/vocabularybox" >{language_type === "EN" ? "Vocabulary" : "Từ vựng"}</Link>
                    <Link to="/grammarbox" >{language_type === "EN" ?"Grammar":"Ngữ Pháp"}</Link>
                    <Link to="/ipa" >{language_type === "EN" ?"IPA":"Phiên âm IPA"}</Link>
                    <Link to="/ed-es" >{language_type === "EN" ?"Pronunciation ED, ES":"Phát âm  ED, ES"}</Link>
                    <Link to="/listen-write-list" >{language_type === "EN" ?"Listen and Write":"Nghe và viết lại"}</Link>
                    <Link to="/phrasal-verbs" >{language_type === "EN" ?"Phrasal verbs":"Cụm động từ"}</Link>
                    <Link to="/chat-app" >{language_type === "EN" ?"Chat app":"Chat"}</Link>
                    <Link to="/games" >{language_type === "EN" ?"Games":"Trò chơi"}</Link>
                    <Link to="/login" >{language_type === "EN" ?"Login":"Đăng nhập"}</Link>
                    <Link to="/login" >{language_type === "EN" ?"Logout":"Đăng nhập"}</Link>
                    {/* <Link to="/chat-app" >{language_type === "EN" ?"Chat app":"Chat"}</Link> */}
                  </nav>
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(Menu);
