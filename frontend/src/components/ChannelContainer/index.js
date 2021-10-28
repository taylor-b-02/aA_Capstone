import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import * as channelActions from '../../store/channel';

import css from './ChannelContainer.module.css';

function ChannelContainer({ serverId, setChannel, channel }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const channels = useSelector((state) => state.channel);
	const currentServer = useSelector((state) => state.server.currentServer);
	const channelArr = Object.values(channels);

	const filteredArr = channelArr.filter((channel) => {
		return channel.serverId === serverId;
	});

	const handleEdit = async (e) => {
		e.preventDefault();
		console.log('e', e.target.value);
		history.push('/app/edit-channel');
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		// const parentDiv = e.target.parentNode;
		dispatch(channelActions.deleteChannelThunk(e.target.value));
		// return parentDiv.remove();
	};

	return (
		<div>
			{filteredArr.map((channel) => {
				return (
					<div
						key={channel.id}
						value={channel.id}
						style={{ color: 'red' }}
						onClick={() => {
							console.log('CHANNEL ID', channel.id);
							setChannel(channel.id);
						}}
					>
						{`#${channel.name}`}
						<button onClick={handleEdit} value={channel.id}>
							Edit
						</button>
						<button onClick={handleDelete} value={channel.id}>
							Delete
						</button>
					</div>
				);
			})}
			<br />
			<br />
			<br />
			<Link to="/app/create-channel">Create a Channel</Link>
		</div>
	);
}

export default ChannelContainer;
