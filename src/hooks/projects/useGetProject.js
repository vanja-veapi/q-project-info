import { useQuery } from "react-query";
import instance from "../../config/config";

const getProject = async (id) => {
	return await instance.get(`/api/projects/${id}?populate=*`);
};

export const useGetProject = (id) => {
	return useQuery(["single-project", id], () => getProject(id));
};