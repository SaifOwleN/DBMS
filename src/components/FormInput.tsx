const FormInput = ({
  values,
  handleBlur,
  name,
  type,
  label,
  handleChange,
  errors,
  touched,
}) => {
  return (
    <div>
      <label className="label">{label}: </label>
      <input
        id={name}
        onBlur={handleBlur}
        value={values[name]}
        onChange={handleChange}
        className={`input input-primary w-full ${
          errors[name] && touched[name] ? "input-error" : "input-primary"
        }`}
        type={type}
      />
    </div>
  );
};

export default FormInput;
