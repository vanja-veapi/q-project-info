import React from "react";
import InsertCategoryForm from "../../elements/UserForm/InsertCategoryForm";
import Aside from "../../layouts/Aside/Aside";
import AdminNav from "../../layouts/AdminNav/AdminNav";
const InsertCategory = () => {
	return (
		<div className="d-flex">
			<Aside />
			<div className="container-fluid">
				<AdminNav />
				<InsertCategoryForm />
			</div>
		</div>
	);
};

export default InsertCategory;
