import React from "react";
import Prev from "./Prev";
import '../sass/GameBoard.scss'

class GameBoard  extends React.Component{

    state = {
        game: {},
        modal: false,
        load: []
    }
    componentDidMount() {

    }
    handleClick = (title) => {
        
        this.setState({
            ...this.state,
            modal: true,
        })
    }
    handleCloseModel = () => {
        this.setState({
            ...this.state,
            modal: false
        })
    }
    
    render(){
        let { modal } = this.state;
        return (<>
            <Prev uri="games" />
            <div className="game-board-container">
                    <div className="game-board-team">
                        <div className="game-board-team-item">
                           
                            <div className="game-board-team-item-title active"><i class="bi bi-caret-right"></i> TEAM 1</div>
                           <div className="point">0</div>
                        </div>
                        <div className="game-board-team-item">
                            
                            <div className="game-board-team-item-title">TEAM 2</div>
                            <div className="point">0</div>
                        </div>
                    </div>
                    {modal && 
                    <div className="game-board-modal">
                        <span className="x-close" onClick={() => this.handleCloseModel()}> X</span>
                        <div className="game-board-question">Bạn là ai?
                        </div>
                        <div className="game-board-thumbnail">
                            <img loading="lazy" src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp"></img>
                        </div>
                        <div className="game-board-answer">
                            <div className="game-board-answer-title">Cá linh</div>
                            <div className="game-board-answer-box">Lật</div>
                        </div>
                    </div>
                    }
                    
                    <div className="game-board">
                            <div className="game-board-item" onClick={(e) => this.handleClick("2")}>
                                    1
                            </div>
                            <div className="game-board-item">
                                2
                            </div>
                            <div className="game-board-item">
                                3
                            </div>
                            <div className="game-board-item">
                                4
                            </div>
                            <div className="game-board-item">
                                5
                            </div>
                            <div className="game-board-item">
                                6
                            </div>
                            <div className="game-board-item">
                                7
                            </div>
                            <div className="game-board-item">
                                8
                            </div>
                            <div className="game-board-item">
                                9
                            </div>
                            <div className="game-board-item">
                                10
                            </div>
                            <div className="game-board-item">
                                    11
                            </div>
                            <div className="game-board-item">
                                12
                            </div>
                            <div className="game-board-item">
                                13
                            </div>
                            <div className="game-board-item">
                                14
                            </div>
                            <div className="game-board-item">
                                15
                            </div>
                            <div className="game-board-item">
                                16
                            </div>
                            <div className="game-board-item">
                                17
                            </div>
                            <div className="game-board-item">
                                18
                            </div>
                            <div className="game-board-item">
                                19
                            </div>
                            <div className="game-board-item">
                                20
                            </div>
                            <div className="game-board-item">
                                21
                            </div>
                            <div className="game-board-item">
                                22
                            </div>
                            <div className="game-board-item">
                                23
                            </div>
                            <div className="game-board-item">
                                24
                            </div>
                    </div>
            </div>
        </>)
    }
}
export default GameBoard;