import React, { useEffect } from 'react';

import * as css from './Message.module.css';

function Message({ message }) {
	useEffect(() => {
		const userPic = new Image();
		userPic.src = message?.user?.profilePicture;
	}, []);

	const picURL = message ? message.user.profilePicture : '';

	const dateSent = (() => {
		let dateObj = new Date(message?.createdAt);
		let date =
			dateObj.getMonth() +
			1 +
			'/' +
			dateObj.getDate() +
			'/' +
			dateObj.getFullYear() +
			' ' +
			dateObj.toLocaleTimeString();
		date =
			date.substring(0, date.length - 6) +
			' ' +
			date.substring(date.length - 2);
		return date;
	})();

	return (
		<>
			{message && (
				<div className={css['container']}>
					<div className={css['pfp']}>
						<img
							className={css['pfp-image']}
							src={picURL}
							alt={'Profile Pic'}
						/>
					</div>
					<div className={css['right-container']}>
						<div className={css['name-container']}>
							<div className={css['username']}>
								{message.user.username}
							</div>
							{/* <div className={css['date']}>Today at 12:07 AM</div> */}
							<div className={css['date']}>{dateSent}</div>
						</div>
						<div className={css['message']}>{message.message}</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Message;
