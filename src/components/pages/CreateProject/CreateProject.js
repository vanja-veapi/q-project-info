import React from "react";
import './CreateProject.css';
import { useNavigate } from 'react-router';

import rocketImg from '../../../assets/rocket.png';
import iconX from '../../../assets/images/icon-x.png';

const CreateProject = () => {
    return(
        <div className='col-xs-12'>
            <div className='container-header'>
                <img className="rocket-img" src={rocketImg} />
                <div className="display-inline">
                    <h5>Create Project</h5>
                    <p className="description-text">Create a new project</p>
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
                        <input className='note-titile form-control display-inline mr-15 mt-1 mb-3' type='text' placeholder='Hello'></input>
                        <button className="btn btn-choose-logo btn-light">Choose Project Logo</button>
                        <br />
                        <label className='note-label'>Project Description</label>
                        <textarea className='note-description form-control mt-1 mb-3' placeholder='Hello'></textarea>
                        <br />
                    </div>
                </div>
                <div className="row">
                    <div className='col-md-3 col-sm-12'>
                        <h6>Members</h6>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <input className='note-titile form-control display-inline mr-15 mt-1 mb-3' type='text' placeholder='Find employee'></input>
                        <button className="btn btn-choose-logo btn-light">ADD</button>
                        <div className="project-employee mb-2">
                            <span className='profile-img smal-img'>SA</span>
                            <div className='member-data'>
                                <p className='member-name'>Segun Adebayo</p>
                                <p className='member-function'>Founder of Chakra UI</p>
                            </div>
                            <img className="icon-x" src={iconX} />
                        </div>
                        <div className="project-employee mb-2">
                            <span className='profile-img smal-img'>SA</span>
                            <div className='member-data'>
                                <p className='member-name'>Segun Adebayo</p>
                                <p className='member-function'>Founder of Chakra UI</p>
                            </div>
                            <img className="icon-x" src={iconX} />
                        </div>
                        <div className="project-employee">
                            <span className='profile-img smal-img'>SA</span>
                            <div className='member-data'>
                                <p className='member-name'>Segun Adebayo</p>
                                <p className='member-function'>Founder of Chakra UI</p>
                            </div>
                            <img className="icon-x" src={iconX} />
                        </div>
                    </div>
                </div>
                <p className='p-3'>
                    <button className='btn btn-success btn-add'>SAVE</button>
                </p>
            </div>
        </div>
    );
};

export default CreateProject;