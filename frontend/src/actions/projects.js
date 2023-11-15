import {
    GET_PROJECT_LIST
} from '../reducers/types';

// action creators
const actionGetProjects = (projects) => ({
    type: GET_PROJECT_LIST,
    payload: { projects }
});

const setProjects = (projects, dispatch) => {
    const action = actionGetProjects(projects);
    dispatch(action);
}

const actionIsLoading = (isLoading) => ({
    //type: IS_LOADING_VIDEOS,
    payload: { isLoading }
});

const setIsLoad = (isLoading, dispatch) => {
    const action = actionIsLoading(isLoading);
    dispatch(action);
}

export { setProjects, setIsLoad};
