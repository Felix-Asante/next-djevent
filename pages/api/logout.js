import cookie from "cookie";
import { cookieOptions } from "./login";
export default async (req, res) => {
	console.log(new Date(0));
	if (req.method === "POST") {
		// DESTROY COOKIE
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", " ", { ...cookieOptions, expires: new Date(0) })
		);
		res.status(200).json({ message: "success" });
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
