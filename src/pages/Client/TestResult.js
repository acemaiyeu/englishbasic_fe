import React, { Component } from "react";

class TestResult extends Component {
  handleBack = () => {
    window.location.href = this.props.page;
  };

  render() {
    const { point, language_type } = this.props;
    const isPass = point >= 5;
    const isEnglish = language_type === "EN";

    const messages = {
      EN: {
        success: {
          title: "Congratulations!",
          message: `You passed the test with ${point} points! Great job!`,
        },
        fail: {
          title: "Don't give up!",
          message: `You got ${point} points. Keep trying, you can do better next time!`,
        },
        back: "Back to previous page",
      },
      VI: {
        success: {
          title: "Chúc mừng bạn!",
          message: `Bạn đã đạt ${point} điểm! Làm rất tốt!`,
        },
        fail: {
          title: "Đừng nản lòng!",
          message: `Bạn chỉ đạt ${point} điểm. Hãy cố gắng lần sau nhé!`,
        },
        back: "Quay lại trang trước",
      },
    };

    const lang = isEnglish ? messages.EN : messages.VI;
    const display = isPass ? lang.success : lang.fail;

    const bgColor = isPass
      ? "linear-gradient(to right, #a8e063, #56ab2f)" // vui
      : "linear-gradient(to right, #757f9a, #d7dde8)"; // buồn

    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: bgColor,
          color: "#fff",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* <Prev uri={`list-lesson-details/${listLessonDetail?.lesson_id}`}/> */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            padding: "30px 50px",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{display.title}</h1>
          <p style={{ fontSize: "1.2rem" }}>{display.message}</p>

          <button
            onClick={this.handleBack}
            style={{
              marginTop: "20px",
              backgroundColor: "#fff",
              color: "#333",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {lang.back}
          </button>
        </div>
      </div>
    );
  }
}

export default TestResult;
