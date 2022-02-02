import React, { useRef } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import useCookie from "src/hooks/useCookie";

export default function AddEvent({ token }) {
	const nameRef = useRef();
	const performersRef = useRef();
	const venueRef = useRef();
	const addressRef = useRef();
	const dateRef = useRef();
	const timeRef = useRef();
	const descriptionRef = useRef();

	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const performers = performersRef.current.value;
		const address = addressRef.current.value;
		const venue = venueRef.current.value;
		const date = dateRef.current.value;
		const time = timeRef.current.value;
		const description = descriptionRef.current.value;
		const values = {
			name,
			description,
			address,
			venue,
			date,
			performers,
			time,
			slug: name?.toLowerCase().split(" ").join("-"),
		};

		const hasEmptyFields = Object.values(values).some(
			(element) => element === ""
		);

		if (hasEmptyFields) {
			toast.error("Please fill all empty fields");
			return;
		}

		const data = { data: { ...values } };
		const res = await fetch(`${API_URL}/events`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		// console.log(JSON.stringify(data));
		if (!res.ok) {
			toast.error("Something went wrong");
		} else {
			const evt = await res.json();
			localStorage.setItem("res", JSON.stringify(evt));
			// console.log(evt);
			router.push(`/events/${evt.slug}`);
		}
	};
	return (
		<Layout title="Create new event">
			<Link href="/events">Go back</Link>
			<h1>Add Event</h1>
			<ToastContainer theme="colored" />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input type="text" id="name" name="name" ref={nameRef} />
					</div>
					<div>
						<label htmlFor="venue">Performers</label>
						<input
							type="text"
							id="performers"
							name="performers"
							ref={performersRef}
						/>
					</div>
					<div>
						<label htmlFor="venue">Venue</label>
						<input type="text" id="venue" name="venue" ref={venueRef} />
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input type="text" id="address" name="address" ref={addressRef} />
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input type="date" id="date" name="date" ref={dateRef} />
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input type="text" id="time" name="time" ref={timeRef} />
					</div>
				</div>
				<div>
					<label htmlFor="description">Event Description</label>

					<textarea
						ref={descriptionRef}
						id="description"
						name="description"
					></textarea>
				</div>
				<input type="submit" value="Add Event" className="btn" />
			</form>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const token = useCookie(req.headers.cookie);
	return { props: { token } };
}
