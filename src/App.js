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

	if (token && (window.location.pathname === "/" || window.location.pathname === "/register")) {
		window.location.replace("/home");
	}

	return (
		<QueryClientProvider client={queryClient}>
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
							<Route path="/home" element={<MyProject />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/project" element={<ProjectView />} />
							<Route path="/create-note" element={<CreateNote />} />
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
