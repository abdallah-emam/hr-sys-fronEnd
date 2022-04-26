import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Signin from "./pages/signin/signin";
import Layout from "./components/layout";
import RequireAuth from "./components/requireAuth";
import "./App.css";
import AddEmployee from "./pages/addEmp/addEmp";
import Navbar from "./components/navbar";
// import UseAuth from "./hooks/useAuth";
import { useContext } from "react";
import AuthContext from "./context/authProvider";
import EditEmp from "./pages/editEmp/editEmp";
import Attendance from "./pages/attendace/attendance";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth?.name ? (
        <div className="container">
          <Navbar />
        </div>
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route element={<RequireAuth value="false" />}>
            <Route path="signin" element={<Signin />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<RequireAuth value="true" />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/AddEmp" element={<AddEmployee />} />
            <Route path="/editEmp/:id" element={<EditEmp />} />
            <Route path="/attendance/:name/:id" element={<Attendance />} />
          </Route>

          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
