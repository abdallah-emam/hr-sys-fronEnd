import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/authProvider";
import { axiosInstace } from "../../network/axiosConfig";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const emp = await axiosInstace.get(`/employee/allEmployee`);
      setEmployees(emp.data.data);
    } catch (error) {}
  };

  return (
    <>
      <section>
        <div className="container">
          <h1 className="mt-4">welcome to Dashboard, {auth.name} </h1>
          <h4 className="mt-4">All elmplyee</h4>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">edit</th>
                  <th scope="col">attendace</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((el, index) => (
                  <tr key={el._id}>
                    <th scope="row"> {index} </th>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>
                      <Link
                        to={`/editEmp/${el._id}`}
                        className="btn btn-warning"
                      >
                        edit
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/attendance/${el.name}/${el._id}`}
                        className="btn btn-outline-info"
                      >
                        attendace
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
