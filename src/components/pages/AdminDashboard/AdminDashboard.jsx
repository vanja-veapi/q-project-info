import React from "react";
import { NavLink, Navigate } from "react-router-dom";

import instance from "../../../config/config";
// Layouts
import Aside from "../../layouts/Aside/Aside";
// CSS
import "./AdminDashboard.css";
import styles from "./AdminDashboard.module.css";
// Icons
import { CgProfile } from "react-icons/cg";
import { MdOutlineCategory } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";
import TableData from "../../elements/TableData/TableData";
// Hooks
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";
const AdminDashboard = () => {
	const loggedUser = useLoggedUser();
	const userData = loggedUser.data?.data;
	const { data: categories } = useQuery("categories", () => instance.get("/api/categories"));
	const { data: users, isLoading: userLoading } = useQuery("users", () => instance.get("/api/users"));

	let tableName = null;
	let previousTableName = null;

	const toggleTable = (e) => {
		console.log(previousTableName, e.currentTarget.classList[1]);
		if (previousTableName !== null && previousTableName !== e.currentTarget.classList[1]) {
			document.querySelector(`#${previousTableName}`).classList.add("d-none");
		}
		tableName = document.querySelector(`#${e.currentTarget.classList[1]}`);
		tableName.classList.toggle("d-none");

		previousTableName = e.currentTarget.classList[1];
	};

	// console.log(userData);
	if (userData?.role?.id !== 3) {
		return <Navigate to="/home" />;
	}
	return (
		<div className="admin-dashboard d-flex">
			{userLoading ? <QuantoxSpinner /> : null}

			<Aside toggleTable={toggleTable} />
			<div className="container-fluid content-wrapper">
				<nav className="w-100 h-auto bg-white text-end">
					<ul className="w-100 d-flex justify-content-responsive">
						<li className="list-group-item d-block d-md-none">
							<button className="btn">
								<GiHamburgerMenu />
							</button>
						</li>
						<li className="list-group-item">
							<NavLink to="/logout" className="nav-link fw-light">
								Logout
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="container-fluid">
					<div className="row justify-content-end">
						<div className="col-12 col-lg-6">
							<div className="small-box bg-danger d-flex justify-content-between align-items-center">
								<div className="inner">
									<h3>{users?.data.length}</h3>
									<p>Registered user</p>
								</div>
								<div className={styles.icon}>
									<CgProfile />
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-6">
							<div className="small-box bg-success d-flex justify-content-between align-items-center">
								<div className="inner">
									{/* Count categories */}
									<h3>{categories?.data.data.length}</h3>
									<p>Created categories</p>
								</div>
								<div className={styles.icon}>
									<MdOutlineCategory />
								</div>
							</div>
						</div>
						{/* Display All users, you can edit/delete/update user and block him */}
						<div id="users" className="col-md-12 col-lg-12 mb-3 d-none">
							<div className={styles.card + " card"}>
								<div className="card-body table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>ID</th>
												<th>Username</th>
												<th>Email</th>
												<th>Edit</th>
												<th>Delete</th>
											</tr>
										</thead>
										<tbody>{users?.data.map((user) => (userData.id === user.id ? null : <TableData key={user.id} id={user.id} name={user.username} email={user.email} type={"users"} />))}</tbody>
									</table>
									<div className="btn-container mt-3">
										<NavLink to="/dashboard/user/add">
											<button className="btn btn-success">Insert new user</button>
										</NavLink>
									</div>
								</div>
							</div>
						</div>

						{/* Display all Categories... */}
						<div id="categories" className="col-md-12 col-lg-12 mb-3 d-none">
							<div className={styles.card + " card"}>
								<div className="card-body table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>ID</th>
												<th>Category name</th>
												<th>Edit</th>
												<th>Delete</th>
											</tr>
										</thead>
										<tbody>
											{categories?.data.data.map((category) => (
												<TableData key={category.id} id={category.id} name={category.attributes.name} type={"categories"} />
											))}
										</tbody>
									</table>
									<NavLink to="/dashboard/category/add">
										<button className="btn btn-success">Insert new category</button>
									</NavLink>
								</div>
							</div>
						</div>

						{/* To Do List Component/Element */}
						{/* <div className="col-md-12 col-lg-4">
							<div className={styles.card + " card"}>
								<div className="card-header">
									<TiClipboard />
									To Do List
								</div>

								<div className="card-body">
									<div className="form-check">
										<input type="checkbox" name="" id="" className="form-check-input" />
										<label htmlFor="" className="form-check-label">
											Dodaj permisiju korisniku Peri Pericu
										</label>
									</div>
									<div className="form-check">
										<input type="checkbox" name="" id="" className="form-check-input" defaultChecked />
										<label htmlFor="" className="form-check-label">
											<s>Unapredi korisnika Miroljuba u Project Managera</s>
										</label>
									</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
