import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "src/config";

// CREATE CONTEXT
const AuthContext = createContext();
// CREATE A FUNCTION TO USE THE CONTEXT IN OTHER COMPONENTS
export function useAuthContext() {
	return useContext(AuthContext);
}
// CONTEXT PROVIDER
export default function AuthProvider({ children }) {
	const [user, setUser] = useState();
	const [error, setError] = useState(null);
	// check if user is logged in:immediately user visit the app
	useEffect(() => {
		checkUserLoggedIn();
	}, []);
	// router
	const router = useRouter();
	// REGISTER USER
	const register = async (user) => {
		const res = await fetch(NEXT_URL + "/register", {
			method: "POST",
			header: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();

		if (data?.user) {
			setError(null);
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.message);
		}
	};
	// LOGIN USER
	const login = async ({ email: identifier, password }) => {
		const res = await fetch(NEXT_URL + "/login", {
			method: "POST",
			header: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});
		const data = await res.json();

		if (data?.user) {
			setError(null);
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.message);
		}
	};

	// LOGOUT USER
	const logout = async () => {
		const res = await fetch(NEXT_URL + "/logout", { method: "POST" });
		if (res.ok) {
			setUser(null);
			router.push("/");
		}
	};

	// CHECK IF USER IS LOGGED IN
	const checkUserLoggedIn = async () => {
		const res = await fetch(NEXT_URL + "/user");
		const data = await res.json();

		if (data?.user) {
			setUser(data.user);
		} else {
			setUser(null);
		}
	};
	const defaultContext = {
		user,
		error,
		login,
		logout,
		register,
		checkUserLoggedIn,
	};

	return (
		<AuthContext.Provider value={defaultContext}>
			{children}
		</AuthContext.Provider>
	);
}
