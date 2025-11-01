import React from "react";
import '../sass/VocabularyLesson.scss'
import { connect } from "react-redux";
import AudioButton from "./AudioButton";
import axios from "axios";
import { toast } from "react-toastify";


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
            text_answer: ""
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
       await axios.get('http://localhost:8000/api/list-lesson-detail/' + lesson_detail_id)
        .then(response => {
            this.setState({
                listLessonDetail: response.data.data,
                total_questions: response.data.data.questions.length
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
        let { index, total_questions } = this.state;
        if(index+1 >= total_questions){
            alert("Đã hết câu hỏi");
            return;
        }
        this.setState({
            index: this.state.index + 1,
            text_answer: "",
            result: undefined,
            question_id: 0,
            active_answer: 0,
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
        
        // await axios.get('http://localhost:8000/api/testing-answer/'+question_id+"/"+active_answer+"/"+ type)
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
        const response = await axios.post("http://localhost:8000/api/testing-answer", {
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
                toast.success("+1")
            }else{
                 if(this.state.language_type === "EN"){
                    toast.warning("You answered wrong!")
                    
                }else{
                    toast.warning("Bạn đã trả lời sai!") 
                }
            }
                this.setState({
                    result: response.data.data,
                })
        }
        } catch (error) {
        console.error(error);
        }
    }
    getListLession = async () => {
       await axios.get('http://localhost:8000/api/list-lessons')
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
        let { language_type, listLessonDetail, index, active_answer, result} = this.state;
        return (
            <>
                <div className="lesson-container">
                    {listLessonDetail && listLessonDetail?.questions?.length > 0 && 
                        <>
                            <div className="lesson-vocabulary">
                           {language_type === "EN" ? "Vocabulary" : "Từ vựng"}: {listLessonDetail.title_english}   <b>{listLessonDetail.transcription}</b> <AudioButton text={listLessonDetail.title_english} lang="en-US" />

                     </div>
                    <div className="box-content">
                            <div className="less-question"> { language_type === "EN" ? listLessonDetail?.questions[index]?.title_english : listLessonDetail?.questions[index]?.title_vietnamese}</div>
                            <div className="answers">
                                {listLessonDetail.questions[index].type === "CHOOSE" ? 
                                <div className="answer-item"> 
                                    {listLessonDetail.questions[index].answers?.length > 0 && listLessonDetail.questions[index].answers.map((answer, index_a) => {
                                        return(
                                            <div className={`form-in ${result === false && active_answer === answer.id ? "destroy" : ""}  ${result === true && active_answer === answer.id ? "success" : ""}`} onClick={() => this.handleOnClickAnswer(answer.id, listLessonDetail.questions[index].id)}> 
                                                 {index_a + 1}. <input checked={active_answer === answer.id} type="radio" name="answer"/>{answer.title}
                                            </div>
                                            )
                                    })         
                                    }
                                </div>
                                : <div></div>
                                }
                                {listLessonDetail.questions[index].type !== "CHOOSE" && 
                                    <div className="answer-item">
                                        <textarea value={this.state.text_answer} onChange={(e) => this.handleChangeTextAnswer(e, listLessonDetail.questions[index].id)} cols="10" rows="10" type="text" placeholder={`${language_type === "EN" ? "Please writing for your answer" : "Vui lòng nhập câu trả lời"}`}/> 
                                    </div>
                                }
                                 

                            </div>
                    </div>
                    <div className="button-group">
                        {result === undefined ? <button onClick={() => this.testAnswer(listLessonDetail.questions[index].type)}>{language_type === "EN" ? "Test" : "Kiểm tra"}</button>
                        : <button onClick={() => this.handleNextQuestion()}>Next</button> }
                    </div>
                </>
                    }
                     
                </div> 
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