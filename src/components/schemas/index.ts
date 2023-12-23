import * as yup from "yup";

export const basicSchema = yup.object().shape({
  username: yup.string().required("required field"),
  password: yup.string().min(8).required("required field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "passwords not the same"),
});
