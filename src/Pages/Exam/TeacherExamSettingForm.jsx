import React from 'react';
import { Select, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { useResetFormOnCloseModal } from '../../hooks/resetForm';
import { useState, useEffect } from 'react';
import { callGetClasses } from '../manage-class/ClassApi';

function ExamSettingForm({ open, onCancel, handleFinish, initForm }) {

    const [form] = Form.useForm();

    const [classes, setClasses] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            const data = await callGetClasses(token);
            setClasses([...data]);
        }
        fetchData();
    },[])

    const options = classes?.map(item => ({
        value: item.id,
        label: item.name
    }))

    useResetFormOnCloseModal({
        form,
        open,
    });
    const onOk = () => {
        handleFinish(form.getFieldsValue(true));
    };

    return (
        <Modal title={"Cài đặt đề thi"} open={open} onOk={onOk} onCancel={onCancel}>
            <Form
                name="settingForm"
                layout="vertical"
                style={{
                    width: '60%',
                }}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Yêu cầu nhập tên đề thi!',
                        },
                    ]}
                    initialValue={initForm?.name}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Thời gian làm bài (phút)"
                    name="maxDuration"
                    rules={[
                        {
                            required: true,
                            message: 'Yêu cầu nhập thời gian làm bài!',
                        },
                    ]}
                    initialValue={initForm?.maxDuration}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Số lần thi tối đa đối với mỗi học sinh"
                    name="maxRetry"
                    rules={[
                        {
                            required: true,
                            message: 'Yêu cầu nhập số lần thi tối đa đối với mỗi học sinh!',
                        },
                    ]}
                    initialValue={initForm?.maxRetry}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Thời điểm mở đề thi"
                    name="openTime"
                    rules={[
                        {
                            required: true,
                            message: 'Yêu cầu nhập thời điểm mở đề thi!',
                        },
                    ]}
                    initialValue={initForm?.openTime}
                >
                    <DatePicker showTime style={{ width: '100%' }}/>
                </Form.Item>

                <Form.Item
                    label="Thời điểm đóng đề thi"
                    name="closeTime"
                    rules={[
                        {
                            required: true,
                            message: 'Yêu cầu nhập thời điểm đóng đề thi!',
                        },
                    ]}
                    initialValue={initForm?.closeTime}
                >
                    <DatePicker showTime style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Giao cho lớp"
                    name="studentClassId"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn lớp học bạn muốn giao đề thi',
                        },
                    ]}
                    initialValue={initForm?.studentClassId}
                >
                    <Select options={options} placeholder="Chọn lớp bạn đã tạo"/>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ExamSettingForm;