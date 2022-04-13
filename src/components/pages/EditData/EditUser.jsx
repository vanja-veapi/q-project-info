import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router";
import { fetchSingleUser } from "../../../hooks/users/useFindUser";
import EditUserForm from "../../elements/UserForm/EditUserForm";
// Pages
import Aside from "../../layouts/Aside/Aside";
import Profile from "../Profile/Profile";

const EditData = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { data: fetchUser, isLoading, refetch } = useQuery(["edit-user", params.id], fetchSingleUser);

	if (isLoading) {
		return "Load...";
	}

	if (fetchUser?.data.length === 0) {
		setTimeout(() => navigate("/dashboard"), 3000);
		return <h1>Error has occured. You'll be redirect in 3 seconds.</h1>;
	}
	return (
		<div className="admin-dashboard d-flex">
			<Aside />
			<div className="container-fluid">
				<EditUserForm fetchUser={fetchUser.data[0]} isLoading={isLoading} refetch={refetch} isAdmin={true} />
			</div>
		</div>
	);
};

export default EditData;
