import React, { FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
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

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (totalQty === 0) return;
		if (!stripe || !elements) return;

		const cardEl = elements.getElement(CardElement);

		setIsProcessing(true);

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_REACT_APP_BASE_API}/stripe`,
				{ cart }
			);
			const { client_secret: clientSecret } = res.data;
			const { paymentIntent } = await stripe.confirmCardPayment(
				clientSecret,
				{
					payment_method: {
						card: cardEl!,
					},
				}
			);
			if (!paymentIntent) {
				setPaymentStatus("Paiment failed!");
			} else {
				setPaymentStatus(paymentIntent.status);
			}
		} catch (err) {
			console.error(err);
			setPaymentStatus("Payment failed!");
		}
		setIsProcessing(false);
	};

	return (
		<div style={{ fontSize: "20px" }}>
			<form onSubmit={handleSubmit} id="paymentForm">
				<label htmlFor="card-element">Place order</label>
				<CardElement id="card-element" />
				{!isProcessing && (
					<button
						style={{
							marginTop: "16px",
							height: "31px",
							backgroundColor: "#f0c14b",
							color: "black",
							display: "flex",
							fontWeight: 600,
							fontSize: "20px",
							padding: "24px",
							justifyContent: "center",
							alignContent: "center",
							cursor: "pointer",
							width: "100%",
						}}
					>
						Pay
					</button>
				)}
				{isProcessing && <div>Processing...</div>}
				{!isProcessing && paymentStatus && (
					<div>Status: {paymentStatus}</div>
				)}
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
