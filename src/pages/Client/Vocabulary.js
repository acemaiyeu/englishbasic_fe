import React from "react";
import '../sass/VocabularyBox.scss'


class Vocabulary extends React.Component {


    
    redirectToLession = () => {
        this.props.history.push("/list-lesson");
    }
    
    render() {
        return (
            <>
                <div className="box">
                    <div className="box-item" onClick={() => this.redirectToLession()}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVp31k_lltLZtrh9lSfc_7WfkpLfgte8JwQ&s" loading="lazy" alt=""></img>
                    </div>
                    <div className="box-item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Tm9rLPEcCt91YtI32mRnEmDVSZYT2BjoVu_v98XcWD5wgCKz0nroZTEjSlLLbk_EgXM&usqp=CAU" alt="" loading="lazy"></img>
                    </div>
                </div>
            </>
        )
    }
}
export default Vocabulary;