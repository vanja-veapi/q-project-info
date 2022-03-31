import React, { useEffect } from "react";
// Css
import "./Profile.css";
// NoImage
import noImage from "../../../assets/no-user-image.png";

import { useState } from "react";
import { useQuery } from "react-query";
import instance from "../../../config/config";
import useLoggedUser from "../../../hooks/users/useLoggedUser";
import { useUpdateUser } from "../../../hooks/users/useUpdateUser";

const Profile = () => {
	const { data: fetchUser, isLoading, refetch } = useLoggedUser();
	const { mutate: updateUser } = useUpdateUser();

	// const userId = fetchUser?.data?.data.id;
	// const { data } = useQuery(["user", userId], () => instance.get("/api/users/me?populate=*"));

	const userData = fetchUser?.data;
	const { id, username, email, role, profileImage } = {
		id: userData?.id,
		username: userData?.username,
		email: userData?.email,
		role: userData?.role?.name,
		profileImage: userData?.profileImage,
	};

	const [userName, setUserName] = useState(username);

	useEffect(() => {
		if (userName !== undefined) {
			setUserName(userName);
		}
	}, [userName]);

	const handleUpdate = () => {
		console.log(id);
		const data = { id, username: userName };
		updateUser(data);

		setTimeout(() => refetch(), 500);
	};
	// console.log(user);
	return (
		<div className="profile container container-project mt-5">
			<div className="row">
				<div className="col-4">
					<div className="card profile-image-container p-3 d-flex align-items-center">
						{isLoading ? "Loading..." : ""}
						<div className="profile-image-box d-flex align-items-center justify-content-center">{profileImage !== null ? <img src={profileImage?.name} alt={profileImage?.alternativeText} width={200} className={"img-fluid"} /> : <img src={noImage} alt="User has no pic" width={200} />}</div>
					</div>
				</div>
				<div className="col-8">
					<div className="card">
						<div className="card-header bg-green">
							<h1 className="text-muted">Data</h1>
						</div>
						<div className="card-body p-4">
							<input type="text" className="form-control w-50 m-auto" value={userName} onChange={(e) => setUserName(e.target.value)} />
							<div className="username d-flex align-items-center">
								<i>ICONS</i>
								<p className="h3 text-uppercase">{username}</p>
							</div>
							<p className="text-muted">{email}</p>
							<p className="text-muted">{role}</p>
							<div className="button-container">
								<input type="button" value="Update" className="btn btn-success" onClick={handleUpdate} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<div className="card">
						<p>text</p>
					</div>
				</div>
			</div>

			<br />
		</div>
	);
};

export default Profile;
