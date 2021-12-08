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
	return (
		<div className={css['container']}>
			<div className={css['inner-container']}>
				<div className={css['profile-pic']}></div>
				<div className={css['text-container']}>
					<div className={css['username-text']}>TaylorB</div>
					<div className={css['id-text']}>#3598</div>
				</div>
				<FaCog
					onClick={() => {}}
					// value={channel.id}
					className={css['user-settings']}
				></FaCog>
			</div>
		</div>
	);
}

export default UserStatusBar;
