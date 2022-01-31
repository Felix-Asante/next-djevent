import { API_URL } from "src/config";
import cookie from "cookie";
export const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV !== "development",
	maxAge: 60 * 60 * 24 * 30,
	sameSite: "strict",
	path: "/",
};
export default async (req, res) => {
	if (req.method === "POST") {
		const { identifier, password } = JSON.parse(req.body);
		const user = { identifier, password };

		const strapiRes = await fetch(API_URL + "/auth/local", {
			method: "POST",
			header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			body: new URLSearchParams(user),
		});
		const strapiData = await strapiRes.json();

		if (strapiData?.user) {
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", strapiData.jwt, cookieOptions)
			);

			res.status(200).json({ user: strapiData?.user });
		} else {
			res
				.status(strapiData?.error?.status)
				.json({ message: strapiData?.error?.message });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
