import React from "react";
import "./ProjectCard.css";

import test from "../../../assets/filip-najava.png";
import { BsBoxArrowUpRight } from "react-icons/bs";
const ProjectCard = () => {
	return (
		<div className="project-card text-start d-flex">
			<div className="project-data d-flex">
				{/* Company Logo */}
				<img src={test} alt="Fica" />
				<div className="d-flex flex-column ms-3">
					<div className="project-title">
						<h2>PrName</h2>
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
				<p className="text-muted mt-3">6 employees</p>
			</div>
		</div>
	);
};

export default ProjectCard;
