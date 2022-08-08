import React, { useMemo } from 'react';
import { FriendInfo, Gender } from '@helpers/facebook';
import { Alert, Avatar, Button, Input, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useFriendsRemover } from '@hooks/Facebook/useFriendsRemover';
import { SearchOutlined } from '@ant-design/icons';
import './friendsRemover.scss';

import * as moment from 'moment';

const { Text } = Typography;

const getMutualFriend = (text: string) => {
    return Number((text || '').split(' ')?.[0] || 0);
};

export default function FriendsRemover() {
    const talonProps = useFriendsRemover();
    const {
        friends,
        isLoading,
        updatedAt,
        handleScanFriends,
        rowSelection,
        handleRemove,
    } = talonProps;

    const columns: ColumnsType<FriendInfo> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Search..."
                        value={selectedKeys[0]}
                        onChange={e => {
                            const value = [e.target.value] || [];
                            setSelectedKeys(value);
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                );
            },
            filterIcon: () => <SearchOutlined />,
            onFilter: (value: string, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase());
            },
            render: (text: string, row: FriendInfo) => (
                <div className="profile">
                    <Avatar src={row?.profile_picture?.uri} />
                    <Text>
                        <a href={row.url} target="_blank">
                            {text}
                        </a>
                    </Text>
                </div>
            ),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                {
                    text: 'FEMALE',
                    value: Gender.FEMALE,
                },
                {
                    text: 'MALE',
                    value: Gender.MALE,
                },
                {
                    text: 'UNKNOWN',
                    value: Gender.UNKNOWN,
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: string, record) => {
                const gender = record?.gender || '';

                if (value === Gender.FEMALE || value === Gender.MALE) {
                    return gender.includes(value);
                } else {
                    return (
                        !gender.includes(Gender.FEMALE) &&
                        !gender.includes(Gender.MALE)
                    );
                }
            },
            render: (gender: Gender) => {
                if (gender === Gender.MALE) {
                    return <Tag color="volcano">MALE</Tag>;
                }
                if (gender === Gender.FEMALE) {
                    return <Tag color="cyan">FEMALE</Tag>;
                }
                return <Tag color="purple">UNKNOWN</Tag>;
            },
        },
        {
            title: 'Mutual Friend',
            dataIndex: 'social_context',
            sorter: (a, b) => {
                return (
                    getMutualFriend(a?.social_context?.text) -
                    getMutualFriend(b?.social_context?.text)
                );
            },
            render: (socialContext: any) => {
                return <Text>{getMutualFriend(socialContext?.text)}</Text>;
            },
        },
    ];

    const description = useMemo(
        () => (
            <Text>
                The data has been updated at{' '}
                <Text strong>
                    {moment(updatedAt).format('HH:mm DD/MM/YYYY')}
                </Text>
                , click Scan again button to refresh data
            </Text>
        ),
        [updatedAt],
    );

    return (
        <div className="page-container friends-remover">
            <h1 className="page-title">Friends Remover</h1>

            <Alert
                message="Think twice before removing your friends"
                description={description}
                type="info"
                showIcon
            />

            <div className="top">
                <div className="left">
                    <Text strong>
                        You selected{' '}
                        {rowSelection?.selectedRowKeys?.length || 0} friends
                    </Text>
                </div>
                <div className="right">
                    <Button type="primary" onClick={handleScanFriends}>
                        Scan again
                    </Button>
                    <Button type="primary" danger onClick={handleRemove}>
                        Bye bye 👋
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                rowSelection={rowSelection}
                dataSource={friends}
                rowKey="id"
                loading={isLoading}
            />
        </div>
    );
}
