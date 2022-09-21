import React from 'react';
import { Card, Col, Row, Switch } from 'antd';
import './dashboard.scss';
// @ts-ignore
import personalImage from './../../assets/images/person-dashboard.png';
import { Typography } from 'antd/es';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Row
                gutter={16}
                style={{
                    marginTop: 20,
                }}
            >
                <Col className="gutter-row" span={12}>
                    <Card bordered={false} className="welcome">
                        <div className="content">
                            <div className="text">
                                <h3>Congratulations John! 🎉</h3>
                                <span>
                                    You have done 68% 😎 more sales today. Check
                                    your new badge in your profile.
                                </span>
                            </div>
                            <img alt="Personal" src={personalImage} />
                        </div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card bordered={false} className="welcome">
                        <div className="content">
                            <div className="text">
                                <h3>Congratulations John! 🎉</h3>
                                <span>
                                    You have done 68% 😎 more sales today. Check
                                    your new badge in your profile.
                                </span>
                            </div>
                            <img alt="Personal" src={personalImage} />
                        </div>
                    </Card>
                </Col>

                <Col
                    className="gutter-row"
                    span={8}
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Card bordered={false} title="Facebook">
                        <div className="toolOptions">
                            <div className="item">
                                <Typography.Text>
                                    Block 'Seen' Messenger
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                            <div className="item">
                                <Typography.Text>
                                    Block 'Typing' Messenger
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block 'Typing' Comment
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block 'seen' story
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block Facebook Pixel (Tracking Script)
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                            <div className="item">
                                <Typography.Text>
                                    Remove Fbclid Parameter From Links
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col
                    className="gutter-row"
                    span={8}
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Card bordered={false} title="Instagram">
                        <div className="toolOptions">
                            <div className="item">
                                <Typography.Text>
                                    Block 'Seen' Messenger
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                            <div className="item">
                                <Typography.Text>
                                    Block 'Typing' Messenger
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block 'Typing' Comment
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block 'seen' story
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block Facebook Pixel (Tracking Script)
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                            <div className="item">
                                <Typography.Text>
                                    Remove Fbclid Parameter From Links
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col
                    className="gutter-row"
                    span={8}
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Card bordered={false} title="Security">
                        <div className="toolOptions">
                            <div className="item">
                                <Typography.Text>
                                    Block 'Seen' Messenger
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                            <div className="item">
                                <Typography.Text>
                                    Block 'Typing' Messenger
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block 'Typing' Comment
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block 'seen' story
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>

                            <div className="item">
                                <Typography.Text>
                                    Block Facebook Pixel (Tracking Script)
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                            <div className="item">
                                <Typography.Text>
                                    Remove Fbclid Parameter From Links
                                </Typography.Text>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
