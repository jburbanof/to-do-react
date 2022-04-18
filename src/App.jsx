import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Login from "./Components/Login";
import Todo from "./Components/Todo";
import { Route, Routes, Navigate } from "react-router-dom";
import Provider from "./Components/Context/Provider";
import { SnackbarProvider } from "notistack";

function App() {
	return (
		<div className="App">
			<SnackbarProvider maxSnack={3}>
				<Provider>
					<Routes>
						<Route path="/to-do-react" element={<Login />} />
						<Route path="/to-do-react/todo" element={<Todo />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Provider>
			</SnackbarProvider>
		</div>
	);
}

export default App;
