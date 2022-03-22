import React from "react";
import "./Nav.css";

import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Nav = () => {
	return (
		<nav className="nav navbar justify-content-end">
			{/* justify-content-center umesto around da bude i gap 20px gap-4 */}
			<ul className="justify-content-around d-none d-lg-flex">
				{/* <li className="nav-item">
					<NavLink to="/" className="nav-link">
						My profile
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/ruta-2" className="nav-link">
						Account
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/ruta-3" className="nav-link">
						Logout
					</NavLink>
				</li> */}
				<li className="nav-item">
					<NavLink to="/login" className="nav-link">
						Login
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/register" className="nav-link">
						Register
					</NavLink>
				</li>
			</ul>
			<button className="btn btn-primary d-md-block d-lg-none hamburger">
				<GiHamburgerMenu className="hamburger-font" />
			</button>
		</nav>
	);
};

export default Nav;
