import { useEffect } from 'react';
import Facebook from '@helpers/facebook';

const facebook = new Facebook();

export const useDashboard = (props: any) => {
    const { appStore } = props;

    useEffect(() => {
        appStore.isLoading = true;
        facebook.getUserInfo().then(info => {
            appStore.isLoading = false;
            appStore.facebookUserInfo = info;
        });
    }, []);
};
