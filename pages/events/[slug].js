import Layout from "@/components/Layout";
import { API_URL } from "src/config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { GET_ALL_EVENTS } from "@/config/ApiRoutes";
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
					{evt?.attributes?.date} at {evt?.attributes?.time}
				</span>
				<h1>{evt?.attributes?.name}</h1>
				{evt?.attributes?.image && (
					<div className={styles.image}>
						<Image
							src={
								evt?.attributes?.image?.data?.attributes?.formats?.large?.url
							}
							width={960}
							height={600}
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{evt?.attributes?.performers}</p>
				<h3>Description</h3>
				<p>{evt?.attributes?.description}</p>
				<h3>Venue: {evt?.attributes?.venue}</h3>
				<p>{evt?.attributes?.address}</p>
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
	const res = await fetch(`${API_URL}${GET_ALL_EVENTS}`);
	const { data } = await res.json();
	// you should return this structure:
	// return {
	//     paths:[{params:{path}}]
	// }

	const paths = data.map(({ attributes }) => ({
		params: {
			slug: attributes?.slug,
		},
	}));
	return {
		paths,
		fallback: false /** return 404 if page not found(good of static site) but it's good to set it to true so that in case it failed to fetch at build time it will try to fetch the data again*/,
	};
}
export async function getStaticProps({ params: { slug } }) {
	// console.log(API_URL + `/events?filters[slug][$eq]=${slug}&populate=*`);
	const res = await fetch(
		API_URL + `/events?filters[slug][$eq]=${slug}&populate=*`
	);
	const { data } = await res.json();
	// console.log(data);
	return {
		props: { evt: data[0] },
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
