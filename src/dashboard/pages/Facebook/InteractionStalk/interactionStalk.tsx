import React from 'react';
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Input,
    Row,
    Typography,
} from 'antd';
import { MonitorOutlined, UserOutlined } from '@ant-design/icons';
import './interactionStalk.scss';
import useInteractionStalk from '@hooks/Facebook/useInteractionStalk';
import { getFacebookAvatar } from '@helpers/image';
import TopReactors from '@pages/Facebook/InteractionStalk/TopReactors';
import TopCommentors from '@pages/Facebook/InteractionStalk/TopCommentors';

const { Title } = Typography;

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

export default function InteractionStalk() {
    const talonProps = useInteractionStalk();
    const {
        isLoading,
        onChangeProfile,
        stalkUser,
        dateRange,
        onStartStalk,
        onChangeDate,
        topReactors,
        topCommentors,
    } = talonProps;

    return (
        <div className="page interaction-stalk">
            <Row
                gutter={16}
                style={{
                    marginTop: '20px',
                }}
            >
                <Col className="gutter-row" span={24}>
                    <Card title="🕵️‍♀️ Facebook Stalk" bordered={false}>
                        <div className="filterContainer">
                            <div className="filter">
                                <div className="item">
                                    <span>Profile Link: </span>
                                    <Input
                                        placeholder="Facebook Profile URL"
                                        prefix={<UserOutlined />}
                                        onChange={onChangeProfile}
                                    />
                                </div>
                                <div className="item">
                                    <span>Stalk range: </span>
                                    <RangePicker
                                        format={dateFormat}
                                        value={dateRange}
                                        onChange={onChangeDate}
                                    />
                                </div>

                                <Button
                                    type="primary"
                                    block
                                    icon={<MonitorOutlined />}
                                    onClick={onStartStalk}
                                    loading={isLoading}
                                    disabled={!stalkUser?.uid}
                                >
                                    Start Stalk
                                </Button>
                            </div>
                            <div className="preview">
                                <Avatar
                                    size={100}
                                    src={getFacebookAvatar(stalkUser?.uid)}
                                />
                                <Title level={4}>{stalkUser?.name}</Title>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Card title="Top Reaction" bordered={false}>
                        <TopReactors data={topReactors} isLoading={isLoading} />
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card title="Top Commentors" bordered={false}>
                        <TopCommentors
                            data={topCommentors}
                            isLoading={isLoading}
                        />
                    </Card>
                </Col>

                <Col className="gutter-row" span={24}>
                    <Card title="Following Page" bordered={false}>
                        <TopReactors data={topReactors} isLoading={isLoading} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
