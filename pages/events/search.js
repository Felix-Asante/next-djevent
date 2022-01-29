import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
export default function SearchPage({ events }) {
	const { data } = events;
	const {
		query: { term },
	} = useRouter();
	return (
		<Layout title="DJ Event | search result">
			<Link href="/events">Go back</Link>
			<h1>Search results for {term}</h1>
			{data?.length === 0 && (
				<h3 style={{ color: "red" }}>No events to show</h3>
			)}
			{data?.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		populate: "*",
		filters: {
			$or: [
				{ name: { $contains: term } },
				{ description: { $contains: term } },
				{ venue: { $contains: term } },
				{ performers: { $contains: term } },
				{ slug: { $contains: term } },
			],
		},
	});

	const res = await fetch(API_URL + `/events?${query}`);
	const data = await res.json();

	return {
		props: { events: data },
	};
}
