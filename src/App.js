import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Layouts
import Header from "./components/layouts/Header/Header";

// Routes
import { Routes, Route } from "react-router-dom";
import MyProfile from "./components/pages/MyProfile/MyProfile";
import ProjectView from "./components/pages/ProjectView/ProjectView";
import CreateNote from "./components/pages/CreateNote/CreateNote";

function App() {
	return (
		<div className="App">
			<div className="container-fluid">
				<div className="w-100 h-auto bg-header">
					<Header />
				</div>
				<Routes>
					<Route exact path="/" element={<MyProfile />} />
					<Route exact path="/project" element={<ProjectView />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
