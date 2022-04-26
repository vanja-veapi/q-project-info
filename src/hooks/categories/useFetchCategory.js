import instance from "../../config/config";
export const useFetchCategory = (rqObj) => {
	const categoryId = rqObj.queryKey[1];
	return instance.get(`/api/categories/${categoryId}`);
};
