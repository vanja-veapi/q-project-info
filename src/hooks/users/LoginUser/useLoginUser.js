import { useMutation, useQueryClient } from "react-query";
import instance from "../../../config/config";
import { useNavigate } from "react-router";

const loginUser = (data) => instance.post("/api/auth/local", data);
export const useLoginUser = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(loginUser, {
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
				localStorage.setItem("token", success.data.jwt);
				queryClient.setQueryData("token", success.data.jwt);
				setTimeout(() => navigate("/home"), 500);
				return {
					success,
				};
			});
		},
	});
};
