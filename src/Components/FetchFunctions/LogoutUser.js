import { LogoutUserRoute, baseUserUrl } from "./Routes";

export const LogoutUser = async (token) => {
	const url = baseUserUrl + LogoutUserRoute;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		
	}).then((res) => {
		return res.json();
	});

	return response;
};
