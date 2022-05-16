import React, { useState, useRef, useEffect } from "react";
import './CreateProject.css';
import { useCreateProject } from "../../../hooks/projects/useCreateProject";
import { useGetProject } from '../../../hooks/projects/useGetProject';
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";

import rocketImg from '../../../assets/rocket.png';
import iconX from '../../../assets/images/icon-x.png';
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";
import instance from "../../../config/config";
import { useUpdateProject } from "../../../hooks/projects/useUpdateProject";
import useLoggedUser from "../../../hooks/users/useLoggedUser";

const CreateProject = ({ edit }) => {
    const fileRef = useRef();

    const [projectLogoImg, setProjectLogoImg] = useState(rocketImg);

    const { projectId } = useParams();

    const navigate = useNavigate();

    const [showSearch, setShowSearch] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [projectData, setProjectData] = useState({
        projectName: "",
        projectDescription: "",
        projectLogo: null
    });
	const [submitCreateProject, setSubmitCreateProject] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({
        username: ""
    });
    const [members, setMembers] = useState([]);
    const [logoImg, setLogoImg] = useState(null);

    const { data: project } = useGetProject(projectId);

	const { data: loggedUser } = useLoggedUser();

    useEffect(() => {
        if (!project) {
            return;
        }

        if (projectData.projectName !== undefined && projectData.projectName !== '') {
            return;
        }

        setProjectData({...projectData, projectName: project.data.data.attributes.name, projectDescription: project.data.data.attributes.description});
        if (project.data.data.attributes.logo.data) {
            setProjectLogoImg('http://localhost:1337' + project.data.data.attributes.logo.data.attributes.url);
            setLogoImg(project.data.data.attributes.logo.data);
        }
        
        if(project.data.data.attributes.employees.data.length) {
            const memb = project.data.data.attributes.employees.data.map((m) => convertMemberObject(m));
            setMembers(memb);
        }

    }, [project]);

    const convertMemberObject = (m) => {
            return {
                username: m.attributes.username,
                id: m.id
            };
    };

    const searchEmployees = async (search) => {
        setSelectedEmployee({ username: search});
        if (!search) {
            setEmployees([]);
        }
	    await instance.get(`/api/users?filters[username][$contains]=${search}&filters[role][name][$eq]=Employee&populate=*`)
            .then((resp) => {
                setShowSearch(true);
                const filteredEmployees = resp.data.filter(emp => emp.username.toLowerCase().includes(search.toLowerCase()) && emp.role.name === 'Employee' && !members.find(m => m.id == emp.id));
                setEmployees(filteredEmployees);
            });
    }

    const addMember = () => {
        if (employees.length === 0 || selectedEmployee.username === '' || !selectedEmployee.id) {
            return;
        }

        setMembers(members => {
            return [...members, selectedEmployee]
        });

        const index = employees.indexOf(selectedEmployee);

        setEmployees([
            ...employees.slice(0, index),
            ...employees.slice(index + 1)
        ]);

        setSelectedEmployee({username: ""});
    }

    const deleteMember = (m) => { 
        const index = members.indexOf(m);

        setMembers([
            ...members.slice(0, index),
            ...members.slice(index + 1)
        ]);
    }

    const hideSearchList = () => {
        setTimeout(() => {
            setShowSearch(false);
        }, 500);
    }

    const { mutate: createProject } = useCreateProject();
    const { mutate: updateProject } = useUpdateProject(projectId);

    const saveProject = async () => {
        if (!projectData.projectName || !projectData.projectDescription) {
            setSubmitCreateProject(true);
            return;
        }

        if (projectData.projectLogo) {
            const imageData = new FormData();
		    imageData.append("files", projectData.projectLogo);
            
            await instance.post('/api/upload', imageData)
                .then(resp => {
                    const data = {
                        data: {
                            name: projectData.projectName,
                            description: projectData.projectDescription,
                            logo: resp.data[0].id,
                            employees: members.map(m => m.id),
                            manager: loggedUser.data.id
                        }
                    };

                    if (edit) {
                        data.id = projectId;
                        updateProject(data);
                    }
                    else {
                        createProject(data);
                    }

                    refetch();
                }).catch(err => {
                    console.error(err);
                });
            return;
        }

        const data = {
            data: {
                name: projectData.projectName,
                description: projectData.projectDescription,
                employees: members.map(m => m.id),
                manager: loggedUser.data.id
            }
        }

        if (edit) {
            data.id = projectId;
            updateProject(data);   
        }
        else {
            createProject(data);
        }

        refetch();
    };

    const closeEditProject = (id) => {
        navigate(`/projects/${id}`);
    }

	const { data, isLoading, refetch } = useQuery("create-project-info", { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false });

    const deleteLogo = () => {
        setLogoImg(null);

        if (!logoImg) {
            setProjectLogoImg(rocketImg);
        }
    }

    return(
        <>
        {isLoading ? <QuantoxSpinner /> : ""}

        <div className='col-xs-12'>
            <div className='container-header'>
                <img className="rocket-img" src={projectLogoImg} />
                <div className="display-inline">
                    {!edit &&
                        <>
                        <h5>Create Project</h5>
                        <p className="description-text">Create a new project</p>
                        </>     
                    }
                    {edit &&
                        <>
                        <h5>Edit Project</h5>
                        <p className="description-text">Edit an existing project.</p>
                        </>
                    } 
                </div> 
            </div>
            <div className="container-center form-create mt-4 mb-4 col-md-9 col-sm-12">
                <div className="row">
                    <div className='col-md-3 col-sm-12'>
                        <h6>Project Info</h6>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <label className='note-label'>Project Name</label>
                        <br />
                        <input className='note-titile form-control' type='text' placeholder='Hello' defaultValue={projectData.projectName} onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value })}></input>
						{submitCreateProject && !projectData.projectName ? <p className="text-danger error-message">Project name is required</p> : ""}
                        <br />
                        <label className='note-label'>Project Description</label>
                        <textarea className='note-description form-control mt-1' placeholder='Hello' defaultValue={projectData.projectDescription} onChange={(e) => setProjectData({ ...projectData, projectDescription: e.target.value })}></textarea>
						{submitCreateProject && !projectData.projectDescription ? <p className="text-danger error-message">Project description is required</p> : ""}
                        <br />
                        {logoImg &&
                            <>
                            <p className='note-label mb-1'>Current logo:</p>
                                <span className='note-label note-file mb-1'>{logoImg.attributes.name} 
                                    <img className="icon-delete" src={iconX} onClick={deleteLogo} />
                                </span>
                            </>
                        }
                        <br />
                        <button className='btn btn-outline-secondary btn-upload mt-3' onClick={() => fileRef.current.click()}>Choose Project Logo</button>
                        <input className='d-none' ref={fileRef} type='file' onChange={(e) => setProjectData({...projectData, projectLogo: e.target.files[0]})}></input>
                        {projectData?.projectLogo &&
                            <div className='file-msg'>
                                <strong>New Files: </strong>
                                <p>{projectData.projectLogo.name}</p>
                            </div>
                        } 
                    </div>
                </div>
                <div className="row mt-4">
                    <div className='col-md-3 col-sm-12'>
                        <h6>Members</h6>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <div className="col-12">
                            <input className='note-titile form-control display-inline mr-15 mt-1 mb-3' type='text' value={selectedEmployee.username} placeholder='Find employee' onChange={(e) => searchEmployees(e.target.value)} onBlur={hideSearchList}></input>
                            <button className="btn btn-add-member btn-light" onClick={addMember}>ADD</button>
                        </div>
                        {(employees.length > 0 && showSearch) &&
                            <div className="search-list">
                                {employees.map((employee) => (
                                    <p className="list-element" key={employee.id} onClick={() => setSelectedEmployee(employee)}>{employee.username}</p>
                                ))}
                            </div>
                        }
                        {members.length > 0 &&
                            <>
                            {members.map((member) => (
                                <div className="project-employee mb-2" key={member.id + '-1'}>
                                    <span className='profile-img smal-img'>{member.username[0].toUpperCase()}</span>
                                    <div className='member-data'>
                                        <p className='member-name'>{member.username}</p>
                                    </div>
                                    <img className="icon-x" src={iconX} onClick={() => deleteMember(member)} />
                                </div> 
                            ))}
                            </>
                        }
                    </div>
                </div>
                {data?.error &&
                    <p className="alert alert-danger">{data.error}</p>
                }
                {data?.success?.status < 300  &&
                    <p className="alert alert-success">Project successfully created. You will be redirected in a moment...</p>
                }
                <p className='p-3'>
                    {edit && <button className='btn btn-secondary btn-add ml-20' onClick={() => closeEditProject(projectId)}>CANCEL</button>}
                    <button className='btn btn-success btn-add' onClick={saveProject}>SAVE</button>
                </p>
            </div>
        </div>
        </>
    );
};

export default CreateProject;