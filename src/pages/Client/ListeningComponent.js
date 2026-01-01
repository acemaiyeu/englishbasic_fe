import React from "react";
import { connect } from "react-redux";
import '../sass/ListeningComponent.scss'
import Prev from "./Prev";
import HtmlRenderer from "./HtmlRenderer";

class ListeningComponent extends React.Component{
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
            let { language_type, listen = {
                url_video: "https://drive.google.com/file/d/1_vsEanqZ0hZcunYTc-1AaV7XTMQbU2gb/view?usp=sharing"
            }} = this.state;
            return (
                <div className="listening-container">
                    <Prev uri="subjects"/>
                        <div className="listening-header">
                            <div className="listening-title">
                                {listen.url_video && 
                               
                            //    <YouTubeControlsOnly 
                            //         videoSource={listen.url_video} 
                            //     />
                           
                                <iframe 
                                    src={"https://drive.google.com/file/d/" + (listen.url_video.replace('https://drive.google.com/file/d/',"")).replace("/view?usp=sharing","") + "/preview"}
                                    // "https://drive.google.com/file/d/14wlEn6Ym9iOeKpMv7OWGfl3mJeRGLvKs/preview"
                                    width="100%" 
                                    height="100"
                                    allow="autoplay"
                                    frameborder="0"
                                    controls
                                ></iframe>
                            }
                            </div>
                            {/* <div className="listening-step">1/100</div>
                            <div className="listening-time">00:30</div> */}
                        </div>
                        <div className="listening-header">
                            <div className="listening-title">
                                {language_type === "EN" ? "Question: " : "Câu hỏi: "}Hello trong tiếng anh là gì?
                            </div>
                            {/* <div className="listening-step">1/100</div>
                            <div className="listening-time">00:30</div> */}
                        </div>
                        <div className="listening-footer">
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
export default connect(mapStateToProps)(ListeningComponent);