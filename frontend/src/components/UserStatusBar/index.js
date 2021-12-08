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

import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';

import css from './UserStatusBar.module.css';

function UserStatusBar() {}

export default UserStatusBar;
