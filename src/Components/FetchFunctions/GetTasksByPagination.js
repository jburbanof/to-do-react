import { baseTaskUrl } from "./Routes";

export const GetTasksByPagination = async (token, data) => {
	const url = `${baseTaskUrl}?limit=${data.limit}&skip=${data.skip}`;

	const response = await fetch(url, {
		method: "Get",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => {
		return res.json();
	});

	return response;
};
