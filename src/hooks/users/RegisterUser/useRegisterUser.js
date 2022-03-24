import { useMutation, useQueryClient } from "react-query";
import instance from "../../../config/config";

const registerUser = (data) => {
	// console.log(`${process.env.REACT_APP_BASEURL}/api/auth/local/register`);
	// return instance.post("http://localhost:1337/api/auth/local/register", data); // Radi
	// return axios.post(`http://localhost:1337/api/auth/local/register`, data); //ne radi
	return instance.post("/api/auth/local/register", data); // Radi bio problem u lose napisanom env-u
};

export const useRegisterUser = () => {
	const queryClient = useQueryClient();
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
				return {
					success,
				};
			});
		},
	});
};
