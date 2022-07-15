import React from 'react';
import { Modal } from 'antd';
import { FriendInfo } from '@helpers/facebook';

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

    console.log(readyToRemoveFriends);

    return (
        <Modal
            title="Review"
            visible={isShow}
            onOk={toggleModal}
            // confirmLoading={handleRemove}
            onCancel={toggleModal}
        >
            <p>
                <h1>hihi</h1>
            </p>
        </Modal>
    );
}
