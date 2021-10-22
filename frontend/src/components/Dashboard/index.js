import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as serverActions from '../../store/server';
import { fetchServersThunk } from '../../store/server';
import css from './Dashboard.module.css';

function Dashboard() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const servers = useSelector((state) => state.server);
	const serverArr = Object.values(servers);

	console.log('Servers', servers);
	console.log('ServerArr', serverArr);

	useEffect(() => {
		console.log('INSIDE USE EFFECT');
		(async () => {
			await dispatch(serverActions.fetchServersThunk());
			console.log('INSIDE USE II');
			// await dispatch(fetchServersThunk());
			console.log('ALREADY THUNKED');
			setIsLoaded(true);
		})();
	}, [dispatch]);

	if (!isLoaded) {
		return null;
	}

	return (
		<div id={css.container}>
			<div id={css['top-header']}>Discord</div>
			<div id={css['server-sidebar']}>
				Servers Go Here
				{serverArr.map((server, idx) => {
					return <div key={idx}>{server.name}</div>;
				})}
				<Link to="/app/create-server">Create a Server</Link>
			</div>
			<div id={css['channel-sidebar']}>Channels Go Here</div>
			<div id={css['message-container']}>Messages Go Here</div>
		</div>
	);
}

export default Dashboard;
