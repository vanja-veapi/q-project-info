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

import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
// React Query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CreateProject from "./components/pages/CreateProject/CreateProject";
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<div className="container-fluid">
					<div className="w-100 h-auto bg-header">
						<Header />
					</div>
					<Routes>
						<Route exact path="/" element={<MyProfile />} />
						<Route exact path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
            			<Route exact path="/project" element={<ProjectView />} />
						<Route path="/create-project" element={<CreateProject />} />
						{/* <Route path="/quantox" element={<QuantoxSpinner />} /> */}
						<Route path="/create-note" element={<CreateNote />} />
					</Routes>
				</div>
			</div>

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
