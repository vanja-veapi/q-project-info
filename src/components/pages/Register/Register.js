import React, { useState } from "react";
import "./Register.css";
import "../Login/Login.css"; // Imported because both components has same top property
import Header from "../../layouts/Header/Header";

import FormRectangle from "../../elements/FormRectangle/FormRectangle";
import QuantoxSpinner from "../../elements/QuantoxSpinner/QuantoxSpinner";

// Custom query hooks
import { useQuery } from "react-query";
import { useRegisterUser } from "../../../hooks/users/RegisterUser/useRegisterUser";

const Register = () => {
	// RegEx
	const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(".+"))+@((quantox)|(quantoxtechnology))+(?:\.[a-zA-Z0-9-]+)+$/;
	// const regExGlobal = /^[A-ZŽŠĐČĆa-zžšđčć\d]{2,30}$/;
	const usernameRegEx = /^([a-zžšđčćA-ZŽŠĐČĆ!@_]{2,30})+(\d)*/;
	const regExPassword = /^[^ ]{6,16}$/;

	// UseStates
	const [isSendingRequest, setIsSendingRequest] = useState(false);
	const [submitRegister, setSubmitRegister] = useState(false);
	const [credentials, setCredentials] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const onRegister = () => {
		// If all regEx are true, then call react-query and register user
		if (usernameRegEx.test(credentials.username) && regExEmail.test(credentials.email) && regExPassword.test(credentials.password) && credentials.password === credentials.confirmPassword) {
			const newUser = {
				username: credentials.username,
				email: credentials.email,
				password: credentials.password,
			};
			setIsSendingRequest(!isSendingRequest);
			registerUser(newUser);
			refetch();
			setTimeout(() => setIsSendingRequest(false), 500);
			return setSubmitRegister(false);
		}

		return setSubmitRegister(true);
	};

	const { mutate: registerUser } = useRegisterUser();

	// const { data, isLoading, refetch } = useQuery("register-info", { enabled: false });
	const { data, isLoading, refetch } = useQuery("register-info", { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false });

	return (
		<>
			{isLoading || isSendingRequest ? <QuantoxSpinner /> : ""}
			{isLoading ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden")}
			<div className="w-100 h-auto bg-header">
				<Header />
			</div>
			<div className="register container-fluid position-relative">
				<FormRectangle />
				<div className="card">
					<p className="h3 text-center mt-4">Register</p>
					<div className="card-body text-start p-4">
						{/* Username */}
						<label className="mt-2">Username</label>
						<br />
						{!usernameRegEx.test(credentials.username) && submitRegister ? <small className="text-danger">Username is required</small> : ""}
						<input type="text" className="form-control" placeholder="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />

						{/* Email */}
						<label className="mt-3">Email</label>
						<br />
						{!regExEmail.test(credentials.email) && submitRegister ? <small className="text-danger">Email is not in valid format. Only @quantox</small> : ""}
						<input type="text" className="form-control" placeholder="Email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />

						{/* Password */}
						<label className="mt-3">Password</label>
						<br />
						{!usernameRegEx.test(credentials.password) && submitRegister ? <small className="text-danger">Password is required</small> : ""}
						<input type="password" className="form-control" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />

						{/* Confirm password */}
						<label className="mt-3">Confirm Password</label>
						<br />

						{credentials.password !== credentials.confirmPassword && submitRegister ? <small className="text-danger">Confirm password valid must be same as password field</small> : ""}
						<input type="password" className="form-control" placeholder="Confirm password" onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })} />

						<div className="d-flex justify-content-end">
							<button className="btn btn-success mt-3" onClick={onRegister}>
								Register
							</button>
						</div>

						{data?.error?.status >= 400 ? <div className="alert alert-danger mt-3">{data?.error?.message}</div> : ""}
						{data?.success?.status < 400 ? <div className="alert alert-success mt-3">You have successfully registered</div> : ""}
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
