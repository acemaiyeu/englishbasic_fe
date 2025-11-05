import { Link } from "react-router-dom";

const Prev = ({ uri }) => {
  return (
    <Link to={`/${uri}`} className="text-decoration-none" style={{position: "relative"}}>
      <i className="bi bi-arrow-90deg-left" style={{ fontSize: "24px", color: "#333", position: "absolute", left: "2vw" }}></i>
    </Link>
  );
};

export default Prev;
