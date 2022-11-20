import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as currentActions from '../../store/current';

import { FaCog, FaHashtag } from 'react-icons/fa';
import css from './ChannelButton.module.css';

function ChannelButton({ channel, setChannel, openModal, currChannel }) {
	const dispatch = useDispatch();
	const currentChannel = useSelector((state) => state.current.channel);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		setIsActive(currentChannel === channel.id);
	}, [currentChannel, channel]);

	const handleClick = () => {
		console.log('CHANNEL ID', channel.id); //! REMOVE
		setChannel(channel.id);

		dispatch(currentActions.setChannel(channel.id));
	};

	return (
		<>
			<div
				className={isActive ? css['channel-focused'] : css['channel']}
				onClick={handleClick}
				tabIndex='0'
			>
				<FaHashtag className={css['channel-tag']} />
				<div
					className={css['channel-name-container']}
					tabIndex='0'
				>{`${channel.name}`}</div>
				<FaCog
					onClick={openModal}
					value={channel.id}
					className={css['channel-settings']}
				></FaCog>
			</div>
		</>
	);
}

export default ChannelButton;
