import { Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Space, Table, Tag } from 'antd';
import { createQuestion, getAllQuestion } from '../../services';
import { InputNumber } from 'antd';
import { Button,  Input, Select } from 'antd';
import { Field, Form, Formik, FormikProps } from 'formik';

const { Option } = Select;

const MyInput = ({ field, form, ...props }) => {
    return <input {...field} {...props} />;
  };
  
function TeacherDashboardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questions, setQuestions] = useState([])
    const [questionModal, setQuestionModal] = useState({
        title: "",
        id: null,
        content: "",
        grade: 0,
        subject: "",
        questionType: "",
        answers: [],
        correctAnswers: "",
        examTime: null
    })

    const convertFormDataToDTO = (
        data
    ) => {
        let answers = []
        answers.push({ key: 'A', content: data.answerA })
        answers.push({ key: 'B', content: data.answerB })
        answers.push({ key: 'C', content: data.answerC })
        answers.push({ key: 'D', content: data.answerD })

        let result = {
            answers: answers,
            content: data.content,
            correctAnswers: data.correctAnswers,
            examTimes: data.examTimes,
            grade: data.grade,
            questionType: data.questionType,
            subject: data.subject
        }
        return result

    }

    const onFinish = async (values) => {
        console.log("form values submit ", values);
        await createQuestion(convertFormDataToDTO(values))

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    // END FORMS

    // get all the question
    useEffect(() => {
        async function getQuestions() {
            let questionsResp = await getAllQuestion();
            // console.log("question resp ",questionsResp);
            return questionsResp.data
        }

        function convertToQuestionWithKey(data) {
            return data.map((data, index) => {
                return {
                    index: index + 1,
                    key: data.id,
                    ...data
                }
            })
        }
        //   let questi
        getQuestions().then(response => {
            // console.log("checkpoint ",response)
            let questions = convertToQuestionWithKey(response)
            setQuestions(questions)
        })

    }, [])

    const showModal = () => {
        let newQuestionModal = structuredClone(questionModal)
        newQuestionModal.title = "Create Question"
        setQuestionModal(newQuestionModal)
        setIsModalOpen(true);

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClickUpdate = (record) => {
        console.log("update record ", record)
        let newQuestionModal = structuredClone(questionModal)
        newQuestionModal.title = "Update question"
        newQuestionModal.id = record.id
        newQuestionModal.content = record.content
        newQuestionModal.grade = record.grade
        newQuestionModal.subject = record.subject
        newQuestionModal.questionType = record.questionType
        newQuestionModal.answers = record.answers
        newQuestionModal.correctAnswers = record.correctAnswers
        newQuestionModal.examTime = record.examTime

        console.log("new question modal", newQuestionModal);

        setQuestionModal(newQuestionModal)
        setIsModalOpen(true);


    }


    const columns = [
        {
            title: 'No.',
            dataIndex: 'index',
        },
        {
            title: 'content',
            dataIndex: 'content',
            key: 'content',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'grade',
            dataIndex: 'grade',
            key: 'age',
        },
        {
            title: 'subject',
            dataIndex: 'subject',
            key: 'address',
        },
        {
            title: 'questionType',
            dataIndex: 'questionType',
            key: 'questionType',
        },
        {
            title: 'Action',
            key: 'Action',
            dataIndex: 'Action',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),

            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => { handleClickUpdate(record) }}>Update</Button>

                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const cards = [
        {
            title: <><span style={{ marginRight: '50px' }}>Question bank</span><Button onClick={() => { showModal() }} >CreateQuestion</Button></>,
            element: <div style={{ width: "100%" }}>
                <Table columns={columns} dataSource={questions} />
            </div>
        }
    ];
    console.log("checkpoint ", questionModal)

    return (
        <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={cards}
                renderItem={(item) => (
                    <List.Item>
                        <Card style={{ width: '800px' }} title={item.title}>
                            {item.element}

                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title={questionModal.title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="OK"
                cancelText="Cancel"
                style={{
                    width: '1000px'
                }}
                destroyOnClose={true}
                footer={null}

            >
                
                <Form
                    name="basic"
                    style={{ maxWidth: 6000 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    destroyOnClose={true}
                >
                    <Form.Item
                        label="Question content"
                        name="content"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea value={questionModal.title} />
                    </Form.Item>

                    <Form.Item name="grade" label="Grade" rules={[{ required: true, }]}>
                        <Select
                            placeholder="Grade "
                            //   onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="GRADE_1">GRADE_1</Option>
                            <Option value="GRADE_2">GRADE_2</Option>
                            <Option value="GRADE_3">GRADE_3</Option>
                            <Option value="GRADE_4">GRADE_4</Option>
                            <Option value="GRADE_5">GRADE_5</Option>
                            <Option value="GRADE_6">GRADE_6</Option>
                            <Option value="GRADE_7">GRADE_7</Option>
                            <Option value="GRADE_8">GRADE_8</Option>
                            <Option value="GRADE_9">GRADE_9</Option>
                            <Option value="GRADE_10">GRADE_10</Option>
                            <Option value="GRADE_11">GRADE_11</Option>
                            <Option value="GRADE_12">GRADE_12</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select subject"
                            //   onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="ENG">English</Option>
                            <Option value="PHY">Physics</Option>
                            <Option value="CHEM">Chemestry</Option>
                            <Option value="MATH">Math</Option>
                            <Option value="BIO">Biology</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item name="questionType" label="Question type" rules={[{ required: true, }]}>
                        <Select
                            placeholder="Multiple or single choice question ?"
                            //   onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="MULTIPLE_CHOICE">MULTIPLE_CHOICE</Option>
                            <Option value="SINGLE_CHOICE">SINGLE_CHOICE</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Answer A"
                        name="answerA"
                        rules={[{ required: true, }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Answer B"
                        name="answerB"
                        rules={[{ required: true, }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Answer C"
                        name="answerC"
                        rules={[{ required: true, }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Answer D"
                        name="answerD"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="correctAnswers" label="Correct answer" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form> 
                
     
            </Modal>

        </>
    )
}

export default TeacherDashboardPage;