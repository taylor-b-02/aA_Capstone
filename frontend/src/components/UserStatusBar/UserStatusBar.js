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

import Modal from 'react-modal';
import { FaCog } from 'react-icons/fa';

import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';

import css from './UserStatusBar.module.css';

function UserStatusBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.session.user);

	const [modalIsOpen, setIsOpen] = useState(false);

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

	const handleLogout = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await dispatch(sessionActions.logout());
		history.push('/');
	};

	return (
		<div className={css['container']}>
			<div className={css['inner-container']}>
				<div className={css['profile-pic']}></div>
				<div className={css['text-container']}>
					<div className={css['username-text']}>{user.username}</div>
					<div className={css['id-text']}>
						#{`${user.id}`.padStart(4, '0')}
					</div>
				</div>
				<FaCog
					onClick={openModal}
					// value={channel.id}
					className={css['user-settings']}
				></FaCog>
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
								My Account
							</div>
							<div className={css['seperator']} />
							<div
								className={css['nav-delete']}
								onClick={(e) => {
									handleLogout(e);
									closeModal();
								}}
							>
								Logout
							</div>
						</div>
					</div>
					<div className={css['content-container']}>
						<div className={css['main-content']}>
							<div className={css['main-content-header']}>
								<h2>My Account</h2>
							</div>
							<div className={css['main-content-body']}>
								<div className={css['input-container']}>
									<h5 className={css['input-label']}>
										ACCOUNT NAME - NOT FUNCTIONING
									</h5>
									<input
										type='text'
										maxLength='100'
										className={css['text-input']}
										placeholder={
											'Enter your new account name here'
										}
										onChange={(e) => {
											// setNewName(e.target.value);
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
									// const cleanedName = newName.trim();
									// await dispatch(
									// 	channelActions.editChannelThunk(
									// 		// currentChannel,
									// 		cleanedName
									// 	)
									// );
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
			</div>
		</div>
	);
}

export default UserStatusBar;
