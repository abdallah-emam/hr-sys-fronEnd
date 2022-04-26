import { useFormik } from "formik";
import * as Yup from "yup";

import { axiosInstace } from "../../network/axiosConfig";

const AddEmployee = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(10, "Must be 15 characters or less").required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(8, "password must be at least 8 characters")
        .required(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "password must match")
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosInstace.post("/employee/addEmployee", values);
        if (res.data.status === "success") {
          formik.resetForm();
          alert("successfully done");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <section>
      <div className="container">
        <h1 className="my-3">Add Employee</h1>
        <div className="row">
          <div className="col-md-12">
            <form
              onSubmit={formik.handleSubmit}
              autoComplete="new-password"
              className="row g-3 mt-3"
            >
              <div className="row justify-content-between">
                <div className="col-md-5">
                  <label htmlFor="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type="text"
                    className="form-control"
                    id="inputName"
                  />
                  <div
                    className={
                      "invalid-feedback " +
                      (formik.touched.name && formik.errors.name
                        ? "d-block"
                        : "")
                    }
                  >
                    {formik.errors.name}
                  </div>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="inputEmail"
                    autoComplete="new-password"
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
              </div>
              <div className="row justify-content-between my-md-5">
                <div className="col-md-5">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
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
                <div className="col-md-5">
                  <label htmlFor="inputConfPass" className="form-label">
                    confirm password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputConfPass"
                    autoComplete="new-password"
                    name="passwordConfirm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                  />
                  <div
                    className={
                      "invalid-feedback " +
                      (formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                        ? "d-block"
                        : "")
                    }
                  >
                    {formik.errors.passwordConfirm}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEmployee;
