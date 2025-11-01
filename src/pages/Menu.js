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

                
                <nav className="nav-menu" style={{ textAlign: "center"}}>
                    <Link to="/">{language_type === "EN" ? "Statistics" : "Thống kê"}</Link>
                    <Link to="/vocabularybox" >{language_type === "EN" ? "Vocabulary" : "Từ vựng"}</Link>
                    <Link to="/grammarbox" >{language_type === "EN" ?"Grammar":"Ngữ Pháp"}</Link>
                    <Link to="/ipa" >{language_type === "EN" ?"IPA":"Phiên âm IPA"}</Link>
                    <Link to="/phrasal-verbs" >{language_type === "EN" ?"Phrasal verbs":"Cụm động từ"}</Link>
                  </nav>
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(Menu);
