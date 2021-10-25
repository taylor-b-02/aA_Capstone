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
					Blah blah blah blah blah blah Blah blah blah blah blah blah
					Blah blah blah blah blah blah Blah blah blah blah blah blah
					Blah blah blah blah blah blah
				</p>
				<div id={css['button-container']}>
					<NavLink to="/login">
						<button id={css['white-button']}>Login</button>
					</NavLink>
					<NavLink to="/signup">
						<button id={css['black-button']}>Sign Up</button>
					</NavLink>
				</div>
			</div>
			<div id={css['lower-container']}>
				<h1 id={css['lower-text']}>Chat with your friends</h1>
				<p id={css['lower-paragraph']}>
					Blah blah blah blah blah blah Blah blah blah blah blah blah
					Blah blah blah blah blah blah Blah blah blah blah blah blah
					Blah blah blah blah blah blah
				</p>
			</div>
		</div>
	);
}

export default HomePage;
