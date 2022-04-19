import { useQuery } from "react-query";
import instance from "../../config/config";

const fetchLoggedUser = async () => {
	return await instance.get("/api/users/me?populate=*");
};

export default function useLoggedUser() {
	return useQuery(["logged-user"], fetchLoggedUser, { refetchOnWindowFocus: false });
}
