import { RegisterUserRoute, baseUserUrl } from './Routes';

export const RegisterUser = async (data) => {
	const url = baseUserUrl + RegisterUserRoute;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(res => {
			return res.json();
		})
		.then(data => data);

	return response;
};
