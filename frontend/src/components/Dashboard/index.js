import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
import css from './Dashboard.module.css';

function Dashboard() {
	return (
		<div id={css.container}>
			<div id={css['top-header']}>Discord</div>
			<div id={css['server-sidebar']}>
				Servers Go Here
				<Link to="/app/create-server">Create a Server</Link>
			</div>
			<div id={css['channel-sidebar']}>Channels Go Here</div>
			<div id={css['message-container']}>Messages Go Here</div>
		</div>
	);
}

export default Dashboard;
