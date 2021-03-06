import axios from "axios";
import jwt_decode from "jwt-decode";
const instance = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers.post["Accept"] = "application/json";
instance.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = jwt_decode(token);
			const currentDate = new Date();
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				localStorage.removeItem("token");
				console.log("Token expired.");
				return (window.location.href = "/");
			} else {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default instance;
