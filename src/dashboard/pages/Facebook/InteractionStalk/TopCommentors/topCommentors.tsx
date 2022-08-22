import { Avatar, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { InteractionMapValue, InteractPost } from '@helpers/facebook';
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
        dataIndex: 'interaction',
        key: 'interaction',
        render: (text: string, row: InteractionMapValue) => (
            <Text>{row.interaction.comment}</Text>
        ),
    },
    {
        title: 'Posts',
        dataIndex: 'interactIn',
        key: 'interactIn',
        render: (interactIn: InteractPost) => {
            return interactIn.comments.map(comment => {
                return (
                    <a
                        style={{
                            display: 'block',
                        }}
                        href={`https://www.facebook.com/${comment}`}
                    >
                        {comment}
                    </a>
                );
            });
        },
    },
];

interface TopReactorsProps {
    data: InteractionMapValue[];
    isLoading: boolean;
}

export default function TopCommentors(props: TopReactorsProps) {
    return (
        <Table
            columns={columns}
            dataSource={props.data}
            pagination={false}
            loading={props.isLoading}
        />
    );
}
