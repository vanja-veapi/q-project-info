import { useQuery } from "react-query";
import instance from "../../config/config";

const fetchLoggedUser = () => {
	return instance.get("/api/users/me?populate=*");
};

export default function useLoggedUser() {
	return useQuery(["user"], fetchLoggedUser, { refetchOnWindowFocus: false });
}
