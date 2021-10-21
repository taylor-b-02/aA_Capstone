import React, { useState } from 'react';
import css from './CreateServer.module.css';

function CreateServerForm() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Server Name</label>
			<input type="text" />
			<button type="submit">Create</button>
		</form>
	);
}

export default CreateServerForm;
