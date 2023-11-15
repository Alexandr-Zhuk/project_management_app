import {
    SET_SEARCH_QUERY
} from '../reducers/types';

// action creators
const actionSetQuery = (queryInput) =>({
    type: SET_SEARCH_QUERY,
    payload: {query: queryInput}

});

const sendSearchQuery = (queryInput, dispatch) => {
    const action = actionSetQuery(queryInput);
    dispatch(action);
}

export { sendSearchQuery };
