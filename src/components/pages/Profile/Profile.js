import React from "react";
// Css
import "./Profile.css";
// Images
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import EditUserForm from "../../elements/UserForm/EditUserForm";

const Profile = () => {
	const { data: fetchUser, isLoading, refetch } = useLoggedUser();
	return <EditUserForm fetchUser={fetchUser?.data} refetch={refetch} isLoading={isLoading} />;
};

export default Profile;
