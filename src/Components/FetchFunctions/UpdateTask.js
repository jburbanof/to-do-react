import { baseTaskUrl } from "./Routes";

export const UpdateTask = async (token, taskId, data) => {
	const url = `${baseTaskUrl}/${taskId}`;

	const response = await fetch(url, {
		method: "PUT",
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
