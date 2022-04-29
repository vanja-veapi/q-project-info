import React, { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";

import instance from "../../../config/config";
// Layouts
import Aside from "../../layouts/Aside/Aside";
import AdminNav from "../../layouts/AdminNav/AdminNav";
// CSS
import "./AdminDashboard.css";
import styles from "./AdminDashboard.module.css";
// Icons
import { CgProfile } from "react-icons/cg";
import { MdOutlineCategory } from "react-icons/md";
import { useQuery } from "react-query";
import TableData from "../../elements/TableData/TableData";
// Hooks
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";
import ReactPaginate from "react-paginate";
const AdminDashboard = () => {
	const [itemsPerPage] = useState(5);
	const [itemOffsetUsers, setItemOffsetUsers] = useState(0);
	const [itemOffsetCategories, setItemOffsetCategories] = useState(0);

	// User Pagination
	const [currentPageUsers, setCurrentPageUsers] = useState(null);
	const [pageCountUsers, setPageCountUsers] = useState(0);
	// Category pagination
	const [currentPageCategories, setCurrentPageCategories] = useState(null);
	const [pageCountCategories, setPageCountCategories] = useState(0);

	const loggedUser = useLoggedUser();
	const userData = loggedUser.data?.data;
	const { data: categories } = useQuery("categories", () => instance.get("/api/categories"));
	const { data: users, isLoading: userLoading } = useQuery("users", () => instance.get("/api/users"), {
		onComplete: () => setCurrentPageUsers(users?.data),
	});
	const { data } = useQuery("isAdmin", () => true);

	let tableName = null;
	let previousTableName = !localStorage.getItem("previousTableName") ? null : localStorage.getItem("previousTableName");

	const toggleTable = (e) => {
		// console.log(previousTableName, e.currentTarget.classList[1]);
		if (previousTableName !== null && previousTableName !== e.currentTarget.classList[1]) {
			document.querySelector(`#${previousTableName}`).classList.add("d-none");
		}
		tableName = document.querySelector(`#${e.currentTarget.classList[1]}`);
		tableName.classList.toggle("d-none");

		previousTableName = e.currentTarget.classList[1];
		localStorage.setItem("previousTableName", previousTableName);
	};

	const handlePageClick = (event, isUserPagination) => {
		let newOffset = null;
		if (isUserPagination) {
			newOffset = (event.selected * itemsPerPage) % users?.data.length;
			setItemOffsetUsers(newOffset);
		} else {
			newOffset = (event.selected * itemsPerPage) % categories?.data?.data.length;
			setItemOffsetCategories(newOffset);
		}
	};

	useEffect(() => {
		const endOffset = itemOffsetUsers + itemsPerPage;

		setCurrentPageUsers(users?.data.slice(itemOffsetUsers, endOffset));
		setPageCountUsers(Math.ceil(users?.data.length / itemsPerPage));
	}, [itemOffsetUsers, itemsPerPage, users?.data]);

	useEffect(() => {
		const endOffset = itemOffsetCategories + itemsPerPage;

		setCurrentPageCategories(categories?.data?.data.slice(itemOffsetCategories, endOffset));
		setPageCountCategories(Math.ceil(categories?.data?.data.length / itemsPerPage));
	}, [itemOffsetCategories, itemsPerPage, categories?.data]);

	// console.log(userData);
	if (userData?.role?.id !== 3) {
		return <Navigate to="/projects" />;
	}

	return (
		<div className="admin-dashboard d-flex">
			{userLoading ? <QuantoxSpinner /> : null}

			<Aside toggleTable={toggleTable} isMainDashboardPage={true} />
			<div className="container-fluid content-wrapper">
				<AdminNav />
				<div className="container-fluid pt-4 pt-md-0">
					<div className="row">
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
										<tbody>
											{/* Na prvoj strani imam jendog korisnika manje, zato sto sam preskocio samog sebe, tj ulogovanog korisnika */}

											{currentPageUsers?.map((user) => (userData.id === user.id ? null : <TableData key={user.id} id={user.id} name={user.username} email={user.email} type={"users"} />))}
										</tbody>
									</table>
									<div className="btn-container mt-3">
										<ReactPaginate breakLabel="..." nextLabel="next >" previousLabel="< previous" onPageChange={(e) => handlePageClick(e, true)} marginPagesDisplayed={1} pageCount={pageCountUsers} renderOnZeroPageCount={null} className={styles.pages + " list-group flex-row align-items-center justify-content-center mb-3"} activeClassName="active-page" pageClassName="list-group-item" previousClassName="d-none" nextClassName="d-none" breakClassName="list-group-item" />
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
											{currentPageCategories?.map((category) => (
												<TableData key={category.id} id={category.id} name={category.attributes.name} type={"categories"} />
											))}
										</tbody>
									</table>
									<div className="btn-container mt-3">
										<ReactPaginate breakLabel="..." nextLabel="next >" previousLabel="< previous" onPageChange={(e) => handlePageClick(e, false)} marginPagesDisplayed={1} pageCount={pageCountCategories} renderOnZeroPageCount={null} className={styles.pages + " list-group flex-row align-items-center justify-content-center mb-3"} activeClassName="active-page" pageClassName="list-group-item border" previousClassName="d-none" nextClassName="d-none" breakClassName="list-group-item border" />
										<NavLink to="/dashboard/category/add">
											<button className="btn btn-success">Insert new category</button>
										</NavLink>
									</div>
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
