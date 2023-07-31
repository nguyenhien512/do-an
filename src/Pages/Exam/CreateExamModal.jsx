import { useState, useEffect, useRef } from 'react';
import { Modal, Input, Form, InputNumber } from 'antd';
import { useResetFormOnCloseModal } from '../../hooks/resetForm'

const CreateExamModal = ({ open, handleCancel, handleFinish }) => {
    const [form] = Form.useForm();

    useResetFormOnCloseModal({
        form,
        open,
    });
    const onOk = () => {
        handleFinish(form.getFieldsValue(true));
    };
    return (
        <Modal open={open} onOk={onOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical" name="classForm">
                <Form.Item
                    name="name"
                    label="Tên đề thi"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default CreateExamModal;