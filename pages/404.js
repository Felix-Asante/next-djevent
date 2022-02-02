import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
export default function ErrorPage() {
	return (
		<Layout title="Page Not Found">
			<div className="error">
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<h4>Sorry there&apos;s nothing here</h4>
				<Link href="/">Go back home</Link>
			</div>
		</Layout>
	);
}
