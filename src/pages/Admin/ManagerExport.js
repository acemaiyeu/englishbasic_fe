import React from "react";

import '../sass/VocabularyListLesson.scss'
import axios from "axios";
import { API_URL } from "../const/const";
import { toast } from "react-toastify";
import { connect } from "react-redux";

class ManagerExport extends React.Component{

    state = {
        language_type: "EN",
        loadding: false,
        limit_get_data: 1000
    }
    exportExcel = (type) => {
        let { language_type, limit_get_data } = this.state;
        this.setState({
            ...this.state,
            loadding: true
        })
        let uri = "";
        if(type === "list-lesson"){
            uri = "export-lesson";
        }
        if(type === "list-vocabulary"){
            uri = "export-vocabulary";
        }
        if(type === "list-questions"){
            uri = "export-questions";
        }
        
        
        
        axios.get(`${API_URL}/admin/${uri}?limit=${limit_get_data}`, {
            responseType: 'blob' // ⬅️ bắt buộc để tải file
        })
        .then((res) => {
            // Tạo link tải file Excel
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', type + '.xlsx'); // tên file tải về
            document.body.appendChild(link);
            link.click();

            // Hiển thị thông báo
            if (language_type === "EN") {
                toast.success("Download file success!");
            } else {
                toast.success("Đã tải file thành công");
            }
        })
        .catch((e) => {
            if (language_type === "EN") {
                toast.error("Download file failed!");
            } else {
                toast.error("Tải file thất bại");
            }
        });
        this.setState({
            ...this.state,
            loadding: false
        })
    }
    componentDidMount () {
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

    render(){
        let { language_type, loadding, limit_get_data} = this.state;

        return (<div className="list-lessons">
                    <h4 className="list-title">{language_type === "EN" ? "List Export Excel" : "Xuất file excel"}</h4>
                   {loadding && 
                    <button class="btn btn-primary" style={{backgroundColor: ""}} type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {language_type === "EN" ? "Loadding data" : "Đang tải dữ liệu"}
                    </button>
                    }
                    <select onChange={(e) => this.setState({
                        limit_get_data: e.target.value
                    })} class="form-select form-select-lg mb-3" aria-label="Large select example">
                        <option selected>{language_type === "EN" ? "Limit get data" : "Giới hạn lấy dữ liệu"}</option>
                        <option selected={limit_get_data === 1000} value="1000">1.000</option>
                        <option selected={limit_get_data === 5000} value="5000">5.000</option>
                        <option selected={limit_get_data === 10000} value="10000">10.000</option>
                        <option selected={limit_get_data === 100000} value="100000">100.000</option>
                    </select>

                   <div className="lesson-item" onClick={() => this.exportExcel("list-lesson")} >
                        <div className="lesson-content-left" >
                            <div className="lesson-title">{language_type === "EN" ? "Subject" : "Bài học"}</div>
                            {/* <div className="lesson-title">{language_type === "EN" ? item.details.length +  " Vocabulary" :  item.details.length +  " Từ vựng"}</div> */}
                        </div>

                        <div className="lession-content-right">
                            <p>{language_type === "EN" ? "Export" : "Xuất file"}</p>
                        </div>
                    </div>

                    <div className="lesson-item" onClick={() => this.exportExcel("list-vocabulary")} >
                        <div className="lesson-content-left" >
                            <div className="lesson-title">{language_type === "EN" ? "Vocabulary" : "Từ vựng"}</div>
                            {/* <div className="lesson-title">{language_type === "EN" ? item.details.length +  " Vocabulary" :  item.details.length +  " Từ vựng"}</div> */}
                        </div>

                        <div className="lession-content-right">
                            <p>{language_type === "EN" ? "Export" : "Xuất file"}</p>
                        </div>
                    </div>
                    <div className="lesson-item" onClick={() => this.exportExcel("list-questions")} >
                        <div className="lesson-content-left" >
                            <div className="lesson-title">{language_type === "EN" ? "Questions And Answers" : "Câu hỏi và trả lời"}</div>
                            {/* <div className="lesson-title">{language_type === "EN" ? item.details.length +  " Vocabulary" :  item.details.length +  " Từ vựng"}</div> */}
                        </div>

                        <div className="lession-content-right">
                            <p>{language_type === "EN" ? "Export" : "Xuất file"}</p>
                        </div>
                    </div>

                </div>
                )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ManagerExport);