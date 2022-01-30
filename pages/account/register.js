import React, { useEffect, useContext, useRef } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { ToastContainer, toast } from "react-toastify";
export default function RegisterPage() {
	const userNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const handleBlur = () => {
		const password = passwordRef.current.value.trim();
		const confirmPassword = confirmPasswordRef.current.value.trim();
		if (password !== confirmPassword) {
			toast.error("passwords do not match");
			return;
		}
		return;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const email = emailRef.current.value.trim();
		const password = passwordRef.current.value.trim();
		const user = userNameRef.current.value.trim();
		const data = { email, password, user };
		const hasEmptyFields = Object.values(data).some(
			(element) => element === ""
		);

		if (hasEmptyFields) {
			toast.error("Invalid credentials");
			return;
		}
	};
	return (
		<Layout title="User Login">
			<div className={styles.auth}>
				<h1>
					{" "}
					<FaUser /> User Registration{" "}
				</h1>
				<ToastContainer theme="colored" />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="user">User Name</label>
						<input type="text" id="user" ref={userNameRef} />
					</div>
					<div>
						<label htmlFor="email">Email Address</label>
						<input type="email" id="email" ref={emailRef} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" ref={passwordRef} />
					</div>
					<div>
						<label htmlFor="passwordConfirm">Confirm Password</label>
						<input
							type="password"
							id="passwordConfirm"
							ref={confirmPasswordRef}
							onBlur={handleBlur}
						/>
					</div>
					<input type="submit" value="Login" className="btn" />
				</form>
				<p>
					Already have an account? <Link href="/account/login">login</Link>{" "}
				</p>
			</div>
		</Layout>
	);
}
