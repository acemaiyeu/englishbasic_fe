import React from "react";
import { connect } from "react-redux";
import '../sass/ListenWrite.scss'
import test_video from '../video/Varun Sivaram- How AI can solve its own energy crisis - TED Talk.mp4';

class ListenWrite extends React.Component {

    state = {
            language_type: "EN",
    }
    componentDidMount(){
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

    render() {
        let { language_type } = this.state;
        return (
            <>
                <div className="listen-write-container">
                    <div className="listen-write-title"> {language_type === "EN" ? "LISTEN AND WRITE AGAIN": "LUYỆN NGHE"}</div>
                    <div className="listen-write-content">
                        <div className="listen-write-content-video">
                            {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tcJvGHHXysg" title="Listen &amp; Write (beginners)! Try this ESL activity with your students! NO-PREP" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                            <video controls width="600">
                                <source src={test_video} type="video/mp4" />
                            
                            </video>
                        </div>
                        <div className="listen-write-content-writing">
                            <textarea placeholder={`${language_type === 'EN' ? "Typing...." : "Nhập tại đây"}`} rows={20} cols={30} className="listen-write-content-input"></textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ListenWrite);