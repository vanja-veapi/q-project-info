import React, { useState } from "react";
import { useQuery } from "react-query";
import { useInsertCategory } from "../../../hooks/categories/useInsertCategory";
import { useUpdateCategory } from "../../../hooks/categories/useUpdateCategory";
const InsertCategoryForm = ({ id, categoryObj, isAdmin }) => {
	const categoryRegEx = /^[A-ZŽŠĐČĆ][A-ZŽŠĐČĆa-zžšđčć ]{3,30}$/;

	const { mutate: insertCategory } = useInsertCategory();
	const { mutate: updateCategory } = useUpdateCategory();

	const { data } = useQuery("insert-category", () => {});

	const [category, setCategory] = useState(categoryObj?.name);
	const [message, setMessage] = useState(null);

	const handleInsert = () => {
		if (!categoryRegEx.test(category)) {
			return setMessage("Category is not in valid format...");
		}
		console.log(category);
		insertCategory(category);
		setMessage(null);
	};

	const handleUpdate = () => {
		if (!categoryRegEx.test(category)) {
			return setMessage("Category is not in valid format...");
		}
		console.log(category);
		const updatedCategory = {
			id,
			attributes: {
				name: category,
			},
		};
		updateCategory(updatedCategory);
		setMessage(null);
	};

	return (
		<div className="container-fluid">
			<div className="insert-user card">
				<div className="card-header">
					<h1 className="text-muted h1">{isAdmin ? "Edit Category" : "Insert category"}</h1>
				</div>
				<div className="card-body">
					<small className="text-danger">{message}</small>
					<input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} placeholder={isAdmin ? "Edit Category" : "Add Category"} />
					<div className="button-container mt-3">{isAdmin ? <input type="button" value="Edit" className="btn btn-success" onClick={handleUpdate} /> : <input type="button" value="Insert" className="btn btn-success" onClick={handleInsert} />}</div>

					{console.log(data?.status)}
					{data?.status >= 400 ? <div className="alert alert-danger mt-3">{data?.message}</div> : null}
					{data?.status === 200 && !isAdmin ? <div className="alert alert-success mt-3">You have successfully inserted category</div> : null}
					{data?.status === 200 && isAdmin ? <div className="alert alert-success mt-3">You have successfully edited category</div> : null}
				</div>
			</div>
		</div>
	);
};

export default InsertCategoryForm;
