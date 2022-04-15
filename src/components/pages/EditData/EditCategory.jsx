import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
// Layouts
import Aside from "../../layouts/Aside/Aside";
// Elements
import InsertCategoryForm from "../../elements/UserForm/InsertCategoryForm";
// Hooks
import { useFetchCategory } from "../../../hooks/categories/useFetchCategory";
import AdminNav from "../../layouts/AdminNav/AdminNav";

const EditCategory = () => {
	const { id } = useParams();
	const { data: category } = useQuery(["category", id], useFetchCategory);
	return (
		<div className="d-flex">
			<Aside />
			<div className="container-fluid">
				<AdminNav />
				<InsertCategoryForm id={id} categoryObj={category?.data?.data.attributes} isAdmin={true} />
			</div>
		</div>
	);
};

export default EditCategory;
