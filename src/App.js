import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

// Component
import SearchJob from './components/SearchJob';
import Job from './components/Job';
import JobPagination from './components/JobPagination';
import Spinner from './components/Spinner';

import useFetchJobs from './useFetchJobs';

export default function App() {
	const [params, setParams] = useState({});
	const [page, setPage] = useState(1);
	const { jobs, isLoading, error } = useFetchJobs(params, page);

	return (
		<Container>
			<h1 className='mb-4'>GitHub Jobs</h1>
			<SearchJob />
			{isLoading && <Spinner />}
			{!isLoading && error && (
				<h3 style={{ textAlign: 'center' }}>
					Something went wrong. Try refreshing the page.
				</h3>
			)}
			{!isLoading && jobs?.length > 0 && (
				<>
					<JobPagination />
					{jobs.map(({ id, ...rest }) => (
						<Job key={id} {...rest} />
					))}
				</>
			)}
		</Container>
	);
}
