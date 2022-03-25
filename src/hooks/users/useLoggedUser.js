import { useQuery } from "react-query";
import instance from "../../config/config";

const fetchLoggedUser = () => {
	return instance.get("/api/users/me");
};

export default function useLoggedUser() {
	return useQuery("users", fetchLoggedUser, { refetchOnWindowFocus: false });
}
