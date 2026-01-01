import React from "react";
import '../sass/Setting.scss'
import { connect } from "react-redux";
import { getSettings, setSettingDefault, updateSetting } from "../const/const";
import { toast } from "react-toastify";

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
      if(title_eng === "Font size"){
        return;
      }
        this.setState({
          listSettings:  updateSetting(title_eng, !status, type)
      })
      if(type === "basic" && title_eng === "Dark mode"){
        // Trigger a re-render or any additional logic for dark mode change
        window.location.reload();
      }
    }
    handleChangeStatusOption = (title_eng, status, type, value) => {
      let regex = /^\d+px$/;

      if (regex.test(value)) {
          console.log("Định dạng hợp lệ");
      } else {
          console.log("Định dạng không hợp lệ! Vui lòng nhập số + px (VD: 14px)");
      }
      if(Number(value.replace("px", "")) >= 50){
        toast.warn("Kích thước chữ tối đa 50. Đã cài đặt 50px")
        value = "50";
      }
      if(Number(value.replace("px", "")) <= 8){
        toast.warn("Kích thước chữ nhỏ nhất là 8px. Đã cài đặt 8px")
        value = "8";
      }
      if (!value.endsWith("px")) {
          value += "px";
      }
      
        this.setState({
          listSettings:  updateSetting(title_eng, status, type, value)
      })
      if(type === "basic" && title_eng === "Font size"){
        // Trigger a re-render or any additional logic for dark mode change
        window.location.reload();
      }

    }
  render() {
    let { listSettings, language_type } = this.state;
    return (
      <div className="setting-container">
        <button className="setting-reset-btn" onClick={() => {
            setSettingDefault();
            this.setState({
                listSettings: getSettings()
            });
            window.location.reload()
        }}>{language_type === "EN" ? "Reset to default settings" : "Đặt lại cài đặt mặc định"}</button>
          <div className="setting-form">
              <div className="setting-title">{language_type === "EN" ? "Basic" : "Cơ bản"}</div>
              <div className="setting-list">
                
                  {listSettings && listSettings.length > 0 && listSettings[0]?.data.length > 0 &&  listSettings[0]?.data.map((item, ind) => {
                     return (item.value ? 
                        <div className={`setting-item ${item.status ? 'on' : 'off'}`} onClick={() => this.handleChangeStatus(item.title_english, item.status, "basic")}>
                          <div className="setting-item-title">{language_type === "EN" ? item.title_english : item.title_vietnamese}</div>
                            <div className={`setting-item-status`}>
                              <div className="form-s">
                                <input type="text" id={`v${ind}`} defaultValue={item.value} />
                                <input type="submit" value="Cập nhật" onClick={() => this.handleChangeStatusOption(item.title_english, item.status, "basic", document.getElementById(`v${ind}`).value)}/>
                              </div>
                              
                            </div>
                      </div>
                      :
                      <div className={`setting-item ${item.status ? 'on' : 'off'}`} onClick={() => this.handleChangeStatus(item.title_english, item.status, "basic")}>
                           <div className="setting-item-title">{language_type === "EN" ? item.title_english : item.title_vietnamese}</div>
                            <div className={`setting-item-status`}>{language_type === "EN" ? (item.status ? "ON" : "OFF") : (item.status ? "BẬT" : "TẮT")}</div>
                      </div>
                  )
                  })}
                
              </div>
          </div>
          <div className="setting-form">
              <div className="setting-title">{language_type === "EN" ? "Advandced" : "Nâng cao"}</div>
              <div className="setting-list">
                
                  {listSettings && listSettings.length > 0 && listSettings[1]?.data.length > 0 &&  listSettings[1]?.data.map((item) => {
                    return (item?.value ? 
                        <div className={`setting-item ${item.status ? 'on' : 'off'}`} onClick={() => this.handleChangeStatus(item.title_english, item.status, "advandced")}>
                          <div className="setting-item-title">{language_type === "EN" ? item.title_english : item.title_vietnamese}</div>
                            <div className={`setting-item-status`}>
                              <div className="form-s">
                                <input type="text" value={item.value} /> px
                              </div>
                              <input type="submit"/>
                            </div>
                      </div>
                      :
                      <div className={`setting-item ${item.status ? 'on' : 'off'}`} onClick={() => this.handleChangeStatus(item.title_english, item.status, "advandced")}>
                           <div className="setting-item-title">{language_type === "EN" ? item.title_english : item.title_vietnamese}</div>
                            <div className={`setting-item-status`}>{language_type === "EN" ? (item.status ? "ON" : "OFF") : (item.status ? "BẬT" : "TẮT")}</div>
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
