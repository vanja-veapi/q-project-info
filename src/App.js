import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Layouts
import Header from "./components/layouts/Header/Header";

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
	const token = localStorage.getItem("token");
	console.log(token);
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<div className="container-fluid">
					<div className="w-100 h-auto bg-header">
						<Header />
					</div>

					<Routes>
						<Route exact path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />

						<Route element={<ProtectedRoutes />}>
							{/* PM Home || Employee */}
							<Route path="/home" element={<MyProject />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/project" element={<ProjectView />} />
							<Route path="/projects/:projectId/note/create" element={<CreateNote />} />
							<Route path="/create-project" element={<CreateProject />} />
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
