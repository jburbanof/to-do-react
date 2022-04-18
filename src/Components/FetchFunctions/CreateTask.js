import { baseTaskUrl } from "./Routes";

export const CreateTask = async (token, data) => {
	const url = baseTaskUrl;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	}).then((res) => {
		return res.json();
	});

	return response;
};
