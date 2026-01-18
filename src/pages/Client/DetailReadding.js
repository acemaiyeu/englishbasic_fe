import axios from "axios";
import React from "react";
import { API_URL } from "../const/const";
import '../sass/ReadingDetail.scss'
import Prev from "./Prev";

class DetailReadding extends React.Component {
    state = {
        type: "",
        readding: {}
    }

    componentDidMount(){
        const { url } = this.props.match.params;
        this.setState({
            url: url,
        })
        this.getDetailReaddingByPage(url);
    }
    getDetailReaddingByPage = async (url) => {
            if( url){
                await axios.get(`${API_URL}/reading/${url}`).then((res) => {
                    this.setState({
                        readding: res.data.data,
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }  
        }
        handleOnClick = (url) => {
            window.location.href = "/reading/" + url;
        }

    render(){
        let { readding } = this.state;
        return (    
            <div className="reading-detail-container">
                <div className="reading-detail-prev">
                    <Prev 
                        title={readding.title}
                        uri={`readings/${readding.type}`}
                    />
                </div>
                <div className="reading-detail-header">
                    <h2 className="reading-detail-title">
                         {readding.title}
                    </h2>
                    <div className="reading-detail-subtitle">
                        {readding.subtitle}
                    </div>
                </div>
                <div className="reading-item">
                    {readding && <div className="reading-body">
                        {readding.words}
                    </div>}
                    {readding && readding.audio_url && 
                           <div className="reading-audio">

                                <iframe 
                                    src={"https://drive.google.com/file/d/" + (readding.audio_url.replace('https://drive.google.com/file/d/',"")).replace("/view?usp=sharing","") + "/preview"}
                                    width="auto" 
                                    height="60" 
                                    allow="autoplay"
                                    style={{ border: "none", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", textAlign: "center" }}
                                    title="Audio Player"// Tắt viền mặc định của iframe
                                ></iframe>
                            </div>
                            }
                </div>
            </div>
            
        )  
    }   
}
export default DetailReadding;