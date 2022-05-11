import React, { useState } from "react";
import "./Nav.css";
import styles from "./Nav.module.css";

import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";

const Nav = () => {
	const { data } = useQuery("register-info", () => {});
	let lsToken = localStorage.getItem("token");
	let token = useQuery("token", () => {}, { refetchOnMount: false, refetchOnWindowFocus: false });

	if (lsToken === null) {
		token.data = null;
	}

	const [openMenu, setOpenMenu] = useState(false);
	const handleMenu = () => {
		const navList = document.querySelector("#nav-list");

		if (!openMenu) {
			navList.classList.toggle("d-none");
			navList.classList.toggle(`${styles["animate-menu"]}`);

			setTimeout(() => (navList.style.padding = "1.5rem"), 50);
			setTimeout(() => (navList.style.height = "160px"), 200);

			setOpenMenu(!openMenu);
		}

		if (openMenu) {
			navList.style.height = "0";
			setTimeout(() => (navList.style.padding = "0"), 200);

			setTimeout(() => {
				navList.classList.toggle("d-none");
				navList.classList.toggle(`${styles["animate-menu"]}`);
				navList.removeAttribute("style");
			}, 500);
			setOpenMenu(!openMenu);
		}
	};

	const debounce = (fn, timeout = 300) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => fn.apply(this, args), timeout);
		};
	};
	const processChange = debounce(() => handleMenu(), 200);
	return (
		<nav className="nav navbar justify-content-end">
			{/* justify-content-center umesto around da bude i gap 20px gap-4 */}
			<ul id="nav-list" className="justify-content-center d-none d-lg-flex">
				{!token.data && (
					<>
						<li className="nav-item">
							<NavLink to="/" className="nav-link">
								Login
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/register" className="nav-link">
								Register
							</NavLink>
						</li>
					</>
				)}
				{token.data && (
					<>
						<li className="nav-item">
							<NavLink to="/projects" className="nav-link">
								My projects
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/profile" className="nav-link">
								Account
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/logout" className="nav-link">
								Logout
							</NavLink>
						</li>
					</>
				)}
			</ul>
			<button className="btn btn-primary d-md-block d-lg-none hamburger" onClick={processChange}>
				<GiHamburgerMenu className="hamburger-font" />
			</button>
		</nav>
	);
};

export default Nav;
