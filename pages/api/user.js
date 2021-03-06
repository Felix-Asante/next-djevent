import { API_URL } from "src/config";
import parseCookie from "src/config/parseCookie";
export default async (req, res) => {
	if (req.method === "GET") {
		if (!req.headers.cookie) {
			res.status(403).json({ message: "Not Authorized" });
			return;
		}
		const token = parseCookie(req.headers.cookie);
		const strapiRes = await fetch(API_URL + "/users/me", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const user = await strapiRes.json();

		if (user) {
			res.status(200).json({ user });
		} else {
			res.status(403).json({ message: "User Forbidden" });
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
