import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Login from "./Components/Login";
import Todo from "./Components/Todo";
import { Route, Routes } from "react-router-dom";
import Provider from "./Components/Context/Provider";
import { SnackbarProvider } from "notistack";

function App() {
	return (
		<div className="App">
			<SnackbarProvider maxSnack={3}>
				<Provider>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="todo" element={<Todo />} />
					</Routes>
				</Provider>
			</SnackbarProvider>
		</div>
	);
}

export default App;