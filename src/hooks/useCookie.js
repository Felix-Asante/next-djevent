import cookie from "cookie";

export default function useCookie(reqHeader) {
	const { token } = cookie.parse(reqHeader);
	return token;
}
