import React, { useEffect, useState } from "react";
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
import { useFindProjectByName } from "../../../hooks/projects/useFindProjectByName";

const ProjectContainer = ({ bgColor, isPM }) => {
	let html = "";
	// SearchQuery
	const [search, setSearch] = useState("");

	const fetchUser = useLoggedUser();
	const id = fetchUser.data?.data.id;

	const { data, isLoading, isError, error } = useFindProject(id);
	//Projekti
	const [projects, setProjects] = useState(data?.data.data);
	// const { data: searchData } = useFindProjectByName(id, search);

	const handleSearch = (e) => {
		if (e.target.value.toLowerCase() === "") {
			return setProjects(data?.data.data);
		}

		setProjects(data?.data.data.filter((project) => project?.attributes.name.toLowerCase().includes(e.target.value.toLowerCase())));
		// setSearch(e.target.value.toLowerCase());
		// setProjects(searchData?.data.data);
	};

	useEffect(() => {
		if (projects === undefined) {
			return setProjects(data?.data.data);
		}
	}, [data]);

	if (isLoading) {
		return <QuantoxSpinner />;
	}

	if (isError) {
		return <h1>{error}</h1>;
	}

	// if (projects?.length === 0 && search !== "") {
	// 	html = <h1>This user has no project</h1>;
	// } else if (projects?.length === 0) {
	// 	html = <h1>There are no project with that name...</h1>;
	// } else {
	// 	html = projects?.map((project) => <ProjectCard key={project.id} name={project.attributes.name} logo={project.attributes.logo} countEmployees={project.attributes.employees.data.length} />);
	// }

	// if (projects?.length === 0 && data.data.meta.pagination.total === 0) {
	// 	html = <h1>This user has no project - OVO JE DRUGI </h1>;
	// }
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
								<input type="text" id="search" placeholder="Search Project" className="search form-control" onInput={handleSearch} />
								<FaReact className="icon position-absolute text-muted" />
							</div>

							{/* If user has project role, then he'll see this button */}
							{!isPM ? "" : <button className="btn btn-success">New Project</button>}
						</div>
					</div>
				</div>
			</div>
			<div className="container container-project cards d-flex flex-wrap justify-content-center justify-content-lg-start">{projects?.length === 0 ? <h1>No project</h1> : projects?.map((project) => <ProjectCard key={project.id} name={project.attributes.name} logo={project.attributes.logo} countEmployees={project.attributes.employees?.data.length} />)}</div>
			{/* <div className="container container-project cards d-flex flex-wrap justify-content-center justify-content-lg-start">{html}</div> */}
		</>
	);
};

export default ProjectContainer;
