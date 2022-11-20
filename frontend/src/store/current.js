//~~~~~Actions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const SET_CURRENT_SERVER = 'current/setCurrentServer';
const GET_CURRENT_SERVER = 'current/getCurrentServer';
const SET_CURRENT_CHANNEL = 'current/setCurrentChannel';
const GET_CURRENT_CHANNEL = 'current/getCurrentChannel';

//~~~~~Action Creators~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const setServer = (server) => {
	return {
		type: SET_CURRENT_SERVER,
		payload: server,
	};
};

// !REMOVE - Unecessary, just use useSelector
export const getServer = () => {
	return {
		type: GET_CURRENT_SERVER,
	};
};

export const setChannel = (channel) => {
	return {
		type: SET_CURRENT_CHANNEL,
		payload: channel,
	};
};

// !REMOVE - Unecessary, just use useSelector
export const getChannel = () => {
	return {
		type: GET_CURRENT_CHANNEL,
	};
};

//~~~~~Server Reducer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const initialState = {};

const currentReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case SET_CURRENT_SERVER:
			newState['server'] = action.payload;
			console.log('SET CURR SERV');
			return newState;
		case GET_CURRENT_SERVER:
			console.log('GET CURR SERVs');
			return;
		case SET_CURRENT_CHANNEL:
			newState['channel'] = action.payload;
			console.log('SET CURR CHANNEL');
			return newState;
		case GET_CURRENT_CHANNEL:
			console.log('GET_CURR_CHANNEL');
			return;
		default:
			return state;
	}
};

export default currentReducer;
