import React from "react";
import DisplayContent from "./ComponentSupport/DisplayContent";
import { connect } from "react-redux";
import '../sass/LessonGrammar.scss'


class LessonGrammar extends React.Component{

    state = {
        language_type: "EN",
        content: `
    <div class="lesson-box" style="font-family: sans-serif; line-height: 1.6; color: #333;">
      <section style="margin-bottom: 20px;">
        <h4 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px;">1. Cấu trúc (Structure)</h4>
        <p style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">
          <strong>If + S + V(s/es), S + V(s/es)</strong> <br>
          <em>(Cả hai vế đều chia ở thì Hiện tại đơn)</em>
        </p>
      </section>

      <section style="margin-bottom: 20px;">
        <h4 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px;">2. Cách dùng (Usage)</h4>
        <p>Dùng để diễn tả một <strong>sự thật hiển nhiên</strong>, một chân lý, hoặc một thói quen xảy ra ngay lập tức khi điều kiện được đáp ứng.</p>
      </section>

      <section style="margin-bottom: 20px;">
        <h4 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px;">3. Ví dụ & Giải thích</h4>
        <div style="background: #e1f5fe; padding: 15px; border-radius: 5px;">
          <p><strong>Ví dụ:</strong> <em>If you heat ice, it melts.</em> (Nếu bạn đun nóng đá, nó sẽ tan chảy.)</p>
          <hr style="border: 0; border-top: 1px solid #b3e5fc;">
          <p><strong>Tại sao dùng loại 0?</strong> 
          Vì đây là một <strong>sự thật vật lý</strong>. Kết quả "đá tan" luôn luôn đúng 100% khi có điều kiện "đun nóng", không có ngoại lệ và không phải là dự đoán tương lai.</p>
        </div>
      </section>
    </div>
  `
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
        let { language_type } = this.state;
        return(
            <div className="lesson-box-container">
                <div className="lesson-box-content">
                    <DisplayContent htmlFromEditor={this.state.content}/>
                    <div className="btn-prev">{language_type === "EN" ? "Prev Page" : "Trang trước"}</div>
                    <div className="btn-title">1/2</div>
                    <div className="btn-next">{language_type === "EN" ? "Next Page" : "Trang sau"}</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(LessonGrammar);