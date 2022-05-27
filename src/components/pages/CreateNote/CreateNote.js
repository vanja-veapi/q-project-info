import React, { useState, useRef, useEffect } from 'react';
import './CreateNote.css';
import { useNavigate, useParams } from 'react-router';
import { useCreateNote } from '../../../hooks/notes/useCreateNote';
import { useQuery, useQueryClient } from 'react-query';

import projectLogo from '../../../assets/images/img.png';
import iconEdit from '../../../assets/images/image-6.png';
import iconArrow from '../../../assets/images/left-arrow.png';
import iconX from '../../../assets/images/icon-x.png';
import instance from '../../../config/config';
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";
import { useGetProject } from '../../../hooks/projects/useGetProject';
import { useGetNote } from '../../../hooks/notes/useGetNote';
import { useUpdateNote } from '../../../hooks/notes/useUpdateNote';
import useLoggedUser from '../../../hooks/users/useLoggedUser';

const CreateNote = ({ editNote }) => {
    const { projectId } = useParams();
    const { noteId } = useParams();
    const [noteData, setNoteData] = useState({
        noteTitle: "",
        noteDescription: "",
        category: "",
        files: []
    });

    const [noteFiles, setNoteFiles] = useState([]);
    const [submitCreateNote, setSubmitCreateNote] = useState(false);
    const [categories, setCategories] = useState([]);
    const [projectEmployees, setProjectEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const fileRef = useRef();
    const navigate = useNavigate();

    const { data: dataProject } = useGetProject(projectId);
    const { data: dataNote } = useGetNote(noteId);

	const { data: loggedUser } = useLoggedUser();

    const queryClient = useQueryClient();

    useEffect(() => {
        getCategories();

        instance.get(`/api/users?filters[project][id][$eq]=${projectId}&populate=*`)
            .then(resp => {
                setAllEmployees(resp.data);
                setProjectEmployees(resp.data.filter(e => e.role.type !== 'project_manager'));
            });
    }, []);

    useEffect(() => {
        if (!dataNote) {
            return;
        }
        
        if (noteData.noteTitle !== undefined && noteData.noteTitle !== '') {
            return;
        }

        setNoteData({...noteData, noteTitle: dataNote?.data.data.attributes.title, noteDescription: dataNote?.data.data.attributes.description, category: dataNote?.data.data.attributes.category.data.id});
        setNoteFiles(dataNote?.data.data.attributes.files.data ? dataNote?.data.data.attributes.files.data : []);
    }, [dataNote]);

    const goBack = () => {
        navigate(`/projects/${projectId}`);
    }

    const getCategories = async () => {
        await instance.get('/api/categories')
            .then(resp => {
                setCategories(resp?.data?.data);
            });
    } 

    const { mutate: createNote } = useCreateNote(projectId);
    const { mutate: updateNote } = useUpdateNote(projectId);

    const saveNote = async () => {
        if (!noteData.noteTitle || !noteData.noteDescription || !noteData.category) {
            setSubmitCreateNote(true);
            return;
        }

        if (noteData.files.length > 0) {
            const noteF = new FormData();
            for (let i = 0; i < noteData.files.length; i++) {
		        noteF.append("files", noteData.files[i]);
            }
            setNoteFiles(noteF);

            await instance.post('/api/upload', noteF)
                .then(resp => {
                    const data = {
                        data: {
                            title: noteData.noteTitle,
                            description : noteData.noteDescription,
                            category: Number.parseInt(noteData.category),
                            files: resp.data.map(d => d.id),
                            project: Number.parseInt(projectId),
                            author: loggedUser?.data.id
                        }
                    };

                    if(editNote) {
                        data.id = noteId;
                        if (noteFiles.length > 0) {
                            data.data.files = [...data.data.files, ...noteFiles.map((f) => f.id)];
                        }

                        updateNote(data);
                        queryClient.removeQueries('single-note');
                    }
                    else {
                        createNote(data);
                        refetch();
                    }
                    
                }).catch(err => {
                    console.error(err);
                });

            return;
        }

        const data = {
            data: {
                title: noteData.noteTitle,
                description : noteData.noteDescription,
                category: Number.parseInt(noteData.category),
                project: Number.parseInt(projectId),
                author: loggedUser?.data.id
            }
        }

        if(editNote) {
            data.id = noteId;
            data.data.files = noteFiles.map((f) => f.id);
            updateNote(data);
            queryClient.removeQueries('single-note');
        }
        else {
            createNote(data);
            refetch();
        }
    };
    
	const { data, isLoading, refetch } = useQuery("create-note-info", { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false });

    const editProject = () => {
        navigate(`/projects/${projectId}/edit`);
    }

    const deleteFile = async (file) => {
        await instance.delete(`/api/upload/files/${file.id}`);
        
        const index = noteFiles.indexOf(file);

        setNoteFiles([
            ...noteFiles.slice(0, index),
            ...noteFiles.slice(index + 1)
        ]);
    }

    const deleteNote = async (id) => {
        await instance.delete(`/api/notes/${id}`);

        navigate(`/projects/${projectId}`);
    }

    return (
        <>
        {isLoading ? <QuantoxSpinner /> : ""}
        <div className='col-xs-12'>
            <div className='container-top'>
                <div className='row mb-1'>
                    <div className='col-xs-12 delete-button-container text-end'>
                    </div>
                </div>
                <div className='row m-0'>
                    <div className='col-md-6 col-s-12'>
                        {dataProject?.data.data.attributes?.logo?.data?.attributes && 
                            <img className='project-logo' src={`http://localhost:1337${dataProject?.data.data.attributes?.logo?.data?.attributes?.url}`}/> 
                        }
                        {!dataProject?.data.data.attributes?.logo.data &&
                            <img className='project-logo' src={projectLogo} />
                        }
                        <div className='description'>
                            <h5>{dataProject?.data.data.attributes.name}
                                <span className='edit' onClick={editProject} ><img className='icon-edit' src={iconEdit} />EDIT</span>
                            </h5>
                            <p className='description-text'>{dataProject?.data.data.attributes.description}</p>
                        </div>
                    </div>
                    <div className='col-md-6 col-s-12'>
                        <div className='members'>
                            <h6>Project Menager</h6>
                            <p className='mt-3'>
                                {allEmployees.find(p => p.role.type === 'project_manager') && allEmployees.find(p => p.role.type === 'project_manager').profileImage && <img className='img-icon' src={'http://localhost:1337' + allEmployees.find(p => p.role.type === 'project_manager').profileImage.formats.thumbnail.url} />}
                                {allEmployees.find(p => p.role.type === 'project_manager') && !allEmployees.find(p => p.role.type === 'project_manager').profileImage && <span className='profile-img'>{allEmployees.find(p => p.role.type === 'project_manager').username[0].toUpperCase()}</span>}
                                {!allEmployees.find(p => p.role.type === 'project_manager') && <span className='description-text'>Unknown</span>}
                            </p>
                        </div>
                        <div className='members'>
                            <h6>Employees</h6>
                            <p className='mt-3 pl-17'>
                                {projectEmployees.length > 0 && projectEmployees.slice(0, 3).map((emp) => ( emp.profileImage ? <img className='img-icon ml-17' src={'http://localhost:1337' + emp.profileImage.formats.thumbnail.url} /> : <span className='profile-img ml-17' key={emp.id}>{emp?.username[0].toUpperCase()}</span>))}
                                {projectEmployees.length < 1 && <span className='description-text ml-17'>No employees</span>}
                                {projectEmployees.length > 3 && <span className='description-text pl-8'>+ {projectEmployees.length - 3} more</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-center col-md-9 col-s-12'>
                <ul className='nav nav-tabs' id='myTab' role='tablist'>
                    <li className='nav-item' role='presentation'>
                        <div className='nav-link active cursor-default' id='create-note' data-bs-toggle='tab' data-bs-target='#note' type='button' role='tab' aria-controls='note' aria-selected='true'>
                            <button className='btn btn-back' onClick={goBack}><img className='icon-arrow' src={iconArrow} /> Back</button> 
                            {!editNote && <span>Create a new Note</span>}
                            {editNote && <span>Edit Note</span>}
                        </div>
                    </li>
                </ul>
                <div className='tab-content text-start' id='myTabContent'>
                    <div className='tab-pane fade show active p-4' id='note' role='tabpanel' aria-labelledby='note-tab'>
                        <div className='row'>
                            <div className='col-md-3 col-sm-12'>
                                <h6>Note Info</h6>
                            </div>
                            <div className='col-md-9 col-sm-12'>
                                <label className='note-label'>Note Title</label>
                                <br />
                                <input className='note-titile form-control mt-1 mb-3' type='text' placeholder='Hello' defaultValue={noteData.noteTitle} onChange={(e) => setNoteData({...noteData, noteTitle: e.target.value})}></input>
                                {submitCreateNote && !noteData.noteTitle ? <p className="text-danger error-message">Note title is required</p> : ""}
                                <br />
                                <label className='note-label'>Note Description</label>
                                <textarea className='note-description form-control mt-1 mb-3' placeholder='Hello' defaultValue={noteData.noteDescription} onChange={(e) => setNoteData({...noteData, noteDescription: e.target.value})}></textarea>
                                {submitCreateNote && !noteData.noteDescription ? <p className="text-danger error-message">Note description is required</p> : ""}
                                <br />
                                <select className='category form-select mb-3' value={noteData.category} onChange={(e) => setNoteData({...noteData, category: e.target.value})}>
                                    <option hidden >Category</option>
                                    {categories.map((ct) => (
                                        <option key={ct.id} value={ct.id}>{ct.attributes.name}</option>
                                    ))}
                                </select>
                                {submitCreateNote && !noteData.category ? <p className="text-danger error-message">Category is required</p> : ""}
                                <br />
                                {noteFiles.length > 0 &&
                                    <>
                                    <div>
                                        <p className='note-label mb-2'>Current files:</p>
                                        {noteFiles.map((file) => (
                                            <>
                                            <p className='m-0 mb-2'>
                                                <a className='btn btn-outline-secondary btn-sm fz-11' href={'http://localhost:1337' + file?.attributes.url} target='_blank'>Preview</a>
                                                <span key={file?.id} className='note-label note-file'>{file?.attributes?.name} 
                                                    <img className="icon-delete" src={iconX} onClick={() => deleteFile(file)} />
                                                </span>
                                            </p>
                                            </>
                                        ))}
                                    </div>
                                    <br />
                                    </>
                                }
                                <button className='btn btn-outline-secondary btn-upload' onClick={() => fileRef.current.click()}>UPLOAD FILES</button>
                                <input className='d-none' ref={fileRef} type='file' multiple onChange={(e) => {setNoteData({ ...noteData, files: e.target.files })}}></input>
                                {noteData.files.length > 0 &&
                                    <div className='file-msg'>
                                        <p className='note-label mt-3 mb-2'>New Files: </p>
                                        {Array.prototype.slice.call(noteData.files).map((nf) => (
                                            <>
                                            <p className='m-0 mb-2'>
                                                <a className='btn btn-outline-secondary btn-sm mr-10 fz-11' href={URL.createObjectURL(nf)} target='_blank'>Preview</a>
                                                <span key={nf.name}>{nf.name}</span>
                                            </p>
                                            </>
                                        ))}
                                    </div>
                                }
                                <p className='p-3 pt-5'>
                                    {editNote &&
                                        <button className='btn btn-add btn-danger ml-20' onClick={() => deleteNote(noteId)}>DELETE NOTE</button>
                                    }
                                    <button className='btn btn-success btn-add' onClick={saveNote}>SAVE NOTE</button>
                                </p>
                                {data?.error &&
                                    <p className="alert alert-danger">{data.error}</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CreateNote;