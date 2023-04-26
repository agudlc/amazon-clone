import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { resetCart } from "../productSlice";

const PaymentComponent = () => {
	const dispatch = useAppDispatch();
	const { cart } = useAppSelector((state) => state.product);

	const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState("");

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		if (totalQty === 0) return;

		if (paymentStatus !== "succeeded") return;

		dispatch(resetCart);
	}, []);

	return (
		<div style={{ fontSize: "20px" }}>
			<form id="paymentForm">
				<label htmlFor="card-element">Place order</label>
				<CardElement id="card-element" />
				{!isProcessing && <button style={{}}>Pay</button>}
			</form>
		</div>
	);
};

const PaymentGateway = () => {
	const stripePromise = loadStripe(
		`${import.meta.env.VITE_REACT_APP_STRIPE_PK}`
	);

	return (
		<Elements stripe={stripePromise}>
			<PaymentComponent />
		</Elements>
	);
};

export default PaymentGateway;
