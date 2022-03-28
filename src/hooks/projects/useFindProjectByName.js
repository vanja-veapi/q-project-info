import { useQuery } from "react-query";
import instance from "../../config/config";

const findProjectByName = (rqObject) => {
	const employeeId = rqObject.queryKey[1];
	const searchQuery = rqObject.queryKey[2];
	return instance.get(`/api/projects?filters[employees][id][$eq]=${employeeId}&filters[name][$containsi]=${searchQuery}&populate=*`);
};

export const useFindProjectByName = (employeeId, searchQuery) => {
	return useQuery(["user-projects", employeeId, searchQuery], findProjectByName);
};
