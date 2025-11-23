import React from "react";
import '../sass/ipaList.scss'
import { connect } from "react-redux";
import SpeakerIcon from "./SpeakerIcon";
import i_dai from '../../audio/I dai.mp3'
import i_ngan from '../../audio/i_ngan.mp3'
import e from '../../audio/e.mp3'
import ə from '../../audio/ə.mp3'
import u_ngan from '../../audio/u_ngan.mp3'
import u_dai from '../../audio/u_dai.mp3'
import p from '../../audio/p.mp3'
import b from '../../audio/b.mp3'
import t from '../../audio/t.mp3'
import d from '../../audio/d.mp3'
import f from '../../audio/f.mp3'
import v from '../../audio/v.mp3'
import θ from '../../audio/θ.mp3'
import ð from '../../audio/ð.mp3'
import m from '../../audio/m.mp3'
import n from '../../audio/n.mp3'
import ŋ from '../../audio/ŋ.mp3'
import h from '../../audio/h.mp3'
import tsh from '../../audio/t∫.mp3'
import dʒ from '../../audio/dʒ.mp3'
import k from '../../audio/k.mp3'
import g from '../../audio/g.mp3'
import s from '../../audio/s.mp3'
import z from '../../audio/z.mp3'
import sh from '../../audio/∫.mp3'
import ʒ from '../../audio/ʒ.mp3'
import l from '../../audio/l.mp3'
import r from '../../audio/r.mp3'
import w from '../../audio/w.mp3'
import j from '../../audio/j.mp3'
import ɜ from '../../audio/ɜ.mp3'
import ɔ from '../../audio/ɔ.mp3'
import æ from '../../audio/æ.mp3'
import ʌ from '../../audio/ʌ.mp3'
import ɒ from '../../audio/ɒ.mp3'
// import ɪə from '../../audio/ɪə.mp3'
import iə from '../../audio/ɪə.mp3'
import eɪ from '../../audio/eɪ.mp3'
import ʊə from '../../audio/ʊə.mp3'
import ɔɪ from '../../audio/ɔɪ.mp3'
import əʊ from '../../audio/əʊ.mp3'
import eə from '../../audio/eə.mp3'
import aɪ from '../../audio/aɪ.mp3'
import aʊ from '../../audio/aʊ.mp3'






// import AudioButton from "./AudioButton";
// import PronunciationPractice from "./PronunciationPractice";
import axios from "axios";
import { API_URL } from "../const/const.js";
import PronunciationChecker from "./PronunciationChecker.jsx";

