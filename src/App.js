import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Layouts
import Header from "./components/layouts/Header/Header";

// Routes
import { Routes, Route } from "react-router-dom";
import MyProfile from "./components/pages/MyProfile/MyProfile";
import Login from "./components/pages/Login/Login";

function App() {
	return (
		<div className="App">
			<div className="container-fluid">
				<div className="w-100 h-auto bg-header">
					<Header />
				</div>
				<Routes>
					<Route exact path="/" element={<MyProfile />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
