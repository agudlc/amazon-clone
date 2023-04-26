import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { logout, selectedUser } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import ShoppingCartOutlinedICon from "@mui/icons-material/ShoppingCartOutlined";

const HeaderComponent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { user } = useAppSelector(selectedUser);
	const { cart } = useAppSelector((state) => state.product);

	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
		setCartCount(() => totalQty);
	}, [cart]);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#131921",
					color: "white",
					padding: "4px",
				}}
			>
				<Toolbar
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<img
						src="/client/public/amazon-logo.png"
						alt="amazon logo"
						onClick={() => navigate("/")}
						style={{
							width: "113px",
							height: "50px",
							paddingTop: "10px",
							cursor: "pointer",
						}}
					/>
					<div style={{ display: "flex" }}>
						<div>
							<div>Hello, {user?.name}</div>
							<Button
								onClick={logoutHandler}
								sx={{ padding: 0, marginRight: "16px" }}
								color="inherit"
							>
								Sign out
							</Button>
						</div>
						<Button onClick={() => navigate("/cart")}>
							<Badge badgeContent={cartCount} color="primary">
								<ShoppingCartOutlinedICon fontSize="large" />
							</Badge>
							<span>Cart</span>
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default HeaderComponent;
