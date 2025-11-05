import React, { Component } from "react";
import axios from "axios";

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
    const { url_api } = this.props;
    const { selectedFile } = this.state;

    if (!url_api) {
      this.setState({ message: "Chưa truyền URL API!" });
      return;
    }

    if (!selectedFile) {
      this.setState({ message: "Chưa chọn file!" });
      return;
    }

    try {
      this.setState({ uploading: true, message: "Đang upload..." });

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(url_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      this.setState({
        uploading: false,
        message: "Upload thành công! Kết quả: " + JSON.stringify(response.data),
      });
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

    return (
      <div
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          width: "350px",
          margin: "20px auto",
        }}
      >
        <h3>Import File Excel</h3>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={this.handleFileChange}
          disabled={uploading}
        />
        <div style={{ marginTop: "15px", color: uploading ? "blue" : "green" }}>
          {message}
        </div>
      </div>
    );
  }
}

export default ExcelUploader;
