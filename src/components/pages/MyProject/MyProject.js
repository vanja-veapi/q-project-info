import React from "react";
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import ProjectContainer from "../../elements/ProjectContainer/ProjectContainer";
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";

export const MyProject = () => {
	const fetchUsers = useLoggedUser();
	const role = fetchUsers.data?.data.role.id;
	const isLoading = fetchUsers.status;

	if (isLoading === "loading") {
		return <QuantoxSpinner />;
	}

	if (role === 4) {
		console.log("Manager");
		return <ProjectContainer bgColor={"bg-blue-light"} isPM={true} />;
	}
	//RoleId 5 === Employee
	if (role === 5) {
		console.log("Employee id");
		return <ProjectContainer bgColor={"bg-green-light"} isPM={false} />;
	}
};
