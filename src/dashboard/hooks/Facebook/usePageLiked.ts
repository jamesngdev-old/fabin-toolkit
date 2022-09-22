import { useCallback, useEffect, useState } from 'react';
import Facebook from '@helpers/facebook';

const facebook = new Facebook();
facebook.init();
const usePageLiked = (props = {}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        facebook.init().then(res => {
            console.log('get user success', res);
        });
    }, []);

    const getLikedPage = useCallback(
        (facebookId: string) => {
            setIsLoading(true);
            facebook
                .getLikedPage(facebookId)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [setIsLoading],
    );

    return {
        isLoading,
        getLikedPage,
    };
};

export default usePageLiked;
