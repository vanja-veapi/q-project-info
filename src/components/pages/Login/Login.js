import React, { useState } from "react";
import "./Login.css";

import FormRectangle from "../../elements/FormRectangle/FormRectangle";

// React Query
import { useQuery } from "react-query";
import { useLoginUser } from "../../../hooks/users/LoginUser/useLoginUser";

const Login = () => {
	const [credentials, setCredentials] = useState({
		identifier: "",
		password: "",
	});
	const [submitLogin, setSubmitLogin] = useState(false);

	const login = () => {
		setSubmitLogin(true);
		loginUser(credentials);
	};

	const { mutate: loginUser } = useLoginUser();
	// const { data, isLoading, refetch } = useQuery("register-info", { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false });
	return (
		<div className="register container-fluid position-relative">
			<FormRectangle />
			<div className="card">
				<h3 className="text-center mt-4">Login</h3>
				<div className="card-body text-start p-4">
					<div className="col-12">
						{/* Username */}
						<label className="mt-2">Username</label>
						<br />
						<input type="text" className="form-control" placeholder="Username" onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })} />
						{submitLogin && !credentials.identifier ? <small className="text-danger">Username is required</small> : ""}
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
