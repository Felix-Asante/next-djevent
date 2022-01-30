import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import { GET_ALL_EVENTS } from "@/config/ApiRoutes";
import Link from "next/link";
import Pagination from "@/components/Pagination";
const PER_PAGE = 5;
export default function Home({ events, page, total }) {
	const lastPage = Math.ceil(total / PER_PAGE);
	return (
		<Layout>
			<h1>Upcoming events</h1>
			{events?.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
			<Pagination page={page} lastPage={lastPage} />
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	// Total  events
	const eventRes = await fetch(`${API_URL}/events`);
	const {
		meta: { pagination },
	} = await eventRes.json();
	const total = pagination.total;

	// start point for pagination
	const start = +page === 1 ? 0 : (+page - 1) * 2;
	const res = await fetch(
		`${API_URL}${GET_ALL_EVENTS}&sort[0]=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
	);
	const { data } = await res.json();
	return {
		props: { events: data, page: +page, total },
	};
}
