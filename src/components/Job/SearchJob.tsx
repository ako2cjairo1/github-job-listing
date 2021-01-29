import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';

// Type
import { SearchJobProps } from '../../types';

export default function SearchJob({
	params: { location, description, full_time },
	onChangeParams,
	onSearch,
}: SearchJobProps): JSX.Element {
	return (
		<Form className='mb-4' onSubmit={onSearch}>
			<Form.Row className='align-items-end'>
				<Form.Group as={Col}>
					<Form.Label className='font-weight-bold'>Job Description</Form.Label>
					<Form.Control
						type='text'
						name='description'
						value={description}
						onChange={onChangeParams}
						placeholder='Filter by title, benefits, companies, expertise'
						size='sm'
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label className='font-weight-bold'>Location</Form.Label>
					<Form.Control
						type='text'
						name='location'
						value={location}
						onChange={onChangeParams}
						placeholder='Filter by city, state, zip code or country'
						size='sm'
					/>
				</Form.Group>
				<Form.Group as={Col} xs='auto' className='ml-2'>
					<Form.Check
						type='checkbox'
						name='full_time'
						checked={full_time === 'Full Time' ? true : false}
						onChange={onChangeParams}
						label='Full Time Only'
						className='mb-1'
					/>
				</Form.Group>
				<Form.Group as={Col} xs='auto' className='ml-2'>
					<Button as='input' type='submit' value='Search' size='sm' />
				</Form.Group>
			</Form.Row>
		</Form>
	);
}
