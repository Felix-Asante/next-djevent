import Layout from "@/components/Layout";
import { API_URL } from "src/config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
export default function SingleEvent({ evt }) {
	const deleteEvent = () => {};
	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${evt?.id}`}>
						<a href="">
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href="#" className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Event
					</a>
				</div>
				<span>
					{evt?.date} at {evt?.time}
				</span>
				<h1>{evt?.name}</h1>
				{evt?.image && (
					<div className={styles.image}>
						<Image
							src={evt?.image ? evt?.image : "/images/event-default.png"}
							width={960}
							height={600}
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{evt?.performers}</p>
				<h3>Description</h3>
				<p>{evt?.description}</p>
				<h3>Venue: {evt?.venue}</h3>
				<p>{evt?.address}</p>
				<Link href="/events">
					<a href={styles.back}>{"<"} Go back</a>
				</Link>
			</div>
		</Layout>
	);
}

// ==================  GENERATE STATIC PAGE FOR  DYNAMIC ROUTE =============================
// TO implement this you have to fetch all the paths to fetch the page with the getStaticPaths method
// this method have to return the paths for the dynamic pages and then pass it to the getStaticProps method
// which can be use to generate all our pages as static pages at build time,
// eventually increasing performance and SEO

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}events/`);
	const events = await res.json();
	// you should return this structure:
	// return {
	//     paths:[{params:{path}}]
	// }

	const paths = events.map((evt) => ({
		params: {
			slug: evt?.slug,
		},
	}));
	return {
		paths,
		fallback: false /** return 404 if page not found(good of static site) but it's good to set it to true so that in case it failed to fetch at build time it will try to fetch the data again*/,
	};
}
export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(`${API_URL}events/${slug}`);
	const events = await res.json();
	return {
		props: { evt: events[0] },
		revalidate: 1,
	};
}
// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/events/${slug}`);
// 	const events = await res.json();
// 	return {
// 		props: { evt: events[0] },
// 	};
// }
