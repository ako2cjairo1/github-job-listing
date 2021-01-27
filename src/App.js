import React, { useState } from 'react';
import { Container, Col } from 'react-bootstrap';

// Component
import Header from './components/Header';
import SearchJob from './components/SearchJob';
import Job from './components/Job';
import JobPagination from './components/JobPagination';
import Spinner from './components/Spinner';

import useFetchJobs from './useFetchJobs';

const paramInitState = {
	description: '',
	location: '',
	full_time: false,
};
export default function App() {
	const [params, setParams] = useState(paramInitState);
	const [page, setPage] = useState(1);
	let { jobs, isLoading, error, hasNextPage } = useFetchJobs(params, page);

	const [paramBuilder, setParamBuilder] = useState(paramInitState);
	const handleParamChange = (e) => {
		const param = e.target.name;
		const value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;

		setParamBuilder((prevParams) => ({ ...prevParams, [param]: value }));
	};

	const handleOnSearch = (e) => {
		e.preventDefault();

		setPage(1);
		setParams((prevParams) => ({ ...prevParams, ...paramBuilder }));
	};

	const jobsCount = jobs.length;

	const renderPagination = () => {
		jobsCount > 50 && (
			<JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
		);
	};

	return (
		<>
			<Header />
			<Container>
				<Col md='auto'>
					<SearchJob
						params={paramBuilder}
						onChangeParams={handleParamChange}
						onSearch={handleOnSearch}
					/>
					{isLoading && <Spinner />}
					{!isLoading && error && (
						<div style={{ textAlign: 'center' }}>
							<h3>Something went wrong!</h3>
							<p className='text-muted'>{error}</p>
						</div>
					)}
					{!isLoading && jobsCount > 0 ? (
						<>
							<h3 className='mb-2'>Showing {jobsCount} jobs</h3>
							{renderPagination()}
							{jobs.map(({ id, ...rest }) => (
								<Job key={id} {...rest} />
							))}
							{renderPagination()}
						</>
					) : (
						!isLoading &&
						!error && (
							<div style={{ textAlign: 'center' }}>
								<h3>Nothing found</h3>
							</div>
						)
					)}
				</Col>
			</Container>
		</>
	);
}
