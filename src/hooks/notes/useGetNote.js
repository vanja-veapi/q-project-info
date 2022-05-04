import { useQuery } from "react-query";
import instance from "../../config/config";

const getNote = async (id) => {
	if (!id) {
		return null;
	}

	return await instance.get(`/api/notes/${id}?populate=*`);
};

export const useGetNote = (id) => {
	return useQuery(["single-note", id], () => getNote(id));
};