import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
	if (localStorage.getItem("token") != null) {
		const token = localStorage.getItem("token");
		return token;
	}
};

const ProtectedRoutes = () => {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
