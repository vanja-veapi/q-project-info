import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router";
import { fetchSingleUser } from "../../../hooks/users/useFindUser";
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";
import EditUserForm from "../../elements/UserForm/EditUserForm";
import Aside from "../../layouts/Aside/Aside";
import AdminNav from "../../layouts/AdminNav/AdminNav";
// Pages
import Profile from "../Profile/Profile";

const EditData = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { data: fetchUser, isLoading, refetch } = useQuery(["edit-user", params.id], fetchSingleUser);

	if (isLoading) {
		return <QuantoxSpinner />;
	}

	if (fetchUser?.data.length === 0) {
		setTimeout(() => navigate("/dashboard"), 3000);
		return <h1>Error has occured. You'll be redirect in 3 seconds.</h1>;
	}
	return (
		<div className="admin-dashboard d-flex">
			<Aside isMainDashboardPage={false} />
			<div className="container-fluid">
				<AdminNav />
				<EditUserForm fetchUser={fetchUser.data[0]} isLoading={isLoading} refetch={refetch} isAdmin={true} />
			</div>
		</div>
	);
};

export default EditData;
