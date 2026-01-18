import React from "react";
import '../sass/VocabularyListLesson.scss'
import axios from "axios";
import { connect } from 'react-redux'
import { toast } from "react-toastify";
import { API_URL } from '../const/const'


class ListenWriteList extends React.Component {

    state = {
        listListens: [],
        language_type: "EN",
        loadding: true
    }
    redirectToListen = (listen_id) => {
        this.props.history.push("/listen-write/" + listen_id)
    }
    
    componentDidMount () {
        this.getListListenWrite(this.props.match.params.lesson_id)
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
    getListListenWrite = async () => {
       await axios.get(`${API_URL}/listens`)
        .then(response => {
            this.setState({
                listListens: response.data.data
            })
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            toast.error("Get list lessons failed!")
        });
    }
    render() {
        let { listListens, language_type, loadding } = this.state;
        if (listListens && listListens.length > 0){
            loadding = false;
        }
        return (
            <>
                {/* <Prev uri="list-lesson"/> */}
                <div className="list-lessons">
                    
                    <h4 className="list-title">{language_type === "EN" ? "List Lesson" : "Danh sách bài học chi tiết"}</h4>
                    {loadding && 
                    <button class="btn btn-primary" style={{backgroundColor: "rgb(206, 25, 79)"}} type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                    }
                    
                    {listListens && listListens.length > 0 && listListens.map((item, index) => {
                        return (<div key={index} className="lesson-item" onClick={() => this.redirectToListen(item.id)}>
                        <div className="lesson-content-left" >
                            <div className="lesson-title">{language_type === "EN" ? "Listen: " + (index + 1) : "Bài nghe số " + (index + 1)} {": " + item.title} </div>
                            {/* <div className="lesson-title">{language_type === "EN" ?   item.questions.length +  " sentences" :   item.questions.length +  " Câu"}</div> */}
                        </div>

                        <div className="lession-content-right">
                            <p>{language_type === "EN" ? "Progress" : "Tiến độ"}</p>
                            {/* {item.process >= 0 && item.process <= 40 && 
                                <div className="progress">
                                    <div className="progress-bar bg-danger" style={{width: item.process + "%"}}>
                                        {item.process.toFixed(0)} %
                                    </div>
                                </div>
                            }
                            {item.process > 40 && item.process < 80 && 
                                <div className="progress">
                                    <div className="progress-bar bg-warning" style={{width: item.process + "%"}}>
                                        {item.process.toFixed(0)} %
                                    </div>
                                </div>
                            }
                            {item.process >= 80  && 
                                <div className="progress">
                                    <div className="progress-bar bg-success" style={{width: item.process + "%"}}>
                                        {item.process.toFixed(0)} %
                                    </div>
                                </div>
                            } */}
                             
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
                            <div class="progress">
                                
                               
                                <div class="progress-bar bg-danger" style={{width: "10%"}}>
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
export default connect(mapStateToProps)(ListenWriteList);