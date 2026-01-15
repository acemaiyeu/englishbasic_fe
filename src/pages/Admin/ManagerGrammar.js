import React from "react";
import "../sass/ManagerVocabulary.scss";
import { connect } from "react-redux";
import api_admin from "./api_admin.js";
import { API_URL, auth } from "../const/const.js";
import { toast } from "react-toastify";
import ExcelUploader from "../../functions/ExcelUploader.js";

import '../sass/ManagerGrammar.scss'
import WordEditor from "../Client/ComponentSupport/WordEditor.js";
import DisplayContent from "../Client/ComponentSupport/DisplayContent.js";
import axios from "axios";

class ManagerGrammar extends React.Component {
  state = {
    language_type: "EN",
    loadding: true,
    listLessons: [],
    listVocabulary: [],
    listgrammars: [],
    listAnswers: [],
    vocabulary_id: 0,
    status_form: {
      update_grammar_form: false,
      update_answer_form: false,
    },
    grammar_item: {
      title_vietnamese: "",
      title_english: "",
      details: [{
        data: ""
      },{
        data: ""
      }]
    },
    params: {
      current_page: 1,
      total_page: 1,
      subject_param: "",
      vocabulary_param: "",
      grammar_param: "",
      answer_param: "",
      id_grammar_param: 0,
      current_page_answer: 1,
      id_answer_param: 0,
      lession_detail_id_create: 0,
      id_grammar: 0,
      title_grammar: "",
      type_grammar: "CHOOSE",
      text_answer: "",
      grammar_id_create: 0,
      id_answer: 0,
      title_answer: "",
    },
    title_vietnamese: "",
    grammar_form: false,
    answer_form: false,
    edit_vocabulary_form: true,
    transcription: "",
    means: "",
    lesson_id_create: 0,
    tab_grammar_list: true,
    tab_answer_list: false,
    grammar_detail_data: ""
  };
  toggleTab = (tabName) => {
    this.setState((prevState) => ({
      [tabName]: !prevState[tabName],
    }));
  };
  getDataWord = (data, index_detail) => {
    // alert(this.state.grammar_detail_data !== data)
    if(this.state.grammar_detail_data !== data){
      this.state.grammar_item.details[index_detail].data = data;
    }
  }
  handleChangeInput = (event, type) => {
    if (type === "title_english") {
      this.setState({
        title_english: event.target.value,
      });
    }
    if (type === "transcription") {
      this.setState({
        transcription: event.target.value,
      });
    }
    if (type === "means") {
      this.setState({
        means: event.target.value,
      });
    }
    if (type === "type_grammar") {
      this.setState({
        params: {
          ...this.state.params,
          type_grammar: event.target.value,
        },
      });
    }
    if (type === "title_answer") {
      this.setState({
        params: {
          ...this.state.params,
          title_answer: event.target.value,
        },
      });
    }
    if (type === "title_grammar") {
      this.setState({
        params: {
          ...this.state.params,
          title_grammar: event.target.value,
        },
      });
    }
    
  };
  handleChangeSubject = (event) => {
    this.setState({
        ...this.state.params,
        params: {
            subject_param: event.target.value
        }
    })
    this.getListVocabularyByLesson(event.target.value)
  }
  componentDidMount() {
    this.getListGrammar();
    this.setState({
      language_type: this.props.language_type,
    });
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
    });
    await this.getListGrammar();
  };
  refectData = () => {
    this.setState({
      loadding: true,
      params: {
        ...this.state.params,
        current_page: 1,
        total_page: 1,
        subject_param: "",
        // vocabulary_param: "",
        grammar_param: "",
        answer_param: "",
        current_page_answer: 1,
      },
    });
    this.getListVocabularyByLesson(this.state.listLessons.data[0].id);
  };
  handleCreateGrammar = (accept_create) => {
    let { grammar_item , language_type} = this.state;
      if(accept_create){
        api_admin.post(`${API_URL}/admin/grammar`, {
          id: grammar_item.id ?? undefined,
          title_english: grammar_item.title_english,
          title_vietnamese: grammar_item.title_vietnamese,
          details: grammar_item.details
        }).then((res) => {
            if(language_type === "EN"){
              toast.success("Create Grammar Successfully!")
            }else{
              toast.success("Tạo ngữ pháp thành công!")
            }
        }).catch((e) => {
          if(language_type === "EN"){
              toast.warn("Create Grammar Fail!")
            }else{
              toast.warn("Tạo ngữ pháp thất bại!")
            }
            console.log(e)
        })
      }
  }
  handleAddDetailItem = () => {
    let grammar_item_details = this.state.grammar_item.details;
    let ob = {
      id: undefined,
      data: ""
    }
    grammar_item_details.push(ob);
    this.setState({
      grammar_item: {
        details: grammar_item_details
      }
    })
  }

  creategrammar = async () => {
    let { params } = this.state;
    api_admin
      .post(`${API_URL}/admin/grammar`, {
        title_english: params.title_grammar,
        type: params.type_grammar ?? "WRITE",
        lesson_detail_id: this.state.params.lession_detail_id_create,
      })
      .then((res) => {
        this.getListGrammar(this.state.params.vocabulary_param);
        this.setState({
          ...this.state,
          params: {
            ...this.state.params,
            title_grammar: "",
            type_grammar: "CHOOSE",
            grammar_id_create: res.data.data.id
          },
          grammar_form: false
        });
        if (this.state.language_type === "EN") {
          toast.success("Create grammar success!");
        } else {
          toast.success("Tạo ngữ pháp thành công!");
        }
        // this.toAnswerList(res.data.data.id)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create grammar failed!");
      });
  };
  updategrammar = async () => {
    let { params } = this.state;
    api_admin
      .put(`${API_URL}/admin/grammar/` + params.id_grammar, {
        title_english: params.title_grammar,
        type: params.type_grammar,
        lesson_detail_id: params.lession_detail_id_create,
        id: params.id_grammar,
      })
      .then((res) => {
        this.getListGrammar(this.state.params.vocabulary_param);
        this.setState({
          ...this.state,
          params: {
            ...params,
            title_grammar: "",
            type_grammar: "CHOOSE",
            id_grammar: 0,
          },
          grammar_form: false,
          status_form: {
            ...this.state.status_form,
            update_grammar_form: false
          }
        });
        if (this.state.language_type === "EN") {
          toast.success("Update grammar success!");
        } else {
          toast.success("Cập nhật ngữ pháp thành công!");
        }
        console.log(res.data)
        this.getListAnswerBygrammar(res.data.data.id)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Update grammar failed!");
      });
  };
  deletegrammar = (grammar) => {
      api_admin
        .delete(`${API_URL}/admin/grammar/` + grammar.id)
        .then((res) => {
          if (this.state.language_type === "EN") {
            toast.success("Delete grammar success!");
          } else {
            toast.success("Đã xóa ngữ pháp thành công!");
          }
          this.getListGrammar(this.state.params.vocabulary_param);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Delete grammar failed!");
        });
  };
  editgrammar = (grammar) => {
    console.log(grammar)
    this.setState({
      status_form: {
        update_grammar_form: true,
      },
      grammar_form: true,
      grammar_item: {
        id: grammar.id,
        title_english: grammar.title_english,
        title_vietnamese: grammar.title_vietnamese,
        details: grammar.details
      }
    });
    
  };
 
  showForm = (type) => {
    if (type) {
      this.setState({
        answer_form: true,
      });
    } else {
      this.setState({
        grammar_form: true,
      });
      if(this.state.params.type_grammar === undefined){
        this.setState({
            ...this.state.params,
            type_grammar: "CHOOSE"
        })
      }
    }
  };
  getListGrammar = async () => {
    await api_admin
      .get(
        `${API_URL}/admin/grammars?` +
          `&page=` +
          this.state.params.current_page
      )
      .then((response) => {
        if (response.data.data.length > 0) {
        //   params.lession_detail_id_create =
        //     response.data?.data[0]?.lessonDetail?.lesson_detail_id ?? 0;
          this.setState({
            listgrammars: response.data,
            loadding: false,
          });
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Get list grammars failed!");
      });
  };
  render() {
    let {
      language_type,
      tab_answer_list,
      tab_grammar_list,
      loadding,
      listLessons,
    //   vocabulary_form,
    //   transcription,
    //   vocabulary_param,
    //   means,
    //   title_english,
      listVocabulary,
      listgrammars,
      listAnswers,
      grammar_form,
      answer_form,
      grammar_detail_data,
      grammar_item
    } = this.state;
    console.log(grammar_item)
    return (
      <div className="data-manager-container">
        <div className="data-manager-title">
          {language_type === "EN" ? "MANAGER grammar" : "Quản lý ngữ pháp"}
        </div>
        <div className="data-manager-body">
          <div className="data-manager-title">
            {language_type === "EN" ? "DATA TABLE" : "BẢNG DỮ LIỆU"}
          </div>
          
          <div className="data-manager-functions">
            
            <div className="function-item">
              <button onClick={() => this.showForm(tab_answer_list)}>
                {language_type === "EN"
                  ? tab_answer_list
                    ? "Add New Answer"
                    : "Add New grammar"
                  : this.state.status_form.update_grammar_form
                  ? "Cập nhật ngữ pháp"
                  : "Thêm ngữ pháp mới"}
              </button>
            </div>
            <div className="function-item">
              <button
                onClick={() =>
                  this.PageVocabulary(this.state.params.current_page)
                }
              >
                {language_type === "EN" ? "Refect Data" : "Tải lại dữ liệu"}
              </button>
            </div>
            <div className="function-item">
              <ExcelUploader lesson_detail_id={this.state.params.lession_detail_id_create} url_api={API_URL + "/admin/import-grammar-answers-v2"} title="Import grammar"/>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            {/* Thanh tab */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => this.toggleTab("tab_grammar_list")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: tab_grammar_list ? "#2563eb" : "#e5e7eb",
                  color: tab_grammar_list ? "white" : "black",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {language_type === "EN" ? "Grammar List" : "Danh sách ngữ pháp"}
              </button>
            </div>

            {/* Nội dung */}
            <div style={{ marginTop: "20px" }}>
              {tab_grammar_list && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col-1">#</th>
                      <th scope="col">
                        {language_type === "EN" ? "Title" : "Tiêu đề"}{" "}
                      </th>
                      <th scope="col-1">
                        {language_type === "EN" ? "Action" : "Hành động"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadding && (
                      <tr>
                        <td></td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Loading...</span>
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            {/* <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
                            {language_type === "EN"
                              ? "Loadding Data..."
                              : "Đang tải dữ liệu..."}
                          </button>
                        </td>
                      </tr>
                    )}
                    {
                      listgrammars?.data?.length > 0 &&
                      listgrammars.data.map((grammar, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {language_type === "EN"
                              ? grammar.title_english
                              : grammar.title_vietnamese}
                          </td>
                          <td>
                            <button onClick={() => this.editgrammar(grammar)}>
                              {language_type === "EN" ? "Edit" : "Chỉnh sửa"}
                            </button>
                            <button
                              onClick={() => this.deletegrammar(grammar)}
                            >
                              {language_type === "EN" ? "Delete" : "Xóa"}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {loadding && listgrammars?.data?.length > 0 && (
                      <tr>
                        <td></td>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Loading...</span>
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            {/* <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
                            {language_type === "EN"
                              ? "Loadding Data..."
                              : "Đang tải dữ liệu..."}
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {tab_answer_list && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col-1">#</th>
                      <th scope="col">
                        {language_type === "EN" ? "Title" : "Tiêu đề"}{" "}
                      </th>
                      <th scope="col-1">
                        {language_type === "EN" ? "Action" : "Hành động"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadding && (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Loading...</span>
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            {/* <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
                            {language_type === "EN"
                              ? "Loadding Data..."
                              : "Đang tải dữ liệu..."}
                          </button>
                        </td>
                      </tr>
                    )}
                    {listAnswers?.data?.length > 0 &&
                      listAnswers.data.map((answer, index) => (
                        <tr key={index} className={`${answer.grammar.answer === answer.id ? 'answer-correct' : ''}`}>
                          <th scope="row">{index + 1} - {answer.grammar.answer  + "  - " + answer.id}</th>
                          <td>
                            {" "}
                            {answer.grammar.type === "CHOOSE"
                              ? answer.title
                              : answer.text}{" "}
                          </td>
                          <td>
                            <button
                              onClick={() => this.editAnswer(answer)}
                            >
                              {language_type === "EN" ? "Edit" : "Chỉnh sửa"}
                            </button>
                            <button
                              onClick={() => this.deleteAnswer(answer)}
                            >
                              {language_type === "EN" ? "Delete" : "Xóa"}
                            </button>
                            {answer.grammar.type === "CHOOSE" 
                            &&
                            <button
                              onClick={() => this.setCorrectSentence(answer)}
                            >
                              {language_type === "EN" ? "Correct sentence" : "Câu đúng"}
                            </button>
                            }
                            
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
              {!tab_grammar_list && !tab_answer_list && (
                <p>Chưa có tab nào bật</p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`data-manager-footer ${
            language_type !== "EN" ? "width-custom-vn" : ""
          }`}
        >
          <button
            onClick={() => this.PageVocabulary(1)}
            disabled={listgrammars?.meta?.pagination?.current_page === 1}
          >
            {language_type === "EN" ? "First" : "Trang đầu"}
          </button>
          <button
            onClick={() =>
              this.PageVocabulary(
                listgrammars?.meta?.pagination?.current_page - 1
              )
            }
            disabled={listgrammars?.meta?.pagination?.current_page <= 1}
          >
            {language_type === "EN" ? "Prev" : "Trang trước"}
          </button>
          <button>
            {JSON.stringify(listgrammars?.meta?.pagination?.current_page)}
          </button>
          <button
            disabled={
              listgrammars?.meta?.pagination?.current_page ===
              listgrammars?.meta?.pagination?.total_pages
            }
            onClick={() =>
              this.PageVocabulary(
                listgrammars?.meta?.pagination?.current_page + 1
              )
            }
          >
            {language_type === "EN" ? "Next" : "Trang tiếp"}
          </button>
          <button
            disabled={
              listgrammars?.meta?.pagination?.total_pages ===
              listgrammars?.meta?.pagination?.current_page
            }
            onClick={() =>
              this.PageVocabulary(listgrammars?.meta?.pagination?.total_pages)
            }
          >
            {language_type === "EN" ? "Last" : "Trang cuối"}
          </button>
        </div>
        <div className="data-manager-auth">
          <button>#{auth}</button>
        </div>
        {/* {grammar_form && ( */}
        {grammar_form && grammar_item && 
          <div className="grammar-create-box">
            <div className="grammar-close" onClick={() => this.setState({
              grammar_form: false,
              grammar_item: {
                id: undefined,
                title_english: "",
                title_vietnamese: "",
                details: [{
                  data: ""
                }]
              },
              status_form: {
                update_grammar_form: false
              }
            })}>Close</div>
            <div className="grammar-create-title">Create Form</div>
            <div className="form-container-default">
                <div className="form-control-default">
                    <label className="form-control-label">
                     {language_type === "EN" ? "Title English" : "Tiêu đề tiếng Anh"}: 
                    </label>
                    <input type="text" className="form-control-input" defaultValue={this.state.grammar_item.title_english} onChange={(e) => this.setState({
                      grammar_item: {
                        ...this.state.grammar_item,
                        title_english: e.target.value
                      }
                    })}/>
                </div>
                 <div className="form-control-default">
                    <label className="form-control-label">
                      {language_type === "EN" ? "Title Vietnamese" : "Tiêu đề tiếng Việt"}: 
                    </label>
                    <input type="text" className="form-control-input" defaultValue={this.state.grammar_item.title_vietnamese} onChange={(e) => this.setState({
                      grammar_item: {
                        ...this.state.grammar_item,
                        title_vietnamese: e.target.value
                      }
                    })}/>
                </div>
                {grammar_item.details && grammar_item.details.length > 0 && grammar_item.details.map((detail, detail_index) => {
                  return (
                     <div className="form-control-default flex-column">
                    {/* <label className="form-control-label">
                      Data {detail_index}: 
                    </label> */}
                    <br></br>
                    <WordEditor getDataWord={this.getDataWord} content={detail.data} title={`Data page ${detail_index + 1}`} index_details={detail_index}/>
                    {detail_index + 1 === grammar_item.details.length && <div className="grammar_detail_add" onClick={() => this.handleAddDetailItem()}>{language_type === "EN" ? "Add data page" : "Thêm trang dữ liệu"} </div>}
                </div>
                  )
                })}
            </div>
            <div className="grammar-create-btn">
                <div className="btn-refect" onClick={() => this.handleRefectForm()}>{language_type === "EN" ? "Refect" : "Làm mới"}</div>
                <div className="btn-create" onClick={() => this.handleCreateGrammar(true)}>{language_type === "EN" ? "Create" : "Tạo mới"}</div>
                <div className="btn-update disabled" onClick={() => this.handleUpdateGrammar(false)}>{language_type === "EN" ? "Update" : "Cập nhật"}</div>
            </div>
          </div>
        }
        {/* )} */}
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ManagerGrammar);
