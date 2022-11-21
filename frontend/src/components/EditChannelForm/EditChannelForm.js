import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as channelActions from '../../store/channel';

import css from './EditChannel.module.css';

function EditChannelForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);

	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const userId = currentUser.id;
		dispatch(channelActions.editChannelThunk({ name, userId }));
		history.push('/app');
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Server Name</label>
			<input type='text' onChange={(e) => setName(e.target.value)} />
			<button type='submit'>Create</button>
		</form>
	);
}

export default EditChannelForm;
