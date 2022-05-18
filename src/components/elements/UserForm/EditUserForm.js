import React, { useState, useEffect } from "react";
import noImage from "../../../assets/no-user-image.png";
import { AiOutlineMail } from "react-icons/ai";
import { FcBusiness } from "react-icons/fc";

import { useUpdateUser } from "../../../hooks/users/useUpdateUser";

import { useRemoveImage } from "../../../hooks/images/useRemoveImage";
import { useUploadPhoto } from "../../../hooks/useUploadPhoto";
import { useQuery } from "react-query";

import instance from "../../../config/config";

const EditUserForm = ({ fetchUser, refetch, isLoading, isAdmin }) => {
	const { mutate: updateUser } = useUpdateUser();
	const { mutate: removeImage } = useRemoveImage();
	const { mutate: uploadPhoto } = useUploadPhoto();

	//Mozda bi trebalo da u useQuery ili useLoggedUser da odradim async/await da bi se dobio odgovor
	const { data: imageObj, refetch: uploadRefetch } = useQuery("upload-info", () => {}, {
		cacheTime: 0,
		retry: true,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { data: messageInfo } = useQuery("user-update", () => {});

	// /^[a-zžšđčćA-ZŽŠĐČĆ!@_\d]{2,30}$/
	const usernameRegEx = /^([a-zžšđčćA-ZŽŠĐČĆ!@_]{2,30})+(\d)*/;
	const regExPassword = /^[^ ]{6,16}$/;
	const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(".+"))+@((quantox)|(quantoxtechnology))+(?:\.[a-zA-Z0-9-]+)+$/;

	const userData = fetchUser;

	const { id, username, email, role, profileImage } = {
		id: userData?.id,
		username: userData?.username,
		email: userData?.email,
		role: userData?.role?.name,
		profileImage: userData?.profileImage,
	};

	// Bez ovog userName nece da mi radi onChange...
	const [userName] = useState(undefined);
	const [mail] = useState(undefined);
	const [editView, setEditView] = useState(false);
	const [message, setMessage] = useState(null);
	const [newUserData, setNewUserData] = useState({
		id: id,
		username: undefined,
		email: undefined,
		profileImage: null,
		password: null,
		role: { id: userData?.role.id },
	});
	// useEffect(() => {
	// 	setUserName(username);
	// }, [username]);

	useEffect(() => {
		setNewUserData({
			...newUserData,
			id: id,
			role: {
				id: userData?.role.id,
			},
		});
	}, [id, userData?.role]);

	const handleUpdate = async () => {
		setNewUserData({ ...newUserData, id });

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
		} else if (!regExEmail.test(newUserData.email) && isAdmin) {
			return setMessage("Email is not in valid format");
		}

		let sendingData = { id };
		/* 
			Trebaju mi samo svojstva koja dolaze iz inputa. Ako svojstva prodju provere iznad, 
			upisuju se u promenljivu data i salju se na UPDATE metodom PUT 
		*/
		for (let property in newUserData) {
			if (newUserData[property] && property !== "id") {
				sendingData = { ...sendingData, [property]: newUserData[property] };
			}
			if (newUserData.profileImage !== null && property === "profileImage") {
				//Stalno ce ulazti ovde....

				if (newUserData.profileImage !== null) {
					//Prosao
					// await uploadPhoto(newUserData.profileImage);
					await instance.post("/api/upload", newUserData.profileImage).then((res) => {
						const imageId = res.data[0].id;
						sendingData = { ...sendingData, profileImage: imageId };
					});
				}
				//Nije prosao jer je imageObj[0] undefiend
			}
		}
		// console.log(sendingData);
		updateUser(sendingData);
		setTimeout(() => refetch(), 500);
		setMessage(null);
		handleView();

		setNewUserData({ ...newUserData, profileImage: null, password: null, email: undefined });
	};

	const handleView = () => {
		if (message !== null) {
			setMessage(null);
		}
		setEditView(!editView);
	};

	const handleFileChange = (file) => {
		const fileUploaded = file.target.files[0];
		const imageTypes = ["image/jpeg", "image/png", "image/gif"];

		//Check if someone want to upload wrong format
		if (!imageTypes.some((type) => fileUploaded.type === type)) {
			return setMessage("You cannot upload video or other document, only picture");
		}

		const imageData = new FormData();
		imageData.append("files", fileUploaded);
		setNewUserData({ ...newUserData, profileImage: imageData });
	};

	const handleRemoveImage = () => {
		removeImage(profileImage.id);
		setTimeout(() => refetch(), 500);
		handleView();
	};

	return (
		<div className="profile container container-project mt-5">
			<div className="row">
				<div className="col-sm-12 col-md-4">
					<div className="card profile-image-container p-3 d-flex align-items-center">
						{isLoading ? "Loading..." : null}
						<div className="profile-image-box d-flex justify-content-center align-items-center">{profileImage !== null ? <img src={process.env.REACT_APP_BASEURL + profileImage?.url} alt={profileImage?.alternativeText} width={200} className={"img-fluid"} /> : <img src={noImage} alt="User has no pic" width={200} />}</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-8">
					<div className="card mt-4 mt-md-0">
						<div className="card-header bg-green">
							<h1 className="text-muted">Data</h1>
						</div>
						<div className="card-body p-4 d-flex flex-column gap-3">
							<div className="username d-flex flex-column gap-1">
								<small className="text-danger">{message}</small>
								{editView ? <input type="text" className="form-control" value={userName} onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} placeholder="Enter a new username..." /> : <p className="h3 text-uppercase">{username}</p>}
								{editView ? <input type="password" placeholder="New password..." className="form-control" onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} /> : null}
								{editView && isAdmin ? <input type="text" className="form-control" value={mail} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} placeholder="Enter a new email..." /> : null}
								{editView ? <input type="file" className="form-control" onChange={(e) => handleFileChange(e)} /> : null}
								{editView && isAdmin ? (
									<select className="form-control" onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}>
										<option value={userData?.role?.id} defaultValue>
											Select role
										</option>
										<option value="5">Employee</option>
										<option value="4">Project Manager</option>
										<option value="3">System Administrator</option>
									</select>
								) : null}
							</div>
							<div className="email d-flex align-items-center gap-2">
								<AiOutlineMail />
								<p className="text-muted">{email}</p>
							</div>
							<div className="role d-flex align-items-center gap-2">
								<FcBusiness />
								<p className="text-muted">{role}</p>
							</div>
							<div className="button-container">
								<input type="button" value="Edit ⚙" className="btn btn-success me-3" onClick={handleView} />
								{editView ? <input type="button" value="Update" className="btn btn-primary" onClick={handleUpdate} /> : ""}

								{profileImage && editView ? <input type="button" value="Remove picture" className="btn btn-danger float-end" onClick={handleRemoveImage} /> : null}
							</div>
							{messageInfo?.status >= 400 ? <div className="alert alert-danger">{messageInfo?.message}</div> : null}
						</div>
					</div>
				</div>
			</div>

			{fetchUser?.role.id !== 3 && (
				<div className="row">
					<div className="col-sm-12 col-md-4">
						<div className="card mt-4 mt-md-0">
							<div className="card-header">
								<h1 className="h2 text-center text-muted">Active projects</h1>
							</div>
							<div className="card-body">
								<p className="h1 text-center">{fetchUser?.projects?.length}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<br />
		</div>
	);
};

export default EditUserForm;
