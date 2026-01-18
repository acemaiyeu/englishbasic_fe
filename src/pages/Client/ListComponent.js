import React from "react";
import '../sass/VocabularyBox.scss'
import { connect } from "react-redux";


class ListComponent extends React.Component {

    state = {
        language_type: "EN"
    }
    componentDidMount(){
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
    redirect = (url_direct) => {
        this.props.history.push("/" + url_direct);
    }
    
    render() {
        let { url_img_1, url_img_2, title_english_1, title_vietnamese_1, title_vietnamese_2, title_english_2,url_direct_1, url_direct_2, language_type } = this.props;
        return (
            <>
                <div className="box">
                    <div className="box-item" onClick={() => this.redirect(url_direct_1)}>
                            <img src={url_img_1} loading="lazy" alt=""></img>
                            <div className="box-item-title">{language_type === "EN" ? title_english_1 : title_vietnamese_1}</div>
                    </div>
                    <div className="box-item" onClick={() => this.redirect(url_direct_2)}>
                            <img src={url_img_2} loading="lazy" alt=""></img>
                             <div className="box-item-title">{language_type === "EN" ? title_english_2 : title_vietnamese_2}</div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ListComponent);