import React, { useState, useEffect } from "react";
import "./InsertUserForm.css";
// RQ
import { useQuery } from "react-query";
// Hooks
import { useRegisterUser } from "../../../hooks/users/RegisterUser/useRegisterUser";

const InsertUserForm = () => {
	const { mutate: registerUser } = useRegisterUser();

	const { data, isLoading, refetch } = useQuery("register-info", { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false });

	// /^[a-zžšđčćA-ZŽŠĐČĆ!@_\d]{2,30}$/
	const usernameRegEx = /^([a-zžšđčćA-ZŽŠĐČĆ!@_]{2,30})+(\d)*/;
	const regExPassword = /^[^ ]{6,16}$/;
	const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(".+"))+@((quantox)|(quantoxtechnology))+(?:\.[a-zA-Z0-9-]+)+$/;

	// Bez ovog userName nece da mi radi onChange...
	const [userName] = useState(null);
	const [mail] = useState(null);
	const [editView, setEditView] = useState(false);
	const [message, setMessage] = useState(null);
	const [newUserData, setNewUserData] = useState({
		username: null,
		email: null,
		password: null,
		role: { id: null },
	});

	const handleInsert = async () => {
		if (newUserData.username === "" || newUserData.username === undefined || newUserData.username === null) {
			setNewUserData({ ...newUserData, username: undefined });
		} else if (!usernameRegEx.test(newUserData.username)) {
			return setMessage("Username is not in valid format.");
		} else {
			setNewUserData({ ...newUserData, username: userName });
		}

		if (newUserData.password === "" || newUserData.password === null) {
			setNewUserData({ ...newUserData, password: null });
		} else if (!regExPassword.test(newUserData.password)) {
			return setMessage("Password is not in valid format.");
		}

		// Ovo mora da se pojavi samo kada admin menja nekog drugog
		// This regular expression will show only in situation when admin changin other user...
		if (newUserData.email === "" || newUserData.email === undefined) {
			setNewUserData({ ...newUserData, email: undefined });
		} else if (!regExEmail.test(newUserData.email)) {
			return setMessage("Email is not in valid format");
		}

		let sendingData = {};
		/* 
			Trebaju mi samo svojstva koja dolaze iz inputa. Ako svojstva prodju provere iznad, 
			upisuju se u promenljivu data i salju se na UPDATE metodom PUT 
		*/
		for (let property in newUserData) {
			if (newUserData[property] && property !== "id") {
				sendingData = { ...sendingData, [property]: newUserData[property] };
			}
		}
		console.log(sendingData);
		registerUser(sendingData, true);
		setMessage(null);
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-12">
					<div className="insert-user card mt-4 mt-md-0">
						<div className="card-header bg-green">
							<h1 className="text-muted">Insert User</h1>
						</div>
						<div className="card-body p-4 d-flex flex-column gap-3">
							<div className="username d-flex flex-column gap-1">
								<small className="text-danger">{message}</small>
								<input type="text" className="form-control" value={userName} onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} placeholder="Username..." />
								<input type="password" className="form-control" onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} placeholder="Password..." />
								<input type="text" className="form-control" value={mail} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} placeholder="Email..." />
								<select className="form-control" onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}>
									<option value="5">Employee</option>
									<option value="4">Project Manager</option>
									<option value="3">System Administrator</option>
								</select>
							</div>
							<div className="button-container">
								<input type="button" value="Insert" className="btn btn-success" onClick={handleInsert} />
							</div>
						</div>
						{data?.error?.status >= 400 ? <div className="alert alert-danger w-75 m-auto mb-3">{data?.error?.message}</div> : null}
						{data?.status === 200 ? <div className="alert alert-success w-75 m-auto mb-3">You have successfully registered user</div> : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default InsertUserForm;
