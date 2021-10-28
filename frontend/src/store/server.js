import { csrfFetch } from './csrf';

const GET_SERVERS = 'server/getServers';
const ADD_SERVER = 'server/addServer';
const SET_CURRENT = 'server/setCurrent';

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

export const setCurrent = (serverId) => {
	return {
		type: SET_CURRENT,
		payload: serverId,
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
			if (newState['currentServer'] === null) {
				newState['currentServer'] = serverArr[0];
			}
			return newState;
		case ADD_SERVER:
			newState[action.payload.id] = action.payload;
			newState['currentServer'] = action.payload;
			return newState;
		case SET_CURRENT:
			const serverId = action.payload;
			newState['currentServer'] = newState[serverId];
			console.log('STATE', newState);
			console.log('STATE CS', newState['currentServer']);

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