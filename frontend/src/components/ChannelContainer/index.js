import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import Modal from 'react-modal';

import * as channelActions from '../../store/channel';

import css from './ChannelContainer.module.css';

function ChannelContainer({ serverId, setChannel, channel }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const channels = useSelector((state) => state.channel);
	const currentServer = useSelector((state) => state.server.currentServer);
	const channelArr = Object.values(channels);

	const filteredArr = channelArr.filter((channel) => {
		return channel.serverId === serverId;
	});

	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = (e) => {
		e.stopPropagation();
		setIsOpen(true);
	};

	const afterOpenModal = () => {
		// DO SOMETHING
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleEdit = async (e) => {
		e.preventDefault();
		console.log('e', e.target.value);
		history.push('/app/edit-channel');
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		// const parentDiv = e.target.parentNode;

		console.log(e.target.value);
		dispatch(channelActions.deleteChannelThunk(e.target.value));
		// return parentDiv.remove();
	};

	Modal.setAppElement('#root');

	return (
		<div>
			{filteredArr.map((channel) => {
				return (
					<>
						<div
							key={channel.id}
							value={channel.id}
							style={{ color: 'red' }}
							onClick={() => {
								console.log('CHANNEL ID', channel.id);
								setChannel(channel.id);
							}}
						>
							{`#${channel.name}`}
							<button onClick={handleEdit} value={channel.id}>
								Edit
							</button>
							<button onClick={handleDelete} value={channel.id}>
								Delete
							</button>
							<button onClick={openModal} value={channel.id}>
								Settings Icon Here
							</button>
						</div>
					</>
				);
			})}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Channel Settings"
				shouldCloseOnOverlayClick={false} // Do NOT close the modal by clicking outside the content
				overlayClassName={css['channel-modal-overlay']}
				className={css['channel-modal-content']}
			>
				<div className={css['nav-container']}>
					<div className={css['sidebar']}>
						<div className={css['nav-tab']} tabindex="0">
							Overview
						</div>
						<div className={css['seperator']} />
						<div className={css['nav-delete']}>Delete Channel</div>
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
									CHANNEL NAME
								</h5>
								<input
									type="text"
									maxlength="100"
									className={css['text-input']}
									placeholder={
										'Enter your new channel name here'
									}
								/>
							</div>
						</div>
					</div>
					<div className={css['close-btn']}>
						<div className={css['circle-div']} onClick={closeModal}>
							<svg width="18" height="18" viewBox="0 0 24 24">
								<path
									fill="hsl(210, calc(var(--saturation-factor, 1) * 2.9%), 86.7%)"
									d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
								></path>
							</svg>
						</div>
						<div className={css['close-btn-label']}>ESC</div>
					</div>
				</div>
			</Modal>
			<br />
			<br />
			<br />
			<Link to="/app/create-channel">Create a Channel</Link>
		</div>
	);
}

export default ChannelContainer;
