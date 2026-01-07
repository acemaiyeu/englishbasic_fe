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
                        {/* <div className="vocabulary-header">
                            <div className="vocabulary-title">
                                Hello trong tiếng anh là gì?
                            </div>
                            <div className="vocabulary-step">1/100</div>
                            <div className="vocabulary-time">00:30</div>
                        </div>
                        <div className="vocabulary-footer">
                            //type: choose 
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

                            {/* //type: input 
                                {/* <div className="answer-item-input">
                                    <input type="text" className="answer-input" onClick={(e) => this.handleSubmit(e)}/>
                                </div> 
                        </div> */}

                        <div className="vocabulary-read">
                                <div className="vocabulary-read-header">
                                    <div className="">Prev</div>
                                    <div className="">1</div>
                                    <div className="">Next</div>
                                </div>
                                <div className="vocabulary-read-body">
                                    <div className="vocabulary-read-content">
                                        <div className="vocabulary-read-content-left">
                                            <div className="vocabulary-read-title">
                                                Elephant
                                            </div>
                                            <div className="vocabulary-read-description">
                                                (Phiên âm: /ˈel.ɪ.fənt/)
                                            </div>
                                        </div>
                                         <div className="vocabulary-read-content-right">
                                            <div className="vocabulary-read-image">
                                                <img src="https://png.pngtree.com/png-vector/20240921/ourmid/pngtree-colorful-picture-of-an-elephant-png-image_13880501.png" loading="lazy"/>
                                            </div>
                                        </div>
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
export default connect(mapStateToProps)(VocabularyComponent);