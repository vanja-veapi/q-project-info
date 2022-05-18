import axios from "axios";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useLogoutUser } from "../hooks/users/LogoutUser/useLogoutUser";

const instance = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

//Ako mi se nekad bude pravio PROBLEM TO JE ZATO STO SAM OTKOMENTARISAO OVDE
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.post["Accept"] = "application/json";
instance.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = jwt_decode(token);
			const currentDate = new Date();
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				// useLogoutUser();

				console.log("Token expired.");
				return (window.location.href = "logout");
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
