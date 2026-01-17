import React from "react";
import DisplayContent from "./ComponentSupport/DisplayContent";
import { connect } from "react-redux";
import '../sass/LessonGrammar.scss'
import axios from "axios";
import { API_URL } from "../const/const";
import { toast } from "react-toastify";


class LessonGrammar extends React.Component{

    state = {
        language_type: "EN",
        index: 0,
        grammar_item: {}
    }

    componentDidMount () {
        this.getDetailGrammar()
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
    getDetailGrammar = () => {
        let { language_type } = this.state;
        axios.get(`${API_URL}/grammar/${this.props.match.params.grammar_id}`).then((res) => {
            this.setState({
                grammar_item: res.data.data
            })
        }).catch((e) => {
            if(language_type === "EN"){
                toast.error("Call api fail")
            }else{
                toast.error("Lỗi")
            }
            console.log(e)
        })
    }
    nextPage = () => {
        let { index, grammar_item, language_type} = this.state;
        if(index === grammar_item.details.length - 1){
            if(language_type === "EN"){
                toast.warn("This is the last page")
            }else{
                toast.warn("Bạn đã ở trang cuối")
            }
            return;
        }
        this.setState({
            ...this.state,
            index: this.state.index + 1
        })
    }
        prevPage = () => {
        let { index, grammar_item, language_type} = this.state;
        if(index === 0){
            if(language_type === "EN"){
                toast.warn("This is the first page")
            }else{
                toast.warn("Bạn đã ở trang cuối")
            }
            return;
        }
        this.setState({
            ...this.state,
            index: this.state.index - 1
        })
    }
    render(){
        let { language_type, grammar_item, index } = this.state;
        return(
            <div className="lesson-box-container">
                <div className="lesson-box-content">
                    <div className="progress-container">
                        {grammar_item && grammar_item.details && grammar_item.details.length > 0 && grammar_item.details.map((item, ind_item) => {
                            if(index >= ind_item){
                                return (<div className="progress-item active"></div>)
                            }else{
                                return (<div className="progress-item"></div>)
                            }
                            
                        })}
                    </div>
                    {grammar_item?.id &&
                        <DisplayContent htmlFromEditor={grammar_item.details[index].data}/>
                    }
                    <div className="btn-prev" onClick={() => this.prevPage()}>{language_type === "EN" ? "Prev Page" : "Trang trước"}</div>
                    <div className="btn-title">{index+1}/{grammar_item?.details?.length}</div>
                    <div className="btn-next" onClick={() => this.nextPage()}>{language_type === "EN" ? "Next Page" : "Trang sau"}</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(LessonGrammar);