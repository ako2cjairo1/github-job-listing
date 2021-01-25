import React, { useState } from 'react';
import { Badge, Button, Card, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function Job({
	company,
	company_logo,
	description,
	location,
	title,
	type,
	created_at,
	how_to_apply,
}) {
	const [toggleDescription, setToggleDescription] = useState(false);

	return (
		<Card className='mb-3'>
			<Card.Body>
				<div className='d-flex justify-content-between'>
					<div>
						<Card.Title>
							{title} -
							<span className='text-muted font-weight-light'>{company}</span>
						</Card.Title>
						<Card.Subtitle className='text-muted mb-2'>
							{new Date(created_at).toLocaleDateString()}
						</Card.Subtitle>
						<Badge variant='secondary' className='mr-2'>
							{type}
						</Badge>
						<Badge variant='secondary'>{location}</Badge>
						<div className='mt-2' style={{ wordBreak: 'break-all' }}>
							<ReactMarkdown source={how_to_apply} />
						</div>
					</div>
					{company_logo && (
						<img
							src={company_logo}
							alt={company}
							className='d-none d-md-block'
							height='50'
						/>
					)}
				</div>
				<Card.Text>
					<Button
						variant='primary'
						onClick={() => setToggleDescription((prev) => !prev)}>
						{toggleDescription ? 'Hide Details' : 'More Details'}
					</Button>
				</Card.Text>
				<Collapse in={toggleDescription}>
					<div className='mt-4'>
						<ReactMarkdown source={description} />
					</div>
				</Collapse>
			</Card.Body>
		</Card>
	);
}
