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
      {touched[name] && errors[name] ? (
        <label className="text-red-600 text-xs ml-2">{errors[name]}</label>
      ) : null}
    </div>
  );
};

export default FormInput;
