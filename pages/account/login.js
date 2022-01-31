import React, { useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
export default function LoginPage() {
	const { login, error } = useAuthContext();
	useEffect(() => error && toast.error(error));
	const emailRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		const email = emailRef.current.value.trim();
		const password = passwordRef.current.value.trim();
		const user = { email, password };
		const hasEmptyFields = Object.values(user).some(
			(element) => element === ""
		);

		if (hasEmptyFields) {
			toast.error("Invalid credentials");
			return;
		}
		login(user);
	};
	return (
		<Layout title="User Login">
			<div className={styles.auth}>
				<h1>
					{" "}
					<FaUser /> Log In{" "}
				</h1>
				<ToastContainer theme="colored" />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email Address</label>
						<input type="email" id="email" ref={emailRef} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" ref={passwordRef} />
					</div>
					<input type="submit" value="Login" className="btn" />
				</form>
				<p>
					Don't have an account? <Link href="/account/register">register</Link>{" "}
				</p>
			</div>
		</Layout>
	);
}
