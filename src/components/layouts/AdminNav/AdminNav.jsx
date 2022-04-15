import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import "../../pages/AdminDashboard/AdminDashboard.css";
const AdminNav = () => {
	return (
		<nav className="admin-nav w-100 h-auto bg-white text-end">
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
	);
};

export default AdminNav;
