import { combineReducers } from 'redux';
import AppState, { appReducers } from './app';

export interface RootState {
    app: AppState;
}

export default combineReducers<RootState>({
    app: appReducers,
});
