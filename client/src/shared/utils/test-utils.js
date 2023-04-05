import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "../../features/auth/authSlice";

function reducer(
	ui,
	{
		preloadedState,
		store = configureStore({
			reducer: { auth: authReducer },
			preloadedState,
		}),
		...renderOptions
	}
) {
	// eslint-disable-next-line react/prop-types
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<Router>{children}</Router>
			</Provider>
		);
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { reducer };
