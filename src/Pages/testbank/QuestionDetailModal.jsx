import { useEffect, useState } from "react";
import { ANSWER_KEY, GRADE, SUBJECT, QUESTION_LEVEL } from "../../util/enum";
import { getQuestionById } from '../../services';
import { Form, Select, Modal, Input, Space } from 'antd';
import TopicSelectFormItem from '../../Components/Topic/TopicSelectFormItem';

const { TextArea } = Input;

const QuestionDetailModal = ({ qId, open, handleOk, handleCancel }) => {

    const [form] = Form.useForm();

    const [question, setQuestion] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Calling single question")
                const resp = await getQuestionById(qId);
                if (resp.status === 200) {
                    setQuestion(resp.data);
                }

            } catch (ignored) { }
        }
        if (qId) {
            fetchData();
        }
    }, [qId])

    useEffect(() => {
        form.setFieldsValue(question);
    }, [question])

    const onFinish = () => {
        console.log(form.getFieldValue())
    }

    return (
        <Modal title={`Câu hỏi ${qId}`} open={open} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                name="dynamic_form_complex"
                style={{
                    maxWidth: 600,
                }}
                autoComplete="off"
            >
                <Form.Item
                    name="content"
                    label="Nội dung câu hỏi"
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.List name="answers">
                    {(fields) => {
                        console.log(fields);
                        return (
                            <div>
                                {fields.map((field) => {
                                    return (<>
                                        <Space align="center">
                                            <span>Đáp án</span>
                                            <Form.Item
                                                
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
                    label="Nội dung kiến thức"
                >
                    <TopicSelectFormItem fieldName={["topic","id"]} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default QuestionDetailModal;