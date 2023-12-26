import { log } from "console";
import * as yup from "yup";

export const basicSchema = yup.object().shape({
  username: yup.string().required("required field"),
  password: yup.string().min(8).required("required field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "passwords not the same"),
});

export const generateYupSchema = (schemaArray) => {
  const yupSchema = {};
  if (schemaArray) {
    schemaArray.forEach((field) => {
      const { name, type, max, required } = field;

      switch (type) {
        case "INTEGER":
          yupSchema[name] = yup.number();
          break;
        case "FLOAT":
          yupSchema[name] = yup.number();
          break;
        case "STRING":
          yupSchema[name] = yup.string().max(max || undefined);
          break;
        case "BOOLEAN":
          yupSchema[name] = yup.boolean();
          break;
        case "TIMESTAMP WITHOUT TIME ZONE":
          yupSchema[name] = yup.date(); // Adjust based on your needs
          break;
        case "TIME WITHOUT TIME ZONE":
          yupSchema[name] = yup.string(); // Adjust based on your needs
          break;
        // Add more cases for other types as needed
        default:
          throw new Error(`Unsupported type: ${type} for field: ${name}`);
      }

      // Mark the field as required
      if (required) {
        yupSchema[name] = yupSchema[name].required("required field");
      }
    });
  }

  return yup.object().shape(yupSchema);
};
