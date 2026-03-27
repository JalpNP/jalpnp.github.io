import { useFormik } from "formik";
import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import axios from "axios";
import "./LoginEmail.scss";

const LoginEmail = () => {
  const { handleLogin, url, setOpen, setMessage, Navigate, setMainloader } =
    useContext(MyContext);

  // const { setMsg, setmsgAvailable } = useContext(MyContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setMainloader(true);
      document.querySelector("body").style.overflow = "hidden";

      try {
        console.log(values);
        const { data } = await axios.post(`${url}/login`, values);
        console.log(data);

        if (data.success) {
          setOpen(true);
          setMessage(data.message);
          resetForm();
          handleLogin(data);
          Navigate("/");
        } else {
          setOpen(true);
          setMessage(data.error);
        }
      } catch (error) {
        console.error("Contact form submission error:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        document.querySelector("body").style.overflow = "auto";
        setMainloader(false);
      }
    },
  });

  return (
    <div className="LoginContainer">
      <div className="LoginBox">
        <form onSubmit={formik.handleSubmit}>
          <h3>login with your email</h3>
          <div className="loginInput">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <span>
          new user?{" "}
          <a
            href="/register"
            onClick={(e) => {
              e.preventDefault();
              Navigate("/register");
            }}
          >
            register here
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginEmail;
