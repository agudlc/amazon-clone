import axios from "axios";
import { DisplayUser } from "../models/DisplayUser.interface";
import { NewUser } from "../models/NewUser";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
	console.log("registerclick");
	console.log(`${import.meta.env.VITE_REACT_APP_BASE_API}`);
	const response = await axios.post(
		`${import.meta.env.VITE_REACT_APP_BASE_API}/auth/register`,
		newUser
	);

	return response.data;
};

const authService = {
	register,
	// login,
	// logout,
	// verifyJwt,
};

export default authService;
