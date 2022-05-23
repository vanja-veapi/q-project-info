export const Fallback = ({ msg }) => {
	return (
		<div className="alert alert-danger w-75 mt-5 m-auto">
			<h1>Something went wrong</h1>
			<a href="/" className="text-decoration-none text-danger">
				Go back
			</a>
		</div>
	);
};
