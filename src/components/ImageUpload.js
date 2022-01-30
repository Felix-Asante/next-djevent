import React, { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
export default function ImageUpload({
	evtId,
	imageUploaded,
	sending,
	setSending,
}) {
	const [image, setImage] = useState(null);
	// send image to server
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("files", image);
		formData.append("ref", "api::event.event");
		formData.append("refId", evtId);
		formData.append("field", "image");
		setSending(true);
		const res = await fetch(`${API_URL}/upload`, {
			method: "POST",
			body: formData,
		});

		if (res.ok) {
			imageUploaded();
		}
	};
	// handle file change
	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};
	return (
		<div className={styles.form}>
			<h1>Upload Event Image</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.file}>
					<input type="file" onChange={handleFileChange} />
				</div>
				{!sending && <input type="submit" value="Upload" className="btn" />}
				{sending && <p>Sending.....</p>}
			</form>
		</div>
	);
}
