import React from "react";
import "./Nav.css";

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
	return (
		<nav className="nav navbar justify-content-end">
			{/* justify-content-center umesto around da bude i gap 20px gap-4 */}
			<ul className="justify-content-center d-none d-lg-flex">
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
							<NavLink to="/home" className="nav-link">
								My profile
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
			<button className="btn btn-primary d-md-block d-lg-none hamburger">
				<GiHamburgerMenu className="hamburger-font" />
			</button>
		</nav>
	);
};

export default Nav;
