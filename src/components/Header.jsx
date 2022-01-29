import Link from "next/link";
import styles from "@/styles/header.module.css";
import Search from "./search";
export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">
					<a href="">DJ Events</a>
				</Link>
			</div>
			<Search />
			<nav>
				<ul>
					<li>
						<Link href="/events">
							<a href="">Events</a>
						</Link>
					</li>
					<li>
						<Link href="/events/add">
							<a href="">Add Event</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
