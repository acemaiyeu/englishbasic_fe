import React from "react";
import "../sass/ManagerVocabulary.scss";
import { connect } from "react-redux";
import api_admin from "./api_admin.js";
import { API_URL, auth } from "../const/const.js";
import { toast } from "react-toastify";
import ExcelUploader from "../../functions/ExcelUploader.js";

import '../sass/ManagerGrammar.scss'
import WordEditor from "../Client/ComponentSupport/WordEditor.js";

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
  getDataWord = (data) => {
    // alert(this.state.grammar_detail_data !== data)
    if(this.state.grammar_detail_data !== data){
       this.setState({
      grammar_detail_data: data
    })
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
    this.getListLessons();
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

    if(this.state.params.lession_detail_id_create === 0 || this.state.params.lession_detail_id_create === undefined){
        this.state.params.lession_detail_id_create = this.state.listVocabulary.data[0].id
    }
    await this.getListgrammarByLesson(this.state.params.vocabulary_param);
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
  getListLessons = async () => {
    let { params } = this.state;

    api_admin
      .get(
        `${API_URL}/admin/lessons?title_english=` +
          (params.subject_param ?? "") +
          `&vocabulary_name=` +
          (params.vocabulary_param ?? "") +
          `&grammar_name=` +
          (params.grammar_param ?? "") +
          `&answer_param=` +
          (params.answer_param ?? "") +
          `&page=1&limit=1000`
      )
      .then((res) => {
        this.setState({
          loadding: false,
          listLessons: res.data,
        });
        if (this.state.listVocabulary.length === 0) {
          this.getListVocabularyByLesson(res.data?.data[0]?.id);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Get list lessons failed!");
      });
  };
  createVocabulary = async () => {
    let { title_english, lesson_id_create, transcription, means } = this.state;
    api_admin
      .post(`${API_URL}/admin/lesson-detail`, {
        title_english: title_english,
        lesson_id: lesson_id_create,
        transcription: transcription,
        means: means,
      })
      .then((res) => {
        console.log(res);
        this.getListLessons(this.state.params.current_page);
        this.setState({
          vocabulary_form: false,
          title_english: "",
          title_vietnamese: "",
        });
        if (this.state.language_type === "EN") {
          toast.success("Create vocabulary success!");
        } else {
          toast.success("Tạo từ vựng thành công!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create lesson failed!");
      });
  };
  deleteLesson = async (id) => {
    api_admin
      .delete(`${API_URL}/admin/lesson-detail/` + id)
      .then((res) => {
        console.log(res);
        this.getListLessons(this.state.params.current_page);
        if (this.state.language_type === "EN") {
          toast.success("Delete vocabulary success!");
        } else {
          toast.success("Đã xóa từ vựng thành công!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Delete lesson failed!");
      });
  };

  getListVocabularyByLesson = async (lesson_id) => {
    await api_admin
      .get(
        `${API_URL}/admin/lesson-detail-by-lesson-id/` +
          lesson_id +
          `?page=` +
          this.state.params.current_page +
          "&limit=100"
      )
      .then((response) => {
        this.setState({
          listVocabulary: response.data,
          loadding: false,
          lesson_id_create: lesson_id,
          vocabulary_id: response.data.data[0].id,
          params: {
            ...this.state.params,
            vocabulary_param: response.data.data[0].title_english,
          },
        });
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Get list grammars failed!");
      });
    // this.refectData();
  };

  getListgrammarByLesson = async (vocabulary) => {
    let { params, listLessons } = this.state;
    if(!this.state.params.subject_param){
        this.state.params.subject_param = listLessons.data[0].id
    }
    this.setState({
      // listgrammars: [],
    });

    await api_admin
      .get(
        `${API_URL}/admin/grammars?lesson_detail_id=` + this.state.vocabulary_id +
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
            params: {
              ...params,
              lession_detail_id_create: response.data.data[0].lessonDetail.id,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Get list grammars failed!");
      });
  };
  getListAnswerBygrammar = async (grammar_id) => {
    await api_admin
      .get(
        `${API_URL}/admin/answers-by-grammar-id/` +
          grammar_id +
          `?page=` +
          this.state.params.current_page_answer
      )
      .then((response) => {
        this.setState({
          listAnswers: response.data,
        });
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Get list grammars failed!");
      });
  };

  creategrammar = async () => {
    let { params } = this.state;
    api_admin
      .post(`${API_URL}/admin/grammar`, {
        title_english: params.title_grammar,
        type: params.type_grammar ?? "WRITE",
        lesson_detail_id: this.state.params.lession_detail_id_create,
      })
      .then((res) => {
        this.getListgrammarByLesson(this.state.params.vocabulary_param);
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
  createAnswer = async () => {
    let { params } = this.state;
    api_admin
      .post(`${API_URL}/admin/answer`, {
        title: params.title_answer,
        text: params.text_answer,
        grammar_id: params.grammar_id_create,
      })
      .then((res) => {
        this.getListgrammarByLesson(this.state.params.vocabulary_param);
        this.setState({
          params: {
            ...params,
            title_answer: "",
            text_answer: "",
            answer_form: false
          },
          grammar_form: false
        });
        if (this.state.language_type === "EN") {
          toast.success("Create answer success!");
        } else {
          toast.success("Tạo câu trả lời thành công!");
        }
        this.getListAnswerBygrammar(res.data.data.grammar.id)
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
        this.getListgrammarByLesson(this.state.params.vocabulary_param);
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
  updateAnswer = async () => {
    let { params } = this.state;
    api_admin
      .put(`${API_URL}/admin/answer/` + params.id_answer, {
        title: params.title_answer,
        text: params.text_answer,
        grammar_id: params.grammar_id_create,
        id: params.id_answer,
      })
      .then((res) => {
        // alert(this.state.params.grammar_id_create)
        this.getListgrammarByLesson(this.state.params.vocabulary_param);
        this.getListAnswerBygrammar(this.state.params.grammar_id_create);
        this.setState({
          ...this.state,
          params: {
            ...this.state.params,
            title_answer: "",
            // type_grammar: "CHOOSE",
            // id_grammar: 0,
          },
          status_form: {
            ...this.state.status_form,
            update_answer_form: false
          },
          answer_form: false,
        });
        if (this.state.language_type === "EN") {
          toast.success("Update answer success!");
        } else {
          toast.success("Cập nhật câu trả lời thành công!");
        }
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
          this.getListgrammarByLesson(this.state.params.vocabulary_param);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Delete grammar failed!");
        });
  };
  toAnswerList = (grammar_id) => {
    toast.success(grammar_id)
    this.getListAnswerBygrammar(grammar_id);
    this.setState({
      tab_answer_list: true,
      tab_grammar_list: false,
      params: {
        ...this.state.params,
        grammar_id_create: grammar_id,
      },
    });
  };
  editgrammar = (grammar) => {
    this.setState({
      status_form: {
        update_grammar_form: true,
      },
      grammar_form: true,
      params: {
        ...this.state.params,
        id_grammar: grammar.id,
        type_grammar: grammar.type ?? "CHOOSE",
        title_grammar: grammar.title_english,
      },
    });
  };
  // getDetailLessonByTitle = (title) => {
  //   api_admin
  //     .get(`${API_URL}/admin/lesson-detail-by-title/` + title )
  //     .then((res) => {
  //       this.setState({
  //         params: {
  //           ...this.state.params,
  //           lession_detail_id_create: res.data.data.id,
  //         },
  //       });
  //       this.setState({
  //         loadding: false,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("GET LEsson Detail By Title failed!");
  //     });
  // };
  editAnswer = (answer) => {
    this.setState({
      status_form: {
        update_answer_form: true,
      },
      
      answer_form: true,
      params: {
        ...this.state.params,
        id_answer: answer.id,
        text_answer: answer.text,
        title_answer: answer.title,
      },
    });
  };
   deleteAnswer = (answer) => {
      api_admin
        .delete(`${API_URL}/admin/answer/` + answer.id)
        .then((res) => {
          if (this.state.language_type === "EN") {
            toast.success("Delete grammar success!");
          } else {
            toast.success("Đã xóa ngữ pháp thành công!");
          }
        //   this.getListgrammarByLesson(this.state.params.vocabulary_param);
        this.getListAnswerBygrammar(answer.grammar.id)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Delete grammar failed!");
        });
  };
  setCorrectSentence = (answer) => {
    api_admin
        .put(`${API_URL}/admin/answer-correct`,
            {
                grammar_id: answer.grammar.id,
                answer_id: answer.id
            }
        )
        .then((res) => {
          if (this.state.language_type === "EN") {
            toast.success("Update answer cuccess!");
          } else {
            toast.success("Cập nhật đáp án thành công!");
          }
        //   this.getListgrammarByLesson(this.state.params.vocabulary_param);
        this.getListAnswerBygrammar(answer.grammar.id)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Update answer failed!");
        });
  }
  handleChangeVocabulary = (event) => {
    this.setState({ 
      vocabulary_id: event.target.value,
      params: {
                lession_detail_id_create: event.target.value,
              },
              loadding: true
      });
      
      setTimeout(() => this.getListgrammarByLesson(event.target.value), 1000

      )
      clearTimeout()
    
  }
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
      grammar_detail_data
    } = this.state;
    return (
      <div className="data-manager-container">
        <div className="data-manager-title">
          {language_type === "EN" ? "MANAGER grammar" : "Quản lý ngữ pháp"}
        </div>
       {grammar_detail_data} 
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
                        {language_type === "EN" ? "Vocabulary" : "Từ vựng"}{" "}
                      </th>
                      <th scope="col">
                        {language_type === "EN" ? "Type" : "Loại ngữ pháp"}{" "}
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
                          <td> {grammar.type}</td>
                          <td>
                            <button onClick={() => this.editgrammar(grammar)}>
                              {language_type === "EN" ? "Edit" : "Chỉnh sửa"}
                            </button>
                            <button
                              onClick={() => this.deletegrammar(grammar)}
                            >
                              {language_type === "EN" ? "Delete" : "Xóa"}
                            </button>
                            <button
                              onClick={() => this.toAnswerList(grammar.id)}
                            >
                              {language_type === "EN"
                                ? "to Answer"
                                : "Đến câu trả lời"}
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
        <div className="grammar-create-box">
          <div className="grammar-create-title">Create Form</div>
          <div className="form-container-default">
              <div className="form-control-default">
                  <label className="form-control-label">
                    Title: 
                  </label>
                  <input type="text" className="form-control-input"/>
              </div>
              <div className="form-control-default">
                  <label className="form-control-label">
                    Data: 
                  </label>
                  <WordEditor getDataWord={this.getDataWord} />
              </div>
          </div>
          </div>
        {/* )} */}
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ManagerGrammar);
