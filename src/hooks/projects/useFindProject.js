import { useQuery } from "react-query";
import instance from "../../config/config";

const findProject = (rqObject) => {
	const userId = rqObject.queryKey[1];
	return instance.get(`/api/projects?filters[employees][id][$eq]=${userId}&populate=*`);
};

export const useFindProject = (employeeId) => {
	return useQuery(["user-projects", employeeId], findProject);
};
