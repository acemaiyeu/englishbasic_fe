import React from "react";
import '../sass/VocabularyBox.scss'

class VocabularyTest extends React.Component {


    render() {
        return (
            <>
                <div className="box">
                     <div className="box-item">
                            <img src="https://www.shutterstock.com/image-photo/word-vocabulary-made-cut-out-260nw-2419798419.jpg" loading="lazy"></img>
                    </div>
                    <div className="box-item">
                            <img src="https://cdn.vectorstock.com/i/500p/93/45/grammar-learning-concepts-vector-26899345.jpg" loading="lazy"></img>
                    </div>
                </div>
            </>
        )
    }
}
export default VocabularyTest;