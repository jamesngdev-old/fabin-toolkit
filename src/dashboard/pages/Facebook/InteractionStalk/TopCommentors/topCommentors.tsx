import { Avatar, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { InteractionMapValue } from '@helpers/facebook';
import { getFacebookAvatar } from '@helpers/image';

const { Text } = Typography;

const columns: ColumnsType<InteractionMapValue> = [
    {
        title: 'Name',
        dataIndex: 'info',
        key: 'info',
        render: (text: string, row: InteractionMapValue) => (
            <div className="profile">
                <Avatar src={getFacebookAvatar(row.info.id)} />
                <Text>
                    <a href={`https://fb.me/${row.info.id}`} target="_blank">
                        {row.info.name}
                    </a>
                </Text>
            </div>
        ),
    },
    {
        title: 'Comment',
        dataIndex: 'Comment',
        key: 'interaction',
        render: (text: string, row: InteractionMapValue) => (
            <Text>{row.interaction.comment}</Text>
        ),
    },
];

interface TopReactorsProps {
    data: InteractionMapValue[];
    isLoading: boolean;
}

export default function TopCommentors(props: TopReactorsProps) {
    return (
        <Table columns={columns} dataSource={props.data} pagination={false} loading={props.isLoading}/>
    );
}
