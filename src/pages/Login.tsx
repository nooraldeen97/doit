import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { handleLogin } from "../services/api";
import DOIT from "../assets/doit.png";
import { Link } from "react-router";
import InputField from "../components/InputField";
import ValidationMessage from "../components/validationMessage";
import { useCookies } from 'react-cookie';
import Button from "../components/Button";

let errors = {
  username: "",
  password: "",
};
export default function LoginForm() {
  const [serverError, setServerError] = useState(""); // Stores global error
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
 

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setServerError("");
      if (!values.username || values.username.trim() === "") {
        errors.username = "Required";
      } else {
        errors.username = "";
      }
      if (!values.password || values.password.trim() === "") {
        errors.password = "Required";
      } else {
        errors.password = "";
      }
      if (values.username && values.password) {
        const loginRes = await handleLogin(values.username, values.password);
        console.log("login response", loginRes);

        if (loginRes.message === "Invalid identifier or password") {
          setServerError("Invalid username or password");
        } else if (!loginRes.jwt) {
          setServerError("Somthing went wrong please try again");
        } else {
          setServerError("");
          setCookie("token",loginRes.jwt)
        }
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="m-auto h-full w-1/3">
      <img src={DOIT} alt="imagel" />
      <div className="">
        <div className="p-3 ">
        <InputField
            type="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            label="User name"
          />
        </div>
        <ValidationMessage message={errors.username}/>
          
        <div className="p-3">
          <InputField
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            label="Password"
          />
        </div>
        <ValidationMessage message={errors.password}/>
        <Button type={"submit"} value={"Login"} color={"blue"}/>
        <ValidationMessage message={serverError} />
      </div>
      <p className="p-3 text-gray-500">
        {" "}
        Need an accoount ?{" "}
        <Link
          to="/register"
          className="underline cursor-pointer hover:text-blue-500"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
