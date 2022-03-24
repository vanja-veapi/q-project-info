import React from "react";
import "./ProjectContainer.css";

import rocket from "../../../assets/rocket.png";
import { FaReact } from "react-icons/fa";
import ProjectCard from "../ProjectCard/ProjectCard";

const ProjectContainer = ({ bgColor }) => {
	console.log(bgColor);
	return (
		<>
			<div className={`${bgColor} under-header`}>
				<div className="container-project m-auto">
					<div className="row justify-content-md-center">
						{/* Left container */}
						<div className="col-md-12 col-lg-6">
							<div className="rocket d-flex justify-content-center mb-sm-3 md-0">
								<img src={rocket} alt="Rocket" />
								<div className="text text-start ms-2">
									<h1>My Projects</h1>
									<p className="text-muted">Here you'll find all your projects.</p>
								</div>
							</div>
						</div>

						{/* Right Container */}
						<div className="search-container col-md-12 col-lg-6 d-flex align-items-center justify-content-center mt-3 mt-lg-0">
							<div className="input d-flex align-items-center position-relative">
								<input type="text" id="search" placeholder="Search Project" className="search form-control" />
								<FaReact className="icon position-absolute text-muted" />
							</div>

							{/* If user has project role, then he'll see this button */}
							<button className="btn btn-success">New Project</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container container-project cards d-flex flex-wrap justify-content-center justify-content-lg-start">
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
			</div>
		</>
	);
};

export default ProjectContainer;
