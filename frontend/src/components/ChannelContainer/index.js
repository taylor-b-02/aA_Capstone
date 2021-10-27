import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import * as channelActions from '../../store/channel';

import css from './ChannelContainer.module.css';

function ChannelContainer({ serverId }) {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const channels = useSelector((state) => state.channel);
	const currentServer = useSelector((state) => state.server.currentServer);
	const channelArr = Object.values(channels);

	console.log('CHANNEL ARR', channelArr);
	return (
		<div>
			{channelArr.map((channel) => {
				return <div key={channel.id}>{`#${channel.name}`}</div>;
			})}
			<br />
			<br />
			<br />
			<Link to="/app/create-channel">Create a Channel</Link>
		</div>
	);
}

export default ChannelContainer;
