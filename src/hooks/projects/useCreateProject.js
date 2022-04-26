import { useMutation, useQueryClient } from "react-query";
import instance from "../../config/config";
import { useNavigate } from "react-router";

const createProject = (data) => {
	return instance.post("/api/projects", data);
};

export const useCreateProject = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(createProject, {
		onSuccess: (success) => {
			queryClient.setQueryData("create-project-info", () => {
				setTimeout(() => navigate("/project"), 3000);
				return {
					success: success,
				};
			});
		},
		onError: (error) => {
			queryClient.setQueryData("create-project-info", () => {
				return {
					error: error.response.data.error,
				};
			});
			setTimeout(() => queryClient.removeQueries("create-project-info"), 1000);
		}
	});
};