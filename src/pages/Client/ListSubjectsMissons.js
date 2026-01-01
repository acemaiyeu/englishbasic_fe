import React from "react";
import '../sass/ListSubjectsMissons.scss'
import { connect } from "react-redux";

class ListSubjectsMissons extends React.Component {

    state =  {
        language_type: "EN",
        current_page: 1,
        subject_id: ""
    }
    componentDidMount(){
        console.log(this.props)
        this.setState({
            language_type: this.props.language_type,
            subject_id: this.props.match.params.subject_id
        })
        
    }
    componentDidUpdate(prevProps) {
        if (prevProps.language_type !== this.props.language_type) {
            this.setState({
                language_type: this.props.language_type,
            });
        }
    }
    forWardPage = (uri, forward_status = false) => {
        if(forward_status){
            window.location.href = uri;
        }
    }
    render(){
        let { language_type, subject_id } = this.state;
        return (
            <div className="mission-container">
                <div className="mission-item" onClick={() => this.forWardPage(`vocabulary/${subject_id}`,true)}>
                    <div className="mission-title">
                        {language_type === "EN" ? "Vocabulary" : "Từ vựng"}
                    </div>
                </div>
                 <div className="mission-item" onClick={() => this.forWardPage(`reading/${subject_id}`, true)}>
                    <div className="mission-title">
                        {language_type === "EN" ? "Reading" : "Bài đọc"}
                    </div>
                </div>
                 <div className="mission-item disabled" onClick={() => this.forWardPage(`final/${subject_id}`, false)}>
                    <div className="mission-title">
                        {language_type === "EN" ? "Final test" : "Kiểm tra"}
                    </div>
                </div>
                 <div className="mission-item " onClick={() => this.forWardPage(`listening/${subject_id}`, true)}>
                    <div className="mission-title">
                        {language_type === "EN" ? "Listenning" : "Bài nghe"}
                    </div>
                </div>
                
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ListSubjectsMissons);
