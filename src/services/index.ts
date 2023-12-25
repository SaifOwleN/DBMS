import axios from "axios";
const baseurl = "http://localhost:3200/api";

interface LoginCreds {
  username: string;
  password: string;
}

const getEmployees = async () => {
  const emp = await axios.get(`${baseurl}/employees`);
  return emp.data;
};

const getSchema = async () => {
  const emp = await axios.get(`${baseurl}/schema`);
  return emp.data;
};

const login = async (loginCreds: LoginCreds) => {
  const emp = await axios.post(`${baseurl}/login`, loginCreds);
  return emp.data;
};

export default { getEmployees, login, getSchema, baseurl };
