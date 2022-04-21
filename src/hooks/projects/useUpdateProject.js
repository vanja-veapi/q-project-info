import { useMutation, useQueryClient } from "react-query";
import instance from "../../config/config";
import { useNavigate } from "react-router";

const updateProject = (data) => {
	return instance.put(`/api/projects/${data.id}`, data);
};

export const useUpdateProject = (id) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(updateProject, {
		onSuccess: (success) => {
			queryClient.setQueryData("update-project-info", () => {
				setTimeout(() => navigate(`/projects/${id}`), 3000);
				return {
					success: success,
				};
			});
		},
		onError: (error) => {
			queryClient.setQueryData("update-project-info", () => {
				return {
					error: error.response.data.error,
				};
			});
			setTimeout(() => queryClient.removeQueries("update-project-info"), 1000);
		}
	});
};
