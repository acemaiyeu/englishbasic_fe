import React from "react";
import { connect } from "react-redux";
import '../sass/ReadingComponent.scss'
import Prev from "./Prev";
import HtmlRenderer from "./HtmlRenderer";

class ReadingComponent extends React.Component{
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
            let { language_type } = this.state;
            return (
                <div className="reading-container">
                    <Prev uri="subjects"/>
                        <div className="reading-header">
                            <div className="reading-title">
                                <HtmlRenderer htmlContent="<h1>Reading: A Productive Day</h1>
  
  <br> <p>
    My name is Nam. Today is Monday. I wake up at 6:00 AM.<br>
    First, I drink a glass of water. Then, I do exercise for twenty minutes.<br>
    It helps me feel energetic.
  </p>

  <br>

  <p>
    I have breakfast with my family at 7:30 AM. We eat bread and eggs.<br>
    After breakfast, I go to work by motorbike. I am an office worker.<br>
    My job is busy but very interesting.
  </p>

  <br>

  <p>
    In the evening, I come home and cook dinner. I like cooking healthy food.<br>
    Before going to bed, I read a book for ten minutes.<br>
    I never stay up late because I want to stay healthy.
  </p>

  <hr>

  <h1>Vocabulary</h1>
  <br>
  <p>
    <strong>Wake up</strong>: Thức dậy<br>
    <strong>Energetic</strong>: Tràn đầy năng lượng<br>
    <strong>Office worker</strong>: Nhân viên văn phòng<br>
    <strong>Healthy food</strong>: Thức ăn lành mạnh<br>
    <strong>Stay up late</strong>: Thức khuya
  </p>"/> 
                            </div>
                            {/* <div className="reading-step">1/100</div>
                            <div className="reading-time">00:30</div> */}
                        </div>
                        <div className="reading-header">
                            <div className="reading-title">
                                {language_type === "EN" ? "Question: " : "Câu hỏi: "}Hello trong tiếng anh là gì?
                            </div>
                            {/* <div className="reading-step">1/100</div>
                            <div className="reading-time">00:30</div> */}
                        </div>
                        <div className="reading-footer">
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
export default connect(mapStateToProps)(ReadingComponent);