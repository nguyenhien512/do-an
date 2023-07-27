import React from 'react';
import { Select, DatePicker, Form, Input, InputNumber, Modal, Row, Col, Button } from 'antd';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { callGetClasses } from '../manage-class/ClassApi';

function ExamSettingForm({ disabled, handleCancel, handleSubmit, initForm }) {

    console.log("initFormCheck", initForm)

    const formRef = useRef(null);

    const [classes, setClasses] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (initForm) {
            formRef.current?.setFieldsValue(initForm);
        }
    }, [initForm])

    useEffect(() => {
        async function fetchData() {
            const data = await callGetClasses(token);
            setClasses([...data]);
        }
        fetchData();
    }, [])

    const options = classes?.map(item => ({
        value: item.id,
        label: item.name
    }))

    const onFinish = (values) => {
        handleSubmit(values);
    };

    const onCancel = () => {
        formRef.current?.setFieldsValue(initForm);
        handleCancel();
    }

    return (
        <Form
            name="settingForm"
            layout="horizontal"
            autoComplete="off"
            style={{ width: '100%' }}
            onFinish={onFinish}
            ref={formRef}
            disabled={disabled}
        >
            <Row justify="space-between">
                <Col span={8}>
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Yêu cầu nhập tên đề thi!',
                            },
                        ]}

                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Giao cho lớp"
                        name="studentClassId"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy chọn lớp học bạn muốn giao đề thi',
                            },
                        ]}
                    >
                        <Select options={options} placeholder="Chọn lớp bạn đã tạo" />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="space-between">
                <Col span={8}>
                    <Form.Item
                        label="Thời gian làm bài (phút)"
                        name="maxDuration"
                        rules={[
                            {
                                required: true,
                                message: 'Yêu cầu nhập thời gian làm bài!',
                            },
                        ]}                    >
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Số lần thi tối đa đối với mỗi học sinh"
                        name="maxRetry"
                        rules={[
                            {
                                required: true,
                                message: 'Yêu cầu nhập số lần thi tối đa!',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='space-between' wrap={false}>
                <Col span={8}>
                    <Form.Item
                        label="Thời điểm mở đề thi"
                        name="openTime"
                        rules={[
                            {
                                required: true,
                                message: 'Yêu cầu nhập thời điểm mở đề thi!',
                            },
                        ]}
                    >
                        <DatePicker showTime style={{ width: '100%' }} placement="bottomRight"/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Thời điểm đóng đề thi"
                        name="closeTime"
                        rules={[
                            {
                                required: true,
                                message: 'Yêu cầu nhập thời điểm đóng đề thi!',
                            },
                        ]}
                    >
                        <DatePicker showTime style={{ width: '100%' }} placement="bottomRight" />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='end'>
                <Col span={2}>
                    <Button onClick={onCancel}>
                        Hủy
                    </Button>
                </Col>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default ExamSettingForm;