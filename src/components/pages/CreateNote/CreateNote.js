import React from 'react';
import './CreateNote.css';
import { useNavigate } from 'react-router';
import { useRef } from 'react';

import projectLogo from '../../../assets/images/elipse.png';
import iconEdit from '../../../assets/images/image-6.png';
import iconNote from '../../../assets/images/icon-note.png';
import iconImg from '../../../assets/images/icon-img.png';
import iconArrow from '../../../assets/images/left-arrow.png';

const CreateNote = () => {
    const fileRef = useRef();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/project`);
    }

    return (
        <div className='col-xs-12'>
            <div className='container-top'>
                <div className='row m-0'>
                    <div className='col-md-6 col-s-12'>
                        <img className='project-logo' src={projectLogo} />
                        <div className='description'>
                            <h5>The New Alpha
                                <span className='edit'><img className='icon-edit' src={iconEdit} />EDIT</span>
                            </h5>
                            <p className='description-text'>The New Alpha is a long running project. We’re creating sales pages for the client’s business, creating blog posts, and managing the Shopify store.</p>
                        </div>
                    </div>
                    <div className='col-md-6 col-s-12'>
                        <div className='members'>
                            <h6>Project Menager</h6>
                            <p className='mt-3'>
                                <span className='profile-img'>SA</span>
                            </p>
                        </div>
                        <div className='members'>
                            <h6>Employees</h6>
                            <p className='mt-3'>
                                <span className='profile-img'>SA</span>
                                <span className='profile-img ml-17'>SA</span>
                                <span className='profile-img ml-17'>SA</span>
                                <span className='number-member'>+ 5 more</span>
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
                                <input className='note-titile form-control mt-1 mb-3' type='text' placeholder='Hello'></input>
                                <br />
                                <label className='note-label'>Note Description</label>
                                <textarea className='note-description form-control mt-1 mb-3' placeholder='Hello'></textarea>
                                <br />
                                <select className='chategory form-select mb-3'>
                                    <option hidden >Chategory</option>
                                </select>
                                <br />
                                <button className='btn btn-outline-secondary btn-upload' onClick={() => fileRef.current.click()}>UPLOAD FILES</button>
                                <input className='d-none' ref={fileRef} type='file'></input>
                                <p className='p-3'>
                                    <button className='btn btn-success btn-add'>SAVE NOTE</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;