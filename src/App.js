import  {  useState  } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuAdmin from "./pages/MenuAdmin";
import Grammar from "./pages/Grammar";
import VocabularyListLesson from './pages/VocabularyListLesson'
import Vocabulary  from "./pages/Vocabulary";
import VocabularyListLessonDetail from "./pages/VocabularyListLessonDetail"
import './App.css';
import VocabularyLesson from './pages/VocabularyLesson'
import { changeLanguage } from '../src/reduce/actions'
import { useDispatch } from 'react-redux';
import ManagerData from "./pages/ManagerSubject";
import ManagerSubject from "./pages/ManagerSubject";
import ManagerVocabulary from "./pages/ManagerVocabulary";
import ManagerQuestion  from "./pages/ManagerQuestion";
import ipaList from "./pages/ipaList";
import ManagerVocabularyIPA from "./pages/ManagerVocabularyIPA";
import ListenWrite from './pages/ListenWrite';
import ChatApp from './pages/ChatApp'

const App = () => {
  const dispatch = useDispatch();
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
         }}>English Basic</b> <i>by #Loyper</i></div>
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
      <div className="content">
        { window.location.pathname.includes("admin") ? 
        <>
        <MenuAdmin/>
        <Switch>
          <Route path="/pages/admin/manager-data" component={ManagerSubject} />
          <Route path="/pages/admin/manager-subject" component={ManagerSubject} />
          <Route path="/pages/admin/manager-vocabulay" component={ManagerVocabulary} />
          <Route path="/pages/admin/manager-vocabulay-ipa" component={ManagerVocabularyIPA} />
          <Route path="/pages/admin/manager-questions" component={ManagerQuestion} />
          <Route path="/pages/admin/" exact component={Home} />
        </Switch>
        </>   
        : 
          <>
          <Menu/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/vocabularybox" component={Vocabulary} />
          <Route path="/grammerbox" component={Grammar} />
          <Route path="/list-lesson" component={VocabularyListLesson} />
          <Route path="/list-lesson-details/:lesson_id" component={VocabularyListLessonDetail} />
          <Route path="/lesson/:id" component={VocabularyLesson} />
          <Route path="/listen-write" component={ListenWrite } />
          
          <Route path="/pages/admin/manager-data" component={ManagerData} />
          {/* IPA */}
          <Route exact path="/ipa" component={ipaList} />
          <Route exact path="/chat-app" component={ChatApp} />
        </Switch>
        </>
      }
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
    
  );
};

export default App;
