import React from "react";
import Layout from "@/components/Layout";
import { API_URL } from "src/config";
import useCookie from "src/config/parseCookie";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";
export default function DashboardPage({ events, token }) {
	const router = useRouter();
	const deleteEvent = async (id) => {
		if (!confirm("Are you sure you want to delete this post")) {
			return;
		}
		const res = await fetch(`${API_URL}/events/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		// const { data } = await res.json();

		if (!res?.ok) {
			toast.error("You cannot delete this post");
			return;
		}
		router.push("/account/dashboard");
	};

	return (
		<Layout title="User Dashboard">
			<div className={styles.dash}>
				<h1>My Events</h1>
				{events.map((evt) => (
					<DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const token = useCookie(req.headers.cookie);

	const res = await fetch(`${API_URL}/events/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const events = await res.json();

	return {
		props: { events, token },
	};
}
