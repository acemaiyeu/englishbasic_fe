import  {  useEffect, useState  } from "react";
import {  useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Menu from "./pages/Client/Menu";
import MenuAdmin from "./pages/Admin/MenuAdmin";
import Grammar from "./pages/Client/Grammar";
import VocabularyListLesson from './pages/Client/VocabularyListLesson'
import Vocabulary  from "./pages/Client/Vocabulary";
import VocabularyListLessonDetail from "./pages/Client/VocabularyListLessonDetail"
import './App.css';
import VocabularyLesson from './pages/Client/VocabularyLesson'
import { changeLanguage, setUser } from './reduce/actions'
import { useDispatch } from 'react-redux';
import ManagerData from "./pages/Admin/ManagerSubject";
import ManagerSubject from "./pages/Admin/ManagerSubject";
import ManagerVocabulary from "./pages/Admin/ManagerVocabulary";
import ManagerQuestion  from "./pages/Admin/ManagerQuestion";
import ipaList from "./pages/Client/ipaList";
import ManagerVocabularyIPA from "./pages/Admin/ManagerVocabularyIPA";
import ListenWrite from './pages/Client/ListenWrite';
import ChatApp from './pages/Client/ChatApp'
import AuthContainer from "./pages/Client/AuthContainer";
import ManagerListenWrite from "./pages/Admin/ManagerListenWrite";
import ListenWriteList from "./pages/Client/ListenWriteList";
import ManagerExport from "./pages/Admin/ManagerExport";
import Games from "./pages/Client/Games";
import GameBoard from "./pages/Client/GameBoard";
import { API_URL, auth } from "./pages/const/const";
import ZaloChatApp from "./pages/Client/ZaloChatApp";
import AuthContainerAdmin from "./pages/Admin/AuthContainerAdmin";
import AdminLogin from "./pages/Admin/AdminLogin";
import RealTimeQuiz from "./pages/sass/RealTimeQuiz";
import QuizApp from "./pages/Client/QuizApp";
import ChatApp2 from "./pages/Client/ChatApp2";
import Gamequiz from "./pages/Client/Gamequiz";
import ListComponent from "./pages/Client/ListComponent";
import EnglishEveryDay from "./pages/Client/EnglishEveryDay";
import Setting from "./pages/Client/Setting";
import Statistics from "./pages/Client/Statictics";
import ListReadding from "./pages/Client/ListReadding";
import DetailReadding from "./pages/Client/DetailReadding";
import MenuV2 from "./pages/Client/MenuV2";
import ListSubjects from "./pages/Client/ListSubjects";

const App = () => {
  const dispatch = useDispatch();
  // 2. ✅ KHỞI TẠO: Sử dụng hook useHistory
  const history = useHistory(); 
  
  const [language, setLanguage] = useState({
    language_type: "EN",
    language_text: "Language",
    language_list: ["English", "Vietnamese"],
  });
  
  const changeLanguages = (type) => {

    dispatch(changeLanguage(type))
    if (type === "English"){
      setLanguage(
        {
          language_type: "EN",
          language_text: "Language",
          language_list: ["English", "Vietnamese"]
        }
      )
      
    }else{
      setLanguage(
        {
          language_type: "VI",
          language_text: "Ngôn ngữ",
          language_list: ["English", "Vietnamese"]
        }
      )
    }
   
  };

  return (
    
    <Router>
      <header>
         <div className="title"><b onClick={() => {
          window.location.href = "/"
         }}>English Basic</b> <i>by #{auth}</i></div>
         <div className="language">
                             {language.language_text}: 
                             <select onChange={(e) => changeLanguages(e.target.value)}>
                                 {language.language_list && language.language_list.length > 0 && language.language_list.map((i, n) => {
                                     return (
                                         <option  selected={((language.language_list[n]).slice(2)).toLocaleLowerCase() === (language.language_type).toLocaleLowerCase()} key={n} value={i} >{i}</option>
                                     )
                                 })}
                                 
                             </select>
        </div>
      </header>
      { window.location.pathname.includes("admin") ? 
         <MenuAdmin/> :
      // (window.location.pathname.includes("/v2/") ? <MenuV2/> : <Menu/>)
      <MenuV2/>
      }
     
      <div className="content">
        { window.location.pathname.includes("admin") ? 
        <>
        
        <Switch>
          <Route path="/pages/admin/manager-data" component={ManagerSubject} />
          <Route path="/pages/admin/manager-subject" component={ManagerSubject} />
          <Route path="/pages/admin/manager-vocabulay" component={ManagerVocabulary} />
          <Route path="/pages/admin/manager-vocabulay-ipa" component={ManagerVocabularyIPA} />
          <Route path="/pages/admin/manager-questions" component={ManagerQuestion} />
          <Route path="/pages/admin/" exact component={Home} />
          <Route path="/pages/admin/manager-listen-write" exact component={ManagerListenWrite} />
          <Route path="/pages/admin/manager-export-excel" exact component={ManagerExport} />
          <Route path="/pages/admin/counter" exact component={ZaloChatApp} />
          <Route path="/pages/admin/login" exact component={AdminLogin} />
          
        </Switch>
        </>   
        : 
          <>
          
        <Switch>
          <Route path="/" exact component={Statistics} />
          <Route path="/subjects" component={ListSubjects} />
          <Route path="/vocabularybox" component={Vocabulary} />
          <Route path="/grammerbox" component={Grammar} />
          <Route path="/list-lesson" component={VocabularyListLesson} />
          <Route path="/list-lesson-details/:lesson_id" component={VocabularyListLessonDetail} />
          <Route path="/lesson/:id" component={VocabularyLesson} />
          <Route path="/listen-write/:id" component={ListenWrite } />
          <Route path="/listen-write-list" component={ListenWriteList } />
          <Route path="/games" component={Games} />
          <Route path="/game/board/:id" component={GameBoard} />
          {/* <Route path="/game/quiz/:id" component={RealTimeQuiz} /> */}
          <Route path="/game/quiz/:id" component={Gamequiz} />
          {/* <Route path="/quiz" component={QuizHost} /> */}
          <Route path="/chat-app" component={ChatApp2} />
          <Route path="/readings/:type" component={ListReadding} />
          <Route path="/reading/:url" component={DetailReadding} />
          
          <Route 
          path="/reading" 
          exact
          render={(routerProps) => (
            <ListComponent 
              // 1. Luôn truyền props của router (history, match, location)
              {...routerProps}
              
              // 2. Các props tùy chỉnh của bạn
              title_english_1="Reading sort words" 
              title_vietnamese_1="Đọc đoạn văn ngắn" 
              url_img_1="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHAhUv2dM73mg--xBV0j5X1EuOk_GiPre5Q&s" 
              url_img_2="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfV4-viZjiphsDSxnVZr_obOhk12QP2E_vlA&s"
              url_direct_1="readings/short-words"
              url_direct_2="readings/stories"
              title_english_2="Reading Stories" 
              title_vietnamese_2="Đọc truyện"
            />
          )} 
        />
        <Route path="/setting" component={Setting} />
          
          
          <Route path="/pages/admin/manager-data" component={ManagerData} />
          {/* IPA */}
          <Route exact path="/ipa" component={ipaList} />
          <Route exact path="/chat-app" component={ChatApp} />
          <Route exact path="/login" component={AuthContainer} />
        </Switch>
        </>
      }
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="box-vocabulary">
          <div>{language.language_type === "EN" ? "English everyday" : "Học tiếng anh mỗi ngày"}: <span><EnglishEveryDay /></span></div>
      </div>
    </Router>
    
  );
};

export default App;
