export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const SET_LOADING = 'SET_LOADING';

export interface SetPageTitleAction {
    type: typeof SET_PAGE_TITLE;
    payload: string;
}

export interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

export type AppActionType = SetPageTitleAction | SetLoadingAction;
