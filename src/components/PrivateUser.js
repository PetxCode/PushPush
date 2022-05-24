import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import decoded from "jwt-decode";

const PrivateUser = ({ children }) => {
	const user = useSelector((state) => state.currentUser);
	var token = user?.token;
	var decode = decoded(token);
	const { verified } = decode;

	return verified ? children : <Navigate to="/signup" />;
};

export default PrivateUser;
