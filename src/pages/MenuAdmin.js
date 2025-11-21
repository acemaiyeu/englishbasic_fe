import React from "react";
import '../sass/MenuAdmin.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import api from "./api";
import { API_URL } from "../const/const";
import { toast } from "react-toastify";

class MenuAdmin extends React.Component {

    state =  {
        language_type: "EN"
    }
    componentDidMount(){
        this.setState({
            language_type: this.props.language_type,
        })
        this.checkLogin()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.language_type !== this.props.language_type) {
            this.setState({
                language_type: this.props.language_type,
            });
        }
    }
    checkLogin = () => {
        let { language_type } = this.state;
        let token = sessionStorage.getItem("S_ADMIN"); 
        axios.get(`${API_URL}/profile`, {
            headers: {
                Base_Token: `${token}`
            }
        }).then((res) => {
            if(res.data.role_name.include("admin")){
                sessionStorage.setItem("S_ADMIN", res.data.access_token);
            }else{
                window.location.href = "/pages/admin/login"
            }
        }).catch(() => {
            if(language_type === "EN"){
                toast.error("This account can't login to page admin")
            }else{
                toast.error("Tài khoản của bạn sai hoặc không có quyền truy cập admin")
            }   
            window.location.href = "/pages/admin/login"
        })
    }
    render(){
        let { language_type } = this.state;
        return (
            <div className="menu-container admin">
                <i class="bi bi-bar-chart-steps"></i>
                <nav className="nav-menu" style={{ textAlign: "center"}}>
                    <Link to="/pages/admin/">{language_type === "EN" ? "Statistics" : "Thống kê"}</Link>
                    <Link to="/pages/admin/manager-subject" >{language_type === "EN" ? "Manager Subject" : "Quản lý chủ đề"}</Link>
                    <Link to="/pages/admin/manager-vocabulay" >{language_type === "EN" ? "Manager Vocabulary" : "Quản lý từ vựng"}</Link>
                    <Link to="/pages/admin/manager-vocabulay-ipa" >{language_type === "EN" ? "Manager IPA's Vocabulary" : "Quản lý từ vựng IPA"}</Link>
                    <Link to="/pages/admin/manager-questions" >{language_type === "EN" ? "Manager Questions" : "Quản lý câu hỏi"}</Link>
                    <Link to="/pages/admin/manager-grammars" >{language_type === "EN" ?"Manager Grammar":"Quản lý ngữ pháp"}</Link>
                    <Link to="/pages/admin/manager-listen-write" >{language_type === "EN" ?"Manager Listen And Write":"Quản lý Luyện nghe"}</Link>
                    <Link to="/pages/admin/manager-export-excel" >{language_type === "EN" ?"Manager Export Excel":"Quản lý xuất file excel"}</Link>
                    <Link to="/pages/admin/counter" >{language_type === "EN" ?"AI CHAT":"Tạo dữ liệu bởi AI"}</Link>
                    
                    <Link to="/import-template" >{language_type === "EN" ?"List Template Excel":"Mẫu Template Excel"}</Link>
                    {/* <Link to="/login" >{language_type === "EN" ?"Login":"Đăng nhập"}</Link> */}
                    <Link to="/logout" >{language_type === "EN" ?"Logout":"Đăng xuất"}</Link>
                  </nav>
                  
                  
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(MenuAdmin);
