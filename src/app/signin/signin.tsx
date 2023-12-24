import { useFormik } from "formik";
import { useState } from "react";
import { basicSchema } from "@/components/schemas";
import services from "@/services";
import LoginInput from "@/components/input";

const onSubmit = async (values) => {
  try {
    const user = await services.login({
      username: values.username,
      password: values.password,
    });
    console.log("user", user);
    localStorage.setItem("SignedUser", JSON.stringify(user));
  } catch (err) {
    console.log("err", err);
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
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="gap-4 border-black border p-10"
        autoComplete="off"
      >
        <LoginInput
          errors={errors}
          type="text"
          handleBlur={handleBlur}
          name="username"
          handleChange={handleChange}
          label="username: "
          touched={touched}
          values={values}
        />
        <LoginInput
          errors={errors}
          type="password"
          handleBlur={handleBlur}
          name="password"
          handleChange={handleChange}
          label="password: "
          touched={touched}
          values={values}
        />
        <LoginInput
          errors={errors}
          type="password"
          handleBlur={handleBlur}
          name="confirmPassword"
          handleChange={handleChange}
          label="confim password: "
          touched={touched}
          values={values}
        />
        <button type="submit" className="btn btn-primary">
          aloo
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
