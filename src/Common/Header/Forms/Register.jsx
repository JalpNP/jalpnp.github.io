import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Register.scss";
import MyContext from "../../Context/MyContext";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const {
    Navigate,
    url,
    setOpen,
    setMainloader,
    setMessage,
    setToken,
    setUserdata,
  } = useContext(MyContext);

  // const [mobile, setMobile] = useState('');

  // useEffect(() => {
  //     const queryParams = new URLSearchParams(location.search);
  //     const mobileFromUrl = queryParams.get('mobile');
  //     if (mobileFromUrl) {
  //         setMobile(mobileFromUrl); // Update mobile state from the URL
  //     }
  // }, [location]);

  const validationSchema = Yup.object({
    email: Yup.string("*Enter your Email")
      .email("*Invalid email format")
      .required("*Email is required"),
    fname: Yup.string("*Enter your FirstName").required(
      "*FirstName is required",
    ),
    lname: Yup.string("*Enter your LastName").required("*LastName is required"),
    mobile: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(10, "Must be exactly 10 digits"),
    password: Yup.string("*Enter your password").required(
      "*password is required",
    ),
  });

  const initialValues = {
    email: "",
    fname: "",
    lname: "",
    mobile: "",
    password: "",
  };

  // Form submission handler
  const onSubmit = async (values, { resetForm }) => {
    setMainloader(true);
    document.querySelector("body").style.overflow = "hidden";

    try {
      const { data } = await axios.post(`${url}/register`, values);

      if (data.success) {
        resetForm();
        Navigate("/");
        localStorage.setItem("token", data.data);
        localStorage.setItem("userdata", JSON.stringify(data.accountInfo));
        setUserdata(data.accountInfo);
        setToken(data.data);
      } else {
        setOpen(true);
        setMessage(data.error);
      }
    } catch (error) {
      alert(error.response ? error.response.data.error : error.message);
    } finally {
      document.querySelector("body").style.overflow = "auto";
      setMainloader(false);
    }
  };

  return (
    <div className="register-main">
      <Helmet>
        <title>Register - GenZ Clothing</title>
        <meta name="description" content="Create a new account." />
        <meta name="keywords" content="register, sign up, new account" />
        <meta property="og:title" content="Register - GenZ Clothing" />
        <meta property="og:description" content="Create a new account." />
      </Helmet>
      <ArrowLeft
        size={30}
        strokeWidth={0.75}
        className="close-btn"
        onClick={() => Navigate(-1)}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="register-form">
          <h1>Register</h1>

          <span className="span">
            <label htmlFor="fname">FirstName :</label>
            <Field
              className="field1"
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter your FirstName"
            />
            <ErrorMessage name="fname" component="div" className="error" />
          </span>
          <span className="span">
            <label htmlFor="lname">LastName :</label>
            <Field
              className="field1"
              type="text"
              id="lname"
              name="lname"
              placeholder="Enter your LastName"
            />
            <ErrorMessage name="lname" component="div" className="error" />
          </span>
          <span className="span">
            <label htmlFor="email">Email :</label>
            <Field
              className="field1"
              type="text"
              id="email"
              name="email"
              placeholder="Enter your Email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </span>
          <span className="span">
            <label htmlFor="mobile">Mobile :</label>
            <Field
              className="field1"
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile"
            />
            <ErrorMessage name="mobile" component="div" className="error" />
          </span>
          <span className="span">
            <label htmlFor="password">Password :</label>
            <Field
              className="field1"
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </span>

          <button type="submit" className="loginbtn">
            {" "}
            Register{" "}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
