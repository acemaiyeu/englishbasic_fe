import { Link } from "react-router-dom";

const Prev = ({ uri }) => {
  return (
    <Link to={`/${uri}`} className="text-decoration-none" style={{position: "absolute", float: "left", backgroundColor: "red", width: "100%", marginLeft: "5vw"}}>
      <i className="bi bi-arrow-90deg-left" style={{ fontSize: "24px", color: "#333", position: "absolute", left: "2vw" }}></i>
    </Link>
  );
};

export default Prev;
