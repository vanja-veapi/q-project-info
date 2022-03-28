import React from "react";
import "./ProjectContainer.css";
// IMG
import rocket from "../../../assets/rocket.png";
import { FaReact } from "react-icons/fa";
// Elements
import ProjectCard from "../ProjectCard/ProjectCard";
import QuantoxSpinner from "../QuantoxSpinner/QuantoxSpinner";
// React Query
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import { useFindProject } from "../../../hooks/projects/useFindProject";

const ProjectContainer = ({ bgColor, isPM }) => {
	const fetchUser = useLoggedUser();
	const username = fetchUser.data?.data.username;
	const roleName = fetchUser.data?.data.role.name;
	const id = fetchUser.data?.data.id;

	const { data, isLoading, isError, error } = useFindProject(id);
	const projects = data?.data.data;

	if (isLoading) {
		return <QuantoxSpinner />;
	}

	if (isError) {
		return <h1>{error}</h1>;
	}
	return (
		<>
			<h1>Welcome back {username}</h1>
			<h2>Your role is: {roleName}</h2>
			<h3>Your id is: {id}</h3>
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
							{!isPM ? "" : <button className="btn btn-success">New Project</button>}
						</div>
					</div>
				</div>
			</div>
			<div className="container container-project cards d-flex flex-wrap justify-content-center justify-content-lg-start">{projects.length === 0 ? <h1>This user has no project</h1> : projects.map((project) => <ProjectCard key={project.id} name={project.attributes.name} logo={project.attributes.logo} countEmployees={project.attributes.employees.data.length} />)}</div>
		</>
	);
};

export default ProjectContainer;
