import { baseTaskUrl } from "./Routes";

export const DeleteTask = async (token, taskId) => {
	const url = `${baseTaskUrl}/${taskId}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => {
		return res.json();
	});

	return response;
};
