import { AppActionType, SET_LOADING, SET_PAGE_TITLE } from '../action-types';

export const SetLoading = (payload: boolean): AppActionType => ({
    type: SET_LOADING,
    payload,
});

export const SetPageTitle = (payload: string): AppActionType => ({
    type: SET_PAGE_TITLE,
    payload,
});
