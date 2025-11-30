import React from "react";
import '../sass/ManagerVocabulary.scss'
import { connect } from "react-redux";
import api_admin from "./api_admin";
import { API_URL, auth } from "../const/const.js";
import { toast } from "react-toastify";


class ManagerSubject extends React.Component {

    state =  {
        language_type: "EN",
        loadding: true,
        listLessons: [],
        listQuestions: [],
        params: {
            current_page: 1,
            total_page: 1,
            subject_param: "",
            vocabulary_param: "",
            question_param: "",
            answer_param: "",
        },
        status_form: {
            update_subject_form: false
        },
        title_english: "",
        title_vietnamese: "",
        subject_form: false,
        edit_subject_form: true,
        subject_id_update: 0
    }
    handleChangeInput = (event, type) => {
        if(type === "title_english"){
            this.setState({
                title_english: event.target.value,
            })
        }
        if(type === "title_vietnamese"){
            this.setState({
                title_vietnamese: event.target.value,
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
    PageLesson = async (page) => {
        let { params } = this.state;
        params.current_page = page;
        this.setState({
            params: params,
            loadding: true,
        })
         await this.getListLessons();
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
        this.getListLessons();
    }
    editSubject = (subject) => {
        this.setState({
            ...this.state,
            subject_form: true,
            title_english: subject.title_english,
            title_vietnamese: subject.title_vietnamese,
            status_form: {
                ...this.state.status_form,
                update_subject_form: true
            },
            subject_id_update: subject.id
        })
    }
    getListLessons = async () => {
        let { params } = this.state;

        api_admin.get(`${API_URL}/admin/lessons?title_english=` + 
            (params.subject_param ?? "") + `&vocabulary_name=` + 
            (params.vocabulary_param ?? "")+ `&question_name=` + 
            (params.question_param ?? "") + `&answer_param=` 
            + (params.answer_param ?? "") + `&page=` + 
            (params.current_page ?? 1)).then((res) => {
            this.setState({
                loadding: false,
                listLessons: res.data,
            })
        }).catch((err) => {
            console.log(err);
            toast.error("Get list lessons failed!");
        });
    }
    createSubject = async () => {
        let { title_english, title_vietnamese } = this.state;
        api_admin.post(`${API_URL}/admin/lesson`, {
            title_english: title_english,
            title_vietnamese: title_vietnamese
        }).then((res) => {
            this.getListLessons(this.state.params.current_page);
            this.setState({
                subject_form: false,
                title_english: "",
                title_vietnamese: "",
            });
            if (this.state.language_type === "EN"){
                toast.success("Create lesson success!");
            }else{
                toast.success("Tạo chủ đề thành công!");
            }
            
        }).catch((err) => {
            console.log(err);
            toast.error("Create lesson failed!");
        });
    }
    updateSubject = () => {
        let { title_english, title_vietnamese } = this.state;
        api_admin.put(`${API_URL}/admin/lesson`, {
            title_english: title_english,
            title_vietnamese: title_vietnamese,
            lesson_id: this.state.subject_id_update
        }).then((res) => {
            this.getListLessons(this.state.params.current_page);
            this.setState({
                ...this.state,
                subject_form: false,
                title_english: "",
                title_vietnamese: "",
                status_form: {
                    ...this.state.status_form,
                    update_subject_form: false
                },
                subject_id_update: 0
            });
            if (this.state.language_type === "EN"){
                toast.success("Update lesson success!");
            }else{
                toast.success("Cập nhật chủ đề thành công!");
            }
            
        }).catch((err) => {
            console.log(err);
            toast.error("Create lesson failed!");
        });
        // subject_id_update
    }
    deleteLesson = async (id) => {
        api_admin.delete(`${API_URL}/admin/lesson/` + id).then((res) => {
            this.getListLessons(this.state.params.current_page);
            if (this.state.language_type === "EN"){
                toast.success("Delete lesson success!");
            }else{
                toast.success("Đã xóa chủ đề thành công!");
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Delete lesson failed!");
        });
    }

    getListQuestionsByLessonDetail = async (lesson_detail_id) => {
       await api_admin.get(`${API_URL}/admin/question-by-lesson-detail-id/` + lesson_detail_id)
        .then(response => {
            this.setState({
                listQuestions: response.data.data
            })
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            toast.error("Get list questions failed!")
        });
    }
    render(){
        let { language_type, loadding, listLessons, subject_form, title_vietnamese, title_english } = this.state;
        return (
            <div className="data-manager-container">
                <div className="data-manager-title" >{language_type === "EN" ? "MANAGER SUBJECT" : "Quản lý chủ đề"}</div>
                <div className="data-manager-header">
                    <div className="title">{ language_type === "EN" ? "Filter" : "Bộ lọc"}</div>
                    <div className="form">
                        <label> { language_type === "EN" ? "Subject English:" : "Chủ đề tiếng Anh:"} </label>
                        <input 
                        value={this.state.params.subject_param  ?? ""}
                        onChange={(e) => this.setState({
                            params: {
                                subject_param: e.target.value
                            }
                        })}
                        type="text" list="lessons"/>
                        <datalist id="lessons">
                            <datalist id="lessons"/>
                                {/* <option value="Chrome"/> */}
                                {listLessons?.data?.length > 0 && listLessons.data.map((lesson, index) => (
                                    <option value={language_type === "EN" ?  lesson.title_english : lesson.title_vietnamese} key={index}/>
                                ))}
                        </datalist>
                    </div>
                    
                        <i className="bi bi-search" onClick={() => this.PageLesson(this.state.params.current_page)}></i>
                </div>
                <div className="data-manager-body">
                    <div className="data-manager-title">{ language_type === "EN" ? "DATA TABLE" : "BẢNG DỮ LIỆU"}</div>
                    <div className="data-manager-functions">
                                <div className="function-item">
                                    <button onClick={() => this.setState({
                                        subject_form: true 
                                        })}
                                    >{ language_type === "EN" ? "Add New Subject" : "Thêm chủ đề mới"}</button>
                                </div>
                                <div className="function-item">
                                    <button onClick={() => this.PageLesson(1)}>{ language_type === "EN" ? "Refect Data" : "Tải lại dữ liệu"}</button>
                                </div>
                    </div>
                    <table className="table table-hover">   
                        <thead>
                            <tr>
                            <th scope="col-1">#</th>
                            <th scope="col-9">{ language_type === "EN" ? "Subject" : "Chủ đề"} </th>
                            <th scope="col-1">{ language_type === "EN" ? "Vocabulary Total" : "Tổng số từ vựng"}</th>
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
                            {!loadding && listLessons?.data?.length > 0 && listLessons.data.map((lesson, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{ language_type === "EN" ? lesson.title_english : lesson.title_vietnamese}</td>
                                    <td>{lesson.details?.length}</td>
                                    <td><button onClick={() => this.editSubject(lesson)}>{ language_type === "EN" ? "Edit" : "Chỉnh sửa"}</button>
                                    <button onClick={() => this.deleteLesson(lesson.id)}>{ language_type === "EN" ? "Delete" : "Xóa"}</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                        
                    </table>
                </div>
                <div className={`data-manager-footer ${language_type !== "EN" ? "width-custom-vn" : ""}`} >
                    <button 
                    onClick={() => this.PageLesson(1)}
                    disabled={listLessons?.meta?.pagination?.current_page === 1}>{ language_type === "EN" ? "First" : "Trang đầu"}</button>
                    <button 
                    onClick={() => this.PageLesson(listLessons?.meta?.pagination?.current_page - 1)}
                    disabled={listLessons?.meta?.pagination?.current_page <= 1}>{ language_type === "EN" ? "Prev" : "Trang trước"}</button>
                    <button >{JSON.stringify(listLessons?.meta?.pagination?.current_page)}</button>
                    <button
                    disabled={listLessons?.meta?.pagination?.current_page === listLessons?.meta?.pagination?.total_pages}
                    onClick={() => this.PageLesson(listLessons?.meta?.pagination?.current_page + 1)}
                    >{ language_type === "EN" ? "Next" : "Trang tiếp"}</button>
                    <button 
                    disabled={listLessons?.meta?.pagination?.total_pages === listLessons?.meta?.pagination?.current_page}
                    onClick={() => this.PageLesson(listLessons?.meta?.pagination?.total_pages)}>{ language_type === "EN" ? "Last" : "Trang cuối"}</button>
                </div>
                <div className="data-manager-auth">
                    <button>#{auth}</button>
                </div>
                {subject_form && 
                <div className="data-manager-add-vocabulary-form">
                    <div className="x-icon" onClick={() => this.setState({
                       subject_form: false,
                       status_form: {
                        ...this.state.status_form,
                        update_subject_form: false
                       },
                       title_english: "",
                       title_vietnamese: ""
                    })}>X</div>
                    <div className="data-manager-add-vocabulary-form-title">
                        {this.state.status_form.update_subject_form ? (language_type === "EN" ? "Update Subject" : "Cập nhật chủ đề") : (language_type === "EN" ? "Add New Subject" : "Thêm chủ đề mới")}
                        {/* { language_type === "EN" ? "Add New Subject" : "Thêm chủ đề mới"} */}
                    </div>
                    <div className="data-manager-add-vocabulary-form-body">
                        <div className="form">
                            <label> {language_type === "EN" ? "Title English" : "Tiêu đề tiếng Anh"}: </label>
                            <input type="text" value={title_english} onChange={(e) => this.handleChangeInput(e, "title_english")}/>
                        </div>
                        <div className="form">
                            <label> {language_type === "EN" ? "Title Vietnamese" : "Tiêu đề tiếng Việt"}: </label>
                            <input type="text" value={title_vietnamese} onChange={(e) => this.handleChangeInput(e, "title_vietnamese")}/>
                        </div>
                        {this.state.status_form.update_subject_form ? 
                            <button className="btn-save" onClick={() => this.updateSubject()}>{language_type === "EN" ?  "UPDATE" : "Cập nhật"}</button> : 
                            <button className="btn-save" onClick={() => this.createSubject()}>{language_type === "EN" ?  "CREATE" : "Tạo mới"}</button>}
                        {/* <button className="btn-save" onClick={() => this.createSubject()}>{language_type === "EN" ?  "SAVE" : "Lưu"}</button> */}
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
export default connect(mapStateToProps)(ManagerSubject);
