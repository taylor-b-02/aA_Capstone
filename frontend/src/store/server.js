import { csrfFetch } from './csrf';

const GET_SERVERS = 'server/getServers';
const ADD_SERVER = 'server/addServer';
const DELETE_SERVER = 'server/deleteServer';

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

const editServer = (server) => {
	return {
		type: ADD_SERVER,
		payload: server,
	};
};

const deleteServer = (id) => {
	return {
		type: DELETE_SERVER,
		payload: id,
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
		case DELETE_SERVER:
			const id = action.payload;
			delete newState[id];
			return newState;
		default:
			return state;
	}
};

export default serverReducer;

//~~~~~Thunks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const fetchServersThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/servers/`);
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
	return data;
};

export const deleteServerThunk = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/servers/${id}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		await dispatch(deleteServer(id));
		return response;
	}
};

export const editServerThunk = (id, name) => async (dispatch) => {
	console.log(id, name);
	const response = await csrfFetch(`/api/servers/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ id, name }),
	});
	const data = await response.json();
	dispatch(editServer(data));
	return response;
};
