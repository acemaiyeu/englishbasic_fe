import React from "react";
import { connect } from "react-redux";
import '../sass/VocabularyComponent.scss'
import Prev from "./Prev";
import HtmlRenderer from "./HtmlRenderer";
import AudioButton from "./AudioButton";
import SpeechButton from "./SpeechSupport/SpeechButton";

class VocabularyComponent extends React.Component{
    state = {
        language_type: "EN",
        type_speech: "nomal"
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
        handleChangeSpeechType = (e) => {
            const value = e.target.value;
            this.setState({ type_speech: value });
        };
        render() {
            let { type_speech } = this.state;
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
                                <div className="vocabulary-title">
                                    <b>Con voi</b>
                                </div>
                                <div className="vocabulary-image">
                                   <img loading="lazy" src="https://png.pngtree.com/png-vector/20240921/ourmid/pngtree-colorful-picture-of-an-elephant-png-image_13880501.png"/>
                                </div>
                                <div className="vocabulary-text">
                                    <b>Elephant</b>
                                    <i>/ˈel.ɪ.fənt/</i>
                                </div>
                                <div className="vocabulary-speak">
                                    {/* <i class="bi bi-volume-up"></i> */}
                                    <SpeechButton type_speech={type_speech} text={`Elephant là con voi đó`} lang="vi-VI" />
                                    <div className="vocabulary-speak-type">
                                        <select onChange={(e) => this.handleChangeSpeechType(e)}>
                                            <option value="nomal">Tốc độ đọc: Bình thường</option>
                                            <option value="fast">Tốc độ đọc: Nhanh</option>
                                            <option value="slow">Tốc độ đọc: Chậm</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="vocabulary-footer">
                                    <div className="btn-prev">
                                        <i class="bi bi-arrow-left-circle"></i>
                                    </div>
                                    <div className="btn-page">
                                        1/100
                                    </div>
                                    <div className="btn-next">
                                        <i class="bi bi-arrow-right-circle"></i>
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