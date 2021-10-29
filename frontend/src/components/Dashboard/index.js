import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
import * as serverActions from '../../store/server';
import ServerButton from '../ServerButton';
import ChannelContainer from '../ChannelContainer';
import Chat from '../Chat';

import * as channelActions from '../../store/channel';

import css from './Dashboard.module.css';

function Dashboard() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	const servers = useSelector((state) => state.server);
	const currentServer = useSelector((state) => state.server['currentServer']);
	const serverObjCopy = Object.assign({}, servers);
	delete serverObjCopy['currentServer'];
	const serverArr = Object.values(serverObjCopy);

	const [currentChannel, setCurrentChannel] = useState(null);

	useEffect(() => {
		(async () => {
			await dispatch(serverActions.fetchServersThunk());

			setIsLoaded(true);
		})();
	}, [dispatch, user.id]);

	useEffect(() => {
		console.log('CURRENT CHANNEL CHANGED', currentChannel);
	}, [currentChannel]);

	const handleServerDelete = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await dispatch(serverActions.deleteServerThunk(currentServer.id));
	};

	const handleServerEdit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		// await dispatch(serverActions.editServerThunk(currentServer.id));
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
						/>
					);
				})}
				<br />
				<NavLink to="/app/create-server">Create a Server</NavLink>
				{currentServer && (
					<>
						<button onClick={handleServerDelete}>
							Delete Server
						</button>
						<button onClick={handleServerEdit}>Edit Server</button>
					</>
				)}
			</div>
			<div id={css['channel-sidebar']}>
				Channels Go Here
				<ChannelContainer
					serverId={currentServer?.id}
					setChannel={setCurrentChannel}
					channel={currentChannel}
				/>
			</div>
			<div id={css['message-container']}>
				Messages Go Here <Chat channel={currentChannel} />
			</div>
		</div>
	);
}

export default Dashboard;
