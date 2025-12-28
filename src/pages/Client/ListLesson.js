import React from "react";
import '../sass/ListSubjects.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ListSubjects extends React.Component {

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
            <div className="subjects-container">
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
                <div className="subject-item">
                    <div className="subject-title">Lesson 1</div>
                    <div className="subject-description">Description for Subject 1</div>
                </div>
               
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ListSubjects);
