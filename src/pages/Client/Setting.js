import React from "react";
import '../sass/Setting.scss'
import { connect } from "react-redux";
import { getSettings, setSettingDefault, updateSetting } from "../const/const";

class Setting extends React.Component{

  state=  {
    language_type: "EN",
    listSettings: []
  }
  componentDidMount(){
        
        this.setState({
            language_type: this.props.language_type,
            listSettings: getSettings()
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.language_type !== this.props.language_type) {
            this.setState({
                language_type: this.props.language_type,
            });
        }
    }
    
    handleChangeStatus = (title_eng, status, type) => {
        this.setState({
          listSettings:  updateSetting(title_eng, !status, type)
      })
    }
  render() {
    let { listSettings, language_type } = this.state;
    return (
      <div className="setting-container">
          <div className="setting-form">
              <div className="setting-title">{language_type === "EN" ? "Basic" : "Cơ bản"}</div>
              <div className="setting-list">
                
                  {listSettings && listSettings.length > 0 && listSettings[0]?.data.length > 0 &&  listSettings[0]?.data.map((item) => {
                     return ( <div className="setting-item" onClick={() => this.handleChangeStatus(item.title_english, item.status, "basic")}>
                    <div className="setting-item-title">{language_type === "EN" ? item.title_english : item.title_vietnamese}</div>
                    <div className="setting-item-status">{language_type === "EN" ? (item.status ? "ON" : "OFF") : (item.status ? "BẬT" : "TẮT")}</div>
                  </div>
                  )
                  })}
                
              </div>
          </div>
          <div className="setting-form">
              <div className="setting-title">{language_type === "EN" ? "Advandced" : "Nâng cao"}</div>
              <div className="setting-list">
                
                  {listSettings && listSettings.length > 0 && listSettings[1]?.data.length > 0 &&  listSettings[1]?.data.map((item) => {
                    return ( <div className="setting-item" onClick={() => this.handleChangeStatus(item.title_english, item.status, "advandced")}>
                    <div className="setting-item-title">{language_type === "EN" ? item.title_english : item.title_vietnamese}</div>
                    <div className="setting-item-status">{language_type === "EN" ? (item.status ? "ON" : "OFF") : (item.status ? "BẬT" : "TẮT")}</div>
                  </div>
                  )
                  })}
                
              </div>
          </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps)(Setting);
