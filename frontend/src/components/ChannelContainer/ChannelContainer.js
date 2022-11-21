import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import Modal from 'react-modal';
import { FaCog, FaHashtag } from 'react-icons/fa';

import * as channelActions from '../../store/channel';

import css from './ChannelContainer.module.css';
import ChannelButton from '../ChannelButton';

function ChannelContainer({ serverId }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const channels = useSelector((state) => state.channel);
	const currentServer = useSelector((state) => state.current.server);
	const currentChannel = useSelector((state) => state.current.channel);

	const channelObjCopy = Object.assign({}, channels);
	const channelArr = Object.values(channelObjCopy);

	// ! Examine whether this is necessary in the future
	const filteredArr = channelArr.filter((channel) => {
		return channel.serverId === serverId;
	});

	const [modalIsOpen, setIsOpen] = useState(false);
	const [newName, setNewName] = useState('');

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

	const handleDelete = async (e) => {
		e.preventDefault();
		dispatch(channelActions.deleteChannelThunk(currentChannel));
	};

	Modal.setAppElement('#root');

	return (
		<div className={css['inner-channel-container']}>
			{filteredArr.map((channel) => {
				return (
					<ChannelButton
						channel={channel}
						key={channel.id}
						value={channel.id}
						openModal={openModal}
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
								handleDelete(e);
								closeModal();
							}}
						>
							Delete Channel
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
									CHANNEL NAME
								</h5>
								<input
									type='text'
									maxLength='100'
									className={css['text-input']}
									placeholder={
										'Enter your new channel name here'
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
									channelActions.editChannelThunk(
										currentChannel,
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
		</div>
	);
}

export default ChannelContainer;
