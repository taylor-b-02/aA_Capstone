import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useHistory, Link } from 'react-router-dom';

import * as serverActions from '../../store/server';
import * as channelActions from '../../store/channel';
import { loadMessages, addMessage } from '../../store/message';

import css from './Chat.module.css';

let socket;

function Chat({ channel }) {
	const dispatch = useDispatch();
	const [messages, setMessages] = useState([]);
	const [messageInput, setMessageInput] = useState('');
	const [warning, setWarning] = useState('');
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		const { username } = user;

		if (channel) {
			//! SET UP CONDITIONAL FOR NO CHANNEL/NOT CONNECTED

			// Create websocket/connet
			//!PASS IN SERVER(HEROKU LIVE LINK) URL TO IO()
			let socketUrl;
			if (process.env.NODE_ENV === 'production') {
				console.log('PRODUCTION');
				socketUrl = 'https://discord-clone-teb.herokuapp.com/';
			} else {
				socketUrl = '';
			}

			socket = io(socketUrl);

			// Join the channel (the SocketIO room)
			socket.emit('joinChannel', { username, channel });

			// Message from server
			socket.on('message', (message) => {
				dispatch(addMessage(message));
				setMessages((messages) => [...messages, message]);
			});

			// Olde Messages from server
			socket.on('loadMessages', (loadedMessages) => {
				dispatch(loadMessages(loadedMessages));
				setMessages((messages) => [...messages, ...loadedMessages]);
			});

			// when component unmounts, disconnect
			return () => {
				socket.disconnect();
				setMessages([]);
			};
		}
	}, [channel, user, dispatch]);

	useEffect(() => {
		setMessages([]);
	}, [channel]);

	useEffect(() => {
		const messageBox = document.querySelector(
			'.Chat_message-container__26l9R'
		);
		messageBox.scrollTop = messageBox.scrollHeight;
	}, [messages]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (!socket) {
			return null;
		}

		const content = messageInput.trim();

		if (content.length > 2000 || content.length < 1) {
			setWarning('Message must be between 1 and 2000 characters');
			return setMessageInput('');
		}
		// console.log(messageInput);
		socket.emit('chatMessage', {
			user: user,
			message: content,
			channel,
		});
		setMessageInput('');
		setWarning('');
	};

	return (
		<div className={css['container']}>
			<div className={css['message-container']}>
				{messages.map((message, idx) => {
					return (
						<div
							key={idx}
							className={css['msg-box']}
						>{`${message.user.username}: ${message.message}`}</div>
					);
				})}
			</div>
			<div className={css['input-container']}>
				<form onSubmit={sendMessage}>
					<input
						value={messageInput}
						onChange={(e) => setMessageInput(e.target.value)}
						className={css['msg-input']}
						disabled={!channel}
						placeholder={warning}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	);
}

export default Chat;
