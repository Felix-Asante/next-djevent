import { useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/search.module.css";
import { SEARCH_EVENT } from "@/config/ApiRoutes";
export default function Search() {
	const termRef = useRef();
	const router = useRouter();
	const [error, setError] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		const term = termRef?.current?.value;

		if (!term || term === " ") {
			setError(true);
			return;
		}
		router.push(SEARCH_EVENT + term);
	};

	return (
		<div className={styles.search}>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					ref={termRef}
					placeholder="Search events"
					className={error ? styles.danger : " "}
					onFocus={() => setError(false)}
				/>
			</form>
		</div>
	);
}
