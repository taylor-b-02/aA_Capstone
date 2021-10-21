import { csrfFetch } from './csrf';

const GET_SERVERS = 'server/getServers';
const POST_SERVER = 'server/getServers';

//~~~~~Action Creators~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getServers = (userId) => {
	return {
		type: GET_SERVERS,
		payload: userId,
	};
};

const postServer = (server) => {
	return {
		type: POST_SERVER,
		payload: server,
	};
};

//~~~~~Server Reducer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState = {};

const serverReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case GET_SERVERS:
			return newState;
		case POST_SERVER:
			return newState;
		default:
			return state;
	}
};

export default serverReducer;

//~~~~~Thunks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
