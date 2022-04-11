import React from "react";
import { NavLink } from "react-router-dom";
// CSS
import "./Aside.css";
import styles from "./Aside.module.css";
// Image
import img from "../../../assets/no-image.jpg";
// Icons
import { CgProfile } from "react-icons/cg";
import { MdOutlineCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
const Aside = ({ toggleTable, userData }) => {
	return (
		<aside className="sidebar-container sidebar-dark p-3 w-100 d-none d-md-block">
			<div className={styles.sidebar}>
				<h1 className="h3 fw-light">Dashboard</h1>

				<div className="user d-flex align-items-center justify-content-around mt-4 pt-3 pb-3 border-top border-bottom">
					{userData?.profileImage ? <img src={process.env.REACT_APP_BASEURL + userData?.profileImage.url} alt={userData?.profileImage.name} width={33} className="rounded-circle" /> : <img src={img} alt="User" width={33} className="rounded-circle" />}
					<h2 className="h5 fw-light">{userData?.username}</h2>
				</div>

				<div className="categories mt-3">
					<ul className="">
						<li className="list-group-item users" onClick={toggleTable}>
							<div className="d-flex align-items-center gap-2">
								<CgProfile className="icon" />
								<NavLink to="#">Users</NavLink>
							</div>
						</li>
						<li className="list-group-item categories" onClick={toggleTable}>
							<div className="d-flex align-items-center gap-2">
								<MdOutlineCategory className="icon" />
								<NavLink to="#">Categories</NavLink>
							</div>
						</li>
						<li className="list-group-item">
							<div className="d-flex align-items-center gap-2">
								<FaUserAlt className="icon" />
								<NavLink to="#">Profile</NavLink>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
};

export default Aside;
