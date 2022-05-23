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
				setTimeout(() => navigate(`/projects/${success.data?.data?.id}`), 3000);

				return {
					success: success,
				};
			});
			setTimeout(() => queryClient.removeQueries("create-project-info"), 3000);
		},
		onError: (error) => {
			queryClient.setQueryData("create-project-info", () => {
				return {
					error: error.response.data.error,
				};
			});
			setTimeout(() => queryClient.removeQueries("create-project-info"), 1000);
		},
	});
};
