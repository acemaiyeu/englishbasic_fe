import React from "react";
import '../sass/MenuAdmin.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api_admin from "./api_admin";
import { toast } from "react-toastify";
import { API_URL, getCookie } from "../const/const";
 import Cookies from "js-cookie";

class MenuAdmin extends React.Component {

    state =  {
        language_type: "EN",
        show_menu: true
    }
    componentDidMount(){
        this.setState({
            language_type: this.props.language_type,
        })
        if(window.location.href !== `${window.location.origin}/pages/admin/login`){
            this.checkLogin()
        }
        if(!getCookie("S_ADMIN")){
            this.setState({
                show_menu: false
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.language_type !== this.props.language_type) {
            this.setState({
                language_type: this.props.language_type,
            });
        }
    }
    checkLogin = async () => {

        let { language_type } = this.state;
        let token = getCookie("S_ADMIN");
       
        await api_admin.get(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if((res.data.data.role_code.toLowerCase()).includes("admin")){
                // sessionStorage.setItem("S_ADMIN", res.data.access_token);
            }else{
                window.location.href = "/pages/admin/login"
            }
        }).catch((e) => {
            console.log(e);
            
            if(language_type === "EN"){
                toast.error("This account can't login to page admin")
            }else{
                toast.error("Tài khoản của bạn sai hoặc không có quyền truy cập admin")
            }     
            window.location.href = "/pages/admin/login"
        })
    }
    render(){
        let { language_type, show_menu } = this.state;
        return (
            <div className="menu-container admin">
                {/* <i class="bi bi-bar-chart-steps"></i> */}
                {show_menu && 
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
                }
                  
                  
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(MenuAdmin);
