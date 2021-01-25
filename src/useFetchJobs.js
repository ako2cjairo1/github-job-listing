import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTION = {
	MAKE_REQUEST: 'jobs/make-request',
	GET_DATA: 'jobs/get-data',
	ERROR: 'jobs/error',
};

const BASE_URL =
	'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

const reducer = (state, { type, payload }) => {
	switch (type) {
		case ACTION.MAKE_REQUEST:
			return {
				isLoading: true,
				jobs: [],
			};
		case ACTION.GET_DATA:
			return {
				...state,
				isLoading: false,
				jobs: payload.jobs,
			};
		case ACTION.ERROR:
			return {
				...state,
				isLoading: false,
				jobs: [],
				error: payload.error,
			};
		default:
			return state;
	}
};

export default function useFetchJobs(params, page) {
	const initialState = { jobs: [], isLoading: true };
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const cancelToken = axios.CancelToken.source();
		dispatch({ type: ACTION.MAKE_REQUEST });
		axios
			.get(BASE_URL, {
				cancelToken: cancelToken.token,
				params: { markdown: true, page: page, ...params },
			})
			.then((response) => {
				dispatch({ type: ACTION.GET_DATA, payload: { jobs: response.data } });
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				dispatch({ type: ACTION.ERROR, payload: { error: e.message } });
			});

		return () => {
			cancelToken.cancel();
		};
	}, [params, page]);

	return state;
}
