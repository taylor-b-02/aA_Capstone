import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { NavLink, Redirect } from 'react-router-dom';

import css from './HomePage.module.css';

function HomePage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (sessionUser) return <Redirect to="/app" />;

	return (
		<div id={css['container']}>
			<div id={css['upper-container']}>
				<h1 id={css['join-text']}>Join Discord Clone</h1>
				<p id={css['join-paragraph']}>
					...where you can belong to a school club, a gaming group, or
					a worldwide art community. Where just you and a handful of
					friends can spend time together. A place that makes it easy
					to talk every day and hang out more often.
				</p>
				<div id={css['button-container']}>
					<NavLink to="/login">
						<button
							id={css['white-button']}
							className={css['auth-button']}
						>
							Login
						</button>
					</NavLink>
					<NavLink to="/signup">
						<button
							id={css['black-button']}
							className={css['auth-button']}
						>
							Sign Up
						</button>
					</NavLink>
				</div>
			</div>
			<div id={css['lower-container']}>
				<h1 id={css['lower-text']}>Chat with your friends</h1>
				<p id={css['lower-paragraph']}>
					Discord servers are organized into topic-based channels
					where you can collaborate, share, and just talk about your
					day without clogging up a group chat.
				</p>
			</div>
		</div>
	);
}

export default HomePage;
