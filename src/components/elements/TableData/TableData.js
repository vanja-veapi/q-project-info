import React from "react";
import { useDestroyUser } from "../../../hooks/users/useDestroyUser";
import { useDestroyCategory } from "../../../hooks/categories/useDestroyCategory";

const TableData = ({ id, name, email, type }) => {
	const { mutate: destroyUser } = useDestroyUser();
	const { mutate: destroyCategory } = useDestroyCategory();

	const handleDestory = () => {
		switch (type) {
			case "users":
				destroyUser(id);
				break;
			case "categories":
				destroyCategory(id);
				break;
		}
	};

	const handleEdit = () => {
		switch (type) {
			case "users":
				console.log(id);
				console.log("USER");
				break;
			case "categories":
				console.log(id);
				console.log("CATEG");
				break;
		}
	};
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			{email ? <td>{email}</td> : null}
			<td>
				<button className="btn text-white bg-warning" onClick={handleEdit}>
					Edit
				</button>
			</td>
			<td>
				<button id={id} className="btn text-white bg-danger" onClick={handleDestory}>
					Remove
				</button>
			</td>
		</tr>
	);
};

export default TableData;
