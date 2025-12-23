import React from "react";
import '../sass/Statictis.scss';
import { connect } from "react-redux";
import UserStatistics from "./UserStatistics";
import TopDeposit from "./TopDeposit";

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

        let  { language_type, dataStatistics, dataTopDeposit } = this.state;
        return (
            <div>
                <h1> {language_type === "EN" ? "Statistics Page" : "Trang Thống Kê"}</h1>
                <div className="statistics-container">
                     <div className="statistic-item">
                        <TopDeposit users={dataTopDeposit} language_type={language_type} />
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