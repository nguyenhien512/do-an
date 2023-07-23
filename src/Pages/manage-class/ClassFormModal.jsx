import { useState, useEffect, useRef } from 'react';
import { Modal, Input, Form, InputNumber } from 'antd';

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
    const prevOpenRef = useRef();
    useEffect(() => {
        prevOpenRef.current = open;
    }, [open]);
    const prevOpen = prevOpenRef.current;
    useEffect(() => {
        if (!open && prevOpen) {
            form.resetFields();
        }
    }, [form, prevOpen, open]);
};

const ClassFormModal = ({ open, onCancel, handleFinish, initForm }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(initForm);
    useResetFormOnCloseModal({
        form,
        open,
    });
    const onOk = () => {
        handleFinish(form.getFieldsValue(true));
    };
    return (
        <Modal title="Basic Drawer" open={open} onOk={onOk} onCancel={onCancel}>
            <Form form={form} layout="vertical" name="classForm">
                <Form.Item
                    name="name"
                    label="Tên lớp"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="schoolYear"
                    label="Năm học"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ClassFormModal;