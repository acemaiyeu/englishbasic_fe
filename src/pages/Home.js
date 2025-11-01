import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../reduce/actions";

const Home = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

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
