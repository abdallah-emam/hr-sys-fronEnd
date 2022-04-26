import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { axiosInstace } from "../../network/axiosConfig";

const EditEmp = () => {
  const [empValues, setEmpValues] = useState({
    name: "",
    email: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const emp = await axiosInstace.get(`/employee/${id}`);
        const { name, email } = emp.data.data;
        setEmpValues({ name, email });
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    loadEmployee();
  }, [id]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axiosInstace.patch(`/employee/${id}`, empValues);
      alert("data has bee updated");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <section>
      <div className="container">
        <h1 className="my-3"> Edit employee </h1>
        <div className="row ">
          <div className="col-md-7">
            <form onSubmit={(e) => handleSubmitForm(e)} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  name
                </label>
                <input
                  onChange={(e) =>
                    setEmpValues({ ...empValues, name: e.target.value })
                  }
                  value={empValues.name}
                  type="text"
                  className="form-control"
                  id="inputName"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  value={empValues.email}
                  onChange={(e) =>
                    setEmpValues({ ...empValues, email: e.target.value })
                  }
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="col-12 mt-5">
                <button type="submit" className="btn btn-primary">
                  update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditEmp;
