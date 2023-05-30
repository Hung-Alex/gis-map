// import logo from './logo.svg';
// import './App.css';
import React from "react";
// import MyMap from "./components/MyMap";
import LacDuongMap from "./components/LacDuongMap";
import Province from "./components/Province";
import { Link, Route, Router, Routes } from "react-router-dom";
import { Switch } from "@mui/material";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LacDuongMap />}
			></Route>
			<Route
				path="/province"
				element={<Province />}
			></Route>
		</Routes>
	);
}

export default App;
