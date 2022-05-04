import { useMutation, useQueryClient } from "react-query";
import instance from "../../config/config";
import { useNavigate } from "react-router";

const updateNote = (data) => {
	return instance.put(`/api/notes/${data.id}`, data);
};

export const useUpdateNote = (id) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(updateNote, {
		onSuccess: (success) => {
			queryClient.setQueryData("update-note-info", () => {
				setTimeout(() => navigate(`/projects/${id}`), 3000);
				return {
					success: success,
				};
			});
		},
		onError: (error) => {
			queryClient.setQueryData("update-note-info", () => {
				return {
					error: error.response.data.error,
				};
			});
			setTimeout(() => queryClient.removeQueries("update-note-info"), 1000);
		}
	});
};
