import { INCREMENT, DECREMENT, CHANGE_LANGUAGE, SET_USER, SET_PROFILE } from "./actions";

const initialState = {
  count: 0,
      language_type: "EN",
      language_text: "Language",
      language_list: ["English", "Vietnamese"],
      n_rand: 0,
      profile: {}
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case CHANGE_LANGUAGE:
      if(action.payload === "Vietnamese"){
        state = {...state, language_type: "VI",
        language_text: "Ngôn ngữ",}
      }
      if(action.payload !== "Vietnamese"){
        state = {...state, language_type: "EN",
        language_text: "Language",
        n_rand: Math.random()
      }
      }
      return { ...state, count: state.count - 1 };
      case SET_USER: 
        console.log("Checkkkk", action.payload)

      break;
      case SET_PROFILE: 
      console.log("Reducer: ", action.payload)
      let ob = {
                      avatar: action.payload.avatar === "" ? "https://i.pravatar.cc/150?u=a042581f4e29026704d" : action.payload.avatar,
                      name: action.payload.name,
                      email: action.payload.email
                  }
      // let profile = action.payload.profile;
          return { ...state, profile: ob}
    default:
      return state;
  }
};
