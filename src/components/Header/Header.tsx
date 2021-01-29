import { Container } from 'react-bootstrap';
import '../../index.css';

export default function Header(): JSX.Element {
	return (
		<div className='header'>
			<Container>
				<h2 className='logo'>
					<a href='/'>GitHub Jobs</a>
				</h2>
			</Container>
		</div>
	);
}
