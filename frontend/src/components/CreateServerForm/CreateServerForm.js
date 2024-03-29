import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as serverActions from '../../store/server';
import * as channelActions from '../../store/channel';
import * as currentActions from '../../store/current';

import css from './CreateServer.module.css';

function CreateServerForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);

	const [name, setName] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name.length < 1 || name.length > 50) {
			console.log(name.length, name);
			setError(true);
			console.log(error);
			return;
		}
		const userId = currentUser.id;
		const cleanName = name.trim();
		const newServer = await dispatch(
			serverActions.createServerThunk({ name: cleanName, userId })
		);
		await dispatch(currentActions.setServer(newServer.id));
		await dispatch(currentActions.setChannel(null));
		await dispatch(channelActions.fetchChannelsThunk(newServer.id));
		history.push('/app');
	};

	return (
		<div className={css['container']}>
			<form onSubmit={handleSubmit} className={css['container']}>
				<label>Server Name</label>
				<input type='text' onChange={(e) => setName(e.target.value)} />
				{error && (
					<div style={{ color: 'red' }}>
						Server Name Must Be Between 1 and 50 characters
					</div>
				)}
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}

export default CreateServerForm;
