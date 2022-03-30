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
// React Query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CreateNote from "./components/pages/CreateNote/CreateNote";
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
