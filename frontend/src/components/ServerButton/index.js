import React from 'react';
import { useDispatch } from 'react-redux';
import * as serverActions from '../../store/server';
import * as channelActions from '../../store/channel';
import { Link } from 'react-router-dom';

import css from './ServerButton.module.css';

function ServerButton({ server, setCurrent }) {
	const dispatch = useDispatch();

	const handleClick = () => {
		// setCurrent(server.id);
		dispatch(serverActions.setCurrent(server.id));
		dispatch(channelActions.fetchChannelsThunk(server.id));
		return null;
	};

	const simplifyName = (name) => {
		return name[0];
	};

	return (
		<Link to={`/app/${server.id}`}>
			<div
				className={css['server-button']}
				onClick={handleClick}
				title={server.name}
			>
				{simplifyName(server.name)}
			</div>
		</Link>
	);
}

export default ServerButton;
