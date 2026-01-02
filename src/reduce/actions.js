export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const SET_USER = "SET_USER";
export const SET_PROFILE = "SET_PROFILE"

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const changeLanguage = (type_name) => ({ type: CHANGE_LANGUAGE, payload: type_name });
export const setUser = () => ({ type: SET_USER });
export const setProfile = (profile) => ({ type: SET_PROFILE, payload: profile });
