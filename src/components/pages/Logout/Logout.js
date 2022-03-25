import React from "react";
import { QueryClient } from "react-query";
import { Navigate } from "react-router-dom";
import { useLogoutUser } from "../../../hooks/users/LogoutUser/useLogoutUser";

const Logout = () => {
	localStorage.removeItem("token");
	const logoutUser = useLogoutUser();

	return <Navigate to="/" />;
};

export default Logout;
