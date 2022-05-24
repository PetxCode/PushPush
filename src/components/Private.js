import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import decoded from "jwt-decode";

const Private = ({ children }) => {
	const user = useSelector((state) => state.currentUser);
	var token = user?.token;
	var decode = decoded(token);
	const { isDeveloper, verified } = decode;

	return isDeveloper && verified ? (
		children
	) : verified ? (
		<Navigate to="/users" />
	) : (
		<Navigate to="/" />
	);
};

export default Private;
