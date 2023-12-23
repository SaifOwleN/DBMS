import { useFormik } from "formik";
import { SyntheticEvent, useState } from "react";
import { basicSchema } from "./schemas";
import services from "@/services";

const onSubmit = async (values) => {
  try {
    const user = await services.login({
      username: values.username,
      password: values.password,
    });
    console.log("user", user);
    localStorage.setItem("SignedUser", JSON.stringify(user));
  } catch (err) {
    console.log("err", err.response.data);
  }
};

const SignInPage = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 border-black border p-10"
      autoComplete="off"
    >
      <label className="label">username:</label>
      <input
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`input input-primary ${
          errors.username && touched.username ? "input-error" : "input-primary"
        }`}
        id="username"
        type="text"
      />
      <br />
      <label className="label">password:</label>
      <input
        id="password"
        onBlur={handleBlur}
        value={values.password}
        onChange={handleChange}
        className={`input input-primary ${
          errors.password && touched.password ? "input-error" : "input-primary"
        }`}
        type="password"
      />
      <br />
      <label className="label">confirm password:</label>
      <input
        id="confirmPassword"
        onBlur={handleBlur}
        value={values.confirmPassword}
        onChange={handleChange}
        className={`input input-primary ${
          errors.confirmPassword && touched.confirmPassword
            ? "input-error"
            : "input-primary"
        }`}
        type="password"
      />
      <br />
      <button type="submit" className="btn btn-primary">
        aloo
      </button>
    </form>
  );
};

export default SignInPage;
