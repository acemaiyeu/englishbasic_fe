import React from "react";
import '../sass/ManagerVocabulary.scss'
import { connect } from "react-redux";
import api_admin from "./api_admin";
import { API_URL, auth } from "../const/const.js";
import { toast } from "react-toastify";


class ManagerVocabulary extends React.Component {

    state =  {
        language_type: "EN",
        loadding: true,
        listLessons: [],
        listVocabulary: [],
        params: {
            current_page: 1,
            total_page: 1,
            subject_param: "",
            vocabulary_param: "",
            question_param: "",
            answer_param: "",
        },
        status_form: {
            update_vocabulary_form: false
        },
        title_english: "",
        title_vietnamese: "",
        vocabulary_form: false,
        edit_vocabulary_form: true,
        transcription: "",
        means: "",
        lesson_id_create: 0
    }
    handleChangeInput = (event, type) => {
        if(type === "title_english"){
            this.setState({
                title_english: event.target.value,
            })
        }
        if(type === "transcription"){
            this.setState({
                transcription: event.target.value,
            })
        }
        if(type === "means"){
            this.setState({
                means: event.target.value,
            })
        }
    }
    componentDidMount(){
        this.getListLessons();
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
    PageVocabulary = async (page) => {
        // alert("page" + page);
        let { params } = this.state;
        params.current_page = page;
        this.setState({
            params,
            loadding: true,
        })
         await this.getListVocabularyByLesson(this.state.lesson_id_create);
    }
    refectData = () => {
        this.setState({
            loadding: true,
            params: {
                current_page: 1,
                total_page: 1,
                subject_param: "",
                vocabulary_param: "",
                question_param: "",
                answer_param: "",
            }
        })
        this.getListVocabularyByLesson(this.state.listLessons.data[0].id);
    }
    getListLessons = async () => {
        let { params } = this.state;

        api_admin.get(`${API_URL}/admin/lessons?title_english=` + 
            (params.subject_param ?? "") + `&vocabulary_name=` + 
            (params.vocabulary_param ?? "")+ `&question_name=` + 
            (params.question_param ?? "") + `&answer_param=` 
            + (params.answer_param ?? "") + `&page=1&limit=1000`).then((res) => {
            this.setState({
                loadding: false,
                listLessons: res.data,
            })
            if(this.state.listVocabulary.length === 0){
                this.getListVocabularyByLesson(res.data?.data[0]?.id);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Get list lessons failed!");
        });
    }
    createVocabulary = async () => {
        let { title_english, lesson_id_create,  transcription, means} = this.state;
        api_admin.post(`${API_URL}/admin/lesson-detail`, {
            title_english: title_english,
            lesson_id: lesson_id_create,
            transcription: transcription,
            means: means
        }).then((res) => {
            console.log(res);
            this.getListLessons(this.state.params.current_page);
            this.setState({
                vocabulary_form: false,
                title_english: "",
                title_vietnamese: "",
            });
            if (this.state.language_type === "EN"){
                toast.success("Create vocabulary success!");
            }else{
                toast.success("Tạo từ vựng thành công!");
            }
            
        }).catch((err) => {
            console.log(err);
            toast.error("Create lesson failed!");
        });
    }
    deleteLesson = async (id) => {
        api_admin.delete(`${API_URL}/admin/lesson-detail/` + id).then((res) => {
            this.getListLessons(this.state.params.current_page);
            if (this.state.language_type === "EN"){
                toast.success("Delete vocabulary success!");
            }else{
                toast.success("Đã xóa từ vựng thành công!");
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Delete lesson failed!");
        });
    }

    getListVocabularyByLesson = async (lesson_id) => {

       await api_admin.get(`${API_URL}/admin/lesson-detail-by-lesson-id/` + lesson_id + `?page=` + this.state.params.current_page)
        .then(response => {
            this.setState({
                listVocabulary: response.data,
                loadding: false,
                lesson_id_create: lesson_id
            })
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            toast.error("Get list questions failed!")
        });
    }
    editVocabulary = (vocabulary) => {
    this.setState({
      status_form: {
        update_vocabulary_form: true,
      },
      vocabulary_form: true,
      transcription: vocabulary.transcription,
      title_english: vocabulary.title_english,
      means: vocabulary.means
    });
  };
    render(){
        let { language_type, loadding, listLessons, vocabulary_form, transcription, means, title_english, listVocabulary } = this.state;
        return (
            <div className="data-manager-container">
                <div className="data-manager-title" >{language_type === "EN" ? "MANAGER VACABULARY" : "Quản lý từ vựng"}</div>
                <div className="data-manager-header">
                    <div className="title">{ language_type === "EN" ? "Filter" : "Bộ lọc"}</div>
                    <div className="form">
                        <label> { language_type === "EN" ? "Subject:" : "Chủ đề:"} </label>
                        <select onChange={(e) => this.getListVocabularyByLesson(e.target.value)}>
                            {listLessons.length <= 0 && 
                                <option value="">{ language_type === "EN" ? "No subject available" : "Không có chủ đề nào"}</option>
                            }
                            {listLessons?.data?.length > 0 && listLessons.data.map((lesson, index) => (
                                    <option  value={lesson.id} key={index}>{language_type === "EN" ?  lesson.title_english : lesson.title_vietnamese}</option>
                                ))}
                        </select>
                    </div>
                    <div className="form">
                        <label>{ language_type === "EN" ? "Vocabulary" : "Từ vựng"}: </label>
                        <input 
                        value={this.state.params.vocabulary_param ?? ""}
                        onChange={(e) => this.setState({
                            params: {
                                vocabulary_param: e.target.value
                            }
                        })}
                        type="text" list="browsers"/>
                        <datalist id="browsers">
                            <datalist id="browsers"/>
                            <option value="Chrome"/>
                            <option value="Firefox"/>
                            <option value="Edge"/>
                            <option value="Safari"/>
                            <option value="Opera"/>
                        </datalist>
                    </div>
                    <div className="form">
                        <label>{ language_type === "EN" ? "Question English" : "Câu hỏi tiếng Anh"} </label>
                        <input type="text" 
                        value={this.state.params.question_param  ?? ""}
                            onChange={(e) => this.setState({
                            params: {
                                question_param: e.target.value 
                            }
                        })}/>
                    </div>
                    <div className="form">
                        <label>{ language_type === "EN" ? "Question Vietnamese" : "Câu hỏi tiếng Việt"} </label>
                        <input type="text" 
                        value={this.state.params.question_param  ?? ""}
                            onChange={(e) => this.setState({
                            params: {
                                question_param: e.target.value 
                            }
                        })}/>
                    </div>
                     <div className="form">
                        <label>{ language_type === "EN" ? "Answer" : "Đáp án"}: </label>
                        <input 
                        value={this.state.params.answer_param  ?? ""}
                        onChange={(e) => this.setState({
                            params: {
                                answer_param: e.target.value
                            }
                        })} type="text" />
                    </div>
                        <i className="bi bi-search" onClick={() => this.PageVocabulary(this.state.params.current_page)}></i>
                </div>
                <div className="data-manager-body">
                    <div className="data-manager-title">{ language_type === "EN" ? "DATA TABLE" : "BẢNG DỮ LIỆU"}</div>
                    <div className="data-manager-functions">
                                <div className="function-item">
                                    <button onClick={() => this.setState({
                                        vocabulary_form: true 
                                        })}
                                    >{ language_type === "EN" ? "Add New Vocabulary" : "Thêm từ vựng mới"}</button>
                                </div>
                                <div className="function-item">
                                    <button onClick={() => this.PageVocabulary(this.state.params.current_page)}>{ language_type === "EN" ? "Refect Data" : "Tải lại dữ liệu"}</button>
                                </div>
                    </div>
                    <table className="table table-hover">   
                                <thead>
                                    <tr>
                                    <th scope="col-1">#</th>
                                    <th scope="col">{ language_type === "EN" ? "Vocabulary" : "Từ vựng"} </th>
                                    <th scope="col">{ language_type === "EN" ? "Transcription" : "Phiên âm"} </th>
                                    <th scope="col">{ language_type === "EN" ? "Means" : "Nghĩa"} </th>
                                    <th scope="col-1">{ language_type === "EN" ? "Action" : "Hành động"}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadding &&
                                        <tr>
                                    <td colSpan="4" style={{textAlign: 'center'}}>
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                            <span className="sr-only">Loading...</span>
                                            </button>
                                            <button className="btn btn-primary" type="button" disabled>
                                            {/* <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
                                            { language_type === "EN" ? "Loadding Data..." : "Đang tải dữ liệu..."}
                                        </button>
                                    </td>
                                    </tr>
                                    }
                                    {!loadding && listVocabulary?.data?.length > 0 && listVocabulary.data.map((vocabulary, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{ language_type === "EN" ? vocabulary.title_english : vocabulary.title_vietnamese}</td>
                                            <td> {vocabulary.transcription}</td>
                                            <td> {vocabulary.means}</td>
                                            <td><button onClick={() => this.editVocabulary(vocabulary)}>{ language_type === "EN" ? "Edit" : "Chỉnh sửa"}</button>
                                            <button onClick={() => this.deleteLesson(vocabulary.id)}>{ language_type === "EN" ? "Delete" : "Xóa"}</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                                
                            </table>
                </div>
                <div className={`data-manager-footer ${language_type !== "EN" ? "width-custom-vn" : ""}`} >
                    <button 
                    onClick={() => this.PageVocabulary(1)}
                    disabled={listVocabulary?.meta?.pagination?.current_page === 1}>{ language_type === "EN" ? "First" : "Trang đầu"}</button>
                    <button 
                    onClick={() => this.PageVocabulary(listVocabulary?.meta?.pagination?.current_page - 1)}
                    disabled={listVocabulary?.meta?.pagination?.current_page <= 1}>{ language_type === "EN" ? "Prev" : "Trang trước"}</button>
                    <button >{JSON.stringify(listVocabulary?.meta?.pagination?.current_page)}</button>
                    <button
                    disabled={listVocabulary?.meta?.pagination?.current_page === listVocabulary?.meta?.pagination?.total_pages}
                    onClick={() => this.PageVocabulary(listVocabulary?.meta?.pagination?.current_page + 1)}
                    >{ language_type === "EN" ? "Next" : "Trang tiếp"}</button>
                    <button 
                    disabled={listVocabulary?.meta?.pagination?.total_pages === listVocabulary?.meta?.pagination?.current_page}
                    onClick={() => this.PageVocabulary(listVocabulary?.meta?.pagination?.total_pages)}>{ language_type === "EN" ? "Last" : "Trang cuối"}</button>
                </div>
                <div className="data-manager-auth">
                    <button>#{auth}</button>
                </div>
                {vocabulary_form && 
                <div className="data-manager-add-vocabulary-form">
                    <div className="x-icon" onClick={() => this.setState({
                       vocabulary_form: false 
                    })}>X</div>
                    <div className="data-manager-add-vocabulary-form-title">
                        {this.state.status_form.update_vocabulary_form ? (language_type === "EN" ? "Update Vocabulary" : "Cập nhật vựng mới") : (language_type === "EN" ? "Add New Vocabulary" : "Thêm từ vựng mới")}
                    </div>
                    <div className="data-manager-add-vocabulary-form-body">
                        <div className="form">
                            <label> {language_type === "EN" ? "Vocabulary" : "Tiêu đề tiếng Anh"}: </label>
                            <input type="text" value={title_english} onChange={(e) => this.handleChangeInput(e, "title_english")}/>
                        </div>
                        <div className="form">
                            <label> {language_type === "EN" ? "Transcription" : "Phiên âm"}: </label>
                            <input type="text" value={transcription} onChange={(e) => this.handleChangeInput(e, "transcription")}/>
                        </div>
                        <div className="form">
                            <label> {language_type === "EN" ? "Means" : "Nghĩa"}: </label>
                            <input type="text" value={means} onChange={(e) => this.handleChangeInput(e, "means")}/>
                        </div>
                        {this.state.status_form.update_vocabulary_form ? 
                        <button className="btn-save" onClick={() => this.createVocabulary()}>{language_type === "EN" ?  "SAVE" : "Lưu"}</button>
                        :
                        <button className="btn-save" onClick={() => this.createVocabulary()}>{language_type === "EN" ?  "CREATE" : "Tạo"}</button>
                        }
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
export default connect(mapStateToProps)(ManagerVocabulary);
