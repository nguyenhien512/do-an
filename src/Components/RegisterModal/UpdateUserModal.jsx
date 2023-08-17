import React, { useState } from 'react';
import { Button, Modal, Form, Input, Row } from 'antd';
import RegisterForm from './register-form/RegisterForm';

function UpdateUserModal({ open, handleCancel, handleOk, initData }) {

    const [form] = Form.useForm();

    form.setFieldsValue(initData);

    const onOk = () => {
        handleOk(form.getFieldsValue(true));
    }

    return (
        <>
            <Modal
                title="Thay đổi thông tin đăng nhập"
                open={open}
                onOk={onOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form
                    form={form}

                >
                    <Form.Item
                        label="Mật khẩu mới"
                        name="password"
                        rules={[{ required: false }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Tên mới"
                        name="firstName"
                        rules={[{ required: false }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Họ mới"
                        name="lastName"
                        rules={[{ required: false }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}
export default UpdateUserModal;