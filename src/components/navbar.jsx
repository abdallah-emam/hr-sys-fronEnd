import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstace } from "../network/axiosConfig";
import AuthContext from "../context/authProvider";

const Navbar = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const HrRespData = await axiosInstace.get("/employee/logout");
      if (HrRespData.data.status === "success") {
        localStorage.clear();
        setAuth({ name: "", role: "" });
        navigate("/signin");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Hr System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ">
            <Link className="nav-link active" aria-current="page" to={"/"}>
              Home
            </Link>
            <Link className="nav-link" to={"/addEmp"}>
              Add Employee
            </Link>
            <button
              onClick={handleLogout}
              className=" btn btn-danger"
              href="#"
            >
              log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
