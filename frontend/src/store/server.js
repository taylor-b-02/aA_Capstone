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
			const serverArr = action.payload.servers;
			for (const server of serverArr) {
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

export const fetchServersThunk = (id) => async (dispatch) => {
	const response = await csrfFetch(
		// `${window.location.origin}/api/servers/${1}`
		`/api/servers/${id}`
	);
	const data = await response.json();
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
	dispatch(addServer(data));
	return response;
};
