import React from "react";
import '../sass/VocabularyLesson.scss'
import { connect } from "react-redux";
import AudioButton from "./AudioButton";
import axios from "axios";
import { toast } from "react-toastify";
import {API_URL } from '../const/const'
import Prev from "./Prev";
import TestResult from "./TestResult";
import { type } from "@testing-library/user-event/dist/type";
import HtmlRenderer from "./HtmlRenderer";


class VocabularyLesson extends React.Component {

    state = {
            listLessonDetail: [],
            n_rand: 0,
            language_type: "EN",
            index: 0,
            active_answer: 0,
            question_id: 0,
            result: undefined,
            total_questions: 0,
            text_answer: "",
            end_test: false,
            point: 0, 
            check_answer: true,
            index_correct_answer: -1,
    }
    componentDidMount(){
        this.getListLessionDetail(this.props.match.params.id)
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
     getListLessionDetail = async (lesson_detail_id) => {
       await axios.get(`${API_URL}/list-lesson-detail/${lesson_detail_id}`)
        .then(response => {
            this.setState({
                listLessonDetail: response.data.data,
                total_questions: response.data.data.questions.length,
            })
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            toast.error("Get lesson detail failed!")
        });
    }
    handleOnClickAnswer = (id, question_id) => {
        this.setState({
            active_answer: id,
            question_id: question_id
        })
    }
    handleNextQuestion = () => {
        let { index, total_questions, listLessonDetail, point } = this.state;
        if(listLessonDetail.questions[index].type === "READ"){
            this.setState({
                point: this.state.point + 1,
            })
        }
        if(index+1 >= total_questions){
            // toast.error("Đã hết câu hỏi");
            this.setState({
                end_test: true
            })
                this.updateProcess(Math.ceil(100 / listLessonDetail.questions.length) * this.state.point);
            
           
            return;
        }
        this.setState({
            index: this.state.index + 1,
            text_answer: "",
            result: undefined,
            question_id: 0,
            active_answer: 0,
            check_answer: true
        })
    }

    testAnswer = async(type) => {
        let { active_answer, question_id, language_type, text_answer } = this.state; 
        if (type === "CHOOSE"){
            if (active_answer < 1 || question_id < 1){
                if (language_type === "EN"){
                    alert("Please choose the answer!")
                }else{
                    alert("Vui lòng chọn đáp án!")
                }
                return;
            }
        }else{
            if(text_answer === ""){
                if (language_type === "EN"){
                    alert("Please input the answer!")
                }else{
                    alert("Vui lòng nhập đáp án!")
                }
                return;
            }
        }
        
        // await axios.get('${API_URL}/testing-answer/'+question_id+"/"+active_answer+"/"+ type)
        // .then(response => {
        //         this.setState({
        //             result: response.data.data,
        //         })
        //         if(this.state.language_type === "EN"){
        //             alert.success("You answered right!")
        //         }else{
        //             alert.success("Bạn đã trả lời đúng!")
        //         }
                
        // })
        // .catch(error => {
        //     console.error('Lỗi khi gọi API:', error);
        // });
        try {
        const response = await axios.post(`${API_URL}/testing-answer`, {
            question_id: question_id,
            answer_id: active_answer,
            type: type
        });
        if (response.status === 200){
            if(response.data.data){
                if(this.state.language_type === "EN"){
                    toast.success("You answered right!")
                    
                }else{
                    toast.success("Bạn đã trả lời đúng!") 
                }
                // toast.success("+1")
                this.setState({
                    ...this.state,
                    point: this.state.point + 1,
                    check_answer: true,
                })
            }else{
                 if(this.state.language_type === "EN"){
                    toast.warning("You answered wrong!")
                    
                }else{
                    toast.warning("Bạn đã trả lời sai!") 
                }
                this.setState({
                    check_answer: false
                })
            }
                this.setState({
                    result: response.data.data,
                    index_correct_answer: response.data.answer_id
                })
        }
        } catch (error) {
        console.error(error);
        }
    }
    updateProcess = async  (process) => {
        let { listLessonDetail } = this.state;
        axios.put(`${API_URL}/lesson-detail/${listLessonDetail.id}`, {
            'process': process 
        }).then((res) => {
            if(this.state.language_type === "EN"){
                    toast.success("Update success!")
                    
                }else{
                    toast.success("Cập nhật thành công!") 
                }
        }).catch((e) => {
                if(this.state.language_type === "EN"){
                    toast.warn("Update fail!")
                    
                }else{
                    toast.warn("Cập nhật thất bại!") 
                }
                console.log(e);
        })
    }
    getListLession = async () => {
       await axios.get(`${API_URL}/list-lessons`)
        .then(response => {
            this.setState({
                listLesson: response
            })
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });

    }
    handleChangeTextAnswer = (e, question_id) => {
        this.setState({
            text_answer: e.target.value,
            question_id: question_id,
            active_answer: e.target.value
        })
    }
    render() {
        let { language_type, listLessonDetail, check_answer, index, active_answer, result, end_test, index_correct_answer} = this.state;
        return (
            <>  
            {end_test ? <TestResult point={this.state.point} lesson_id={listLessonDetail.lesson_id} language_type="EN" page="/test-list" />
            : 
                <>
                <Prev uri={`list-lesson-details/${listLessonDetail?.lesson_id}`}/>
                <div className="lesson-container">
                    {listLessonDetail && listLessonDetail?.questions?.length > 0 && 
                        <>
                            <div className="lesson-vocabulary">
                           {language_type === "EN" ? "Subject" : "Chủ đề"}: {listLessonDetail.title_english}   <b>{listLessonDetail.transcription}</b> <AudioButton text={listLessonDetail.title_english} lang="en-US" />

                     </div>
                    <div className="box-content">
                            <span className="label label-success sentences">{language_type === "EN" ? "Sentences: " : "Câu: "} {index + 1
                                }/{listLessonDetail.questions.length}</span>
                            <div className="less-question"> <HtmlRenderer htmlContent={ language_type === "EN" ? (listLessonDetail?.questions[index]?.title_english)  : (listLessonDetail?.questions[index]?.title_vietnamese)} /></div>
                            <div className="answers">
                                {listLessonDetail.questions[index].type === "CHOOSE" ||  listLessonDetail.questions[index].type === "READ" ? 
                                <div className="answer-item"> 
                                    {listLessonDetail.questions[index].answers?.length > 0 && listLessonDetail.questions[index].answers.map((answer, index_a) => {
                                        return(
                                            <div className={`form-in ${result === false && active_answer === answer.id ? "destroy" : ""}  ${(index_correct_answer === answer.id)  ? "success" : ""}`} onClick={() => this.handleOnClickAnswer(answer.id, listLessonDetail.questions[index].id)}> 
                                                 {index_a + 1}. <input checked={active_answer === answer.id} type="radio" name="answer"/>{answer.title}
                                            </div>
                                            )
                                    })         
                                    }
                                </div>
                                : <div></div>
                                }
                                {listLessonDetail.questions[index].type === "WRITE" && 
                                    <div className="answer-item">
                                        <textarea value={this.state.text_answer} onChange={(e) => this.handleChangeTextAnswer(e, listLessonDetail.questions[index].id)} cols="10" rows="10" type="text" placeholder={`${language_type === "EN" ? "Please writing for your answer" : "Vui lòng nhập câu trả lời"}`}/> 
                                    </div>
                                }
                                
                            </div>

                            {check_answer === false && listLessonDetail.questions[index].type === "WRITE" &&
                                <div className="answer-correct">
                                        <div className="answer-correct-title">{language_type === "EN" ? "Answer: " : "Đáp án: "}</div>
                                        {/* {listLessonDetail.questions[index].type === "CHOOSE" && listLessonDetail.questions[index] && listLessonDetail.questions[index].answers && listLessonDetail.questions[index].answers.length && listLessonDetail.questions[index].answers.map((a) => {
                                            return (
                                                <span className="label label-success">- {a.title}</span>
                                            )
                                        })} */}
                                        {listLessonDetail.questions[index].type !== "CHOOSE" && listLessonDetail.questions[index] && listLessonDetail.questions[index].answers && listLessonDetail.questions[index].answers.length && listLessonDetail.questions[index].answers.map((a) => {
                                            return (
                                                <span className="label label-success">- {a.text}</span>
                                            )
                                        })}
                                    </div>
                                }
                    </div>
                    <div className="button-group">
                        
                        {result === undefined && listLessonDetail?.questions[index].type !== "READ" ? <button onClick={() => this.testAnswer(listLessonDetail.questions[index].type)}>{language_type === "EN" ? "Test" : "Kiểm tra"}</button>
                        : <button onClick={() => this.handleNextQuestion()}>Next</button> }
                    </div>
                </>
                    }
                     
                </div> 
                </>
            }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = () => {

}
export default connect(mapStateToProps, mapDispatchToProps)(VocabularyLesson);