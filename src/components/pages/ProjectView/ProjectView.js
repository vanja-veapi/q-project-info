import React, {useState} from 'react';
import './ProjectView.css';
import { useNavigate } from 'react-router';

import projectLogo from '../../../assets/images/elipse.png';
import iconNote from '../../../assets/images/icon-note.png';
import iconImg from '../../../assets/images/icon-img.png';
import iconEdit from '../../../assets/images/image-6.png';
import vectorImg from '../../../assets/images/vector.png';

const ProjectView = () => {
    const userRole = 'pm';

    const navigate = useNavigate();

    const createNote = () => {
        navigate(`/create-note`);
    };

    return (
        <div className='col-xs-12'>
            <div className='container-top'>
                <div className='row m-0'>
                    <div className='col-md-6 col-s-12'>
                        <img className='project-logo' src={projectLogo} />
                        <div className='description'>
                            <h5>The New Alpha
                                {userRole === 'pm' && <span className='edit'><img className='icon-edit' src={iconEdit} />EDIT</span>}
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
                            <input type='text' className='search mb-3' placeholder='Search notes'></input>
                            <select className='select'></select>
                            {userRole === 'pm' && <button className='btn btn-success btn-add' onClick={createNote}>ADD NOTE</button>}
                        </div>
                        <div className='row mt-4'>
                            <div className='col-lg-4 col-md-6 col-xs-12'>
                                <div className='card mb-3'>
                                    <div className='card-body'>
                                        {userRole === 'pm' && 
                                            <div className='mb-3'>
                                                <button type='button' className='btn-edit'><img className='vector-icon' src={vectorImg} /> EDIT</button>
                                            </div>
                                        }
                                        <h5 className='card-title'>Project menagment tool</h5>
                                        <p className='card-text'>Monday.com for client task management. Internally, we use ActiveCollab.</p>
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
                                <div className='card mb-3'>
                                    <div className='card-body'>
                                        {userRole === 'pm' && 
                                            <div className='mb-3'>
                                                <button type='button' className='btn-edit'><img className='vector-icon' src={vectorImg} /> EDIT</button>
                                            </div>
                                        }
                                        <h5 className='card-title'>Client info</h5>
                                        <p className='card-text'>There are 3 people in the client’s team - Adam, Elwin and Jessica.</p>
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