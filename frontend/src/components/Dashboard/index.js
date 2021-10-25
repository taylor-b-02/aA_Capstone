import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as serverActions from '../../store/server';
import ServerButton from '../ServerButton';

import css from './Dashboard.module.css';

function Dashboard() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const servers = useSelector((state) => state.server);
	const user = useSelector((state) => state.session.user);
	const serverArr = Object.values(servers);

	useEffect(() => {
		(async () => {
			await dispatch(serverActions.fetchServersThunk(user.id));
			setIsLoaded(true);
		})();
	}, [dispatch, user.id]);

	if (!isLoaded) {
		return null;
	}

	return (
		<div id={css.container}>
			<div id={css['top-header']}>Discord</div>
			<div id={css['server-sidebar']}>
				{serverArr.map((server) => {
					return <ServerButton server={server} key={server.id} />;
				})}
				<br />
				<br />
				<br />
				<Link to="/app/create-server">Create a Server</Link>
			</div>
			<div id={css['channel-sidebar']}>Channels Go Here</div>
			<div id={css['message-container']}>Messages Go Here</div>
		</div>
	);
}

export default Dashboard;
