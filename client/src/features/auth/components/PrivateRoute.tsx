import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { verifyJwt } from "../authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
	const dispatch = useAppDispatch();

	const { isSuccess, isAutheticated, jwt } = useAppSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (!jwt || !jwt?.token) return;
		dispatch(verifyJwt(jwt.token));

		console.log(isAutheticated);
	}, [jwt, isSuccess]);

	return isAutheticated ? page : <Navigate replace to="/signin" />;
};

export default PrivateRoute;
