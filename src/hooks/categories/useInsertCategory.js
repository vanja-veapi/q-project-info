// /api/categories
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import instance from "../../config/config";

const insertCategory = async (name) => {
	const res = await instance.get("/api/categories");
	let checkNameInBase = res?.data?.data.some((category) => category.attributes.name.toLowerCase() === name.toLowerCase());
	// Check if name already exist in DB
	if (!checkNameInBase) {
		return await instance.post("/api/categories", { data: { name } });
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
export const useInsertCategory = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation(insertCategory, {
		onError: (error) => {
			console.log("Desio se error");
			queryClient.setQueryData("insert-category", error.response.data.error);
			setTimeout(() => queryClient.removeQueries("insert-category"), 1000);
		},
		onSuccess: (success) => {
			queryClient.setQueryData("insert-category", success);
			setTimeout(() => navigate("/dashboard"), 1000);
			return success;
		},
	});
};
