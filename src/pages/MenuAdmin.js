import React from "react";
import '../sass/MenuAdmin.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class MenuAdmin extends React.Component {

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
            <div className="menu-container admin">
                <i class="bi bi-bar-chart-steps"></i>
                <nav className="nav-menu" style={{ textAlign: "center"}}>
                    <Link to="/pages/admin/">{language_type === "EN" ? "Statistics" : "Thống kê"}</Link>
                    <Link to="/pages/admin/manager-subject" >{language_type === "EN" ? "Manager Subject" : "Quản lý chủ đề"}</Link>
                    <Link to="/pages/admin/manager-vocabulay" >{language_type === "EN" ? "Manager Vocabulary" : "Quản lý từ vựng"}</Link>
                    <Link to="/pages/admin/manager-vocabulay-ipa" >{language_type === "EN" ? "Manager IPA's Vocabulary" : "Quản lý từ vựng IPA"}</Link>
                    <Link to="/pages/admin/manager-questions" >{language_type === "EN" ? "Manager Questions" : "Quản lý câu hỏi"}</Link>
                    <Link to="/grammarbox" >{language_type === "EN" ?"Manager Grammar":"Quản lý ngữ pháp"}</Link>
                  </nav>
                  
                  
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(MenuAdmin);
