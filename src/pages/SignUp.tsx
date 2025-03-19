import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import InputField from "../components/InputField";
import ValidationMessage from "../components/validationMessage";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { HandleRegistration } from "../services/api";
import DOIT from "../assets/doit.png";
import SuccessAlert from "../components/SuccessAlert";
import Button from "../components/Button";

let errors = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  useEffect(() => {
    errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  });
  const navigate = useNavigate(); // Hook for navigation
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      let valid = true;
      if (!values.username || values.username.trim() == "") {
        valid = false;
        errors.username = "Required";
      } else {
        errors.username = "";
      }
      if (!values.password || values.password.trim() == "") {
        errors.password = "Required";
        valid = false;
      } else {
        errors.password = "";
      }
      if (!values.email || values.email.trim() == "") {
        errors.email = "Required";
        valid = false;
      } else {
        errors.email = "";
      }
      if (!values.confirmPassword || values.confirmPassword.trim() == "") {
        errors.confirmPassword = "Required";
        valid = false;
      } else if (!values.confirmPassword.match(values.password)) {
        errors.confirmPassword = "should match the password";
        valid = false;
      } else {
        errors.confirmPassword = "";
      }
      if (valid) {
        const registrationResponse = await HandleRegistration(
          values.username,
          values.password,
          values.email
        );
        if (registrationResponse.jwt) {
          setServerError("");
          setSuccessMessage("Signed up successfully .");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (registrationResponse.message) {
          setServerError(registrationResponse.message);
        } else {
          setServerError("An Error accured , please try again");
        }
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="m-auto h-full w-1/3">
        <div className="">
          <img src={DOIT} alt="imagel" className="w-2/4 m-auto" />

          <div className="p-3 ">
            <InputField
              type="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              label="User name"
            />
          </div>
          <ValidationMessage message={errors.username} />
          <div className="p-3">
            <InputField
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
            />
          </div>
          <ValidationMessage message={errors.email} />
          <div className="p-3">
            <InputField
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
            />
          </div>
          <ValidationMessage message={errors.password} />
          <div className="p-3">
            <InputField
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              label="Confirm Password"
            />
          </div>
          <ValidationMessage message={errors.confirmPassword} />
          <Button type={"submit"} value={"Sign Up"} color={"blue"}/>
          <SuccessAlert message={successMessage} />
          <ValidationMessage message={serverError} />
          <p className="p-3 text-gray-500">
            Already have an accoount?{" "}
            <Link
              to="/"
              className="underline cursor-pointer hover:text-blue-500"
            >
              back to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
