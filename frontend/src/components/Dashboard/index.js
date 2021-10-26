import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import * as serverActions from '../../store/server';
import ServerButton from '../ServerButton';
import ChannelContainer from '../ChannelContainer';

import * as channelActions from '../../store/channel';

import css from './Dashboard.module.css';

function Dashboard() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	const servers = useSelector((state) => state.server);
	const currentServer = useSelector((state) => state.server['currentServer']);
	// const currentServer = servers['currentServer'];
	// delete servers['currentServer'];
	const serverArr = Object.values(servers);

	useEffect(() => {
		(async () => {
			await dispatch(serverActions.fetchServersThunk(user.id));

			setIsLoaded(true);
		})();
	}, [dispatch, user.id]);

	const loadChannels = async (id) => {
		console.log('IN ONCLICK METHOD');
		// await dispatch(channelActions.fetchChannelsThunk(e.target.value));
		await dispatch(channelActions.fetchChannelsThunk(id));
		console.log('IN ONCLICK METHOD --- AFTER DISPATCH');
	};

	if (!isLoaded) {
		return null;
	}

	return (
		<div id={css.container}>
			<div id={css['top-header']}>Discord</div>
			<div id={css['server-sidebar']}>
				{serverArr.map((server) => {
					return (
						<ServerButton
							server={server}
							key={server.id}
							value={server.id}
							onClick={loadChannels(server.id)}
						/>
					);
				})}
				<br />
				<br />
				<br />
				<Link to="/app/create-server">Create a Server</Link>
			</div>
			<div id={css['channel-sidebar']}>
				Channels Go Here
				<ChannelContainer serverId={currentServer?.id} />
			</div>
			<div id={css['message-container']}>Messages Go Here</div>
		</div>
	);
}

export default Dashboard;
