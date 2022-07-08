import React from 'react';
import { FriendInfo, Gender } from '@helpers/facebook';
import { Alert, Avatar, Button, Input, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useFriendsRemover } from '@hooks/Facebook/useFriendsRemover';
import { SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

const getMutualFriend = (text: string) => {
    return Number((text || '').split(' ')?.[0] || 0);
};

export default function FriendsRemover() {
    const talonProps = useFriendsRemover();
    const { friends, isLoading, handleScanFriends, rowSelection } = talonProps;

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
                <>
                    <Avatar src={row?.profile_picture?.uri} />
                    <Text>
                        <a href={row.url} target="_blank">
                            {text}
                        </a>
                    </Text>
                </>
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

    return (
        <div className="page-container">
            <h1 className="page-title">Friends Remover</h1>
            <Alert
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="info"
                showIcon
            />
            <Button type="primary" onClick={handleScanFriends}>
                Scan
            </Button>
            <Button type="primary" danger onClick={handleScanFriends}>
                Bye bye 👋
            </Button>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                dataSource={friends}
                rowKey="id"
            />
        </div>
    );
}
