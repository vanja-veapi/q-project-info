import { useMutation, useQueryClient } from "react-query";
import instance from "../config/config";

const uploadPhoto = async (data) => {
	return await instance.post("/api/upload", data);
};

export const useUploadPhoto = () => {
	const queryClient = new useQueryClient();
	return useMutation(uploadPhoto, {
		onSuccess: (success) => {
			queryClient.setQueryData("upload-info", success.data[0].id);
			return success.data;
		},
	});
};
