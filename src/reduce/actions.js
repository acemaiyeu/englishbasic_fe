export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const changeLanguage = (type_name) => ({ type: CHANGE_LANGUAGE, payload: type_name });
