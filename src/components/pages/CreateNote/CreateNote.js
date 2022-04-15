import React, { useState, useRef, useEffect } from 'react';
import './CreateNote.css';
import { useNavigate, useParams } from 'react-router';
import { useCreateNote } from '../../../hooks/notes/useCreateNote';
import { useQuery } from 'react-query';

import projectLogo from '../../../assets/images/elipse.png';
import iconEdit from '../../../assets/images/image-6.png';
import iconArrow from '../../../assets/images/left-arrow.png';
import instance from '../../../config/config';
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";
import { useGetProject } from '../../../hooks/projects/useGetProject';

const CreateNote = () => {
    const { projectId } = useParams();
    const [noteData, setNoteData] = useState({
        noteTitle: "",
        noteDescription: "",
        category: "",
        noteFile: null
    });
    const [submitCreateNote, setSubmitCreateNote] = useState(false);
    const [categories, setCategories] = useState([]);
    const fileRef = useRef();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/projects/${projectId}`);
    }

    useEffect(() => {
        getCategories();
    }, []);

    const { data: dataProject, error } = useGetProject(projectId);

    const getCategories = async () => {
        await instance.get('/api/categories')
            .then(resp => {
                setCategories(resp?.data?.data);
            })
    } 

    const { mutate: createNote } = useCreateNote(projectId);

    const saveNote = async () => {
        if (!noteData.noteTitle || !noteData.noteDescription || !noteData.category) {
            setSubmitCreateNote(true);
            return;
        }

        if (noteData.noteFile) {
            const noteF = new FormData();
		    noteF.append("files", noteData.noteFile);
            
            await instance.post('/api/upload', noteF)
                .then(resp => {
                    const data = {
                        data: {
                            title: noteData.noteTitle,
                            description : noteData.noteDescription,
                            category: Number.parseInt(noteData.category),
                            files: resp.data[0].id,
                            project: Number.parseInt(projectId),
                            author: 1
                        }
                    };

                    createNote(data);
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
                author: 1
            }
        }

        createNote(data);
        refetch();
    };
    
	const { data, isLoading, refetch } = useQuery("create-note-info", { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false });

    return (
        <>
        {isLoading ? <QuantoxSpinner /> : ""}
        <div className='col-xs-12'>
            <div className='container-top'>
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
                                <span className='edit'><img className='icon-edit' src={iconEdit} />EDIT</span>
                            </h5>
                            <p className='description-text'>{dataProject?.data.data.attributes.description}</p>
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
                                {dataProject?.data.data.attributes?.employees?.data.length > 0 && dataProject?.data.data.attributes?.employees?.data.slice(0, 3).map((emp) => <span className='profile-img ml-17' key={emp.id}>{emp?.attributes?.username[0].toUpperCase()}</span>)}
                                {dataProject?.data.data.attributes?.employees?.data.length < 1 && <span className='description-text ml-17'>No employees</span>}
                                {dataProject?.data.data.attributes?.employees?.data.length > 3 && <span className='description-text pl-8'>+ {dataProject?.data.data.attributes?.employees?.data.length - 3} more</span>}
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
                            Create a new Note
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
                                <input className='note-titile form-control mt-1 mb-3' type='text' placeholder='Hello' onChange={(e) => setNoteData({...noteData, noteTitle: e.target.value})}></input>
                                {submitCreateNote && !noteData.noteTitle ? <p className="text-danger error-message">Note title is required</p> : ""}
                                <br />
                                <label className='note-label'>Note Description</label>
                                <textarea className='note-description form-control mt-1 mb-3' placeholder='Hello' onChange={(e) => setNoteData({...noteData, noteDescription: e.target.value})}></textarea>
                                {submitCreateNote && !noteData.noteDescription ? <p className="text-danger error-message">Note description is required</p> : ""}
                                <br />
                                <select className='category form-select mb-3' onChange={(e) => setNoteData({...noteData, category: e.target.value})}>
                                    <option hidden >Category</option>
                                    {categories.map((ct) => (
                                        <option key={ct.id} value={ct.id}>{ct.attributes.name}</option>
                                    ))}
                                </select>
                                {submitCreateNote && !noteData.category ? <p className="text-danger error-message">Category is required</p> : ""}
                                <br />
                                <button className='btn btn-outline-secondary btn-upload' onClick={() => fileRef.current.click()}>UPLOAD FILES</button>
                                <input className='d-none' ref={fileRef} type='file' onChange={(e) => setNoteData({...noteData, noteFile: e.target.files[0]})}></input>
                                { noteData.noteFile &&
                                    <p className='file-msg'><strong>Selected: </strong>{noteData.noteFile?.name}</p>
                                }
                                <p className='p-3'>
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