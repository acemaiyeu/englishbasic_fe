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
        let quote = JSON.parse(localStorage.getItem("quotes"));
        let call_api_again = true;
        if(quote){
            if(quote.time === new Date().toISOString().split('T')[0]){
                 call_api_again = false;
            }
        }
        if(call_api_again){
            axios.get(`${API_URL}/quotes-random`).then((res) => {
                console.log(res.data.data.title)
                this.setState({
                    messagage: res.data.data.title + " => " + res.data.data.mean
                })
                let ob = {
                    title: res.data.data.title,
                    mean: res.data.data.mean,
                    time: new Date().toISOString().split('T')[0]
                }
                localStorage.setItem("quotes", JSON.stringify(ob))
            }).catch((e) => {
                    console.log(e)
                })
        }else{
            this.setState({
                    messagage: quote.title + " => " + quote.mean
                })
        }  
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