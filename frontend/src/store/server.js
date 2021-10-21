import { csrfFetch } from './csrf';

const GET_SERVERS = 'server/getServers';
const ADD_SERVER = 'server/getServers';

//~~~~~Action Creators~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getServers = (servers) => {
	return {
		type: GET_SERVERS,
		payload: servers,
	};
};

const addServer = (server) => {
	return {
		type: ADD_SERVER,
		payload: server,
	};
};

//~~~~~Server Reducer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState = {};

const serverReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case GET_SERVERS:
			for (const server of action.payload) {
				newState[server.id] = server;
			}
			return newState;
		case ADD_SERVER:
			newState[action.payload.id] = action.payload;
			return newState;
		default:
			return state;
	}
};

export default serverReducer;

//~~~~~Thunks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const fetchServersThunk = () => async (dispatch) => {
	// UPDATE FETCH URL TO DYNAMICALLY PULL USER ID
	const response = await csrfFetch(`/api/servers/${5}`);
	const data = await response.json();
	console.log(data);
	dispatch(getServers(data));
	return response;
};

export const createServerThunk = () => async (dispatch) => {
	const response = await csrfFetch('');
	const data = await response.json();
	console.log(data);
	dispatch(addServer(data));
	return response;
};
