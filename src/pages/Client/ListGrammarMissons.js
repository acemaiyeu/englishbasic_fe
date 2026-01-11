import React from "react";
import '../sass/ListSubjectsMissons.scss'
import { connect } from "react-redux";

class ListGrammarMissons extends React.Component {

    state =  {
        language_type: "EN",
        current_page: 1,
        grammar_id: ""
    }
    componentDidMount(){
        console.log(this.props)
        this.setState({
            language_type: this.props.language_type,
            grammar_id: this.props.match.params.id
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
        let { language_type, grammar_id } = this.state;
        return (
            <div className="mission-container">
                <div className="mission-list">
                     <div className="mission-item" onClick={() => this.forWardPage(`lesson/${grammar_id}`,true)}>
                        <div className="misson-item-modal">Chưa hoàn thành</div>
                        <div className="mission-title">
                            {language_type === "EN" ? "Lesson" : "Bài học"}
                        </div>
                    </div>
                      <div className="mission-item" onClick={() => this.forWardPage(`exercise/${grammar_id}`,true)}>
                        <div className="misson-item-modal">Chưa hoàn thành</div>
                        <div className="mission-title">
                            {language_type === "EN" ? "Exercise" : "Bài tập"}
                        </div>
                    </div>
                </div>
                 <div className="mission-list">
                    <div className="mission-item disabled" onClick={() => this.forWardPage(`final/${grammar_id}`, true)}>
                        <div className="misson-item-modal">Chưa đủ điều kiện</div>
                        <div className="mission-title">
                            {language_type === "EN" ? "Final test" : "Kiểm tra cuối"}
                        </div>
                    </div>
                 </div>
                
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ListGrammarMissons);
