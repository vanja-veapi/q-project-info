import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Routes
import { Routes, Route } from "react-router-dom";
// Pages

import MyProfile from "./components/pages/MyProfile/MyProfile";
import ProjectView from "./components/pages/ProjectView/ProjectView";
import CreateNote from "./components/pages/CreateNote/CreateNote";
import CreateProject from "./components/pages/CreateProject/CreateProject";

import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import Logout from "./components/pages/Logout/Logout";
import { MyProject } from "./components/pages/MyProject/MyProject";
import Profile from "./components/pages/Profile/Profile";

// React Query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminDashboard from "./components/pages/AdminDashboard/AdminDashboard";
import EditUser from "./components/pages/EditData/EditUser";
import InsertUser from "./components/pages/InsertData/InsertUser";
import InsertCategory from "./components/pages/InsertData/InsertCategory";
import EditCategory from "./components/pages/EditData/EditCategory";
import { useEffect, useState } from "react";
import QuantoxSpinner from "./components/elements/QuantoxSpinner/QuantoxSpinner";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });

persistQueryClient({
	queryClient,
	persistor: localStoragePersistor,
});

function App() {
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem("token");
	// console.log(token);

	if (token && (window.location.pathname === "/" || window.location.pathname === "/register")) {
		window.location.replace("/projects");
	}

	useEffect(() => setTimeout(() => setLoading(false)), 2000);

	return (
		<QueryClientProvider client={queryClient}>
			{loading ? <QuantoxSpinner /> : null}
			<div className="App">
				<div className="container-fluid">
					<Routes>
						<Route exact path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route element={<ProtectedRoutes />}>
							{/* PM Home || Employee */}
							<Route path="/dashboard" element={<AdminDashboard />} />
							<Route path="/dashboard/users/:id/edit" element={<EditUser />} />
							<Route path="/dashboard/categories/:id/edit" element={<EditCategory />} />
							<Route path="/dashboard/user/add" element={<InsertUser />} />
							<Route path="/dashboard/category/add" element={<InsertCategory />} />
							<Route path="/projects" element={<MyProject />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/projects/create" element={<CreateProject edit={false} />} />
							<Route path="/projects/:projectId" element={<ProjectView />} />
							<Route path="/projects/:projectId/edit" element={<CreateProject edit={true} />} />
							<Route path="/projects/:projectId/note/create" element={<CreateNote editNote={false} />} />
							<Route path="/projects/:projectId/notes/:noteId/edit" element={<CreateNote editNote={true} />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</div>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
