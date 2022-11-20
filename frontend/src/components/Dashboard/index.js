import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useParams,
	useHistory,
	Link,
	NavLink,
	Redirect,
} from 'react-router-dom';
import * as serverActions from '../../store/server';
import ServerButton from '../ServerButton';
import ChannelContainer from '../ChannelContainer';
import Chat from '../Chat';
import UserStatusBar from '../UserStatusBar';

import Modal from 'react-modal';

import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';

import css from './Dashboard.module.css';

function Dashboard() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	const servers = useSelector((state) => state.server);
	const currentServer = useSelector((state) => state.current.server);
	const currentChannel = useSelector((state) => state.current.channel);
	const serverName = useSelector(
		(state) => state.server[currentServer]
	)?.name;
	const channelName = useSelector(
		(state) => state.channel[currentChannel]
	)?.name;
	const serverObjCopy = Object.assign({}, servers);
	const serverArr = Object.values(serverObjCopy);

	const [modalIsOpen, setIsOpen] = useState(false);
	const [newName, setNewName] = useState('');

	useEffect(() => {
		(async () => {
			await dispatch(serverActions.fetchServersThunk());

			setIsLoaded(true);
		})();
	}, [dispatch, user?.id]);

	if (!user) {
		return <Redirect to='/' />;
	}

	const handleServerDelete = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await dispatch(serverActions.deleteServerThunk(currentServer));
	};

	const handleServerEdit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		openModal();
		// await dispatch(serverActions.editServerThunk(currentServer));
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await dispatch(sessionActions.logout());
		history.push('/');
	};

	const openModal = (e) => {
		// e.stopPropagation();
		setIsOpen(true);
	};

	const afterOpenModal = () => {
		// DO SOMETHING
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	Modal.setAppElement('#root');

	if (!isLoaded) {
		return null;
	}

	return (
		<div id={css.container}>
			<div id={css['server-sidebar']}>
				{serverArr.map((server) => {
					return (
						<ServerButton
							server={server}
							key={server.id}
							value={server.id}
						/>
					);
				})}
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					contentLabel='Channel Settings'
					shouldCloseOnOverlayClick={false} // Do NOT close the modal by clicking outside the content
					overlayClassName={css['channel-modal-overlay']}
					className={css['channel-modal-content']}
				>
					<div className={css['nav-container']}>
						<div className={css['sidebar']}>
							<div className={css['nav-tab']} tabIndex='0'>
								Overview
							</div>
							<div className={css['seperator']} />
							<div
								className={css['nav-delete']}
								onClick={(e) => {
									handleServerDelete(e);
									closeModal();
								}}
							>
								Delete Server
							</div>
						</div>
					</div>
					<div className={css['content-container']}>
						<div className={css['main-content']}>
							<div className={css['main-content-header']}>
								<h2>Overview</h2>
							</div>
							<div className={css['main-content-body']}>
								<div className={css['input-container']}>
									<h5 className={css['input-label']}>
										SERVER NAME
									</h5>
									<input
										type='text'
										maxLength='100'
										className={css['text-input']}
										placeholder={
											'Enter your new server name here'
										}
										onChange={(e) => {
											setNewName(e.target.value);
										}}
									/>
								</div>
							</div>
						</div>
						<div className={css['close-btn']}>
							<div
								className={css['circle-div']}
								onClick={async (e) => {
									closeModal();
									const cleanedName = newName.trim();
									await dispatch(
										serverActions.editServerThunk(
											currentServer,
											cleanedName
										)
									);
								}}
							>
								<svg width='18' height='18' viewBox='0 0 24 24'>
									<path
										fill='hsl(210, calc(var(--saturation-factor, 1) * 2.9%), 86.7%)'
										d='M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z'
									></path>
								</svg>
							</div>
							<div className={css['close-btn-label']}>ESC</div>
						</div>
					</div>
				</Modal>
				{/* <br /> */}
				<NavLink
					to='/app/create-server'
					className={css['create-server-button']}
				>
					<svg
						className={css['create-server-svg']}
						aria-hidden='false'
						width='24'
						height='24'
						viewBox='0 0 24 24'
					>
						<path
							fill='currentColor'
							d='M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z'
						></path>
					</svg>
				</NavLink>
				{currentServer && (
					<>
						<button
							onClick={handleServerEdit}
							className={css['server-edit-btn']}
						>
							Server Settings
						</button>
					</>
				)}
			</div>
			<div id={css['server-title']}>{serverName}</div>
			<div id={css['channel-sidebar']}>
				CHANNELS
				<ChannelContainer serverId={currentServer} />
				<button onClick={handleLogout}>LOGOUT</button>
				<UserStatusBar />
			</div>
			<div id={css['channel-title']}>{channelName}</div>
			<div id={css['message-container']}>
				<Chat />
			</div>
		</div>
	);
}

export default Dashboard;
