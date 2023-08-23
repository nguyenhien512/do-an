import { useEffect, useState } from "react";
import { ANSWER_KEY, GRADE, SUBJECT, QUESTION_LEVEL } from "../../util/enum";
import { getQuestionById } from '../../services';
import { Form, Select, Modal, Input, Space, Button, Row, message } from 'antd';
import TopicSelectFormItem from '../../Components/Topic/TopicSelectFormItem';
import { useResetFormOnCloseModal } from "../../hooks/resetForm";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const QuestionDetailModal = ({ qId, open, handleOk, handleCancel, action, changeAction, disabledEdit }) => {

    const [form] = Form.useForm();

    useResetFormOnCloseModal(form, open);

    const emptyQuestion = {
        answers: [
            {
                key: 'A'
            },
            {
                key: 'B'
            },
            {
                key: 'C'
            },
            {
                key: 'D'
            }
        ]
    }

    const [question, setQuestion] = useState(emptyQuestion);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Calling single question")
                const resp = await getQuestionById(qId);
                if (resp.status === 200) {
                    setQuestion(resp.data);
                }

            } catch (ignored) {
                message.error(ignored.message)
             }
        }
        if (qId) {
            fetchData();
        }
    }, [open, qId])

    useEffect(() => {
        if (open && !qId) {
            form.resetFields();
            form.setFieldsValue(emptyQuestion);
        }
    }, [open,qId])

    useEffect(() => {
        form.setFieldValue("content", question.content);
        form.setFieldValue("answers", question.answers);
        form.setFieldValue("id", question.id);
        form.setFieldValue("level", question.level);
        form.setFieldValue("grade", question.grade);
        form.setFieldValue("subject", question.subject);
        form.setFieldValue(["topic","id"], question.topic?.id);
        form.setFieldValue("comment", question.comment);
        form.setFieldValue("correctAnswers", question.correctAnswers);
    }, [question])

    const onOk = () => {
        console.log(form.getFieldsValue(true))
        handleOk(form.getFieldsValue(true));
    }

    return (
        <Modal 
        title={`Câu hỏi ${qId ? qId : 'mới'}`} 
        open={open} 
        onOk={onOk} 
        onCancel={handleCancel} >
            <Row justify="end">
                {qId && !disabledEdit && <Button icon={<EditOutlined />} type="primary" disabled={action === 'create'} onClick={() => changeAction("update")}></Button>}
            </Row>
            <Row className="mt-3">
                <Form
                    form={form}
                    name="dynamic_form_complex"
                    style={{
                        maxWidth: 600,
                    }}
                    autoComplete="off"
                    disabled={action === "get" || disabledEdit}
                >
                    <Form.Item
                        name="content"
                        label="Nội dung câu hỏi"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.List name="answers">
                        {(fields) => {
                            return (
                                <div>
                                    {fields.map((field, index) => {
                                        return (<>
                                            <Space align="center">
                                                <span>Đáp án</span>
                                                <Form.Item
                                                    key={index}
                                                    name={[field.name, 'key']}>
                                                    <Select options={ANSWER_KEY}
                                                        style={{ position: 'relative', top: '10px' }} />
                                                </Form.Item>
                                                <Form.Item

                                                    name={[field.name, 'content']}>
                                                    <Input style={{ position: 'relative', top: '10px' }} />
                                                </Form.Item>
                                            </Space>
                                        </>
                                        );
                                    })
                                    }
                                </div>
                            )
                        }
                        }
                    </Form.List>
                    <Form.Item
                        name="correctAnswers"
                        label="Đáp án đúng"
                        rules={[
                            {
                                type: 'enum',
                                enum: ['A', 'B', 'C', 'D'],
                                message: 'Chọn một trong bốn đáp án!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="grade"
                        label="Lớp"
                    >
                        <Select options={GRADE} />
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Môn"
                    >
                        <Select options={SUBJECT} />
                    </Form.Item>
                    <Form.Item
                        name="level"
                        label="Mức độ nhận biết"
                    >
                        <Select options={QUESTION_LEVEL} />
                    </Form.Item>
                    <Form.Item
                        name="topic"
                        label="Chủ đề kiến thức"
                    >
                        <TopicSelectFormItem fieldName={["topic", "id"]} />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Ghi chú"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Row>
        </Modal>
    )
}
export default QuestionDetailModal;