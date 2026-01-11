import React from "react";
import { connect } from "react-redux";
import '../sass/VocabularyComponent.scss'
import Prev from "./Prev";
import HtmlRenderer from "./HtmlRenderer";
import AudioButton from "./AudioButton";
import SpeechButton from "./SpeechSupport/SpeechButton";
import { API_URL } from "../const/const";
import axios from "axios";
import { ListVideo } from "lucide-react";
import { toast } from "react-toastify";

class VocabularyComponent extends React.Component{
    state = {
        language_type: "EN",
        type_speech: "nomal",
        ListVocabulary: [],
        index: 0
    }
     componentDidMount(){
            // this.getListLessionDetail(this.props.match.params.id)
            this.getListVocabulary(this.props.match.params.subject_id)
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

        getListVocabulary = (subject_id) => {
            axios.get(`${API_URL}/lesson-detail-by-lesson-id/${subject_id}?limit=1000`).then((res) => {
                this.setState({
                    ListVocabulary: res.data.data
                })
            }).catch((e) => {
                console.log(e)
                toast.error("Error API")
            })
        }
        handleNext = () => {
            let {index, ListVocabulary, language_type} = this.state;
            if(index >= ListVocabulary.length - 1){
                if(language_type === "EN"){
                    toast.error("No data")
                }else{
                    toast.error("Đã hết dữ liệu")
                }
                return;
            }
            this.setState({
                index: this.state.index + 1
            })
        }
        handlePrev = () => {
            let {index, ListVocabulary, language_type} = this.state;
            if(index <= 0){
                if(language_type === "EN"){
                    toast.error("No data")
                }else{
                    toast.error("Đã hết dữ liệu")
                }
            }
            this.setState({
                index: this.state.index - 1
            })
        }
        render() {
            let { type_speech, ListVocabulary, language_type, index } = this.state;
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
                        {ListVocabulary && ListVocabulary.length > 0  &&
                            <div className="vocabulary-read">
                                <div className="vocabulary-title">
                                    <b>{ListVocabulary[index].means}</b>
                                </div>
                                <div className="vocabulary-image">
                                   <img loading="lazy" src={`${ListVocabulary[index].img != "" ? ListVocabulary[index].img : 'https://hthdigital.vn/image/450/430/1/0/article/category/'}`}/>
                                {/*  */}
                                </div>
                                <div className="vocabulary-text">
                                    <b>{ListVocabulary[index].title_english}</b>
                                    <i>{ListVocabulary[index].transcription}</i>
                                </div>
                                <div className="vocabulary-speak">
                                    {/* <i class="bi bi-volume-up"></i> */}
                                    <SpeechButton type_speech={type_speech} text={`${ListVocabulary[index].title_english} là ${ListVocabulary[index].means}`} lang="vi-VI" />
                                    <div className="vocabulary-speak-type">
                                        <select onChange={(e) => this.handleChangeSpeechType(e)}>
                                            <option value="nomal">{language_type === "EN" ? "Speed: Nomal" : "Tốc độ đọc: Bình thường"}</option>
                                            <option value="fast">{language_type === "EN" ? "Speed: Fast" : "Tốc độ đọc: Nhanh"}</option>
                                            <option value="slow">{language_type === "EN" ? "Speed: Slow" : "Tốc độ đọc: Chậm"}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="vocabulary-footer">
                                    <div className="btn-prev" disabled={`${index <= 0}`} onClick={() => this.handlePrev()}>
                                        <i class="bi bi-arrow-left-circle"></i>
                                    </div>
                                    <div className="btn-page">
                                        {index + 1}/{ListVocabulary.length}
                                    </div>
                                    <div className="btn-next" onClick={() => this.handleNext()}>
                                        <i class="bi bi-arrow-right-circle"></i>
                                    </div>
                                </div>
                        </div>
                    }
                        
                </div>
            )
        }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(VocabularyComponent);