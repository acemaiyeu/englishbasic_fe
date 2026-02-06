import  {  useEffect, useState  } from "react";
import {   BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import MenuAdmin from "./pages/Admin/MenuAdmin";
import Grammar from "./pages/Client/Grammar";
import VocabularyListLesson from './pages/Client/VocabularyListLesson'
import Vocabulary  from "./pages/Client/Vocabulary";
import VocabularyListLessonDetail from "./pages/Client/VocabularyListLessonDetail"
import './App.css';
import VocabularyLesson from './pages/Client/VocabularyLesson'
import { changeLanguage } from './reduce/actions'
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
import { getDarkMode, getSettingByTitleAdvand } from "./pages/const/const";
import ZaloChatApp from "./pages/Client/ZaloChatApp";
import AdminLogin from "./pages/Admin/AdminLogin";
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
import ListSubjectsMissons from "./pages/Client/ListSubjectsMissons";
import VocabularyComponent from "./pages/Client/VocabularyComponent";
import ReadingComponent from "./pages/Client/ReadingComponent";
import ListeningComponent from "./pages/Client/ListeningComponent";
import AccountProfile from "./pages/Client/AccountProfile";
import ListGrammars from "./pages/Client/ListGrammars";
import ListGrammarMissons from "./pages/Client/ListGrammarMissons";
import LessonGrammar from "./pages/Client/LessonGrammar";
import ManagerGrammar from "./pages/Admin/ManagerGrammar";
import '../src/pages/sass/allpage.scss'
import ExerciseComponent from "./pages/Client/ExerciseComponent";

const App = () => {
  const dispatch = useDispatch();
  
  const [language, setLanguage] = useState({
    language_type: "EN",
    language_text: "Language",
    language_list: ["English", "Vietnamese"],
  });
  const [englishEveryday, setEnglishEveryday] = useState(true)
  if(!localStorage.getItem("language_type")){
    localStorage.setItem("language_type", "EN");
  }
  useEffect(() => {
    // load language_type from localStorage
    let language_type = localStorage.getItem("language_type");
    if (language_type === "EN") {
      setLanguage({
        language_type: "EN",
        language_text: "Language",
        language_list: ["English", "Vietnamese"],
      });
      dispatch(
        changeLanguage("English")
      );
    } else {
      setLanguage({
        language_type: "VI",
        language_text: "Ngôn ngữ",
        language_list: ["English", "Vietnamese"],
      });
      dispatch(
        changeLanguage("Vietnamese")
      );
    }
    if(!getSettingByTitleAdvand("English everyday")){
      setEnglishEveryday(false)
    }
  }, []);
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
      localStorage.setItem("language_type", "EN");
    }else{
      setLanguage(
        {
          language_type: "VI",
          language_text: "Ngôn ngữ",
          language_list: ["English", "Vietnamese"]
        }
      )
      localStorage.setItem("language_type", "VI");
    }
   
  };
  return (
    
    <Router>
      <header>
      </header>
      <div className="modal-default">
        <div className="modal-default-box">
          <div className="modal-default-header">Có lẽ đây là lần đầu bạn đến với trang web này!</div>
          <div className="modal-default-content"> Chào mừng bạn đến với trang học tiếng Anh miễn phí của chúng tôi. Ở đây bạn có thể học từ vựng, ngữ pháp, phát âm, luyện nghe viết và chơi các trò chơi để nâng cao kỹ năng tiếng Anh của mình. Chúc bạn học tập vui vẻ và hiệu quả!</div>
          <div className="modal-default-footer">
            <button className="btn btn-primary" onClick={() => {
              localStorage.setItem("first_visit", "true");
              document.querySelector(".modal-default").style.display = "none";
            }}>{language.language_type === "EN" ? "Close" : "Đóng"}</button>
          </div>
        </div>
      </div>
      { window.location.pathname.includes("admin") ? 
         <MenuAdmin/> :
      // (window.location.pathname.includes("/v2/") ? <MenuV2/> : <Menu/>)
      // <Menu/>
      <MenuV2/>
      }
     <div className={`language ${getDarkMode() ? 'dark-mode' : ''}`}>
                             <span className="lang-title">{language.language_text}:</span> 
                             <select onChange={(e) => changeLanguages(e.target.value)}>
                                 {language.language_list && language.language_list.length > 0 && language.language_list.map((i, n) => {
                                     return (
                                         <option  selected={((language.language_list[n]).slice(0,2)).toLocaleLowerCase() === (language.language_type).toLocaleLowerCase()} key={n} value={i} >{i}</option>
                                     )
                                 })}
                                 
                             </select>
        </div>
      <div className={`content ${getDarkMode() ? 'dark-mode' : ''}`}>
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
          <Route path="/pages/admin/manager-grammars" exact component={ManagerGrammar} />
          
        </Switch>
        </>   
        : 
          <>
          
        <Switch>
          <Route path="/" exact component={Statistics} />
          <Route path="/subjects" exact component={ListSubjects} />
          <Route path="/subjects/:subject_id" exact component={ListSubjectsMissons} />
          <Route path="/subjects/vocabulary/:subject_id" exact component={VocabularyComponent} />
          <Route path="/subjects/vocabulary/testing/:subject_id" exact component={ExerciseComponent} />
          <Route path="/subjects/reading/:subject_id" exact component={ReadingComponent} />
          <Route path="/subjects/listening/:subject_id" exact component={ListeningComponent} />
          <Route path="/subjects/url" component={VocabularyListLesson} />
          <Route path="/vocabularybox" component={Vocabulary} />
          <Route path="/grammerbox" component={Grammar} />
          <Route path="/grammar/lesson/:grammar_id" component={LessonGrammar} />
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
          <Route path="/profile" component={AccountProfile} />

          <Route path="/grammarbox" component={ListGrammars} />
          <Route exact path="/grammar/:id" component={ListGrammarMissons} />
          <Route exact path="/grammar/lesson/:id" component={ListGrammarMissons} />
          <Route exact path="/grammar/exercise/:id" component={ExerciseComponent} />
          <Route exact path="/grammar/final/:id" component={ListGrammarMissons} />
          
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
      {englishEveryday &&
        <div className="box-vocabulary">
            <div>{language.language_type === "EN" ? "English everyday" : "Học tiếng anh mỗi ngày"}: <span><EnglishEveryDay /></span></div>
        </div>
      }
    </Router>
    
  );
};

export default App;
