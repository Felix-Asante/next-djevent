import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import { GET_ALL_EVENTS } from "@/config/ApiRoutes";
export default function Home({ events }) {
	return (
		<Layout>
			<h1>Upcoming events</h1>
			{events?.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}${GET_ALL_EVENTS}`);
	const { data } = await res.json();
	return {
		props: { events: data },
		revalidate: 1 /**re-evaluate this after every 1s when data changes: ISR next */,
	};
}
