const LoginInput = ({
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
    <>
      <label className="label">{label}</label>
      <input
        id={name}
        onBlur={handleBlur}
        value={values[name]}
        onChange={handleChange}
        className={`input input-primary ${
          errors[name] && touched[name] ? "input-error" : "input-primary"
        }`}
        type={type}
      />
      <br />
    </>
  );
};

export default LoginInput;
