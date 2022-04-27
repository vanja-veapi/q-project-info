import instance from "../../config/config";

export const fetchSingleUser = (rqObject) => {
	const userId = rqObject.queryKey[1];
	return instance.get(`/api/users?filters[id][$eq]=${userId}&populate=*`);
};
