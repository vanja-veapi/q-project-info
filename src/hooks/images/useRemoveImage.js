import { useMutation } from "react-query";
import instance from "../../config/config";

const removeImage = (photoId) => {
	return instance.delete(`/api/upload/files/${photoId}`);
};
export const useRemoveImage = () => {
	return useMutation(removeImage, {
		onSettled: (settle) => {
			console.log(settle);
			console.log("Loading...");
		},
		onError: (error) => {
			console.log({ error });
		},
		onSuccess: (success) => {
			console.log(success);
		},
	});
};
