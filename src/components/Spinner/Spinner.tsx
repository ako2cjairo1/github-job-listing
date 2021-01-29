import './Spinner.css';

export default function Spinner(): JSX.Element {
	return (
		<div className='d-flex justify-content-center'>
			<div className='spinner'></div>
			<h3 className='ml-4 mt-4'>Loading...</h3>
		</div>
	);
}
