import React, { useEffect } from 'react';
import { FriendInfo, Gender } from '@helpers/facebook';
import {
    Avatar,
    Card,
    Col,
    Divider,
    Input,
    Row,
    Table,
    Tag,
    Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';
import './likedPageStalk.scss';
import usePageLiked from '@hooks/Facebook/usePageLiked';
import { SetPageTitle } from '@redux/actions';
import { useDispatch } from 'react-redux';

const { Text } = Typography;

const getMutualFriend = (text: string) => {
    return Number((text || '').split(' ')?.[0] || 0);
};

const LikedPageStalk: React.FC = (() => {
    const talonProps = usePageLiked();
    const { isLoading, getLikedPage } = talonProps;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SetPageTitle('Like page stalk'));
    }, []);

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

    return (
      <div className="page interaction-stalk">
          <Row
            gutter={16}
            style={{
                marginTop: '20px',
            }}
          >
              <Col className="gutter-row" span={24}>
                  <Card bordered={false}>
                      <div className="friends-remover">
                          <div className="top">
                              <div className="left">
                                  <Input.Search
                                    placeholder="Facebook ID"
                                    enterButton="Search"
                                    size="large"
                                    onSearch={getLikedPage}
                                  />
                              </div>
                              <div className="right"></div>
                          </div>

                          <h1
                            onClick={() => {

                            }}
                          >
                          </h1>
                          <Divider />

                          <Table
                            columns={columns}
                            dataSource={[]}
                            rowKey="id"
                            loading={isLoading}
                          />
                      </div>
                  </Card>
              </Col>
          </Row>
      </div>
    );
});

export default LikedPageStalk;