class ipaList extends React.Component {


    
    state = {
        language_type: "EN",
        test_void_modal: false,
        listVocabulary: [],
        index: 0
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
    handleClickItem = (sound) => {
        this.setState({
            ...this.state,
            test_void_modal: true,
            sound: sound,
        })
        this.getListVocabularyByTitle(sound);
    }
    getListVocabularyByTitle = (vocabulary) => {
        axios.get(`${API_URL}/admin/lesson-details?type=ipa&sound=`+vocabulary+`&page=1&limit=100`)
        .then((res) => {
            this.setState({
                ...this.state,
                listVocabulary: res.data.data
            })
        })
    }
    render() {
        let { language_type, test_void_modal, listVocabulary, index } = this.state;
        listVocabulary = [{
            title_english: this.state.sound,
        }, ...this.state.listVocabulary]
        
        return (
            <>
                <div className="ipa-container">
                    {test_void_modal && listVocabulary && listVocabulary.length > 0&& <div className="test-void-modal">
                        <div className="x" onClick={() => this.setState({
                            ...this.state,
                            test_void_modal: false
                        })}>X</div>
                        <div className="test-void-title">{language_type === "EN" ? "Sound": "Âm"}: {this.state.sound}</div>
                        {/* <PronunciationPractice word={listVocabulary[index].title_english} language_type={language_type}/> */}
                        <PronunciationChecker targetPhrase={listVocabulary[index].title_english} language_type={language_type}/>
                        <button disabled={this.state.index === 0} onClick={() => this.setState({
                            ...this.state,
                            index: index - 1
                        })}>PREV</button>
                        <button disabled={this.state.index === listVocabulary?.length -1} onClick={() => this.setState({
                            ...this.state,
                            index: index + 1
                        })}>NEXT</button>
                    </div>
                    }   
                        <div className="table-ipa">
                            <div className="ipa-head">
                                <div className="ipa-title">{language_type === "EN" ? "VOWELS" : "Nguyên âm"}</div>
                                <div className="ipa-content">
                                    <div className="monoph">
                                        <div className="monoph-title">{language_type === "EN" ? "monophthongs" : "đơn âm"}</div>
                                        <div className="ipa-list">
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("i:")}>Tập nói</div>
                                                <div className="ipa-item-header">i: <SpeakerIcon audio={i_dai} /></div>
                                                <div className="ipa-item-footer">sh<b><u>ee</u></b>p  
                                                    
                                                </div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ɪ")}>Tập nói</div>
                                                <div className="ipa-item-header">ɪ <SpeakerIcon audio={i_ngan} /></div>
                                                <div className="ipa-item-footer">sh<b><u>i</u></b>p</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ʊ")}>Tập nói</div>
                                                <div className="ipa-item-header">ʊ <SpeakerIcon audio={u_ngan} /></div>
                                                <div className="ipa-item-footer">g<b><u>oo</u></b>d</div>
                                            </div>
                                            <div className="ipa-item" >
                                                <div className="show_modal" onClick={() => this.handleClickItem("u:")}>Tập nói</div>
                                                <div className="ipa-item-header">u: <SpeakerIcon audio={u_dai} /></div>
                                                <div className="ipa-item-footer">sh<b><u>oo</u></b>t</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("e")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("e")}>Tập nói</div>
                                                <div className="ipa-item-header">e <SpeakerIcon audio={e} /></div>
                                                <div className="ipa-item-footer">b<b><u>e</u></b>d</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ə")}>Tập nói</div>
                                                <div className="ipa-item-header">ə<SpeakerIcon audio={ə} /></div>
                                                <div className="ipa-item-footer">teach<b><u>er</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ɜ:")}>Tập nói</div>
                                                <div className="ipa-item-header">ɜ: <SpeakerIcon audio={ɜ} /></div>
                                                <div className="ipa-item-footer">b<b><u>ir</u></b>d</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ɔ:")}>Tập nói</div>
                                                <div className="ipa-item-header">ɔ: <SpeakerIcon audio={ɔ}/></div>
                                                <div className="ipa-item-footer">d<b><u>oor</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("æ")}>Tập nói</div>
                                                <div className="ipa-item-header">æ <SpeakerIcon audio={æ}/></div>
                                                <div className="ipa-item-footer">c<b><u>a</u></b>t</div>
                                            </div>
                                            <div className="ipa-item" >
                                                <div className="show_modal" onClick={() => this.handleClickItem("ʌ")}>Tập nói</div>
                                                <div className="ipa-item-header">ʌ <SpeakerIcon audio={ʌ}/></div>
                                                <div className="ipa-item-footer"><b><u>u</u></b>p</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ɑ:")}>Tập nói</div>
                                                <div className="ipa-item-header">ɑ: </div>
                                                <div className="ipa-item-footer">f<b><u>ar</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ɒ")}>Tập nói</div>
                                                <div className="ipa-item-header">ɒ <SpeakerIcon audio={ɒ}/></div>
                                                <div className="ipa-item-footer"><b><u>o</u></b>n</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="diphthongs">
                                        <div className="diphthongs-title">{language_type === "EN" ? "diphthongs" : "nguyên âm đôi"}</div>
                                        <div className="ipa-list">
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ɪə")}>Tập nói</div>
                                                <div className="ipa-item-header">ɪə <SpeakerIcon audio={iə}/></div>
                                                <div className="ipa-item-footer">h<b><u>ere</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("eɪ")}>Tập nói</div>
                                                <div className="ipa-item-header">eɪ <SpeakerIcon audio={eɪ}/></div>
                                                <div className="ipa-item-footer">w<b><u>ait</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                {/* <div className="ipa-item-header">I:</div>
                                                <div className="ipa-item-footer">ship</div> */}
                                            </div>
                                            <div className="ipa-item">
                                                {/* <div className="ipa-item-header">I:</div>
                                                <div className="ipa-item-footer">ship</div> */}
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ʊə")}>Tập nói</div>
                                                <div className="ipa-item-header">ʊə <SpeakerIcon audio={ʊə}/></div>
                                                <div className="ipa-item-footer">t<b><u>ou</u></b>rist</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ɔɪ")}>Tập nói</div>
                                                <div className="ipa-item-header">ɔɪ <SpeakerIcon audio={ɔɪ}/></div>
                                                <div className="ipa-item-footer">b<b><u>oy</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("əʊ")}>Tập nói</div>
                                                <div className="ipa-item-header">əʊ <SpeakerIcon audio={əʊ}/></div>
                                                <div className="ipa-item-footer">sh<b><u>ow</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                {/* <div className="ipa-item-header">I:</div>
                                                <div className="ipa-item-footer">ship</div> */}
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("eə")}>Tập nói</div>
                                                <div className="ipa-item-header">eə <SpeakerIcon audio={eə}/></div>
                                                <div className="ipa-item-footer">h<b><u>air</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("aɪ")}>Tập nói</div>
                                                <div className="ipa-item-header">aɪ <SpeakerIcon audio={aɪ}/></div>
                                                <div className="ipa-item-footer">m<b><u>y</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("aʊ")}>Tập nói</div>
                                                <div className="ipa-item-header">aʊ <SpeakerIcon audio={aʊ}/></div>
                                                <div className="ipa-item-footer">c<b><u>ow</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                {/* <div className="ipa-item-header">I:</div>
                                                <div className="ipa-item-footer">ship</div> */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div className="ipa-head footer">
                                <div className="ipa-title">{language_type === "EN" ? "CONSONANTS" : "Phụ âm"}</div>
                                <div className="ipa-content">
                                    <div className="monoph">
                                        {/* <div className="monoph-title"></div> */}
                                        <div className="ipa-list">
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">p <SpeakerIcon audio={p}/></div>
                                                <div className="ipa-item-footer"><b><u>p</u></b>ea</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("b")}>Tập nói</div>
                                                <div className="ipa-item-header">b <SpeakerIcon audio={b}/></div>
                                                <div className="ipa-item-footer"><b><u>b</u></b>oat</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("t")}>Tập nói</div>
                                                <div className="ipa-item-header">t <SpeakerIcon audio={t}/></div>
                                                <div className="ipa-item-footer"><b><u>t</u></b>ea</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("d")}>Tập nói</div>
                                                <div className="ipa-item-header">d <SpeakerIcon audio={d}/></div>
                                                <div className="ipa-item-footer"><b><u>d</u></b>og</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("f")}>Tập nói</div>
                                                <div className="ipa-item-header">f <SpeakerIcon audio={f}/></div>
                                                <div className="ipa-item-footer"><b><u>f</u></b>ly</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("v")}>Tập nói</div>
                                                <div className="ipa-item-header">v <SpeakerIcon audio={v}/></div>
                                                <div className="ipa-item-footer"><b><u>v</u></b>ideo</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("θ")}>Tập nói</div>
                                                <div className="ipa-item-header">θ <SpeakerIcon audio={θ}/></div>
                                                <div className="ipa-item-footer"><b><u>th</u></b>ink</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ð")}>Tập nói</div>
                                                <div className="ipa-item-header">ð <SpeakerIcon audio={ð}/></div>
                                                <div className="ipa-item-footer"><b><u>th</u></b>is</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("m")}>Tập nói</div>
                                                <div className="ipa-item-header">m <SpeakerIcon audio={m}/></div>
                                                <div className="ipa-item-footer"><b><u>m</u></b>an</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("n")}>Tập nói</div>
                                                <div className="ipa-item-header">n <SpeakerIcon audio={n}/></div>
                                                <div className="ipa-item-footer"><b><u>n</u></b>ow</div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("ŋ")}>Tập nói</div>
                                                <div className="ipa-item-header">ŋ <SpeakerIcon audio={ŋ}/></div>
                                                <div className="ipa-item-footer">si<b><u>ng</u></b></div>
                                            </div>
                                            <div className="ipa-item">
                                                <div className="show_modal" onClick={() => this.handleClickItem("h")}>Tập nói</div>
                                                <div className="ipa-item-header">h <SpeakerIcon audio={h}/></div>
                                                <div className="ipa-item-footer"><b><u>h</u>at</b></div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="diphthongs">
                                        {/* <div className="diphthongs-title">diphthongs</div> */}
                                        <div className="ipa-list">
                                            <div className="ipa-item" onClick={() => this.handleClickItem("t∫")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">t∫ <SpeakerIcon audio={tsh}/></div>
                                                <div className="ipa-item-footer"><b><u>ch</u></b>eese</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("dʒ")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">dʒ <SpeakerIcon audio={dʒ}/></div>
                                                <div className="ipa-item-footer"><b><u>J</u></b>une</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("k")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">k <SpeakerIcon audio={k}/></div>
                                                <div className="ipa-item-footer"><b><u>c</u></b>ar</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("g")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">g <SpeakerIcon audio={g}/></div>
                                                <div className="ipa-item-footer"><b><u>g</u></b>o</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("s")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">s <SpeakerIcon audio={s}/></div>
                                                <div className="ipa-item-footer"><b><u>s</u></b>ee</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("z")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">z <SpeakerIcon audio={z}/></div>
                                                <div className="ipa-item-footer"><b><u>z</u></b>oo</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("∫")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">∫ <SpeakerIcon audio={sh}/></div>
                                                <div className="ipa-item-footer"><b><u>sh</u></b>all</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("ʒ")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">ʒ <SpeakerIcon audio={ʒ}/></div>
                                                <div className="ipa-item-footer">televi<b><u>s</u></b>ion</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("l")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">l <SpeakerIcon audio={l}/></div>
                                                <div className="ipa-item-footer"><b><u>l</u></b>ove</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("r")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">r <SpeakerIcon audio={r}/></div>
                                                <div className="ipa-item-footer"><b><u>r</u></b>ed</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("w")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">w <SpeakerIcon audio={w}/></div>
                                                <div className="ipa-item-footer"><b><u>w</u></b>et</div>
                                            </div>
                                            <div className="ipa-item" onClick={() => this.handleClickItem("j")}>
                                                <div className="show_modal" onClick={() => this.handleClickItem("p")}>Tập nói</div>
                                                <div className="ipa-item-header">j <SpeakerIcon audio={j}/></div>
                                                <div className="ipa-item-footer"><b><u>j</u></b>es</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ipaList);