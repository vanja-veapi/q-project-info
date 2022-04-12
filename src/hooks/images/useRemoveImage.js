import { useMutation } from "react-query";
import instance from "../../config/config";

const removeImage = (photoId) => {
	return instance.delete(`/api/upload/files/${photoId}`);
};
export const useRemoveImage = () => {
	return useMutation(removeImage);
};
