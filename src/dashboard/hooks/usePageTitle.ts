import { useEffect } from 'react';
import { AppStore } from '../stores/app.store';

interface IProps {
    title: string;
}

export const usePageTitle = (props: IProps) => {
    const appStore = new AppStore();

    useEffect(() => {
        appStore.setPageTitle(props.title);
        return () => {
            appStore.pageTitle = '';
        };
    }, [appStore]);
    return {};
};
