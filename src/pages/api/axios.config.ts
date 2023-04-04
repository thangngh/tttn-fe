import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Router from 'next/router';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
	exp: number;
}

const axiosConfig = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
})

axiosConfig.interceptors.request.use(
	(request: AxiosRequestConfig) => {
		const accessToken = localStorage.getItem('accessToken');
		// if (!accessToken) {
		// 	Router.push('/login');
		// 	throw new axios.Cancel('Request cancelled because token is empty');
		// }

		// const decodedToken = jwtDecode<DecodedToken>(accessToken);

		// if (decodedToken.exp * 1000 < Date.now()) {
		// 	Router.push('/login');
		// 	throw new axios.Cancel('Request cancelled because token is expired');
		// }
		const accessHeader = `Bearer ${accessToken}`;
		if (request.headers) {
			request.headers["Authorization"] = accessHeader;
		}
		return request as any;
	},
	(error: AxiosError) => {
		return Promise.reject(error.response?.data);
	}
);

axiosConfig.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error.response?.data);
	}
);

export default axiosConfig;