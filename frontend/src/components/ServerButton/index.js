import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './ServerButton.module.css';

function ServerButton({ server }) {
	return (
		<Link to={`/app/${server.id}`}>
			<div className={css['server-button']}>{server.name}</div>
		</Link>
	);
}

export default ServerButton;
