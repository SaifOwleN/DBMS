"use client";

import { useFormik } from "formik";
import { useState } from "react";
import { basicSchema } from "@/components/schemas";
import services from "@/services";
import LoginInput from "@/components/input";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: basicSchema,
      onSubmit: async (values) => {
        try {
          const user = await services.login({
            username: values.username,
            password: values.password,
          });
          console.log("user", user);
          localStorage.setItem("SignedUser", JSON.stringify(user));
          router.push("/Home");
        } catch (err) {
          console.log("err", err);
          setSubmissionError(
            "Failed to sign in. Please check your credentials.",
          );
        }
      },
    });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="gap-4 border-black border p-10 w-[384px]"
        autoComplete="off"
      >
        <h3 className="text-red-500 font-semibold text-xl text-wrap">
          {submissionError}
        </h3>
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
