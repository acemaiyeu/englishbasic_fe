import React from "react";
import "../sass/ManagerVocabulary.scss";
import { connect } from "react-redux";
import api_admin from "./api_admin.js";
import { API_URL, auth } from "../const/const.js";
import { toast } from "react-toastify";
import ExcelUploader from "../../functions/ExcelUploader.js";

class ManagerQuestion extends React.Component {
  state = {
    language_type: "EN",
    loadding: true,
    listLessons: [],
    listVocabulary: [],
    listQuestions: [],
    listAnswers: [],
    vocabulary_id: 0,
    status_form: {
      update_question_form: false,
      update_answer_form: false,
    },
    params: {
      current_page: 1,
      total_page: 1,
      subject_param: "",
      vocabulary_param: "",
      question_param: "",
      answer_param: "",
      id_question_param: 0,
      current_page_answer: 1,
      id_answer_param: 0,
      lession_detail_id_create: 0,
      id_question: 0,
      title_question: "",
      type_question: "CHOOSE",
      text_answer: "",
      question_id_create: 0,
      id_answer: 0,
      title_answer: "",
      id_grammar: ""
    },
    title_vietnamese: "",
    question_form: false,
    answer_form: false,
    edit_vocabulary_form: true,
    transcription: "",
    means: "",
    lesson_id_create: 0,
    tab_question_list: true,
    tab_answer_list: false,
    grammar_id: "",
    listTitleGrammar: []
  };
  toggleTab = (tabName) => {
    this.setState((prevState) => ({
      [tabName]: !prevState[tabName],
    }));
  };
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
    if (type === "type_question") {
      this.setState({
        params: {
          ...this.state.params,
          type_question: event.target.value,
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
    if (type === "title_question") {
      this.setState({
        params: {
          ...this.state.params,
          title_question: event.target.value,
        },
      });
    }
    if (type === "id_grammar") {
      this.setState({
        params: {
          ...this.state.params,
          id_grammar: event.target.value,
        },
      });
    }
    if (type === "id_lesson") {
      this.setState({
        params: {
          ...this.state.params,
          id_lesson: event.target.value,
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
    await this.getListQuestionByLesson(this.state.params.vocabulary_param);
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
        question_param: "",
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
          `&question_name=` +
          (params.question_param ?? "") +
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
    let { title_english, lesson_id_create, transcription, means, grammar_id } = this.state;
    api_admin
      .post(`${API_URL}/admin/lesson-detail`, {
        title_english: title_english,
        lesson_id: lesson_id_create,
        transcription: transcription,
        means: means,
        grammar_id: grammar_id
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
        toast.error("Get list questions failed!");
      });
    // this.refectData();
  };

  getListQuestionByLesson = async (vocabulary) => {
    let { params, listLessons } = this.state;
    if(!this.state.params.subject_param){
        this.state.params.subject_param = listLessons.data[0].id
    }
    this.setState({
      // listQuestions: [],
    });

    await api_admin
      .get(
        `${API_URL}/admin/questions?lesson_detail_id=` + this.state.vocabulary_id +
          `&page=` +
          this.state.params.current_page
      )
      .then((response) => {
        if (response.data.data.length > 0) {
        //   params.lession_detail_id_create =
        //     response.data?.data[0]?.lessonDetail?.lesson_detail_id ?? 0;
          this.setState({
            listQuestions: response.data,
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
        toast.error("Get list questions failed!");
      });
  };
  getListAnswerByQuestion = async (question_id) => {
    await api_admin
      .get(
        `${API_URL}/admin/answers-by-question-id/` +
          question_id +
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
        toast.error("Get list questions failed!");
      });
  };

   getTitleGrammars = async () => {
    await api_admin
      .get(
        `${API_URL}/admin/grammar-title?limit=10000`
      )
      .then((response) => {
        this.setState({
          listTitleGrammar: response.data.data,
          params: {
            ...this.state.params,
            id_grammar: response.data.data[0].id
          }
        });
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Get list grammar title failed!");
      });
  }
  createQuestion = async () => {
    let { params } = this.state;
    api_admin
      .post(`${API_URL}/admin/question`, {
        title_english: params.title_question,
        type: params.type_question ?? "WRITE",
        lesson_detail_id: this.state.params.lession_detail_id_create,
      })
      .then((res) => {
        this.getListQuestionByLesson(this.state.params.vocabulary_param);
        this.setState({
          ...this.state,
          params: {
            ...this.state.params,
            title_question: "",
            type_question: "CHOOSE",
            question_id_create: res.data.data.id
          },
          question_form: false
        });
        if (this.state.language_type === "EN") {
          toast.success("Create question success!");
        } else {
          toast.success("Tạo câu hỏi thành công!");
        }
        // this.toAnswerList(res.data.data.id)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create question failed!");
      });
  };
  createAnswer = async () => {
    let { params } = this.state;
    api_admin
      .post(`${API_URL}/admin/answer`, {
        title: params.title_answer,
        text: params.text_answer,
        question_id: params.question_id_create,
      })
      .then((res) => {
        this.getListQuestionByLesson(this.state.params.vocabulary_param);
        this.setState({
          params: {
            ...params,
            title_answer: "",
            text_answer: "",
            answer_form: false
          },
          question_form: false
        });
        if (this.state.language_type === "EN") {
          toast.success("Create answer success!");
        } else {
          toast.success("Tạo câu trả lời thành công!");
        }
        this.getListAnswerByQuestion(res.data.data.question.id)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create question failed!");
      });
  };
  updateQuestion = async () => {
    let { params } = this.state;
    api_admin
      .put(`${API_URL}/admin/question/` + params.id_question, {
        title_english: params.title_question,
        type: params.type_question,
        lesson_detail_id: params.lession_detail_id_create,
        id: params.id_question,
      })
      .then((res) => {
        this.getListQuestionByLesson(this.state.params.vocabulary_param);
        this.setState({
          ...this.state,
          params: {
            ...params,
            title_question: "",
            type_question: "CHOOSE",
            id_question: 0,
          },
          question_form: false,
          status_form: {
            ...this.state.status_form,
            update_question_form: false
          }
        });
        if (this.state.language_type === "EN") {
          toast.success("Update question success!");
        } else {
          toast.success("Cập nhật câu hỏi thành công!");
        }
        console.log(res.data)
        this.getListAnswerByQuestion(res.data.data.id)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Update question failed!");
      });
  };
  updateAnswer = async () => {
    let { params } = this.state;
    api_admin
      .put(`${API_URL}/admin/answer/` + params.id_answer, {
        title: params.title_answer,
        text: params.text_answer,
        question_id: params.question_id_create,
        id: params.id_answer,
      })
      .then((res) => {
        // alert(this.state.params.question_id_create)
        this.getListQuestionByLesson(this.state.params.vocabulary_param);
        this.getListAnswerByQuestion(this.state.params.question_id_create);
        this.setState({
          ...this.state,
          params: {
            ...this.state.params,
            title_answer: "",
            // type_question: "CHOOSE",
            // id_question: 0,
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
        toast.error("Update question failed!");
      });
  };
  deleteQuestion = (question) => {
      api_admin
        .delete(`${API_URL}/admin/question/` + question.id)
        .then((res) => {
          if (this.state.language_type === "EN") {
            toast.success("Delete question success!");
          } else {
            toast.success("Đã xóa câu hỏi thành công!");
          }
          this.getListQuestionByLesson(this.state.params.vocabulary_param);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Delete question failed!");
        });
  };
  toAnswerList = (question_id) => {
    toast.success(question_id)
    this.getListAnswerByQuestion(question_id);
    this.setState({
      tab_answer_list: true,
      tab_question_list: false,
      params: {
        ...this.state.params,
        question_id_create: question_id,
      },
    });
  };
  editQuestion = (question) => {
    this.setState({
      status_form: {
        update_question_form: true,
      },
      question_form: true,
      params: {
        ...this.state.params,
        id_question: question.id,
        type_question: question.type ?? "CHOOSE",
        title_question: question.title_english,
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
            toast.success("Delete question success!");
          } else {
            toast.success("Đã xóa câu hỏi thành công!");
          }
        //   this.getListQuestionByLesson(this.state.params.vocabulary_param);
        this.getListAnswerByQuestion(answer.question.id)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Delete question failed!");
        });
  };
  setCorrectSentence = (answer) => {
    api_admin
        .put(`${API_URL}/admin/answer-correct`,
            {
                question_id: answer.question.id,
                answer_id: answer.id
            }
        )
        .then((res) => {
          if (this.state.language_type === "EN") {
            toast.success("Update answer cuccess!");
          } else {
            toast.success("Cập nhật đáp án thành công!");
          }
        //   this.getListQuestionByLesson(this.state.params.vocabulary_param);
        this.getListAnswerByQuestion(answer.question.id)
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
      
      setTimeout(() => this.getListQuestionByLesson(event.target.value), 1000

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
        question_form: true,
      });
      if(this.state.params.type_question === undefined){
        this.setState({
            ...this.state.params,
            type_question: "CHOOSE"
        })
      }
    }
  };
 
  render() {
    let {
      language_type,
      tab_answer_list,
      tab_question_list,
      loadding,
      listLessons,
    //   vocabulary_form,
    //   transcription,
    //   vocabulary_param,
    //   means,
    //   title_english,
      listVocabulary,
      listQuestions,
      listAnswers,
      question_form,
      answer_form,
      listTitleGrammar
    } = this.state;
    return (
      <div className="data-manager-container">
        <div className="data-manager-title">
          {language_type === "EN" ? "MANAGER QUESTION" : "Quản lý câu hỏi"}
        </div>
        <div className="data-manager-header">
          <div className="title">
            {language_type === "EN" ? "Filter" : "Bộ lọc"}
          </div>
          <div className="form">
            <label> {language_type === "EN" ? "Subject:" : "Chủ đề"} </label>
            <select
              onChange={(e) => this.handleChangeSubject(e)}
              size={1}
            >
              {listLessons.length <= 0 && (
                <option value="">
                  {language_type === "EN"
                    ? "No subject available"
                    : "Không có chủ đề nào"}
                </option>
              )}
              {listLessons?.data?.length > 0 &&
                listLessons.data.map((lesson, index) => (
                  <option value={lesson.id} key={index}>
                    {language_type === "EN"
                      ? lesson.title_english
                      : lesson.title_vietnamese}
                  </option>
                ))}
            </select>
          </div>
          <div className="form">
            <label>
              {" "}
              {language_type === "EN" ? "Vocabulary:" : "Từ vựng"}{" "}
            </label>
            {/* <input
              type="text"
              value={this.state.params.vocabulary_param ?? ""}
              onChange={(e) =>
                this.setState({
                  params: {
                    ...this.state.params,
                    vocabulary_param: e.target.value,
                  },
                })
              }
              list="vocabulary-list"
            /> */}
            {/* <datalist id="vocabulary-list">
              {listVocabulary?.data?.length > 0 &&
                listVocabulary.data.map((vocabulary, index) => (
                  <option
                    value={
                      language_type === "EN"
                        ? vocabulary.title_english
                        : vocabulary.title_vietnamese
                    }
                    key={index}
                  />
                ))}
            </datalist> */}

            <select onChange={(event) => this.handleChangeVocabulary(event)}> 
                {listVocabulary?.data?.length > 0 &&
                listVocabulary.data.map((vocabulary, index) => (
                  <option
                  selected={this.state.params.vocabulary_param === vocabulary.title_english}
                    value={
                      vocabulary.id
                    }
                    key={index}
                  >{ language_type === "EN"
                        ? vocabulary.title_english
                        : vocabulary.title_vietnamese}</option>
                ))}

            </select>
          </div>
          
          <i
            className="bi bi-search"
            onClick={() => this.PageVocabulary(this.state.params.current_page)}
          ></i>
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
                    : "Add New Question"
                  : this.state.status_form.update_question_form
                  ? "Cập nhật câu hỏi"
                  : "Thêm câu hỏi mới"}
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
              <ExcelUploader lesson_detail_id={this.state.params.lession_detail_id_create} url_api={API_URL + "/admin/import-question-answers-v2"} title="Import question"/>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            {/* Thanh tab */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => this.toggleTab("tab_question_list")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: tab_question_list ? "#2563eb" : "#e5e7eb",
                  color: tab_question_list ? "white" : "black",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {language_type === "EN" ? "Question List" : "Danh sách câu hỏi"}
              </button>

              <button
                onClick={() => this.toggleTab("tab_answer_list")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: tab_answer_list ? "#2563eb" : "#e5e7eb",
                  color: tab_answer_list ? "white" : "black",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {language_type === "EN" ? "Answer List" : "Danh sách đáp án"}
              </button>
            </div>

            {/* Nội dung */}
            <div style={{ marginTop: "20px" }}>
              {tab_question_list && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col-1">#</th>
                      <th scope="col">
                        {language_type === "EN" ? "Vocabulary" : "Từ vựng"}{" "}
                      </th>
                      <th scope="col">
                        {language_type === "EN" ? "Type" : "Loại câu hỏi"}{" "}
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
                    {
                      listQuestions?.data?.length > 0 &&
                      listQuestions.data.map((question, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {language_type === "EN"
                              ? question.title_english
                              : question.title_vietnamese}
                          </td>
                          <td> {question.type}</td>
                          <td>
                            <button onClick={() => this.editQuestion(question)}>
                              {language_type === "EN" ? "Edit" : "Chỉnh sửa"}
                            </button>
                            <button
                              onClick={() => this.deleteQuestion(question)}
                            >
                              {language_type === "EN" ? "Delete" : "Xóa"}
                            </button>
                            <button
                              onClick={() => this.toAnswerList(question.id)}
                            >
                              {language_type === "EN"
                                ? "to Answer"
                                : "Đến câu trả lời"}
                            </button>
                            
                          </td>
                        </tr>
                      ))}
                      {loadding && listQuestions?.data?.length > 0 && (
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
                        <tr key={index} className={`${answer.question.answer === answer.id ? 'answer-correct' : ''}`}>
                          <th scope="row">{index + 1} - {answer.question.answer  + "  - " + answer.id}</th>
                          <td>
                            {" "}
                            {answer.question.type === "CHOOSE"
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
                            {answer.question.type === "CHOOSE" 
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
              {!tab_question_list && !tab_answer_list && (
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
            disabled={listQuestions?.meta?.pagination?.current_page === 1}
          >
            {language_type === "EN" ? "First" : "Trang đầu"}
          </button>
          <button
            onClick={() =>
              this.PageVocabulary(
                listQuestions?.meta?.pagination?.current_page - 1
              )
            }
            disabled={listQuestions?.meta?.pagination?.current_page <= 1}
          >
            {language_type === "EN" ? "Prev" : "Trang trước"}
          </button>
          <button>
            {JSON.stringify(listQuestions?.meta?.pagination?.current_page)}
          </button>
          <button
            disabled={
              listQuestions?.meta?.pagination?.current_page ===
              listQuestions?.meta?.pagination?.total_pages
            }
            onClick={() =>
              this.PageVocabulary(
                listQuestions?.meta?.pagination?.current_page + 1
              )
            }
          >
            {language_type === "EN" ? "Next" : "Trang tiếp"}
          </button>
          <button
            disabled={
              listQuestions?.meta?.pagination?.total_pages ===
              listQuestions?.meta?.pagination?.current_page
            }
            onClick={() =>
              this.PageVocabulary(listQuestions?.meta?.pagination?.total_pages)
            }
          >
            {language_type === "EN" ? "Last" : "Trang cuối"}
          </button>
        </div>
        <div className="data-manager-auth">
          <button>#{auth}</button>
        </div>
        {/* {vocabulary_form && 
                <div className="data-manager-add-vocabulary-form">
                    <div className="x-icon" onClick={() => this.setState({
                       vocabulary_form: false 
                    })}>X</div>
                    <div className="data-manager-add-vocabulary-form-title">
                        { language_type === "EN" ? "Add New Question" : "Thêm câu hỏi mới"}
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
                        <button className="btn-save" onClick={() => this.createVocabulary()}>{language_type === "EN" ?  "SAVE" : "Lưu"}</button>
                    </div>
                </div>
            } */}
        {question_form && (
          <div className="data-manager-add-vocabulary-form">
            <div
              className="x-icon"
              onClick={() =>
                this.setState({
                  question_form: false,
                  status_form: {
                    ...this.state.status_form,
                    update_question_form: false
                  }
                })
              }
            >
              X
            </div>

            <div className="data-manager-add-vocabulary-form-title">
              {language_type === "EN"
                ? this.state.status_form.update_question_form
                  ? "Update Question"
                  : "Add New Question"
                : this.state.status_form.update_question_form
                ? "Cập nhật câu hỏi"
                : "Thêm câu hỏi mới"}
            </div>
            <div className="data-manager-add-vocabulary-form-body">
              <input
                type="text"
                style={{ display: "none" }}
                value={this.state.params.id_question}
                // onChange={(e) => this.handleChangeInput(e, ) }
              />
              <div className="form">
                <label> {language_type === "EN" ? "Title" : "Tiêu đề"}: </label>
                <input
                  type="text"
                  value={this.state.params.title_question}
                  onChange={(e) => this.handleChangeInput(e, "title_question")}
                />
              </div>
              <div className="form">
                <label> {language_type === "EN" ? "Type" : "Loại"}: </label>
                <select
                  onChange={(e) => this.handleChangeInput(e, "type_question")}
                >
                  <option
                    selected={this.state.params.type_question === "CHOOSE"}
                    value="CHOOSE"
                  >
                    {language_type === "EN" ? "CHOOSE" + " - ": "Trắc nghiệm"}
                  </option>
                  <option
                    selected={this.state.params.type_question === "WRITE"}
                    value="WRITE"
                  >
                    {language_type === "EN" ? "WRITING" : "Tự luận"}
                  </option>
                  <option
                    selected={this.state.params.type_question === "READ"}
                    value="READ"
                  >
                    {language_type === "EN" ? "READ" : "XEM"}
                  </option>
                  
                </select>
                {/* <input type="text" value={transcription} onChange={(e) => this.handleChangeInput(e, "transcription")}/> */}
              </div>
              <div className="form">
                <label> {language_type === "EN" ? "Vocabulary" : "Từ vựng"}: </label>
                <select
                  onChange={(e) => this.handleChangeInput(e, "id_lesson_detail")}
                >
                  <option value={undefined}>{language_type === "EN" ?"Choose Vocabulary" : "Chọn từ vựng"}</option>
                  {listVocabulary?.data && listVocabulary?.data?.length > 0 && listVocabulary.data.map((voca) => {
                    return (
                        <option
                    selected={this.state.params.type_question === "CHOOSE"}
                    value={voca.id}
                  >
                    {voca.title_english}
                  </option>
                    )
                  })}
                </select>
                {/* <input type="text" value={transcription} onChange={(e) => this.handleChangeInput(e, "transcription")}/> */}
              </div>
              <div className="form">
                <label> {language_type === "EN" ? "Grammar" : "Ngữ pháp"}: </label>
                <select
                  onChange={(e) => this.handleChangeInput(e, "id_grammar")}
                  onClick={() => {
                    if(listTitleGrammar.length === 0){
                        this.getTitleGrammars()
                    }
                  }}
                >
                  <option value={undefined}>{language_type === "EN" ?"Choose Grammar" : "Chọn ngữ pháp"}</option>
                  {listTitleGrammar && listTitleGrammar.length > 0 && listTitleGrammar.map((grammar) => {
                    return (
                        <option
                    selected={this.state.params.type_question === "CHOOSE"}
                    value={grammar.id}
                  >
                    {language_type === "EN" ? grammar.title_english: grammar.title_vietnamese}
                  </option>
                    )
                  })}
                </select>
                {/* <input type="text" value={transcription} onChange={(e) => this.handleChangeInput(e, "transcription")}/> */}
              </div>
              {this.state.status_form.update_question_form ? (
                <button
                  className="btn-save"
                  onClick={() =>
                    this.updateQuestion(this.state.params.id_question)
                  }
                >
                  {language_type === "EN" ? "UPDATE" : "LƯU"}
                </button>
              ) : (
                <button
                  className="btn-save"
                  onClick={() => this.createQuestion()}
                >
                  {language_type === "EN" ? "CREATE" : "TẠO"}
                </button>
              )}
            </div>
          </div>
        )}
        {answer_form && (
          <div className="data-manager-add-vocabulary-form">
            <div
              className="x-icon"
              onClick={() =>
                this.setState({
                  answer_form: false,
                })
              }
            >
              X
            </div>
            <div className="data-manager-add-vocabulary-form-title">
              {language_type === "EN"
                ? this.state.status_form.update_answer_form
                  ? "Update Answer"
                  : "Add New Answer"
                : this.state.status_form.update_answer_form
                ? "Cập nhật câu trả lời"
                : "Thêm câu trả lời mới"}
            </div>
            <div className="data-manager-add-vocabulary-form-body">
              <div className="form">
                <label>
                  {" "}
                  {language_type === "EN" ? "Answer" : "Câu trả lời"}:{" "}
                </label>
                <input
                  type="text"
                  value={this.state.params.title_answer}
                  onChange={(e) => this.handleChangeInput(e, "title_answer")}
                />
              </div>
              {this.state.status_form.update_answer_form ? (
                <button
                  className="btn-save"
                  onClick={() => this.updateAnswer()}
                >
                  {language_type === "EN" ? "Update" : "Lưu"}
                </button>
              ) : (
                <button
                  className="btn-save"
                  onClick={() => this.createAnswer()}
                >
                  {language_type === "EN" ? "Create" : "Lưu"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ManagerQuestion);
