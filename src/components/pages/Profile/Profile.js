import React, { useState } from "react";
// Css
import "./Profile.css";
// Images
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import EditUserForm from "../../elements/UserForm/EditUserForm";
import Aside from "../../layouts/Aside/Aside";
import AdminNav from "../../layouts/AdminNav/AdminNav";
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";

const Profile = () => {
	const { data: fetchUser, isLoading, refetch, isError, error } = useLoggedUser();
	const [isAdmin] = useState(fetchUser?.data?.role?.name);

	if (isLoading) {
		return <QuantoxSpinner />;
	}

	if (isError) {
		return <div className="alert alert-danger w-50 mt-5 m-auto">{error.message}</div>;
	}
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
