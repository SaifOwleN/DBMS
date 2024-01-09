import { log } from "console";
import axiosInstance from "@/utils/axios";
import axios from "axios";

interface LoginCreds {
	username: string;
	password: string;
}

const getEmployees = async (token: string) => {
	const emp = await axiosInstance.get("/employees");
	return emp.data;
};

const getEntries = async (router: string) => {
	const { data } = await axiosInstance.get(`/${router.toLowerCase()}`);
	return data;
};

const getSchema = async () => {
	const emp = await axiosInstance.get("/schema");
	return emp.data;
};

const getOneSchema = async (table: string) => {
	const emp = await axiosInstance.get(`/${table}/schema`);
	return emp.data;
};

const login = async (loginCreds: LoginCreds) => {
	const emp = await axios.post("http://localhost:3200/api/login", loginCreds);
	return emp.data;
};

export default {
	getEmployees,
	login,
	getSchema,
	getEntries,
	getOneSchema,
};
