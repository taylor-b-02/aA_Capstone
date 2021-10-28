import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useHistory, Link } from 'react-router-dom';

import * as serverActions from '../../store/server';
import * as channelActions from '../../store/channel';

import css from './Chat.module.css';

let socket;

function Chat() {
	const [messages, setMessages] = useState([]);
	const [messageInput, setMessageInput] = useState('');
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		// Create websocket/connet
		socket = io();
		// socket.data.user = user.username;

		socket.on('msg', (chat) => {
			setMessages((messages) => [...messages, chat]);
		});

		// when component unmounts, disconnect
		return () => {
			socket.disconnect();
		};
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		// console.log(messageInput);
		socket.emit('msg', { user: user.username, msg: messageInput });
		setMessageInput('');
	};

	return (
		<>
			<form onSubmit={sendMessage}>
				<input
					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
			<div>
				{messages.map((message, idx) => {
					return (
						<div key={idx}>{`${message.user}: ${message.msg}`}</div>
					);
				})}
			</div>
		</>
	);
}

export default Chat;
