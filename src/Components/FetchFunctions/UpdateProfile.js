import { UpdateProfileRoute, baseUserUrl } from "./Routes";

export const UpdateProfile = async (token, data) => {
	const url = baseUserUrl + UpdateProfileRoute;

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => data);

	return response;
};
