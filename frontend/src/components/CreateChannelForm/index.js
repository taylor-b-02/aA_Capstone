import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as serverActions from '../../store/server';
import * as channelActions from '../../store/channel';

import css from './CreateChannelForm.module.css';

function CreateChannelForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentServer = useSelector((state) => state.server.currentServer);
	const [name, setName] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name.length < 1 || name.length > 50) {
			console.log(name.length, name);
			setError(true);
			return;
		}
		const serverId = currentServer.id;
		await dispatch(channelActions.createChannelThunk({ name, serverId }));
		await dispatch(serverActions.setCurrent(serverId));
		history.push(`/app/${serverId}`);
	};

	return (
		<div className={css['container']}>
			<form onSubmit={handleSubmit} className={css['container']}>
				<label>Channel Name</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				{error && (
					<div style={{ color: 'red' }}>
						Server Name Must Be Between 1 and 30 characters
					</div>
				)}
				<button type="submit">Create</button>
			</form>
		</div>
	);
}

export default CreateChannelForm;
