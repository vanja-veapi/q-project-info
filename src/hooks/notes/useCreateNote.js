import { useMutation, useQueryClient } from "react-query";
import instance from "../../config/config";
import { useNavigate } from "react-router";

const createNote = (data) => {
	return instance.post("/api/notes", data);
};

export const useCreateNote = (projectId) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(createNote, {
		onSuccess: (success) => {
			navigate(`/projects/${projectId}`);
		},
		onError: (error) => {
			queryClient.setQueryData("create-note-info", () => {
				return {
					error: error.response.data.error,
				};
			});
			setTimeout(() => queryClient.removeQueries("create-note-info"), 1000);
		}
	});
};