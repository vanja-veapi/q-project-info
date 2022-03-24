import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Layouts
import Header from "./components/layouts/Header/Header";

// Routes
import { Routes, Route } from "react-router-dom";
// Pages
import MyProfile from "./components/pages/MyProfile/MyProfile";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";

import { MyProject } from "./components/pages/ProjectManager/MyProject/MyProject";
// React Query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
						<Route exact path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />

						{/* PM Home */}
						<Route path="/home" element={<MyProject bgColor={"bg-green-light"} />} />

						{/* Employee */}
						{/* <Route path="/home" element={<MyProject bgColor={"bg-blue-light"} />} /> */}
					</Routes>
				</div>
			</div>

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
