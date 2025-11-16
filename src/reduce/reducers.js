import { Languages } from "lucide-react";
import { INCREMENT, DECREMENT, CHANGE_LANGUAGE, SET_USER } from "./actions";

const initialState = {
  count: 0,
      language_type: "EN",
      language_text: "Language",
      language_list: ["English", "Vietnamese"],
      n_rand: 0
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case CHANGE_LANGUAGE:
      if(action.payload == "Vietnamese"){
        state = {...state, language_type: "VI",
        language_text: "Ngôn ngữ",}
      }
      if(action.payload != "Vietnamese"){
        state = {...state, language_type: "EN",
        language_text: "Language",
        n_rand: Math.random()
      }
      }
      return { ...state, count: state.count - 1 };
      case SET_USER: 
        console.log("Checkkkk", action.payload)

      break;
    default:
      return state;
  }
};
