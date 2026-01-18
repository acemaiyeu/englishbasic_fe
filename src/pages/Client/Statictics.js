import React from "react";
import '../sass/Statictis.scss';
import { connect } from "react-redux";
import UserStatistics from "./UserStatistics";
import TopDeposit from "./TopDeposit";
import TopVocabulary from "./TopVocabulary";

class Statistics extends React.Component {
    state = {
        language_type: "EN",
        dataStatistics: [
            { date: 'T2', count: 120 },
            { date: 'T3', count: 150 },
            { date: 'T4', count: 180 }
        ],
        dataTopDeposit: [
            { id: 1, name: "Nguyễn Văn A", amount: 500000 },
            { id: 2, name: "Trần Thị B", amount: 1200000 },
            { id: 3, name: "Lê Văn C", amount: 850000 },
            ],
        dataDayLearnVocabulary: [
                { id: 1, userId: 'user01', name: 'Thanh Bình', wordCount: 150 },
                { id: 2, userId: 'user02', name: 'Minh Tuấn', wordCount: 300 }, // Sẽ lên top 1
            ],
        dataMonthLearnVocabulary: [
                { id: 1, userId: 'user01', name: 'Thanh Bình', wordCount: 4500 },
                { id: 2, userId: 'user02', name: 'Minh Tuấn', wordCount: 2100 },
            ]
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
    

    render() {

        let  { language_type, dataStatistics, dataTopDeposit, dataDayLearnVocabulary, dataMonthLearnVocabulary } = this.state;
        return (
            <div className="statistics-page">
                <h1> {language_type === "EN" ? "Statistics Page" : "Trang Thống Kê"}</h1>
                <div className="statistics-container">
                     <div className="statistic-item">
                        <TopDeposit users={dataTopDeposit} language_type={language_type} />
                    </div>
                    <div className="statistic-item">
                        <TopVocabulary dataDay={dataDayLearnVocabulary} dataMonth={dataMonthLearnVocabulary} language_type={language_type} />
                    </div>
                    <div className="statistic-item">
                        <UserStatistics data={dataStatistics} language_type={language_type} />
                    </div>
                   
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(Statistics);