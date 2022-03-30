import React from "react";
import "./ProjectCard.css";

import test from "../../../assets/filip-najava.png";
import noImage from "../../../assets/no-image.jpg";
import { BsBoxArrowUpRight } from "react-icons/bs";
const ProjectCard = ({ name, logo, countEmployees }) => {
	return (
		<div className="project-card text-start d-flex">
			<div className="project-data d-flex">
				{/* Company Logo */}
				{logo.data?.attributes.url === undefined ? <img src={noImage} alt="Project has no pic" /> : <img src={process.env.REACT_APP_BASEURL + logo.data?.attributes.url} alt={logo.data?.attributes.alternativeText} />}
				<div className="d-flex flex-column ms-3">
					<div className="project-title">
						<h2>{name}</h2>
					</div>
					<div className="author">
						{/* User Logo */}
						<img src={test} alt="Autor" width={21} />
						<span className="text-muted ms-1 mt-1">Pera Peric</span>
					</div>
				</div>
			</div>

			<div className="employee-data">
				<div className="d-flex justify-content-end align-item-center">
					<BsBoxArrowUpRight className="bs-box-font" />
				</div>
				<p className="text-muted mt-3">{countEmployees <= 1 ? `${countEmployees} employee` : `${countEmployees} employees`} </p>
			</div>
		</div>
	);
};

export default ProjectCard;
