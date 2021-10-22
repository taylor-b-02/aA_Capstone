import { csrfFetch } from './csrf';

const GET_SERVERS = 'server/getServers';
const ADD_SERVER = 'server/addServer';

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
			console.log('ACTION', action);
			const serverArr = action.payload.servers;
			console.log('Server Arr Reducer', serverArr);
			for (const server of serverArr) {
				newState[server.id] = server;
			}
			console.log('NEWSTATE', newState);
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
	console.log('YOU HAVE NOW ENTERED THE THUNK, WELCOME');
	const response = await csrfFetch(
		// `${window.location.origin}/api/servers/${1}`
		`/api/servers/${1}`
	);
	const data = await response.json();
	console.log('INSIDE THUNK DATA:', data);
	dispatch(getServers(data));
	return response;
};

export const createServerThunk = (server) => async (dispatch) => {
	const { name, userId } = server;
	const response = await csrfFetch('/api/servers', {
		method: 'POST',
		body: JSON.stringify({
			name,
			userId,
		}),
	});
	const data = await response.json();
	console.log(data);
	dispatch(addServer(data));
	return response;
};
