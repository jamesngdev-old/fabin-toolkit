import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Facebook, { FriendInfo } from '@helpers/facebook';

export const useFriendsRemover = (props = {}) => {
    const [friends, setFriends] = useState<FriendInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updatedAt, setUpdatedAt] = useState<number>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowConfirmModal, setIsShowConfirmModal] =
        useState<boolean>(false);

    const scanFriends = useCallback(
        async (isGetFromLocal: boolean) => {
            setIsLoading(true);
            const facebook = await new Facebook().init();
            const { data, createdAt } = await facebook.getFriends(
                isGetFromLocal,
            );
            setFriends(data);
            setIsLoading(false);
            setUpdatedAt(createdAt);
        },
        [setFriends, setIsLoading, setUpdatedAt],
    );

    useEffect(() => {
        scanFriends(true);
    }, [scanFriends]);

    const handleScanFriends = () => {
        scanFriends(false);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const toggleReview = useCallback(() => {
        setIsShowConfirmModal(prev => !prev);
    }, [setIsShowConfirmModal]);

    const handleRemove = useCallback(() => {
        console.log('handle remove');
    }, []);

    const readyToRemoveFriends = useMemo(() => {
        return friends.filter(friend => selectedRowKeys.includes(friend.id));
    }, [friends, isShowConfirmModal]);

    return {
        isLoading,
        friends,
        updatedAt,
        rowSelection,
        isShowConfirmModal,
        handleScanFriends,
        toggleReview,
        handleRemove,
        readyToRemoveFriends,
    };
};
