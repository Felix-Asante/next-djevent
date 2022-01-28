import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";
import Showcase from "@/modules/homePage/Showcase";
export default function Layout({ title, keywords, children, description }) {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keyword" content={keywords} />
			</Head>
			<Header />
			{router.pathname === "/" && <Showcase />}
			<div className={styles.container}>{children}</div>
			<Footer />
		</div>
	);
}

Layout.defaultProps = {
	title: "DJ Events | Find he hottest parties",
	description: "Find the latest DJ and other musical events",
	keywords: "music dj, edm, event",
};
