import { useMutation, useQueryClient } from "react-query";
import instance from "../../config/config";

const destroyCategory = async (id) => {
	const res = await instance.delete(`/api/categories/${id}`);
	if (res.status === 200) {
		return await instance.get("/api/categories");
	}
};
export const useDestroyCategory = () => {
	const queryClient = useQueryClient();

	return useMutation(destroyCategory, {
		onError: (error) => error,
		onSuccess: (success) => {
			queryClient.setQueryData("categories", success);

			return success;
		},
	});
};
