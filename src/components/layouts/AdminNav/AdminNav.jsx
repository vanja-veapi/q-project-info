import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import "../../pages/AdminDashboard/AdminDashboard.css";
const AdminNav = () => {
	const [isClicked, setIsClicked] = useState(false);
	const handleAside = async (e) => {
		const btnMenu = document.querySelector("#btnMenu");
		const aside = document.querySelector("aside");
		if (isClicked) {
			console.log(true);

			aside.classList.toggle("active-aside");
			aside.classList.toggle("w-100");
			btnMenu.classList.toggle("active");

			setTimeout(() => aside.classList.toggle("d-none"), 210);

			setIsClicked(false);
		} else {
			console.log(false);
			aside.classList.toggle("d-none");
			btnMenu.classList.toggle("active");
			setTimeout(() => {
				aside.classList.toggle("active-aside");
				aside.classList.toggle("w-100");
			}, 1);

			setIsClicked(true);
		}
	};
	return (
		<nav className="admin-nav w-100 h-auto bg-white text-end">
			<ul className="w-100 d-flex justify-content-responsive">
				<li className="list-group-item d-block d-md-none">
					<button id="btnMenu" className="btn btn-aside" onClick={handleAside}>
						<GiHamburgerMenu className="h2" />
					</button>
				</li>
				<li className="list-group-item d-flex align-items-center	">
					<NavLink to="/logout" className="nav-link fw-light">
						Logout
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default AdminNav;
