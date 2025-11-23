import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, setUser } from "../reduce/actions";
import { toast } from "react-toastify";
import { API_URL } from "./const/const";
import api from "./Client/api";

const Home = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
   const getProfile = async () => {
    if(localStorage.getItem("S_CLIENT")){
        await api.get(`${API_URL}/profile`).then((res) => {
        dispatch(setUser(res.data));
      }).catch((e) => {
          dispatch(setUser(null));
          toast.error("Account timeout!")
        return; 
      })
    }
  }
      
    getProfile();
  return (
    <div style={{ textAlign: "center" }}>
      {/* <h2>Home Page</h2>
      <h3>Counter: {count}</h3>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button> */}
    </div>
  );
};

export default Home;
