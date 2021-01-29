import { useReducer, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

// Type
import { JobState, SearchCriteria } from './types';

enum ACTION {
	MAKE_REQUEST = 'jobs/make-request',
	GET_DATA = 'jobs/get-data',
	ERROR = 'jobs/error',
	UPDATE_HAS_NEXT_PAGE = 'jobs/update-has-next-page',
}

type ActionType = {
	type: ACTION;
	payload?: any;
};

const BASE_URL =
	'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

const reducer = (state: JobState, { type, payload }: ActionType): JobState => {
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
		case ACTION.UPDATE_HAS_NEXT_PAGE:
			return {
				...state,
				hasNextPage: payload.hasNextPage,
			};
		default:
			return state;
	}
};

export default function useFetchJobs(params: SearchCriteria, page: number) {
	const initialState: JobState = { jobs: [], isLoading: true };
	const [state, dispatch] = useReducer<
		(state: JobState, { type, payload }: ActionType) => JobState
	>(reducer, initialState);

	useEffect(() => {
		const cancelTokenGetData: CancelTokenSource = axios.CancelToken.source();
		let cancelTokenUpdateHasNextPage: CancelTokenSource;

		dispatch({ type: ACTION.MAKE_REQUEST });
		axios
			.get(BASE_URL, {
				cancelToken: cancelTokenGetData.token,
				params: { markdown: true, page: page, ...params },
			})
			.then((response) => {
				dispatch({ type: ACTION.GET_DATA, payload: { jobs: response.data } });

				cancelTokenUpdateHasNextPage = axios.CancelToken.source();
				axios
					.get(BASE_URL, {
						cancelToken: cancelTokenUpdateHasNextPage.token,
						params: { markdown: true, page: page + 1, ...params },
					})
					.then((response) => {
						dispatch({
							type: ACTION.UPDATE_HAS_NEXT_PAGE,
							payload: { hasNextPage: response.data.length > 0 },
						});
					})
					.catch((e) => {
						if (axios.isCancel(e)) return;
						dispatch({
							type: ACTION.ERROR,
							payload: { error: e?.response?.statusText },
						});
					});
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				dispatch({
					type: ACTION.ERROR,
					payload: { error: e?.response?.statusText },
				});
			});

		return () => {
			cancelTokenGetData.cancel();
			cancelTokenUpdateHasNextPage?.cancel();
		};
	}, [params, page]);

	return state;
}
