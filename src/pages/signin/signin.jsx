import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import UseAuth from "../../hooks/useAuth";
import { axiosInstace } from "../../network/axiosConfig";
import "./signin.css";

const Signin = () => {
  const { setAuth } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const sendPostRequest = async (data) => {
    try {
      const HrRespData = await axiosInstace.post("/employee/login", data);
      localStorage.setItem("HR_token", HrRespData.data.token);
      if (HrRespData.data.status === "success") {
        // catch data from server
        const { name, role } = HrRespData.data.data.employee;
        // 1- save data in local storage
        const userInfo = JSON.stringify({ name, role });
        localStorage.setItem("HR_info", userInfo);
        // 2- save data in the global context
        setAuth({ name, role });
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Handle Error Here
      alert(err.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      sendPostRequest(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <section className="signin">
        <div className="container">
          <div className="form-group row justify-content-center align-items-center">
            <div className="col-md-5">
              <h1 className="text-center mb-5">Hr manegment system login</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <div
                    className={
                      "invalid-feedback " +
                      (formik.touched.email && formik.errors.email
                        ? "d-block"
                        : "")
                    }
                  >
                    {formik.errors.email}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <div
                    className={
                      "invalid-feedback " +
                      (formik.touched.password && formik.errors.password
                        ? "d-block"
                        : "")
                    }
                  >
                    {formik.errors.password}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
