import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as serverActions from '../../store/server';
import * as channelActions from '../../store/channel';
import * as currentActions from '../../store/current';
import { Link } from 'react-router-dom';

import css from './ServerButton.module.css';

function ServerButton({ server }) {
	const dispatch = useDispatch();

	const currentServer = useSelector((state) => state.current.server);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		setIsActive(currentServer === server.id);
	}, [currentServer, server]);

	const handleClick = () => {
		dispatch(currentActions.setServer(server.id));
		dispatch(currentActions.setChannel(null));
		dispatch(channelActions.fetchChannelsThunk(server.id));
		return null;
	};

	const simplifyName = (name) => {
		const nameArr = name.split(' ');
		let shortName = '';
		nameArr.forEach((element) => {
			shortName += element[0];
		});
		return shortName;
	};

	return (
		// <Link to={`/app/${server.id}`}>
		// <div className={css['server-button']}>
		<div tabIndex='0'>
			<div
				className={css['server-button']}
				onClick={handleClick}
				title={server.name}
				tabIndex='0'
				style={
					isActive
						? {
								borderRadius: '35%',
								borderColor: 'white',
								borderWidth: '1px',
								borderStyle: 'solid',
								// boxSizing: 'border-box',
						  }
						: {}
				} // Ternary checks if server isActive, then returns conditional style if true, and nothing otherwise
			>
				{simplifyName(server.name)}
			</div>
		</div>
		// </Link>
	);
}

export default ServerButton;
