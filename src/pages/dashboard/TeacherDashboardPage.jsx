import { Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Space, Table, Tag } from 'antd';
import { createQuestion, deleteQuestion, getAllQuestion, updateQuestion } from '../../services';
import { InputNumber } from 'antd';
import { Button, Input, Select, Form } from 'antd';
// import { Field, Form, Formik, FormikProps } from 'formik';

const { Option } = Select;

function TeacherDashboardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questions, setQuestions] = useState([])
    const [questionModal, setQuestionModal] = useState({
        title: "",
        subject: '',
        questionType: '',
        id: null,
        grade: '',
        correctAnswers: '',
        content: '',
        answerAId: null,
        answerAKey: null,
        answerAContent: null,
        answerBId: null,
        answerBKey: null,
        answerBContent: null,
        answerDId: null,
        answerDKey: null,
        answerDContent: null,
        answerCId: null,
        answerCKey: null,
        answerCContent: null,
        examTimes: null
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

    const convertDataToDTOUpdate = (data) => {
        let answers = []
        answers.push({ id: data.answerAId, key: data.answerAKey, content: data.answerAContent })
        answers.push({ id: data.answerBId, key: data.answerBKey, content: data.answerBContent })
        answers.push({ id: data.answerCId, key: data.answerAKey, content: data.answerCContent })
        answers.push({ id: data.answerDId, key: data.answerDKey, content: data.answerDContent })

        let result = {
            id: data.id,
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
        console.log("questionmodal  ", questionModal);

        if (questionModal.title == 'Create Question') {
            let resp = await createQuestion(convertFormDataToDTO(values))
            console.log("resp ", resp)
            let createdQuestionData = resp.data
            if (resp.status == 201) {
                let newQuestions = structuredClone(questions);
                let newQuestion = {
                    index: newQuestions.length + 1,
                    key: createdQuestionData.id,
                    subject: createdQuestionData.subject,
                    questionType: createdQuestionData.questionType,
                    id: createdQuestionData.id,
                    grade: createdQuestionData.grade,
                    examTimes: createdQuestionData.examTimes,
                    correctAnswers: createdQuestionData.correctAnswers,
                    content: createdQuestionData.content,
                    answerA: {
                        id: createdQuestionData.answers[0].id,
                        key: createdQuestionData.answers[0].key,
                        content: createdQuestionData.answers[0].content
                    },
                    answerB: {
                        id: createdQuestionData.answers[1].id,
                        key: createdQuestionData.answers[1].key,
                        content: createdQuestionData.answers[1].content
                    },
                    answerC: {
                        id: createdQuestionData.answers[2].id,
                        key: createdQuestionData.answers[2].key,
                        content: createdQuestionData.answers[2].content
                    },
                    answerD: {
                        id: createdQuestionData.answers[3].id,
                        key: createdQuestionData.answers[3].key,
                        content: createdQuestionData.answers[3].content
                    }
                }
                newQuestions.push(newQuestion);
                setQuestions(newQuestions);
                setIsModalOpen(false);
            }
            return;
        } else {
            console.log("update values ", questionModal);
            let updateResp = await updateQuestion(convertDataToDTOUpdate(questionModal));
            let updateData = updateResp.data;
            console.log("update resp ", updateResp);
            if (updateResp.status == 200) {
                let newQuestions = structuredClone(questions);
                newQuestions = newQuestions.map((item => {
                    if (item.id == updateData.id) {
                        // item.subject = updateData.subject,
                        item.questionType = updateData.questionType
                        item.grade = updateData.grade
                        item.examTimes = updateData.examTimes
                        item.correctAnswers = updateData.correctAnswers
                        item.content = updateData.content
                        item.answerA = {
                            id: updateData.answers[0].id,
                            key: updateData.answers[0].key,
                            content: updateData.answers[0].content
                        }
                        item.answerB = {
                            id: updateData.answers[1].id,
                            key: updateData.answers[1].key,
                            content: updateData.answers[1].content
                        }
                        item.answerC = {
                            id: updateData.answers[2].id,
                            key: updateData.answers[2].key,
                            content: updateData.answers[2].content
                        }
                        item.answerD = {
                            id: updateData.answers[3].id,
                            key: updateData.answers[3].key,
                            content: updateData.answers[3].content
                        }
                    }
                    return item
                }))

                setQuestions(newQuestions)
                setIsModalOpen(false)
                setQuestionModal({
                    title: "",
                    subject: '',
                    questionType: '',
                    id: null,
                    grade: '',
                    correctAnswers: '',
                    content: '',
                    answerAId: null,
                    answerAKey: null,
                    answerAContent: null,
                    answerBId: null,
                    answerBKey: null,
                    answerBContent: null,
                    answerDId: null,
                    answerDKey: null,
                    answerDContent: null,
                    answerCId: null,
                    answerCKey: null,
                    answerCContent: null,
                    examTimes: null
                })
            }

        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log("question modal ", questionModal)


    // END FORMS

    // get all the question
    useEffect(() => {
        async function getQuestions() {
            let questionsResp = await getAllQuestion();
            // console.log("question resp ",questionsResp);
            return questionsResp.data
        }

        function convertToQuestionWithKey(data) {
            console.log("checkpoint 10 ", data)
            return data.map((item, index) => {
                return {
                    index: index + 1,
                    key: data.id,
                    subject: item.subject,
                    questionType: item.questionType,
                    id: item.id,
                    grade: item.grade,
                    examTimes: item.examTimes,
                    correctAnswers: item.correctAnswers,
                    content: item.content,
                    answerA: {
                        id: item.answers[0].id,
                        key: item.answers[0].key,
                        content: item.answers[0].content
                    },
                    answerB: {
                        id: item.answers[1].id,
                        key: item.answers[1].key,
                        content: item.answers[1].content
                    },
                    answerC: {
                        id: item.answers[2].id,
                        key: item.answers[2].key,
                        content: item.answers[2].content
                    },
                    answerD: {
                        id: item.answers[3].id,
                        key: item.answers[3].key,
                        content: item.answers[3].content
                    }
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
        newQuestionModal.answerAId = record.answerA.id
        newQuestionModal.answerAKey = record.answerA.key
        newQuestionModal.answerAContent = record.answerA.content
        newQuestionModal.answerBId = record.answerB.id
        newQuestionModal.answerBKey = record.answerB.key
        newQuestionModal.answerBContent = record.answerB.content
        newQuestionModal.answerCId = record.answerC.id
        newQuestionModal.answerCKey = record.answerC.key
        newQuestionModal.answerCContent = record.answerC.content
        newQuestionModal.answerDId = record.answerD.id
        newQuestionModal.answerDKey = record.answerD.key
        newQuestionModal.answerDContent = record.answerD.content
        newQuestionModal.correctAnswers = record.correctAnswers
        newQuestionModal.examTimes = record.examTimes


        setQuestionModal(newQuestionModal)
        setIsModalOpen(true);


    }
    const handleDeleteQuestion = async (id) => {
        console.log("deleting")
        try {
            let deleteResp = await deleteQuestion(id);
            console.log("delete resp ", deleteResp);
            if (deleteResp.status == 400) {

            }
        }
        catch (exception) {
            console.log(exception)

        }

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

                    <Button type="primary" danger onClick={() => { handleDeleteQuestion(record.id) }}>
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
    // console.log("qm ", questionModal)
    const handleFormFieldChange = (attribute, value) => {
        console.log("checkpoint 2 ", attribute, value)
        let newQuestionModal = structuredClone(questionModal);
        newQuestionModal[`${attribute}`] = value
        setQuestionModal(newQuestionModal);
    }

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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                // destroyOnClose={true}
                >
                    <Form.Item

                        initialValues={questionModal.title == 'Create Question' ? '' : questionModal.content}
                        label="Question content"
                        name="content"
                        rules={[{ required: questionModal.title == 'Create Question' }]}

                    >
                        <Input.TextArea onChange={(event) => { handleFormFieldChange('content', event.target.value) }} defaultValue={questionModal.content == 'Create Question' ? '' : questionModal.content} value={questionModal.title} />
                    </Form.Item>

                    <Form.Item initialValues={questionModal.title == 'Create Question' ? '' : questionModal.grade} name="grade" label="Grade"
                        rules={[{ required: questionModal.title == 'Create Question' }]}
                    >
                        <Select
                            placeholder="Grade "
                            //   onChange={onGenderChange}
                            allowClear
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.grade}
                            onChange={(value) => { handleFormFieldChange('grade', value) }}
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

                    <Form.Item
                        initialValues={questionModal.title == 'Create Question' ? '' : questionModal.subject} name="subject" label="Subject"
                        rules={[{ required: questionModal.title == 'Create Question' }]}
                    >
                        <Select
                            placeholder="Select subject"
                            //   onChange={onGenderChange}
                            allowClear
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.subject}
                            onChange={(value) => { handleFormFieldChange('subject', value) }}

                        >
                            <Option value="ENG">English</Option>
                            <Option value="PHY">Physics</Option>
                            <Option value="CHEM">Chemestry</Option>
                            <Option value="MATH">Math</Option>
                            <Option value="BIO">Biology</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item initialValues={questionModal.title == 'Create Question' ? '' : questionModal.questionType} name="questionType" label="Question type"
                        rules={[{ required: questionModal.title == 'Create Question' }]}
                    >
                        <Select
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.questionType}
                            placeholder="Multiple or single choice question ?"
                            //   onChange={onGenderChange}
                            allowClear
                            onChange={(value) => { handleFormFieldChange('questionType', value) }}

                        >
                            <Option value="MULTIPLE_CHOICE">MULTIPLE_CHOICE</Option>
                            <Option value="SINGLE_CHOICE">SINGLE_CHOICE</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        initialValues={questionModal.title == 'Create Question' ? '' : questionModal.answerAContent}
                        label="Answer A"
                        name="answerA"
                        rules={[{ required: questionModal.title == 'Create Question' }]}
                        onChange={(event) => { handleFormFieldChange('answerAContent', event.target.value) }}

                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.answerAContent}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Answer B"
                        name="answerB"
                        rules={[{ required: questionModal.title == 'Create Question' }]}
                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.answerBContent}
                            onChange={(event) => { handleFormFieldChange('answerBContent', event.target.value) }}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Answer C"
                        name="answerC"
                        rules={[{ required: questionModal.title == 'Create Question' }]}
                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.answerCContent}
                            onChange={(event) => { handleFormFieldChange('answerCContent', event.target.value) }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Answer D"
                        name="answerD"
                        rules={[{ required: questionModal.title == 'Create Question' }]}
                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.answerDContent}
                            onChange={(event) => { handleFormFieldChange('answerDContent', event.target.value) }}
                        />
                    </Form.Item>
                    <Form.Item name="correctAnswers" label="Correct answer"
                        rules={[{ required: questionModal.title == 'Create Question' }]}

                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.correctAnswers}
                            onChange={(event) => { handleFormFieldChange('correctAnswers', event.target.value) }}

                        />
                    </Form.Item>

                    <Form.Item name="examTimes" label="Exam time"
                        rules={[{ required: questionModal.title == 'Create Question' }]}

                    >
                        <InputNumber
                            defaultValue={questionModal.title == 'Create Question' ? '' : questionModal.examTimes}
                            onChange={(value) => { handleFormFieldChange('examTimes', value) }}

                        />
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