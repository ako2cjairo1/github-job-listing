import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function JobPagination() {
	return (
		<Pagination>
			<Pagination.Prev />
			<Pagination.Item active='true'>1</Pagination.Item>
			<Pagination.Ellipsis />
			<Pagination.Next />
		</Pagination>
	);
}
