import { AppActionType, SET_LOADING, SET_PAGE_TITLE } from '../action-types';

export default interface StateInfo {
    pageTitle?: string;
    loading?: boolean;
}

const initialState: StateInfo = {
    pageTitle: '',
    loading: false,
};

export const appReducers = (
    state = initialState,
    action: AppActionType,
): StateInfo => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.payload,
            };
        default:
            return state;
    }
};
