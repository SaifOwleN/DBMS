import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3200/api", // Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
	const user = JSON.parse(localStorage.getItem("SignedUser") as string);

	const token = user.token;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default axiosInstance;
