import React from "react";
import logo from "../../../assets/logo.png";
import "./Header.css";

const Header = () => {
	return (
		<div className="header row">
			<div className="col-4 ms-3 d-flex align-items-center">
				<img src={logo} alt="Logo" className="img-fluid" />
				<h1 className="ms-2 h3">Q Project Info</h1>
			</div>
			<div className="col-8"></div>
		</div>
	);
};

export default Header;
