import { csrfFetch } from './csrf';

//~~~~~Action Creators~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~Server Reducer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState = {};

const channelReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		default:
			return state;
	}
};

export default channelReducer;

//~~~~~Thunks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
