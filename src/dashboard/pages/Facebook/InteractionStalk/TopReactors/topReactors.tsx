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
                    <a href={`https://facebook.com/${row.info.id}`} target="_blank">
                        {row.info.name}
                    </a>
                </Text>
            </div>
        ),
    },
    {
        title: 'Reaction',
        dataIndex: 'interaction',
        key: 'interaction',
        render: (text: string, row: InteractionMapValue) => (
            <Text>{row.interaction.reaction}</Text>
        ),
    },
];

interface TopReactorsProps {
    data: InteractionMapValue[];
    isLoading: boolean;
}

export default function TopReactors(props: TopReactorsProps) {
    return (
        <Table
            columns={columns}
            dataSource={props.data}
            pagination={false}
            loading={props.isLoading}
        />
    );
}
