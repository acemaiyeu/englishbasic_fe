import React from "react";
import '../sass/ManagerVocabulary.scss'
import { connect } from "react-redux";
import api_admin from "./api_admin";
import { API_URL, auth } from "../const/const.js";
import { toast } from "react-toastify";


class ManagerListenWrite extends React.Component {

    state =  {
        language_type: "EN",
        loadding: true,
        listListens: [],
        listVocabulary: [],
        status_form: {
            update_form: false
        },
        params: {
            current_page: 1,
            total_page: 1,
            subject_param: "",
            vocabulary_param: "",
            question_param: "",
            answer_param: "",
        },
        title_english: "",
        title_vietnamese: "",
        vocabulary_form: false,
        edit_vocabulary_form: true,
        transcription: "",
        means: "",
        listen_id_create: 0,
        url_audio: "",
        url_video: "",
        title: ""
    }
    handleChangeInput = (event, type) => {
        if(type === "url_video"){
            this.setState({
                url_video: event.target.value,
            })
        }
        if(type === "url_audio"){
            this.setState({
                url_audio: event.target.value,
            })
        }
        if(type === "title"){
            this.setState({
                title: event.target.value,
            })
        }
        if(type === "value"){
            this.setState({
                value: event.target.value,
            })
        }
    }
    componentDidMount(){
        this.getListListenWrittes();
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
        this.getListListenWrittes();
       
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
       
    }
    getListListenWrittes = async () => {
        let { params } = this.state;

        api_admin.get(`${API_URL}/admin/listens?title_english=` + 
            (params.subject_param ?? "") + `&vocabulary_name=` + 
            (params.vocabulary_param ?? "")+ `&question_name=` + 
            (params.question_param ?? "") + `&answer_param=` 
            + (params.answer_param ?? "") + `&page=1&limit=1000`).then((res) => {
            this.setState({
                loadding: false,
                listListens: res.data,
            })
            if(this.state.listVocabulary.length === 0){
                // this.getListVocabularyByLesson(res.data?.data[0]?.id);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Get list lessons failed!");
        });
    }
    createListenWrite = async () => {
        let { url_video, url_audio, title, value} = this.state;
        alert(title);
        api_admin.post(`${API_URL}/admin/listen`, {
            url_video: url_video,
            url_audio: url_audio,
            title,
            value: value,
        }).then((res) => {
            this.getListListenWrittes(this.state.params.current_page);
            this.setState({
                ...this.state,
                status_form: {
                    update_form: false
                },
                vocabulary_form: false,
                url_audio: "",
                url_video: "",
                value: ""
            });
            if (this.state.language_type === "EN"){
                toast.success("Create listen and write success!");
            }else{
                toast.success("Tạo bài luyện nghe thành công!");
            }
            
        }).catch((err) => {
            console.log(err);
            toast.error("Create listen and write failed!");
        });
    }
    updateListenWrite = async () => {
        let { url_video, url_audio,  title, value, listen_id_create} = this.state;
        api_admin.put(`${API_URL}/admin/listen/${listen_id_create}`, {
            url_video: url_video,
            url_audio: url_audio,
            title,
            value: value,
        }).then((res) => {
            this.getListListenWrittes(this.state.params.current_page);
            this.setState({
                ...this.state,
                status_form: {
                    update_form: false
                },
                vocabulary_form: false,
                url_audio: "",
                url_video: "",
                title: "",
                value: ""
            });
            if (this.state.language_type === "EN"){
                toast.success("Update listen and write success!");
            }else{
                toast.success("Cập nhật bài luyện nghe thành công!");
            }
            
        }).catch((err) => {
            console.log(err);
            toast.error("Create lesson failed!");
        });
    }
    deleteListenWrite = async (id) => {
        api_admin.delete(`${API_URL}/admin/listen/` + id).then((res) => {
            this.getListListenWrittes(this.state.params.current_page);
            if (this.state.language_type === "EN"){
                toast.success("Delete listen and write success!");
            }else{
                toast.success("Đã xóa bài luyện nghe thành công!");
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Delete lesson failed!");
        });
    }

    editListen = (listen) => {
        this.setState({
            ...this.state,
            url_video: listen.url_video,
            url_audio: listen.url_audio,
            value: listen.value,
            title: listen.title,
            listen_id_create: listen.id,
            status_form: {
                update_form: true
            },
            vocabulary_form: true
        })
    }
    render(){
        let { language_type, loadding, url_video, vocabulary_form, title, value, listVocabulary, listListens } = this.state;
        return (
            <div className="data-manager-container">
                <div className="data-manager-title" >{language_type === "EN" ? "MANAGER VACABULARY" : "Quản lý từ vựng"}</div>
                <div className="data-manager-header">
                    <div className="title">{ language_type === "EN" ? "Filter" : "Bộ lọc"}</div>
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
                                    >{ language_type === "EN" ? "Add New Listen" : "Thêm bài nghe mới"}</button>
                                </div>
                                <div className="function-item">
                                    <button onClick={() => this.PageVocabulary(this.state.params.current_page)}>{ language_type === "EN" ? "Refect Data" : "Tải lại dữ liệu"}</button>
                                </div>
                    </div>
                    <table className="table table-hover">   
                                <thead>
                                    <tr>
                                    <th scope="col-1">#</th>
                                    <th scope="col">{ language_type === "EN" ? "Title" : "Tiêu đề"} </th>
                                    <th scope="col">{ language_type === "EN" ? "URL VIDEO" : "Link video"} </th>
                                    <th scope="col">{ language_type === "EN" ? "URL AUDIO" : "Link âm thanh"} </th>
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
                                    {!loadding && listListens?.data?.length > 0 && listListens.data.map((listen, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{ listen.title}</td>
                                            <td>{ listen.url_video}</td>
                                            <td> {listen.url_audio}</td>
                                            <td><button onClick={() => this.editListen(listen)}>{ language_type === "EN" ? "Edit" : "Chỉnh sửa"}</button>
                                            <button onClick={() => this.deleteListenWrite(listen.id)}>{ language_type === "EN" ? "Delete" : "Xóa"}</button>
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
                        { language_type === "EN" ? "Add New Listen And Write" : "Thêm phần luyện nghe"}
                    </div>
                    <div className="data-manager-add-vocabulary-form-body">
                        <div className="form">
                            <label> {language_type === "EN" ? "Title" : "Tiêu đề"}: </label>
                            <input type="text" value={title} onChange={(e) => this.handleChangeInput(e, "title")}/>
                        </div>
                        <div className="form">
                            <label> {language_type === "EN" ? "URL VIDEO" : "Link video"}: </label>
                            <input type="text" value={url_video} onChange={(e) => this.handleChangeInput(e, "url_video")}/>
                        </div>
                        {/* <div className="form">
                            <label> {language_type === "EN" ? "URL AUDIO" : "Link âm thanh"}: </label>
                            <input type="text" value={url_audio} onChange={(e) => this.handleChangeInput(e, "url_audio")}/>
                        </div> */}
                        
                        <div className="form">
                            <label> {language_type === "EN" ? "Words" : "Đoạn văn nói"}: </label>
                            <textarea cols={25} rows={5} type="text" value={value} onChange={(e) => this.handleChangeInput(e, "value")}/>
                        </div>
                        {this.state.status_form.update_form ? 
                        <button className="btn-save" onClick={() => this.updateListenWrite()}>{language_type === "EN" ?  "SAVE" : "Lưu"}</button>
                        :
                        <button className="btn-save" onClick={() => this.createListenWrite()}>{language_type === "EN" ?  "Create" : "Tạo"}</button>
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
export default connect(mapStateToProps)(ManagerListenWrite);
