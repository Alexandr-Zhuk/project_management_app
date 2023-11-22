import {
    SET_ACCESS_TOKEN
} from '../reducers/types';

const actionSetAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    payload: { accessToken: accessToken }
});

const setAccessToken = (accessToken, dispatch) => {
    const action = actionSetAccessToken(accessToken);
    dispatch(action);
};

export {setAccessToken};