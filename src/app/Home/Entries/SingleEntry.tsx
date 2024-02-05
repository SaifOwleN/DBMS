"use client";
import FormInput from "@/components/FormInput";
import { generateYupSchema } from "@/components/schemas";
import services from "@/services";
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

const NewEntry = () => {
  const table = useSearchParams().get("table");
  const router = useRouter();
  const [schemaData, setSchemaData] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const { handleBlur, handleSubmit, values, touched, errors, handleChange } =
    useFormik({
      initialValues,
      validationSchema: generateYupSchema(schemaData),
      onSubmit: async (values) => {
        try {
          await axiosInstance.post(
            `http://localhost:3200/api/${table}`,
            values,
          );
          window.location.reload();
        } catch (err) {
          if (err instanceof AxiosError) {
            if (err.response?.status === 400) {
              setSubmissionError("An Entry with the same primary key exists");
              setTimeout(() => {
                setSubmissionError(null);
              }, 5000);
            }
          }
        }
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await services.getOneSchema(table as string);
        const initialVals = {};
        for (const field of data) {
          initialVals[field.name] = "";
        }
        console.log("initialVals", initialVals);
        setInitialValues(initialVals);
        setSchemaData(data);
      } catch (error) {
        console.error("Error fetching schema:", error);
      }
    };
    fetchData();
  }, [table]);

  const Inputs = () => {
    return Object.keys(initialValues).map((fieldName) => (
      <FormInput
        key={fieldName}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name={fieldName}
        label={fieldName}
        values={values}
        touched={touched}
        errors={errors}
      />
    ));
  };

  return (
    <dialog className="modal overflow-y-auto" id="Modal_AddSingle">
      <div className="flex flex-col justify-end modal-box max-h-max m-auto">
        <h1 className="text-xl font-bold py-2">Add an Entry</h1>
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap">
          {Inputs()}
          <button type="submit" className="btn btn-primary mt-4 ">
            Submit
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default" />
      </form>
      <div className={`toast ${submissionError ? "block" : "hidden"}`}>
        <div className="alert alert-error">
          <span className="text-xl">
            <MdOutlineErrorOutline />
          </span>
          {submissionError}
        </div>
      </div>
    </dialog>
  );
};

export default NewEntry;
