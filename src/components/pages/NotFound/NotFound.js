import React from "react";
import styles from "./NotFound.module.css";
import Header from "../../layouts/Header/Header";
const NotFound = () => {
	return (
		<>
			<div className="w-100 h-auto bg-header">
				<Header />
			</div>
			<div className={styles.error}></div>;
		</>
	);
};

export default NotFound;
