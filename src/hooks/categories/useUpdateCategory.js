import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import instance from "../../config/config";

const updateCategory = async (updatedCategory) => {
	const id = updatedCategory.id;
	const newName = updatedCategory.attributes.name;

	const res = await instance.get("/api/categories");

	let checkNameInBase = res?.data?.data.some((category) => category.attributes.name.toLowerCase() === newName.toLowerCase());

	// Check if name already exist in DB
	if (!checkNameInBase) {
		return await instance.put(`/api/categories/${id}`, { data: { name: newName } });
	} else {
		throw {
			response: {
				data: {
					error: {
						status: 400,
						message: "Name already exist in DB",
					},
				},
			},
		};
	}
};
export const useUpdateCategory = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation(updateCategory, {
		onError: (error) => {
			queryClient.setQueryData("insert-category", error.response.data.error);
			setTimeout(() => queryClient.removeQueries("insert-category"), 1000);
			return error;
		},
		onSuccess: (success) => {
			queryClient.setQueryData("insert-category", success);

			setTimeout(() => {
				navigate("/dashboard");
				queryClient.removeQueries("insert-category");
			}, 1000);

			return success;
		},
	});
};
