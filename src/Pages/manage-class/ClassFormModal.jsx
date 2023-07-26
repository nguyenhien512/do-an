import { useState, useEffect, useRef } from 'react';
import { Modal, Input, Form, InputNumber } from 'antd';
import {useResetFormOnCloseModal} from '../../hooks/resetForm'



const ClassFormModal = ({ open, onCancel, handleFinish, initForm }) => {
    const [form] = Form.useForm();
    
    useResetFormOnCloseModal({
        form,
        open,
    });
    const onOk = () => {
        handleFinish(form.getFieldsValue(true));
    };
    return (
        <Modal title={initForm ? "Sửa lớp học" : "Tạo lớp học"} open={open} onOk={onOk} onCancel={onCancel}>
            <Form form={form} layout="vertical" name="classForm" initialValues={initForm}>
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