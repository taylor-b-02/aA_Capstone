import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CreateServerForm from './components/CreateServerForm';
import HomePage from './components/HomePage';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Navigation isLoaded={isLoaded} />
						<HomePage />
					</Route>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
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
					<Route exact path="/app/create-server">
						<h1>Create a Server</h1>
						<CreateServerForm />
					</Route>
					<Route path="/app">
						<Dashboard />
					</Route>
					<Route path="/app/create-channel">
						<h1>Create a Server</h1>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
