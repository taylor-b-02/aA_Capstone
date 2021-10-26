import React from 'react';
import { useDispatch } from 'react-redux';
import * as serverActions from '../../store/server';
import { Link } from 'react-router-dom';

import css from './ServerButton.module.css';

function ServerButton({ server }) {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(serverActions.setCurrent(server.id));
		return null;
	};

	return (
		<Link to={`/app/${server.id}`}>
			<div className={css['server-button']} onClick={handleClick}>
				{server.name}
			</div>
		</Link>
	);
}

export default ServerButton;
