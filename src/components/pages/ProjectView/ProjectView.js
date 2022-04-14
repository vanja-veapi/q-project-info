import React, {useState, useEffect} from 'react';
import './ProjectView.css';
import { useNavigate, useParams } from 'react-router';

import projectLogo from '../../../assets/images/elipse.png';
import iconNote from '../../../assets/images/icon-note.png';
import iconImg from '../../../assets/images/icon-img.png';
import iconEdit from '../../../assets/images/image-6.png';
import vectorImg from '../../../assets/images/vector.png';
import { useGetProject } from '../../../hooks/projects/useGetProject';
import QuantoxSpinner from '../../elements/QuantoxSpinner/QuantoxSpinner';

const ProjectView = () => {
    const { projectId } = useParams();

    const [project, setProject] = useState({});
    const [empList, setEmpList] = useState([]);

    const userRole = 'pm';

    const navigate = useNavigate();

    const createNote = () => {
        navigate(`/create-note`);
    };

	const { data, isLoading, isError, error } = useGetProject(projectId);

    useEffect(() => {
		setProject(data?.data.data);
	}, [data]);

	if (isLoading) {
		return <QuantoxSpinner />;
	}

	if (isError) {
		return <h1>{error}</h1>;
	}

    return (
        <div className='col-xs-12'>
            <div className='container-top'>
                <div className='row m-0'>
                    <div className='col-md-6 col-s-12'>
                        {project?.attributes?.logo?.data?.attributes && 
                            <img className='project-logo' src={`http://localhost:1337${project?.attributes?.logo?.data?.attributes?.url}`}/> 
                        }
                        {!project?.attributes?.logo.data &&
                            <img className='project-logo' src={projectLogo} />
                        }
                        <div className='description'>
                            <h5>{project?.attributes?.name}
                                {userRole === 'pm' && <span className='edit'><img className='icon-edit' src={iconEdit} />EDIT</span>}
                            </h5>
                            <p className='description-text'>{project?.attributes?.description}</p>
                        </div>
                    </div>
                    <div className='col-md-6 col-s-12'>
                        <div className='members'>
                            <h6>Project Menager</h6>
                            <p className='mt-3'>
                                <span className='profile-img'>M</span>
                            </p>
                        </div>
                        <div className='members'>
                            <h6>Employees</h6>
                            <p className='mt-3 pl-17'>
                                {project?.attributes?.employees?.data.length > 0 && project?.attributes?.employees?.data.slice(0, 3).map((emp) => <span className='profile-img ml-17'>{emp?.attributes?.username[0].toUpperCase()}</span>)}
                                {project?.attributes?.employees?.data.length < 1 && <span className='description-text ml-17'>No employees</span>}
                                {project?.attributes?.employees?.data.length > 3 && <span className='description-text pl-8'>+ {project?.attributes?.employees?.data.length - 3} more</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-center col-md-9 col-s-12'>
                <ul className='nav nav-tabs' id='myTab' role='tablist'>
                    <li className='nav-item' role='presentation'>
                        <button className='nav-link active' id='menagment-tab' data-bs-toggle='tab' data-bs-target='#menagment' type='button' role='tab' aria-controls='menagment' aria-selected='true'>Project Menagnemnt</button>
                    </li>
                    <li className='nav-item pl-15' role='presentation'>
                        <button className='nav-link' id='development-tab' data-bs-toggle='tab' data-bs-target='#development' type='button' role='tab' aria-controls='development' aria-selected='false'>Development</button>
                    </li>
                    <li className='nav-item pl-15' role='presentation'>
                        <button className='nav-link' id='devops-tab' data-bs-toggle='tab' data-bs-target='#devops' type='button' role='tab' aria-controls='devops' aria-selected='false'>DevOps</button>
                    </li>
                </ul>
                <div className='tab-content text-start' id='myTabContent'>
                    <div className='tab-pane fade show active p-4' id='menagment' role='tabpanel' aria-labelledby='menagment-tab'>
                        <div className='col-12'>
                            <input type='text' className='search form-control mb-3' placeholder='Search notes'></input>
                            <select className='select form-select'></select>
                            {userRole === 'pm' && <button className='btn btn-success btn-add' onClick={createNote}>ADD NOTE</button>}
                        </div>
                        <div className='row mt-4'>
                            <div className='col-lg-4 col-md-6 col-xs-12'>
                                <div className='card card-project mb-3'>
                                    <div className='card-body override-padding'>
                                        {userRole === 'pm' && 
                                            <div className='mb-3'>
                                                <button type='button' className='btn-edit'><img className='vector-icon' src={vectorImg} /> EDIT</button>
                                            </div>
                                        }
                                        <h5 className='card-title fz-18'>Project menagment tool</h5>
                                        <p className='card-text override-text'>Monday.com for client task management. Internally, we use ActiveCollab.</p>
                                        <div className='row mt-3'>
                                            <div className='col-6'>
                                                <img className='note-img' src={iconNote} />
                                            </div>
                                            <div className='col-6'>
                                                <span className='profile-img smal-img'>SA</span>
                                                <div className='member-data'>
                                                    <p className='member-name'>Segun Adebayo</p>
                                                    <p className='member-function'>Founder of Chakra UI</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6 col-xs-12'>
                                <div className='card card-project mb-3'>
                                    <div className='card-body override-padding'>
                                        {userRole === 'pm' && 
                                            <div className='mb-3'>
                                                <button type='button' className='btn-edit'><img className='vector-icon' src={vectorImg} /> EDIT</button>
                                            </div>
                                        }
                                        <h5 className='card-title fz-18'>Client info</h5>
                                        <p className='card-text override-text'>There are 3 people in the client’s team - Adam, Elwin and Jessica.</p>
                                        <div className='row mt-3'>
                                            <div className='col-6'>
                                                <img className='note-img' src={iconImg} />
                                            </div>
                                            <div className='col-6'>
                                                <span className='profile-img smal-img'>SA</span>
                                                <div className='member-data'>
                                                    <p className='member-name'>Segun Adebayo</p>
                                                    <p className='member-function'>Founder of Chakra UI</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tab-pane fade p-1' id='development' role='tabpanel' aria-labelledby='development-tab'>
                        <h3 className='mt-3 text-center'>Development tab</h3>
                    </div>
                    <div className='tab-pane fade p-1' id='devops' role='tabpanel' aria-labelledby='devops-tab'>
                        <h3 className='mt-3 text-center'>DevOps tab</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectView;