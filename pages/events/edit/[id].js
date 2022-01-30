import React, { useRef, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
export default function EditEvent({ evt }) {
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
		const res = await fetch(`${API_URL}/events/${evt.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		// console.log(JSON.stringify(data));
		if (!res.ok) {
			toast.error("Something went wrong");
		} else {
			const evt = await res.json();
			localStorage.setItem("res", JSON.stringify(evt));
			router.push(`/events/${values.slug}`);
		}
	};

	const { name, description, venue, address, time, performers, date, image } =
		evt.attributes;
	const [imagePreview, setImagePreview] = useState(
		image?.data ? image?.data?.attributes?.formats?.thumbnail?.url : null
	);
	return (
		<Layout title="Edit event">
			<Link href="/events">Go back</Link>
			<h1>Edit Event</h1>
			<ToastContainer theme="colored" />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							id="name"
							name="name"
							ref={nameRef}
							defaultValue={name}
						/>
					</div>
					<div>
						<label htmlFor="venue">Performers</label>
						<input
							type="text"
							id="performers"
							name="performers"
							ref={performersRef}
							defaultValue={performers}
						/>
					</div>
					<div>
						<label htmlFor="venue">Venue</label>
						<input
							type="text"
							id="venue"
							name="venue"
							ref={venueRef}
							defaultValue={venue}
						/>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							id="address"
							name="address"
							ref={addressRef}
							defaultValue={address}
						/>
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							id="date"
							name="date"
							ref={dateRef}
							defaultValue={moment(date).format("yyyy-MM-DD")}
						/>
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input
							type="text"
							id="time"
							name="time"
							ref={timeRef}
							defaultValue={time}
						/>
					</div>
				</div>
				<div>
					<label htmlFor="description">Event Description</label>

					<textarea
						ref={descriptionRef}
						id="description"
						name="description"
						defaultValue={description}
					></textarea>
				</div>
				<input type="submit" value="Update Event" className="btn" />
			</form>
			<h2>Event Image</h2>
			{imagePreview ? (
				<Image src={imagePreview} height={100} width={170} />
			) : (
				<div>No image uploaded</div>
			)}
			<div>
				<button className="btn-secondary">
					<FaImage /> Set Image
				</button>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ params }) {
	const res = await fetch(`${API_URL}/events/${params.id}?populate=*`);
	const { data } = await res.json();

	return {
		props: { evt: data },
	};
}
