import React from "react";
import "./Register.css";

import FormRectangle from "../../elements/FormRectangle/FormRectangle";

const Register = () => {
	return (
		<div className="register container-fluid position-relative">
			<FormRectangle />
			<div className="card">
				<p className="h3 text-center mt-4">Register</p>
				<div className="card-body text-start p-4">
					<label className="mt-2">Username</label>
					<div className="error">
						<small className="text-danger">Error</small>
					</div>
					<input type="text" className="form-control" placeholder="Username" />

					<label className="mt-3">Email</label>
					<div className="error">
						<small className="text-danger">Error</small>
					</div>
					<input type="text" className="form-control" placeholder="Email" />

					<label className="mt-3">Password</label>
					<div className="error">
						<small className="text-danger">Error</small>
					</div>
					<input type="text" className="form-control" placeholder="Password" />

					<label className="mt-3">Confirm Password</label>
					<div className="error">
						<small className="text-danger">Error</small>
					</div>
					<input type="text" className="form-control" placeholder="Confirm password" />

					<div className="d-flex justify-content-end">
						<button className="btn btn-success mt-3">Register</button>
					</div>

					<div className="alert alert-success mt-3">Success message</div>
					<div className="alert alert-danger mt-3">Error message</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
