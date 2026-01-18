import React from "react";
import '../sass/ListSubjects.scss'
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "../const/const";
import { toast } from "react-toastify";

class ListGrammars extends React.Component {

    state =  {
        language_type: "EN",
        current_page: 1,
        ListSubjects: []
    }
    componentDidMount(){
        this.setState({
            language_type: this.props.language_type,
        })
        this.getListSubject()
    }
    getListSubject = async () => {
        let { current_page } = this.state;
        await axios.get(`${API_URL}/grammars?page=${current_page}&limit=10000`).then((res) => {
            this.setState({
                ListSubjects: res.data.data
            })
        }).catch((err) => {
            toast.warn("error")
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.language_type !== this.props.language_type) {
            this.setState({
                language_type: this.props.language_type,
            });
        }
    }
    handleForward = (id) => {
        window.location.href = `/grammar/${id}`
    }
    render(){
        let { language_type, ListSubjects } = this.state;
        return (
            <div className="subjects-container">
                {ListSubjects && ListSubjects.length > 0 && ListSubjects.map((item) => {
                    return (
                    <div className="subject-item" key={item.id || item.title_english} onClick={() => this.handleForward(item.id)}>
                        <div className="subject-title">
                        {language_type === "EN" ? item.title_english : item.title_vietnamese}
                        </div>
                        {/* <div className="subject-description">Description for Subject 1</div> */}
                    </div>
                    );
                })}
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ListGrammars);
