import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItems.module.css";
export default function EventItem({ evt: { attributes } }) {
	const { time, date, name, slug } = attributes;

	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						attributes?.image?.data?.attributes?.formats?.thumbnail
							? attributes?.image?.data?.attributes?.formats?.thumbnail?.url
							: "/images/event-default.png"
					}
					width={170}
					height={100}
					alt={name}
				/>
			</div>
			<div className={styles.info}>
				<span>
					{date} {" at "} {time}
				</span>
				<h3>{name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${slug}`}>
					<a className="btn">Details</a>
				</Link>
			</div>
		</div>
	);
}
