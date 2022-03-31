import { useQueryClient } from "react-query";

export const useLogoutUser = () => {
	const queryClient = useQueryClient();
	for (let query of queryClient.queryCache.queries) {
		if (query.options.queryKey === "token") {
			queryClient.setQueryData("token", null);
		} else {
			queryClient.removeQueries(query.options.queryKey);
		}
	}
};
