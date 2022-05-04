import { useMutation, useQueryClient } from "react-query";
import instance from "../../config/config";

const destroyUser = async (id) => {
	const res = await instance.delete(`/api/users/${id}`);
	if (res.status === 200) {
		return await instance.get("/api/users");
	}
};
export const useDestroyUser = () => {
	const queryClient = useQueryClient();

	return useMutation(destroyUser, {
		onError: (error) => error,
		onSuccess: (success) => {
			queryClient.setQueryData("users", success);

			return success;
		},
	});
};
