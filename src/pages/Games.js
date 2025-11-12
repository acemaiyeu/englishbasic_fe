import React from "react";
import { connect } from "react-redux";
import '../sass/Games.scss'
class Games extends React.Component{
state = {
        listLesson: [],
        language_type: "EN",
        loadding: true
    }
    
    componentDidMount () {
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

    render(){
        let listVocabulary = [];
        let { language_type } = this.state;
        return (
            <>
                <div className="game-container">
                    <div className="game-types">
                        <div className="game-type-item">
                                Game Board
                        </div>
                        <div className="game-type-item">
                                Quizz
                        </div>
                    </div>
                    <div className="search-game">
                            <label>Search game</label>
                            <div className="form-c">
                                <input type="text" placeholder="search for games?"/>
                                <i class="bi bi-search btn" style={{backgroundColor: "rgba(206, 25, 79, 0.71)"}}></i>
                            </div>
                    </div>
                    <div className="list-games">
                        
                        <div className="game-item">
                            <div className="game-item-modal">Quizz</div>
                            <div className="game-item-img">
                                <img src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp" loading="lazy"/>
                            </div>
                            <div className="game-item-title">
                                Food Guessing Game
                            </div>
                            <div className="game-item-discription">
                                Read the descriptions and guess the food!
                            </div>
                            <div className="game-item-footer">
                                    view 200
                            </div>
                        </div>
                        <div className="game-item">
                            <div className="game-item-modal">Board</div>
                            <div className="game-item-img">
                                <img src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp" loading="lazy"/>
                            </div>
                            <div className="game-item-title">
                                Food Guessing Game
                            </div>
                            <div className="game-item-discription">
                                Read the descriptions and guess the food!
                            </div>
                            <div className="game-item-footer">
                                    view 200
                            </div>
                        </div>

                        <div className="game-item">
                            <div className="game-item-img">
                                <img src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp" loading="lazy"/>
                            </div>
                            <div className="game-item-title">
                                Food Guessing Game
                            </div>
                            <div className="game-item-discription">
                                Read the descriptions and guess the food!
                            </div>
                            <div className="game-item-footer">
                                    view 200
                            </div>
                        </div>

                        <div className="game-item">
                            <div className="game-item-img">
                                <img src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp" loading="lazy"/>
                            </div>
                            <div className="game-item-title">
                                Food Guessing Game
                            </div>
                            <div className="game-item-discription">
                                Read the descriptions and guess the food!
                            </div>
                            <div className="game-item-footer">
                                    view 200
                            </div>
                        </div>

                        <div className="game-item">
                            <div className="game-item-img">
                                <img src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp" loading="lazy"/>
                            </div>
                            <div className="game-item-title">
                                Food Guessing Game
                            </div>
                            <div className="game-item-discription">
                                Read the descriptions and guess the food!
                            </div>
                            <div className="game-item-footer">
                                    view 200
                            </div>
                        </div>

                        <div className="game-item">
                            <div className="game-item-img">
                                <img src="https://media.baamboozle.com/uploads/images/295349/272f3986-26ad-42b2-af92-540c5c99ef95.webp" loading="lazy"/>
                            </div>
                            <div className="game-item-title">
                                Food Guessing Game
                            </div>
                            <div className="game-item-discription">
                                Read the descriptions and guess the food!
                            </div>
                            <div className="game-item-footer">
                                    view 200
                            </div>
                        </div>

                         <div className={`data-manager-footer ${language_type !== "EN" ? "width-custom-vn" : ""}`} >
                    <button 
                    onClick={() => this.PageVocabulary(1)}
                    disabled={listVocabulary?.meta?.pagination?.current_page === 1}>{ language_type === "EN" ? "First" : "Trang đầu"}</button>
                    <button 
                    onClick={() => this.PageVocabulary(listVocabulary?.meta?.pagination?.current_page - 1)}
                    disabled={listVocabulary?.meta?.pagination?.current_page <= 1}>{ language_type === "EN" ? "Prev" : "Trang trước"}</button>
                    <button >{JSON.stringify(listVocabulary?.meta?.pagination?.current_page)}1</button>
                    <button
                    disabled={listVocabulary?.meta?.pagination?.current_page === listVocabulary?.meta?.pagination?.total_pages}
                    onClick={() => this.PageVocabulary(listVocabulary?.meta?.pagination?.current_page + 1)}
                    >{ language_type === "EN" ? "Next" : "Trang tiếp"}</button>
                    <button 
                    disabled={listVocabulary?.meta?.pagination?.total_pages === listVocabulary?.meta?.pagination?.current_page}
                    onClick={() => this.PageVocabulary(listVocabulary?.meta?.pagination?.total_pages)}>{ language_type === "EN" ? "Last" : "Trang cuối"}</button>
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
export default connect(mapStateToProps)(Games);