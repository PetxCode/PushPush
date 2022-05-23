import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthComplete from "./components/CompleteAuth";
import Developer from "./components/Developer";
import HomeScreen from "./components/HomeScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserScreen from "./components/UserScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/api/user/dev/:id/:token" element={<AuthComplete />} />
				<Route path="/users" element={<UserScreen />} />
				<Route path="/developer" element={<Developer />} />
				<Route path="/" element={<HomeScreen />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
