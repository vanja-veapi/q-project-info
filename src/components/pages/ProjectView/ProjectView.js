import React, {useState, useEffect} from 'react';
import './ProjectView.css';
import { useNavigate, useParams } from 'react-router';

import iconNote from '../../../assets/images/icon-note.png';
import projectLogo from '../../../assets/images/img.png';
import iconEdit from '../../../assets/images/image-6.png';
import vectorImg from '../../../assets/images/vector.png';
import { useGetProject } from '../../../hooks/projects/useGetProject';
import useLoggedUser from '../../../hooks/users/useLoggedUser';
import QuantoxSpinner from '../../elements/QuantoxSpinner/QuantoxSpinner';
import instance from '../../../config/config';

const ProjectView = () => {
    const { projectId } = useParams();

    const [project, setProject] = useState({});
    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchNote, setSearchNote] = useState('');
    const [sortFlag, setSortFlag] = useState(1);

	const { data: loggedUser } = useLoggedUser();

    const navigate = useNavigate();

    const createNote = () => {
        navigate(`note/create`);
    };

	const { data, isLoading, isError, error } = useGetProject(projectId);

    useEffect(() => {
        instance.get('/api/categories')
            .then(resp => {
                setCategories(resp?.data?.data);
            });
    }, []);

    useEffect(() => {
        if (!data) {
            return;
        }

		setProject(data?.data.data);

        instance.get(`api/notes?filters[project][id][$eq]=${data?.data.data.id}&populate=*`).then(resp => {
            setNotes(resp.data.data);
        });

	}, [data]);

	if (isLoading) {
		return <QuantoxSpinner />;
	}

	if (isError) {
		return <h1>{error?.response.status === 404 ? 'Not found' : 'Exception'}</h1>;
	}

    const editProject = () => {
        navigate(`/projects/${projectId}/edit`);
    }

    const editNote = (id) => {
        navigate(`/projects/${projectId}/notes/${id}/edit`);
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
                                {loggedUser.data.role.type === 'project_manager' && <span className='edit' onClick={editProject}><img className='icon-edit' src={iconEdit} />EDIT</span>}
                            </h5>
                            <p className='description-text'>{project?.attributes?.description}</p>
                        </div>
                    </div>
                    <div className='col-md-6 col-s-12'>
                        <div className='members'>
                            <h6>Project Menager</h6>
                            <p className='mt-3'>
                                {project?.attributes?.manager?.data && <span className='profile-img'>{project?.attributes?.manager?.data?.attributes.username[0].toUpperCase()}</span>}
                                {!project?.attributes?.manager?.data && <span className='description-text'>Unknown</span>}
                            </p>
                        </div>
                        <div className='members'>
                            <h6>Employees</h6>
                            <p className='mt-3 pl-17'>
                                {project?.attributes?.employees?.data.length > 0 && project?.attributes?.employees?.data.slice(0, 3).map((emp) => <span className='profile-img ml-17' key={emp.id}>{emp?.attributes?.username[0].toUpperCase()}</span>)}
                                {project?.attributes?.employees?.data.length < 1 && <span className='description-text ml-17'>No employees</span>}
                                {project?.attributes?.employees?.data.length > 3 && <span className='description-text pl-8'>+ {project?.attributes?.employees?.data.length - 3} more</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-center col-md-9 col-s-12'>
                <ul className='nav nav-tabs' id='myTab' role='tablist'>
                    {categories.map((category, index) => (
                        <>
                        <li className='nav-item' role='presentation' key={category.id + '-category-tab'} onClick={() => setSearchNote('')}>
                            <button className={index === 0 ? 'nav-link active' : 'nav-link'} id={category.attributes.name.replace(' ', '') + '-tab'} data-bs-toggle='tab' data-bs-target={'#' + category.attributes.name.replace(' ', '')} type='button' role='tab' aria-controls={category.attributes.name.replace(' ', '')} aria-selected='true'>{category.attributes.name}</button>
                        </li>
                        </>
                    ))}
                </ul>
                <div className='tab-content text-start' id='myTabContent'>
                    {categories.map((category, index) => (
                        <>
                        <div key={category.id + '-category-content'} className={index == 0 ? 'tab-pane fade show active p-4' : 'tab-pane fade p-4'} id={category.attributes.name.replace(' ', '')} role='tabpanel' aria-labelledby={category.attributes.name.replace(' ', '') + '-tab'}>
                            <div className='col-12'>
                                <input type='text' className='search form-control mb-3' placeholder='Search notes' value={searchNote} onChange={(e) => setSearchNote(e.target.value)}></input>
                                <select className='select form-select' onChange={(e) => setSortFlag(Number.parseInt(e.target.value))}>
                                    <option value='1'>Sort by: Default</option>
                                    <option value='2'>Sort by: Title</option>
                                    <option value='3'>Sort by: Most Recent</option>
                                </select>
                                {loggedUser.data.role.type === 'project_manager' && <button className='btn btn-success btn-add' onClick={createNote}>ADD NOTE</button>}
                            </div>
                            <div className='row mt-4'>
                                {sortFlag === 1 && notes.filter(note => category?.attributes.name === note?.attributes.category?.data?.attributes.name
                                                    && (note.attributes.title.includes(searchNote) || note.attributes.description.includes(searchNote))).map((n) => (
                                    <>
                                    <div className='col-lg-4 col-md-6 col-xs-12' key={category.id + '-category-' + n.id + '-note'}>
                                        <div className='card card-project mb-3'>
                                            <div className='card-body override-padding'>
                                                {loggedUser.data.role.type === 'project_manager' && 
                                                    <div className='mb-3'>
                                                        <button type='button' className='btn-edit' onClick={() => editNote(n.id)}><img className='vector-icon' src={vectorImg} /> EDIT</button>
                                                    </div>
                                                }
                                                <h5 className='card-title fz-18'>{n.attributes.title}</h5>
                                                <p className='card-text override-text'>{n.attributes.description}</p>
                                                <div className='row mt-3'>
                                                    <div className='col-6'>
                                                        <img className='note-img' src={iconNote} />
                                                    </div>
                                                    <div className='col-6'>
                                                        <span className='profile-img smal-img'>{n.attributes.author.data.attributes.username[0].toUpperCase()}</span>
                                                        <div className='member-data'>
                                                            <p className='member-name'>{n.attributes.author.data.attributes.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                ))}
                                {sortFlag === 2 && notes.filter(note => category?.attributes.name === note?.attributes.category?.data?.attributes.name
                                                    && (note.attributes.title.includes(searchNote) || note.attributes.description.includes(searchNote)))
                                                        .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
                                                        .map((n) => (
                                    <>
                                    <div className='col-lg-4 col-md-6 col-xs-12' key={category.id + '-category-' + n.id + '-note'}>
                                        <div className='card card-project mb-3'>
                                            <div className='card-body override-padding'>
                                                {loggedUser.data.role.type === 'project_manager' && 
                                                    <div className='mb-3'>
                                                        <button type='button' className='btn-edit' onClick={() => editNote(n.id)}><img className='vector-icon' src={vectorImg} /> EDIT</button>
                                                    </div>
                                                }
                                                <h5 className='card-title fz-18'>{n.attributes.title}</h5>
                                                <p className='card-text override-text'>{n.attributes.description}</p>
                                                <div className='row mt-3'>
                                                    <div className='col-6'>
                                                        <img className='note-img' src={iconNote} />
                                                    </div>
                                                    <div className='col-6'>
                                                        <span className='profile-img smal-img'>{n.attributes.author.data.attributes.username[0].toUpperCase()}</span>
                                                        <div className='member-data'>
                                                            <p className='member-name'>{n.attributes.author.data.attributes.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                ))}
                                {sortFlag === 3 && notes.filter(note => category?.attributes.name === note?.attributes.category?.data?.attributes.name
                                                    && (note.attributes.title.includes(searchNote) || note.attributes.description.includes(searchNote)))
                                                        .sort((a, b) => b.attributes.createdAt.localeCompare(a.attributes.createdAt))
                                                        .map((n) => (
                                    <>
                                    <div className='col-lg-4 col-md-6 col-xs-12' key={category.id + '-category-' + n.id + '-note'}>
                                        <div className='card card-project mb-3'>
                                            <div className='card-body override-padding'>
                                                {loggedUser.data.role.type === 'project_manager' && 
                                                    <div className='mb-3'>
                                                        <button type='button' className='btn-edit' onClick={() => editNote(n.id)}><img className='vector-icon' src={vectorImg} /> EDIT</button>
                                                    </div>
                                                }
                                                <h5 className='card-title fz-18'>{n.attributes.title}</h5>
                                                <p className='card-text override-text'>{n.attributes.description}</p>
                                                <div className='row mt-3'>
                                                    <div className='col-6'>
                                                        <img className='note-img' src={iconNote} />
                                                    </div>
                                                    <div className='col-6'>
                                                        <span className='profile-img smal-img'>{n.attributes.author.data.attributes.username[0].toUpperCase()}</span>
                                                        <div className='member-data'>
                                                            <p className='member-name'>{n.attributes.author.data.attributes.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                ))}
                            </div>
                        </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectView;