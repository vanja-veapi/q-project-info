import { useQuery } from "react-query";
import instance from "../../config/config";

const getProject = async (id) => {
	if (!id) {
		return null;
	}

	return await instance.get(`/api/projects/${id}?populate=*`);
};

export const useGetProject = (id) => {
	return useQuery(["single-project", id], () => getProject(id));
};