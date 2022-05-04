import React from "react";
import { useNavigate } from 'react-router';
import "./ProjectCard.css";

import noImage from "../../../assets/no-image.jpg";
import { BsBoxArrowUpRight } from "react-icons/bs";
const ProjectCard = ({ name, logo, countEmployees, user, projectId }) => {
    const navigate = useNavigate();
	
	const openProject = () => {
        navigate(`/projects/${projectId}`);
	}

	return (
		<div className="project-card-container" onClick={openProject}>
			<div className="project-card text-start d-flex">
				<div className="project-data d-flex">
					{/* Company Logo */}
					<div className="comapny-logo-conaeiner d-flex align-items-center justify-content-center">{logo.data?.attributes.url === undefined ? <img src={noImage} alt="Project has no pic" /> : <img src={process.env.REACT_APP_BASEURL + logo.data?.attributes.url} alt={logo.data?.attributes.alternativeText} />}</div>
					<div className="d-flex flex-column ms-3">
						<div className="project-title">
							<h2>{name}</h2>
						</div>
						<div className="author d-flex align-items-center">
							{/* User Logo */}
							{user.profileImage?.url === undefined ? <img src={noImage} alt="Profile has no pic" width={21} /> : <img src={process.env.REACT_APP_BASEURL + user.profileImage?.url} alt="Autor" width={21} height={21} />}
							<span className="text-muted ms-1 mt-1">{user.username}</span>
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
		</div>
	);
};

export default ProjectCard;
