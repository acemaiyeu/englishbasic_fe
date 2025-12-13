import axios from "axios";
import React from "react";
import { API_URL } from "../const/const";
class EnglishEveryDay extends React.Component {

    state = {
        messagage: ""
    }
    componentDidMount() {
        this.getVocabularyBox()
    }
    getVocabularyBox = () => {
        axios.get(`${API_URL}/question/7338?limit=1`).then((res) => {
            this.setState({
                messagage: res.data.data[0].title_english
            })
        })
    }
    render() {
        let { messagage }   = this.state;
        return (        
            <span>
                {messagage}
            </span>
        )
    }   
}

export default EnglishEveryDay;