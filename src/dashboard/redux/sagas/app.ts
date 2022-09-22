import { all } from "redux-saga/effects";

// export function* setPageTitleSaga(action: SetPageTitleAction): any {
//     // yield put(SetPageTitle(action.payload));
// }

export default function* app(): any {
    return all([
        // yield takeLatest(SET_PAGE_TITLE, setPageTitleSaga)
    ]);
}
