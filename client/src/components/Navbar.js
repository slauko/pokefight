import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide" id="openLinks">
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/user"> User </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
