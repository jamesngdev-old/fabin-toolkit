import { makeAutoObservable } from 'mobx';
import { FacebookUserInfo } from '@helpers/facebook';

export class AppStore {
    isLoading: boolean = false;
    facebookUserInfo: FacebookUserInfo = null;
    pageTitle: string = 'Dashboard';

    constructor() {
        makeAutoObservable(this);
    }

    setFacebookUserInfo(userInfo: FacebookUserInfo) {
        this.facebookUserInfo = userInfo;
    }

    setPageTitle(title: string) {
        this.pageTitle = title;
    }
}
