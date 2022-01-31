import Link from "next/link";
import styles from "@/styles/header.module.css";
import Search from "./search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuthContext } from "@/context/AuthContext";
export default function Header() {
	const { user, logout } = useAuthContext();
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
					{user ? (
						<>
							<li>
								<Link href="/events/add">
									<a href="">Add Event</a>
								</Link>
							</li>
							<li>
								<Link href="/account/dashboard">
									<a href="">Dashboard</a>
								</Link>
							</li>
							<li>
								<button
									className="btn-secondary btn-icon"
									onClick={() => {
										logout();
									}}
								>
									<FaSignOutAlt /> Logout{" "}
								</button>
							</li>
						</>
					) : (
						<li>
							<Link href="/account/login">
								<a className="btn-secondary btn-icon">
									<FaSignInAlt /> Login{" "}
								</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}
