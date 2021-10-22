import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as serverActions from '../../store/server';

import css from './CreateServer.module.css';

function CreateServerForm() {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const userId = 1;
		dispatch(serverActions.createServerThunk({ name, userId }));
		// return <Redirect to="/app" />;
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Server Name</label>
			<input type="text" onChange={(e) => setName(e.target.value)} />
			<button type="submit">Create</button>
		</form>
	);
}

export default CreateServerForm;
