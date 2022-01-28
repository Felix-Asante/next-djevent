import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";
export default function Home({ events }) {
	return (
		<Layout>
			<h1>Upcoming events</h1>
			{events?.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
			{events?.length > 0 && <Link href="/events">View all events</Link>}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}events/`);
	const events = await res.json();
	return {
		props: { events: events.slice(0, 4) },
		revalidate: 1 /**re-evaluate this after every 1s when data changes: ISR next */,
	};
}
// export async function getServerSideProps() {
// 	const res = await fetch(`${API_URL}events/`);
// 	const events = await res.json();
// 	return {
// 		props: { events },
// 	};
// }
