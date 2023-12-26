"use client";
import FormInput from "@/components/FormInput";
import { generateYupSchema } from "@/components/schemas";
import services from "@/services";
import axios from "axios";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewEntry = () => {
  const table = useSearchParams().get("table");
  const [schemaData, setSchemaData] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const { handleBlur, handleSubmit, values, touched, errors, handleChange } =
    useFormik({
      initialValues,
      validationSchema: generateYupSchema(schemaData),
      onSubmit: async (values) => {
        try {
          const user = await axios.post(`${services.baseurl}/${table}`, values);
          console.log("user", user);
        } catch (err) {
          console.log("err", err);
          setSubmissionError(
            "Failed to sign in. Please check your credentials.",
          );
        }
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${services.baseurl}/${table}/schema`);
        const initialVals = {};
        data.forEach((field: { name: string }) => {
          initialVals[field.name] = "";
        });
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
    <div className="flex justify-center ">
      <form onSubmit={handleSubmit}>
        {Inputs()}
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewEntry;
