import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './ServerButton.module.css';

function ServerButton({ serverName }) {
	return (
		<Link to={`/app/${serverName}`}>
			<div className={css['server-button']}>{serverName}</div>
		</Link>
	);
}

export default ServerButton;
