//~~~~~Actions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const SET_CURRENT_SERVER = 'current/setCurrentServer';
const SET_CURRENT_CHANNEL = 'current/setCurrentChannel';

//~~~~~Action Creators~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const setServer = (server) => {
	return {
		type: SET_CURRENT_SERVER,
		payload: server,
	};
};

export const setChannel = (channel) => {
	return {
		type: SET_CURRENT_CHANNEL,
		payload: channel,
	};
};

//~~~~~Server Reducer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const initialState = {};

const currentReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case SET_CURRENT_SERVER:
			newState['server'] = action.payload;
			return newState;
		case SET_CURRENT_CHANNEL:
			newState['channel'] = action.payload;
			return newState;
		default:
			return state;
	}
};

export default currentReducer;
