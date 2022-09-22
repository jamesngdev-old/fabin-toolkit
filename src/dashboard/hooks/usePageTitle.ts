import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { SetPageTitle } from '@redux/actions';

interface IProps {
    title: string;
}

export const usePageTitle = (props: IProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SetPageTitle(props.title));
    }, []);
    return {};
};
