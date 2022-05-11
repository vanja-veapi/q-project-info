import React from "react";
import "./Header.css";

import logo from "../../../assets/logo.png";
import Nav from "../Nav/Nav";

const Header = () => {
	return (
		<div className="row header bg-header m-auto container">
			<div className="col-sm-4 col-md-6 d-flex align-items-center">
				<img src={logo} alt="Logo" className="img-fluid position-absolute" />
				<h1 className="h3 ms-2 d-none d-md-block">Q Project Info</h1>
			</div>
			<div className="col-sm-8 col-md-6">
				<Nav />
			</div>
		</div>
	);
};

export default Header;
