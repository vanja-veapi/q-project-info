import React from "react";
import InsertUserForm from "../../elements/UserForm/InsertUserForm";
import AdminNav from "../../layouts/AdminNav/AdminNav";
import Aside from "../../layouts/Aside/Aside";

const InsertUser = () => {
	return (
		<div className="d-flex">
			<Aside />
			<div className="container-fluid">
				<AdminNav />
				<InsertUserForm />
			</div>
		</div>
	);
};

export default InsertUser;
