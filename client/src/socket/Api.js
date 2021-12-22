import axios from 'axios';

const Api = () => {
	let data = {
		baseURL: "http://localhost:1337",
		headers: {
			"Content-Type": "application/json",
		},
	};

	return axios.create(data);
};

export default Api;