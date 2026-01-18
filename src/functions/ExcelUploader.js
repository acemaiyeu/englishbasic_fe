import React, { Component } from "react";
import { toast } from "react-toastify";
import api_admin from "../pages/Admin/api_admin";

class ExcelUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploading: false,
      message: "",
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Kiểm tra định dạng file
    if (!file.name.match(/\.(xls|xlsx)$/)) {
      this.setState({ message: "Vui lòng chọn file Excel (.xls hoặc .xlsx)" });
      return;
    }

    this.setState({ selectedFile: file, message: "" }, this.uploadFile);
  };

  uploadFile = async () => {
    const { url_api, lesson_detail_id} = this.props;
    const { selectedFile } = this.state;

    if (!url_api) {
      this.setState({ message: "Chưa truyền URL API!" });
      toast.error("Chưa truyền URL API!")
      return;
    }

    if (!selectedFile) {
      this.setState({ message: "Chưa chọn file!" });
      toast.error("Chưa chọn file!")
      return;
    }

    try {
      this.setState({ uploading: true, message: "Đang upload..." });

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("lesson_detail_id", lesson_detail_id);

     await api_admin.post(url_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      this.setState({
        uploading: false,
        // message: "Upload thành công!",
        message: ""
      });
      toast.success("Upload thành công!")
    } catch (error) {
      this.setState({
        uploading: false,
        message:
          "Lỗi khi upload: " +
          (error.response?.data?.message || error.message),
      });
    }
  };

  render() {
    const { uploading, message } = this.state;
    let { title } = this.props;
    return ( 
      <div
        style={{
          border: "2px dashed #ccc",
          padding: "5px",
          borderRadius: "10px",
          textAlign: "center",
          width: "fit-content",
          margin: "5px auto",
          fontSize: "10px"
        }}
      >
        <h3> {title ?? "Import File Excel" }</h3>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={this.handleFileChange}
          disabled={uploading}
        />
        <div style={{color: uploading ? "blue" : "green" }}>
          {message}
        </div>
      </div>
    );
  }
}

export default ExcelUploader;
