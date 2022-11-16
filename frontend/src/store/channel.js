import { csrfFetch } from './csrf';

const GET_CHANNELS = 'channel/getChannels';
const ADD_CHANNEL = 'channel/addChannel';
const EDIT_CHANNEL = 'channel/editChannel';
const DELETE_CHANNEL = 'channel/deleteChannel';
const SET_CURRENT = 'channel/setCurrent';

//~~~~~Action Creators~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		payload: channels,
	};
};

const addChannel = (channel) => {
	return {
		type: ADD_CHANNEL,
		payload: channel,
	};
};

// SHOULD I JUST MAKE EDIT CHANNEL USE ADD_CHANNEL?
const editChannel = (channel) => {
	return {
		type: EDIT_CHANNEL,
		payload: channel,
	};
};

const deleteChannel = (channelId) => {
	return {
		type: DELETE_CHANNEL,
		payload: channelId,
	};
};

export const setCurrent = (channelId) => {
	return {
		type: SET_CURRENT,
		payload: channelId,
	};
};

//~~~~~Server Reducer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState = {};

const channelReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case GET_CHANNELS:
			const channelArr = action.payload.channels;
			for (const channel of channelArr) {
				newState[channel.id] = channel;
			}
			return newState;
		case ADD_CHANNEL:
			const channel = action.payload;
			newState[channel.id] = channel;
			newState['currentChannel'] = newState[channel.id];
			return newState;
		case EDIT_CHANNEL:
			const editedChannel = action.payload;
			newState[editedChannel.id] = editedChannel;
			return newState;
		case SET_CURRENT:
			const channelId = action.payload;
			newState['currentChannel'] = newState[channelId];
			return newState;
		case DELETE_CHANNEL:
			const id = action.payload;
			delete newState[id];
			return newState;
		default:
			return state;
	}
};

export default channelReducer;

//~~~~~Thunks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const createChannelThunk = (channel) => async (dispatch) => {
	const { name, serverId } = channel;
	const response = await csrfFetch('/api/channels', {
		method: 'POST',
		body: JSON.stringify({
			serverId,
			name,
		}),
	});
	const data = await response.json();
	dispatch(addChannel(data));
	return response;
};

export const fetchChannelsThunk = (serverId) => async (dispatch) => {
	const response = await fetch(`/api/channels/${serverId}`);
	const data = await response.json();
	dispatch(getChannels(data));
	return response;
};

export const editChannelThunk = (id, name) => async (dispatch) => {
	console.log(id, name);
	const response = await csrfFetch(`/api/channels/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ id, name }),
	});
	const data = await response.json();
	dispatch(editChannel(data));
	return response;
};

export const deleteChannelThunk = (channelId) => async (dispatch) => {
	const response = await csrfFetch(`/api/channels/${channelId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		dispatch(deleteChannel(channelId));
		return { ok: true };
	}
};
