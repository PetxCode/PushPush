import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthComplete from "./components/CompleteAuth";
import Developer from "./components/Developer";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import Private from "./components/Private";
import PrivateUser from "./components/PrivateUser";
import Regular from "./components/Regular";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserScreen from "./components/UserScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/api/user/dev/:id/:token" element={<AuthComplete />} />

				<Route path="/users" element={<UserScreen />} />

				<Route
					path="/developer"
					element={
						<Private>
							<Developer />
						</Private>
					}
				/>
				<Route path="/signup/signin" element={<SignIn />} />
				<Route path="/regular/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/regular" element={<Regular />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
