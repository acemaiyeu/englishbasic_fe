import React from "react";
import { connect } from "react-redux";
import '../sass/ListenWrite.scss'
import axios from "axios";
import { API_URL } from "../const/const";
import { Replace } from "lucide-react";
import YouTubeAudioPlayer from "./YouTubeAudioPlayer";
import YouTubeVideoController from "./YoutubeVideoController";
import YouTubeControlsOnly from "./YouTubeControlsOnly";
import { toast } from "react-toastify";
// import test_video from '';
//'../video/Varun Sivaram- How AI can solve its own energy crisis - TED Talk.mp4';

class ListenWrite extends React.Component {

    state = {
            language_type: "EN",
            listen: {},
            real_check_text: true
    }
    componentDidMount(){
        this.getListenById(this.props.match.params.id)
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
    getListenById = (id) => {
        axios.get(`${API_URL}/listen/${id}`).then((res) => {
            this.setState({
                listen: res.data.data
            })
        }).catch((e) => {
            console.log("Error", e)
        })
    }
    handleChangeWord = (e) => {
        let { listen, language_type} = this.state;
        let input = e.target.value;
        let value_check = listen?.value.replace("  ", "").trim();
        if(input.toLowerCase() === value_check.slice(0, input.length).toLowerCase()){
            this.setState({
                ...this.state,
                real_check_text: true
            })
            if(input.length === value_check.length){
                if(language_type === "EN"){
                    toast.success("Conratulations! You're completed!");
                }else{
                    toast.success("Chúc mừng bạn đã hoàn thành!");
                }  
            }
        }else{
            this.setState({
                ...this.state,
                real_check_text: false
            })
        }
        
    }
    render() {
        let { language_type, listen,real_check_text } = this.state;
        return (
            <>
                <div className="listen-write-container">
                    <div className="listen-write-title"> {language_type === "EN" ? "LISTEN AND WRITE AGAIN": "LUYỆN NGHE"}</div>
                    <div className="listen-write-content">
                        <div className="listen-write-content-video">
                            {/* <iframe width="100%" height="100%" src={listen.url_video} title="Listen &amp; Write (beginners)! Try this ESL activity with your students! NO-PREP" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                            {/* <video controls width="600">
                                {/* <source src={test_video} type="video/mp4" />
                            
                            </video> */}
                            {listen.url_video && 
                               
                               <YouTubeControlsOnly 
                                    videoSource={listen.url_video} 
                                />
                            }
                            
                        </div>
                        <div className="listen-write-content-writing">
                            <textarea  className={`listen-write-content-input ${real_check_text ? '' : 'wrong'}`}  onChange={(e) => this.handleChangeWord(e)} placeholder={`${language_type === 'EN' ? "Typing...." : "Nhập tại đây"}`} rows={20} cols={30} ></textarea>
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