import React, { useState } from "react";
// Css
import "./Profile.css";
// Images
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import EditUserForm from "../../elements/UserForm/EditUserForm";
import Aside from "../../layouts/Aside/Aside";
import AdminNav from "../../layouts/AdminNav/AdminNav";

const Profile = () => {
	const { data: fetchUser, isLoading, refetch } = useLoggedUser();
	const [isAdmin] = useState(fetchUser?.data?.role?.name);
	return (
		<div className="d-flex">
			{isAdmin === "System Administrator" ? <Aside /> : null}
			<div className="container-fluid">
				{isAdmin === "System Administrator" ? <AdminNav /> : null}
				<EditUserForm fetchUser={fetchUser?.data} refetch={refetch} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default Profile;
