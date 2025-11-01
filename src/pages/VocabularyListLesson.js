import React from "react";
import '../sass/VocabularyListLesson.scss'
import axios from "axios";
import { connect } from 'react-redux'
import { toast } from "react-toastify";


class VocabularyListLesson extends React.Component {

    state = {
        listLesson: [],
        language_type: "EN" ,
        loadding: true
    }
    redirectToLession = (lesson_id) => {
        this.props.history.push("/list-lesson-details/" + lesson_id)
    }
    
    componentDidMount () {
        this.getListLession()
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
    getListLession = async () => {
       await axios.get('http://localhost:8000/api/list-lessons?limit=1000')
        .then(response => {
            this.setState({
                listLesson: response.data.data
            })
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            toast.error("Get list lessons failed!")
        });
    }
    render() {
        let { listLesson, language_type, loadding } = this.state;
        if (listLesson && listLesson.length > 0){
            loadding = false;
        }
        return (
            <>
                
                <div className="list-lessons">
                    <h4 className="list-title">{language_type === "EN" ? "List Lesson" : "Danh sách bài học"}</h4>
                    {loadding && 
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                    }
                    {listLesson && listLesson.length > 0 && listLesson.map((item, index) => {
                        return (<div key={index} className="lesson-item" onClick={() => this.redirectToLession(item.id)}>
                        <div className="lesson-content-left" >
                            <div className="lesson-title">{language_type === "EN" ? item.title_english : item.title_vietnamese}</div>
                            <div className="lesson-title">{language_type === "EN" ? item.details.length +  " Vocabulary" :  item.details.length +  " Từ vựng"}</div>
                        </div>

                        <div className="lession-content-right">
                            <p>{language_type === "EN" ? "Progress" : "Tiến độ"}</p>
                            <div className="progress">
                                <div className="progress-bar bg-success" style={{width: "40%"}}>
                                    40%
                                </div>

                            </div>
                             
                        </div>
                    </div>)
                    })}
                    
                     {/* <div className="lesson-item">
                        <div className="lesson-content-left">
                            <div className="lesson-title">Bài 2: Giới thiệu thân</div>
                            <div className="lesson-title">40 câu</div>
                        </div>

                        <div className="lession-content-right">
                            <p>Tiến độ</p>
                            <div className="progress">
                                
                               
                                <div className="progress-bar bg-danger" style={{width: "10%"}}>
                                    10%
                                </div>

                            </div>
                             
                        </div>
                    </div> */}
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(VocabularyListLesson);