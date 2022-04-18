import { LoginUserRoute, baseUserUrl } from "./Routes";

export const LoginUser = async (data) => {
	const url = baseUserUrl + LoginUserRoute;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => {
		return res.json();
	});

	return response;
};
