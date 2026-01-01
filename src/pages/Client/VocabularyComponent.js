import React from "react";
import { connect } from "react-redux";
import '../sass/VocabularyComponent.scss'
import Prev from "./Prev";
import HtmlRenderer from "./HtmlRenderer";

class VocabularyComponent extends React.Component{
    state = {
        language_type: "EN"
    }
     componentDidMount(){
            // this.getListLessionDetail(this.props.match.params.id)
            this.setState({
                language_type: this.props.language_type,
                // dark_mode: getDarkMode()
            })
        }
        componentDidUpdate(prevProps) {
            if (prevProps.language_type !== this.props.language_type) {
                this.setState({
                    language_type: this.props.language_type,
                });
            }
        }
        handleSubmit = (e) => {
            let { input_value } = this.state;
            if(e.key === 'Enter'){

            }
        }
        render() {
            return (
                <div className="vocabulary-container">
                    <Prev uri="subjects"/>
                        <div className="vocabulary-header">
                            <div className="vocabulary-title">
                                Hello trong tiếng anh là gì?
                            </div>
                            <div className="vocabulary-step">1/100</div>
                            <div className="vocabulary-time">00:30</div>
                        </div>
                        <div className="vocabulary-footer">
                            {/* //type: choose */}
                                <div className="list-answers">
                                    <div className="answer-item correct">
                                            <div className="answer-item-title">Xin chào</div>
                                    </div>
                                    <div className="answer-item wrong">
                                            <div className="answer-item-title">Xin chào</div>
                                    </div>
                                    <div className="answer-item">
                                            <div className="answer-item-title">Xin chào</div>
                                    </div>
                                    <div className="answer-item">
                                            <div className="answer-item-title">Xin chào</div>
                                    </div>
                                </div>
                                <input type="submit" className="btn-next" value="Tiếp tục"/>

                            {/* //type: input */}
                                {/* <div className="answer-item-input">
                                    <input type="text" className="answer-input" onClick={(e) => this.handleSubmit(e)}/>
                                </div> */}
                        </div>
                </div>
            )
        }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(VocabularyComponent);