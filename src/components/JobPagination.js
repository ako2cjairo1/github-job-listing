import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function JobPagination({ page, setPage, hasNextPage }) {
	const offsetPage = (amount) => setPage((prevPage) => prevPage + amount);
	return (
		<Pagination size='sm'>
			{page !== 1 && <Pagination.Prev onClick={() => offsetPage(-1)} />}
			{page !== 1 && (
				<Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
			)}
			{page > 3 && <Pagination.Ellipsis />}
			{page > 3 && (
				<Pagination.Item onClick={() => offsetPage(-1)}>
					{page - 1}
				</Pagination.Item>
			)}
			<Pagination.Item active>{page}</Pagination.Item>
			{hasNextPage && (
				<Pagination.Item onClick={() => offsetPage(1)}>
					{page + 1}
				</Pagination.Item>
			)}
			{hasNextPage && <Pagination.Next onClick={() => offsetPage(1)} />}
		</Pagination>
	);
}
