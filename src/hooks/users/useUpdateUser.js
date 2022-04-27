import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../../config/config";

const updateUser = (data) => {
	return instance.put(`/api/users/${data.id}`, data);
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation(updateUser, {
		onError: (error) => {
			queryClient.setQueryData("user-update", error.response.data.error);
			setTimeout(() => queryClient.removeQueries("user-update"), 1000);
		},
		onSuccess: (success) => {
			queryClient.setQueryData(["user"], success);

			return success;
		},
	});
};
