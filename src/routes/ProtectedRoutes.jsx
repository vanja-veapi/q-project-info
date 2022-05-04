import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useLoggedUser from "../hooks/users/useLoggedUser";
import Header from "../components/layouts/Header/Header";

const useAuth = () => {
	if (localStorage.getItem("token") != null) {
		const token = localStorage.getItem("token");
		return token;
	}
};

const ProtectedRoutes = () => {
	const isAuth = useAuth();
	const loggedUser = useLoggedUser();
	const roleName = loggedUser?.data?.data?.role.name;

	if (roleName !== "System Administrator" && window.location.pathname.includes("/dashboard")) {
		return <Navigate to="/projects" />;
	}

	return isAuth ? (
		roleName !== "System Administrator" ? (
			<>
				<div className="w-100 h-auto bg-header">
					<Header />
				</div>
				<Outlet />
			</>
		) : (
			<Outlet />
		)
	) : (
		<Navigate to="/" />
	);
};

export default ProtectedRoutes;
