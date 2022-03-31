import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../../config/config";
import useLoggedUser from "./useLoggedUser";

const updateUser = (data) => {
	console.log(data);
	return instance.put(`/api/users/${data.id}`, data);
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation(updateUser, {
		onError: (error) => console.log(error),
		onSuccess: (success) => {
			queryClient.setQueryData(["user"], success);

			return success;
		},
	});
};
