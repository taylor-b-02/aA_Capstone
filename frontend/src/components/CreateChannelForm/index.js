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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const serverId = currentServer.id;
		// dispatch(channelActions.createChannelThunk({ name, serverId: 11 }));
		await dispatch(channelActions.createChannelThunk({ name, serverId }));
		await dispatch(serverActions.setCurrent(serverId));
		// history.push(`/app/${11}`);
		history.push(`/app/${serverId}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Channel Name</label>
			<input type="text" onChange={(e) => setName(e.target.value)} />
			<button type="submit">Create</button>
		</form>
	);
}

export default CreateChannelForm;
