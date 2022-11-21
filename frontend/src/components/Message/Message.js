import React from 'react';

import * as css from './Message.module.css';

function Message({ message }) {
	return (
		<div className={css['container']}>
			<div className={css['pfp']}>
				<img
					className={css['pfp-image']}
					src='https://cdn.discordapp.com/avatars/171288493224361984/816ef4b143217ad0a27b6cbc5c9012eb.webp?size=80'
				/>
			</div>
			<div className={css['right-container']}>
				<div className={css['name-container']}>
					<div className={css['username']}>TaylorB</div>
					<div className={css['date']}>Today at 12:07 AM</div>
				</div>
				<div className={css['message']}>Example Message!</div>
			</div>
		</div>
	);
}

export default Message;
