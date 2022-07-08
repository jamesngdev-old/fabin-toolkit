import React, { useCallback, useEffect, useState } from 'react';
import Facebook, { FriendInfo } from '@helpers/facebook';

export const useFriendsRemover = (props = {}) => {
    const [friends, setFriends] = useState<FriendInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const scanFriends = useCallback(
        async (isGetFromLocal: boolean) => {
            setIsLoading(true);
            const facebook = await new Facebook().init();
            const friends = await facebook.getFriends(isGetFromLocal);
            setFriends(friends);
            setIsLoading(false);
        },
        [setFriends, setIsLoading],
    );

    useEffect(() => {
        scanFriends(true);
    }, [scanFriends]);

    const handleScanFriends = () => {
        scanFriends(false);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return {
        isLoading,
        friends,
        handleScanFriends,
        rowSelection
    };
};
