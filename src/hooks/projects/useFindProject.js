import { useQuery } from "react-query";
import instance from "../../config/config";

const findProject = (rqObject) => {
	const userId = rqObject.queryKey[1];
	// const isPM = rqObject.queryKey[2];
	// if (isPM) {
	// 	return instance.get(`/api/projects?filters[manager][id][$eq]=${userId}&populate=*`);
	// }
	// else {
	return instance.get(`/api/projects?filters[employees][id][$eq]=${userId}&populate=*`);
	// }
};

export const useFindProject = (employeeId, isPM) => {
	return useQuery(["user-projects", employeeId, isPM], findProject);
};
