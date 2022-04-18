import { baseTaskUrl } from "./Routes";

export const GetAllTasks = async (token) => {
	const url = baseTaskUrl;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => {
		return res.json();
	});

	return response;
};
