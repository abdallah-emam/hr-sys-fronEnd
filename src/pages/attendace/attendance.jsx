import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { axiosInstace } from "../../network/axiosConfig";

const Attendance = () => {
  const [day, setDay] = useState("");
  const [present, setPresent] = useState("");
  const { name, id } = useParams();
  const [att, setAtt] = useState([]);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const emp = await axiosInstace.get(`/employee/${id}/attendance`);
        setAtt(emp.data.data.attendance);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    loadEmployee();
  }, [id]);

  const handleAddAttForm = async (e) => {
    e.preventDefault();
    const data = { day, present };

    try {
      const res = await axiosInstace.post(`/employee/${id}/attendance`, data);
      const newAtt = res.data.data;
      const cpAtt = [...att];
      cpAtt.push(newAtt);
      setAtt(cpAtt);

      alert("data has been added");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <h1 className="my-3">Attendace page </h1>
          <form onSubmit={(e) => handleAddAttForm(e)}>
            <div className="row mt-5">
              <div className="col-md-3">
                <h5>Add new attendace </h5>
              </div>
              <div className="col-md-7">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="present"
                    id="inlineRadio1"
                    value="presence"
                    required
                    onChange={(event) => setPresent(event.target.value)}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    presence
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="present"
                    id="inlineRadio2"
                    value="absence"
                    required
                    onChange={(event) => setPresent(event.target.value)}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    absence
                  </label>
                </div>
                <input
                  type="date"
                  name="day"
                  onChange={(event) => setDay(event.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary">save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-md-7">
            <p className="mt-5">Attendace day ({name} employee)</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">status</th>
                </tr>
              </thead>
              <tbody>
                  
                {att.map((el, i) => (
                  <tr key={el._id}>
                    <th scope="row">{i}</th>
                    <td>{new Date(el.day).toLocaleDateString()}</td>
                    <td>{el.present}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attendance;
