"use client";

import FormInput from "@/components/FormInput";
import { basicSchema } from "@/components/schemas";
import services from "@/services";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
					setSubmissionError(
						"Failed to sign in. Please check your credentials.",
					);
					setTimeout(() => {
						setSubmissionError("");
					}, 5000);
				}
			},
		});

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 border-black border p-10 w-[384px]"
				autoComplete="off"
			>
				<FormInput
					errors={errors}
					type="text"
					handleBlur={handleBlur}
					name="username"
					handleChange={handleChange}
					label="username"
					touched={touched}
					values={values}
				/>
				<FormInput
					errors={errors}
					type="password"
					handleBlur={handleBlur}
					name="password"
					handleChange={handleChange}
					label="password"
					touched={touched}
					values={values}
				/>
				<FormInput
					errors={errors}
					type="password"
					handleBlur={handleBlur}
					name="confirmPassword"
					handleChange={handleChange}
					label="confim password"
					touched={touched}
					values={values}
				/>
				<button type="submit" className="btn btn-primary">
					login
				</button>
				<div className={`toast ${submissionError ? "block" : "hidden"}`}>
					<div className="alert alert-info">{submissionError}</div>
				</div>
			</form>
		</div>
	);
};

export default SignInPage;
