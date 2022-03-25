import { useQueryClient } from "react-query";

export const useLogoutUser = () => {
	const queryClient = useQueryClient();
	queryClient.setQueryData("token", null);
	return queryClient.removeQueries("users");
};
