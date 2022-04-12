import React from "react";
import { useDestroyUser } from "../../../hooks/users/useDestroyUser";
import { useDestroyCategory } from "../../../hooks/categories/useDestroyCategory";
import { Link, Navigate, NavLink } from "react-router-dom";

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
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			{email ? <td>{email}</td> : null}
			<td>
				<NavLink to={`/dashboard/${type}/${id}/edit`}>
					<button className="btn text-white bg-warning">Edit</button>
				</NavLink>
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
