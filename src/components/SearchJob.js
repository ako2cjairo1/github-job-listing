import React from 'react';
import { Col, Form } from 'react-bootstrap';

export default function SearchJob() {
	return (
		<Form className='mb-4'>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control
						type='text'
						name='description'
						placeholder='Description here...'
					/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Control
						type='text'
						name='location'
						placeholder='Location here...'
					/>
				</Form.Group>
				<Form.Group as={Col} xs='auto' className='ml-2'>
					<Form.Check type='checkbox' label='Only Full Time' className='mt-2' />
				</Form.Group>
			</Form.Row>
		</Form>
	);
}
