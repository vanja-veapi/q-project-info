import React, { useEffect, useState } from "react";
// Css
import "./Profile.css";
// Images
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import UserForm from "../../elements/UserForm/UserForm";

const Profile = () => {
	const { data: fetchUser, isLoading, refetch } = useLoggedUser();
	return <UserForm fetchUser={fetchUser?.data} refetch={refetch} isLoading={isLoading} />;
};

export default Profile;
