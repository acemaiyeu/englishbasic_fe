import axios from "axios";
import React from "react";
import { API_URL } from "../const/const";
import '../sass/ReadingList.scss'
import Prev from "./Prev";

class ListReadding extends React.Component {
    state = {
        type: "",
        listReaddings: [],
        current_page: 1,
        limit: 10,
    }

    componentDidMount(){
        const { type } = this.props.match.params;
        this.setState({
            type: type,
        })
        this.getListReaddingByPage(1);
    }
    getListReaddingByPage = async (page) => {
        const { type, limit } = this.state;
           await axios.get(`${API_URL}/readings?page=${page}&limit=${limit}&type=${type}`).then((res) => {
                this.setState({
                    listReaddings: res.data.data,
                })
            }).catch((err) => {
                console.log(err);
            })
        }
        handleOnClick = (url) => {
            window.location.href = "/reading/" + url;
        }

    render(){
        let { listReaddings } = this.state;
        return (    
            <div className="reading-list-container">
                <div className="prev">
                    <Prev 
                        uri={`readings`}
                    />
                </div>
                <div className="reading-list-body">
                {listReaddings && listReaddings.length > 0 && listReaddings.map((item, index) =>
                <div className="reading-item" onClick={() => this.handleOnClick(item.url)} key={item.url} style={{ backgroundImage: `url(${item.thumbnail})` }}>
                    <div className="reading-modal-header">{item.type}</div>
                    <h2 className="reading-list-title">
                        {item.title}
                        </h2>
                </div>
                )}
                </div>
            </div>
            
        )  
    }   
}
export default ListReadding;