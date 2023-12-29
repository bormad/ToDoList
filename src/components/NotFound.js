import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		<div>
			NotFound{' '}
			<Link to='/'>
				<button>Вернуться на главную</button>
			</Link>
		</div>
	);
};
