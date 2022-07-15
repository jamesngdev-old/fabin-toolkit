import React, { useMemo } from 'react';
import { Avatar, Image, Modal, Typography } from 'antd';
import { FriendInfo } from '@helpers/facebook';

const { Text } = Typography;

export interface IProps {
    isShow?: boolean;
    rowSelection?: {
        selectedRowKeys?: any;
        onChange?: any;
    };
    handleRemove: (key: any) => void;
    toggleModal: (key: any) => void;
    readyToRemoveFriends?: FriendInfo[];
}

export default function ConfirmDialog(props: IProps) {
    const {
        isShow,
        rowSelection,
        handleRemove,
        toggleModal,
        readyToRemoveFriends,
    } = props;

    const friendList = useMemo(() => {
        return readyToRemoveFriends.map(friend => {
            return (
                <div className="review-item">
                    <Avatar
                        size={100}
                        src={
                            <Image
                                src={friend.profile_picture.uri}
                                style={{ width: 100 }}
                            />
                        }
                    />

                    <Text>
                        <a href={friend.url} target="_blank">
                            {friend.short_name}
                        </a>
                    </Text>
                </div>
            );
        });
    }, [readyToRemoveFriends]);

    return (
        <Modal
            title="Review"
            visible={isShow}
            onOk={toggleModal}
            // confirmLoading={handleRemove}
            onCancel={toggleModal}
        >
            <div className="review-list">{friendList}</div>
        </Modal>
    );
}
