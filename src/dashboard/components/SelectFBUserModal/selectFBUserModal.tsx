import React from 'react';
import { Modal } from 'antd';

interface SelectFbUserModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
}

function SelectFbUserModal(props: SelectFbUserModalProps) {
    const { isOpen, onClose } = props;
    return (
        <Modal
            title="Basic Modal"
            visible={isOpen}
            onOk={() => {
                console.log('some thigns oke');
            }}
            onCancel={onClose}
        >
            <h1>this is modal content</h1>
        </Modal>
    );
}

export default SelectFbUserModal;
