import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/app">
						<h1>Welcome, this is the main app page</h1>
					</Route>
					<Route path="/about">
						<h1>About Us</h1>
						<div>
							<a href="https://github.com/taylor-b-02">GitHub</a>
						</div>
						<div>
							<a href="https://www.linkedin.com/in/taylor-barnabic-63892a20a/">
								LinkedIn
							</a>
						</div>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
