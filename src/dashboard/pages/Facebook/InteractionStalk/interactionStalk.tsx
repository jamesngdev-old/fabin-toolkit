import React from 'react';
import { DatePicker, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

export default function InteractionStalk() {
    return (
        <div className="page-container friends-remover">
            <h1 className="page-title">🕵️‍♀️ Interaction Stalk</h1>
            <div className="filter">
                <div className="item">
                    <span>Profile Link: </span>
                    <Input
                        size="large"
                        placeholder="large size"
                        prefix={<UserOutlined />}
                    />
                </div>
                <div className="item">
                    <span>Stack range: </span>
                    <RangePicker format={dateFormat} />
                </div>
            </div>
        </div>
    );
}
