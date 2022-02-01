import React from "react";
import Layout from "@/components/Layout";
import { API_URL } from "src/config";
import useCookie from "src/hooks/useCookie";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
export default function DashboardPage({ events }) {
	const deleteEvent = (id) => {};
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

	const res = await fetch(API_URL + "/events/me", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const events = await res.json();

	return {
		props: { events },
	};
}
