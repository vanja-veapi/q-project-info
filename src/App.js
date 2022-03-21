import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Layouts
import Header from "./components/layouts/Header/Header";

function App() {
	return (
		<div className="App">
			<div className="container-fluid">
				<Header />
			</div>
		</div>
	);
}

export default App;
