import { useMutation, useQueryClient } from "react-query";
import instance from "../../../config/config";
import { useNavigate } from "react-router";

const registerUser = (data) => {
	// console.log(`${process.env.REACT_APP_BASEURL}/api/auth/local/register`);
	// return instance.post("http://localhost:1337/api/auth/local/register", data); // Radi
	// return axios.post(`http://localhost:1337/api/auth/local/register`, data); //ne radi
	return instance.post("/api/auth/local/register", data); // Radi bio problem u lose napisanom env-u
};

export const useRegisterUser = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation(registerUser, {
		onError: (error) => {
			queryClient.setQueryData("register-info", () => {
				return {
					error: error.response.data.error,
				};
			});
			setTimeout(() => queryClient.removeQueries("register-info"), 1000);
		},
		onSuccess: (success) => {
			queryClient.setQueryData("register-info", () => {
				if (window.location.pathname === "/dashboard/user/add") {
					return setTimeout(() => navigate("/dashboard"), 1000);
				}

				localStorage.setItem("token", success.data.jwt);
				queryClient.setQueryData("token", success.data.jwt);
				setTimeout(() => navigate("/projects"), 1000);
				return {
					success,
				};
			});
			// setTimeout(() => queryClient.removeQueries("register-info"), 1000);
			// Ovo setTimeout mi mozda zatreba, ali vrv ne posto ce korisnik da bude dalje redirektovn
		},
	});
};
