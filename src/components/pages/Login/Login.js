import React, { useState } from "react";
import "./Login.css";

import FormRectangle from "../../elements/FormRectangle/FormRectangle";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [submitLogin, setSubmitLogin] = useState(false);

    const login = () => {
        setSubmitLogin(true);
    };
    
    return(
        <div className="register container-fluid position-relative">
            <FormRectangle />
			<div className="card">
                <h3 className="text-center mt-4">Login</h3>
                <div className="card-body text-start p-4">
                    <div className="col-12">
                        {/* Username */}
                        <label className="mt-2">Username</label>
                        <br />
                        <input type="text" className="form-control" placeholder="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                        {submitLogin && !credentials.username ? <small className="text-danger">Username is required</small> : ""}
                    </div>
                    <div className="col-12">
                        {/* Password */}
                        <label className="mt-3">Password</label>
                        <br />
                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                        {submitLogin && !credentials.password ? <small className="text-danger">Password is required</small> : ""}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-success mt-3" onClick={login}>
                            Login
                        </button>
                    </div>

                    {/*<div className="alert alert-danger mt-3">Error occured.</div> */}
                </div>
            </div>
        </div>
    );

};

export default Login;