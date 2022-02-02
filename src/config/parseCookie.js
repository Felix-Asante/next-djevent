import cookie from "cookie";

export default function parseCookie(reqHeader) {
	const { token } = cookie.parse(reqHeader);
	return token;
}
