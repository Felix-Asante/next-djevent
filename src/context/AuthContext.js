import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { API_URL } from "src/config";

// CREATE CONTEXT
const AuthContext = createContext();
// CREATE A FUNCTION TO USE THE CONTEXT IN OTHER COMPONENTS
export function useAuthContext() {
	return useContext(AuthContext);
}
// CONTEXT PROVIDER
export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	// REGISTER USER
	const register = async (user) => {};
	// LOGIN USER
	const login = async ({ email: identifier, password }) => {};

	// LOGOUT USER
	const logout = async () => {};

	// CHECK IF USER IS LOGGED IN
	const checkUserLoggedIn = async (user) => {};
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
