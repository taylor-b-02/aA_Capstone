import { csrfFetch } from './csrf';

const LOAD_MESSAGES = 'message/loadMessages';
const ADD_MESSAGE = 'message/addMessages';
const DELETE_MESSAGE = 'message/deleteMessages';

//~~~~~Action Creators~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const loadMessages = (messages) => {
	return {
		type: LOAD_MESSAGES,
		payload: messages,
	};
};

export const addMessage = (message) => {
	return {
		type: ADD_MESSAGE,
		payload: message,
	};
};

export const deleteMessage = (id) => {
	return {
		type: DELETE_MESSAGE,
		payload: id,
	};
};

//~~~~~Server Reducer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const initialState = {};

const messageReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case LOAD_MESSAGES:
			const messageArr = action.payload;
			for (const msg of messageArr) {
				newState[msg.id] = msg;
			}
			return newState;
		case ADD_MESSAGE:
			const message = action.payload;
			newState[message.id] = message;
			return newState;
		case DELETE_MESSAGE:
			const id = action.payload;
			delete newState[id];
			return newState;
		default:
			return state;
	}
};

export default messageReducer;

//~~~~~Thunks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// export const fetchMessagesThunk = (channelId) => async (dispatch) => {
// 	const response = await fetch(`/api/messages/${channelId}`);
// 	const data = await response.json();
// 	dispatch(loadMessages(data));
// 	return response;
// };

// export const createMessageThunk = (message) => async (dispatch) => {
// 	const { messageText, userId, channelId } = message;
// 	const response = await csrfFetch('/api/messages', {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			message: messageText,
// 			userId,
// 			channelId,
// 		}),
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(addMessage(data));
// 	}
// 	return response;
// };

export const deleteMessageThunk = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/messages/${id}`);
	if (response.ok) {
		await dispatch(deleteMessage(id));
		return response;
	}
};
