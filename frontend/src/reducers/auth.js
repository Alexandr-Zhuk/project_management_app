
import update from 'react-addons-update';

import {
    SET_ACCESS_TOKEN,
    SET_GOOGLE_ACCESS_TOKEN
} from './types';

export const initialState = {
    accessToken: '',
    googleAccessToken: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case SET_ACCESS_TOKEN:
            return update(state, {
                accessToken: {$set: action.payload.accessToken},
            });
        break;
        case SET_GOOGLE_ACCESS_TOKEN:
            return update(state, {
                googleAccessToken: {$set: action.payload.googleAccessToken},
            });
        break;
    }
    return state;
}

export default reducer;