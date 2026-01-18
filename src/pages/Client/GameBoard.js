import React from "react";
import Prev from "./Prev";
import '../sass/GameBoard.scss'
import axios from "axios";
import { API_URL } from "../const/const";
import { connect } from "react-redux";

class GameBoard  extends React.Component{

    state = {
        game: {},
        modal: false,
        load: [],
        question_loadding: "",
        answer_loadding: "",
        open_box: false,
        point_on_row: 15,
        active_team: "TEAM 1",
        point_team_1: 0,
        point_team_2: 0,
        game_losed: [],
        language_type: "EN",
        complete_form: false,
        total_item: 24
    }
    componentDidMount() {
        this.getGame(this.props.match.params.id);
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
    handleClick = (index_question) => {
        let { game, game_losed} = this.state;
        if(game_losed.some(e => e.index === index_question)){

        }else{
           
            let questions  = [];
            if(game.details?.questions){
                questions = game.details.questions;
            }
            this.setState({
                modal: true,
                question_loadding: questions[index_question].title_english,
                answer_loadding: questions[index_question].answers[0].text,
                open_box: false,
                game_losed: [...this.state.game_losed, {
                    index: index_question
                }]
            })
        }
        
        
    }
    handleCloseModel = () => {
        this.setState({
            modal: false
        })
    }
    getGame = (id) => {
        axios.get(`${API_URL}/game/${id}`).then((res) => {
            this.setState({
                game: res.data.data
            })
        })
    }
    handleChangeOpenBox = () => {
        this.setState({
            open_box: true
        })
    }
    handleChangeCorrect = (status) => {
        let { active_team, point_on_row } = this.state;
        if(status === "correct"){
            if(active_team === "TEAM 1"){
                this.setState({
                    point_team_1: (this.state.point_team_1 + point_on_row)
                })

            }
            if(active_team === "TEAM 2"){
                this.setState({
                    point_team_2: (this.state.point_team_2 + point_on_row)
                })
            }
        }
       this.setState({
            modal: false
        }, () => {
            // Đoạn code này chỉ chạy SAU KHI 'modal' đã được cập nhật thành 'false'
            // console.log(">>>>>>>>>>>", this.state.modal); // Lúc này sẽ trả về false
             this.changeTeam(this.state.active_team);
        });
       
       
    }
    changeTeam = (team) => {
        let { game_losed } = this.state;
        if (team === "TEAM 1"){
            this.setState({
                active_team: "TEAM 2"
            })
        }
        if (team === "TEAM 2"){
            this.setState({
                active_team: "TEAM 1"
            })
        }
        if(game_losed.length === 24){
            this.setState({
                complete_form: true
            })
        }
    }
    render(){
        let { modal, question_loadding, answer_loadding, open_box, active_team, point_team_1, point_team_2, game_losed, language_type, complete_form} = this.state;
       
        return (<>
                
            <div className="game-board-container">
                <Prev uri="games" />     
             {complete_form &&      
             <div className="modal-board-end">
                <div className="modal-board-end-content">
                    <h2>{language_type === "EN" ? `Conratulation Team ${complete_form && (point_team_1 > point_team_2) ? "1" : ""} ${complete_form && (point_team_1 < point_team_2) ? "2" : ""} Win`: `Chúc mừng đội ${complete_form && (point_team_1 > point_team_2) ? "1" : ""} ${complete_form && (point_team_1 < point_team_2) ? "2" : ""} đã chiến thắng`}</h2>
                    <button type="button" onClick={() => window.location.href="/games"}>{language_type === "EN" ? "Exit" : "Thoát"}</button>
                </div>
            </div>
            }
                    <div className="game-board-team">
                        <div className="game-board-team-item">
                           
                            <div className={`game-board-team-item-title ${active_team === "TEAM 1" ? 'active' : ''}`}>{active_team === "TEAM 1" &&  <i class="bi bi-caret-right"></i> }TEAM 1</div>
                           <div className="point">{point_team_1}</div>
                        </div>
                        <div className="game-board-team-item">
                            
                            <div className={`game-board-team-item-title ${active_team === "TEAM 2" ? 'active' : ''}`}>{active_team === "TEAM 2" &&  <i class="bi bi-caret-right"></i> }TEAM 2</div>
                            <div className="point">{point_team_2}</div>
                        </div>
                    </div>
                    {modal && 
                    <div className="game-board-modal">
                        <span className="x-close" onClick={() => this.handleCloseModel()}> X</span>
                        <div className="game-board-question">{question_loadding}
                        </div>
                        <div className="game-board-thumbnail">
                            <img loading="lazy" src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp" alt=""></img>
                        </div>
                        <div className="game-board-answer">
                            <div className="game-board-answer-title">{answer_loadding}</div>
                            <div className={`game-board-answer-box ${open_box ? 'hidden' : ''}`} onClick={() => this.handleChangeOpenBox()}>{language_type === "EN" ? "OPEN" : "Lật"}</div>
                             <div className="game-board-correct">
                                <button type="button" class="btn btn-danger" onClick={() => this.handleChangeCorrect("uncorrect")}><i class="bi bi-x-lg"></i></button>
                                <button type="button" class="btn btn-primary" onClick={() => this.handleChangeCorrect("correct")}><i class="bi bi-patch-check"></i></button>
                            </div>
                        </div>
                       
                    </div>
                    }
                    
                    <div className="game-board">
                        {
                        [...Array(24)].map((_, index) => (
                            <div 
                            key={index} // Quan trọng: Thêm key duy nhất cho mỗi phần tử
                            className={`game-board-item ${
                                game_losed.some(e => e.index === index) ? 'disabled' : ''
                            }`}
                            onClick={(e) => this.handleClick(index)} // Thay đổi tham số, sử dụng index
                            >
                            {index + 1}
                            </div>
                        ))
                        }
                    </div>
            </div>
        </>)
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(GameBoard);
