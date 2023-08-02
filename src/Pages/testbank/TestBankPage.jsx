import { Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Space, Table, Tag } from 'antd';
import { createQuestion, deleteQuestion, getAllQuestion, updateQuestion } from '../../services';
import { InputNumber } from 'antd';
import { Button, Input, Select, Form } from 'antd';
// import { Field, Form, Formik, FormikProps } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionDetailModal from './QuestionDetailModal';
import { SettingOutlined, DeleteOutlined, FileDoneOutlined, PlusOutlined } from "@ant-design/icons";
import { getLabel, GRADE, QUESTION_LEVEL, SUBJECT } from '../../util/enum';
import TopciSelectFormItem from '../../Components/Topic/TopicSelectFormItem';

const { Option } = Select;

function TestBankPage() {

    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const qId = queryParameters.get("qId");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questions, setQuestions] = useState([])
    const [questionModal, setQuestionModal] = useState({
        title: "",
        subject: '',
        level : null,
        topic : null,
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
            grade: data.grade,
            subject: data.subject,
            level : data.level,
            topic : data.topic
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
            grade: data.grade,
            questionType: data.questionType,
            subject: data.subject
        }
        return result
    }

    const onFinish = async (values) => {
        console.log("form values submit ", values);
        console.log("questionmodal  ", questionModal);
        // return;


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

            // console.log("update values ", questionModal);
            try {


                let updateResp = await updateQuestion(convertDataToDTOUpdate(questionModal));
                let updateData = updateResp.data;
                console.log("update resp ", updateResp);
                if (updateResp.status == 200) {
                    let newQuestions = structuredClone(questions);
                    newQuestions = newQuestions.map((item => {
                        if (item.id == updateData.id) {
                            item.subject = updateData.subject
                            item.questionType = updateData.questionType
                            item.grade = updateData.grade
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
                    })
                }
                // else {

                // }
            } catch (exception) {
                console.log("error ")
                setIsModalOpen(false)
                toast.error("Cannot update question exists in one exam!", {
                    position: toast.POSITION.TOP_CENTER
                });
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
            // console.log("response questions data ", data)
            return data.map((item, index) => {
                // console.log("checking item ",item.topic.name)
                let topicName = item.topic.name
                return {
                    index: index + 1,
                    key: item.id,
                    subject: item.subject,
                    id: item.id,
                    grade: item.grade,
                    correctAnswers: item.correctAnswers,
                    content: item.content,
                    level: item.level,
                    topicName: item?.topic?.name,
                    topicId: item?.topic?.id,
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
            console.log("checkpoint ",response)
            let questions = convertToQuestionWithKey(response)
            setQuestions(questions)
        })

    }, [])

    console.log("questions ", questions)

    const showModal = () => {
        let newQuestionModal = structuredClone(questionModal)
        newQuestionModal.title = "Tạo câu hỏi"
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


        setQuestionModal(newQuestionModal)
        setIsModalOpen(true);


    }
    const handleDeleteQuestion = async (id) => {
        console.log("deleting")
        try {
            let deleteResp = await deleteQuestion(id);
            console.log("delete resp ", deleteResp);
            if (deleteResp.status == 200) {
                let newQuestions = structuredClone(questions);
                newQuestions = newQuestions.filter((item) => {
                    return item.id !== id
                })
                setQuestions(newQuestions)
            }
        }
        catch (exception) {
            console.log("delete exception ")
        }

    }


    const columns = [
        {
            title: 'No.',
            dataIndex: 'index',
        },
        {
            title: 'Nội dung câu hỏi',
            dataIndex: 'content',
            key: 'content',
            render: (text) => <a>{text}</a>,
            filters: questions.map(question => {
                return {
                    text: question.content,
                    value: question.content
                }
            }),
            filterSearch: true,
            onFilter: (value, record) => { return record.content.includes(value) }
        },
        {
            title: 'Khối',
            dataIndex: 'grade',
            key: 'grage',
            render: (text, record, index) => {
                return getLabel(GRADE, text)
            },
            sorter: (a, b) => a.grade.split("_")[1] - b.grade.split("_")[1],

        },
        {
            title: 'Môn học',
            dataIndex: 'subject',
            key: 'address',
            render: (text, record, index) => {
                return getLabel(SUBJECT, text)
            },
            sorter: (a, b) => a.subject.localeCompare(b.subject),

        },
        {
            title: 'Mức độ nhận biết',
            dataIndex: 'level',
            key: 'questionType',
            render: (text, record, index) => {
                return getLabel(QUESTION_LEVEL, text)
            },
            sorter: (a, b) => a.questionType.localeCompare(b.questionType),
        },
        {
            title: 'Nội dung kiến thức',
            dataIndex:"topicName",
            key: 'questionType',
            sorter: (a, b) => a.questionType.localeCompare(b.questionType),
        },
        {

            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<SettingOutlined />} onClick={() => { handleClickUpdate(record) }}></Button>

                    <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => { handleDeleteQuestion(record.id) }}>

                    </Button>
                </Space>
            ),
        },
    ];

    const cards = [
        {
            title: <><Button onClick={() => { showModal() }} >Tạo câu hỏi</Button></>,
            element: <div style={{ width: "100%" }}>
                <Table  columns={columns} dataSource={questions} />
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
            <Button icon={<PlusOutlined />} onClick={() => { showModal() }}>Tạo câu hỏi </Button>
            <Table columns={columns} dataSource={questions} />
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
                >
                    <Form.Item

                        initialValues={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.content}
                        label="Nội dung câu hỏi"
                        name="content"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}

                    >
                        <Input.TextArea onChange={(event) => { handleFormFieldChange('content', event.target.value) }} defaultValue={questionModal.content == 'Tạo câu hỏi' ? '' : questionModal.content} value={questionModal.title} />
                    </Form.Item>

                    <Form.Item initialValues={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.grade} name="grade" label="Grade"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                    >
                        <Select
                            placeholder="Khối"
                            //   onChange={onGenderChange}
                            allowClear
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.grade}
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
                        initialValues={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.subject} name="subject" label="Môn học"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                    >
                        <Select
                            placeholder="Select subject"
                            //   onChange={onGenderChange}
                            allowClear
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.subject}
                            onChange={(value) => { handleFormFieldChange('subject', value) }}

                        >
                            <Option value="ENG">English</Option>
                            <Option value="PHY">Physics</Option>
                            <Option value="CHEM">Chemestry</Option>
                            <Option value="MATH">Math</Option>
                            <Option value="BIO">Biology</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        initialValues={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.level} name="level" label="Mức độ nhận biết"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                    >
                        <Select
                            placeholder="Mức độ nhận biết"
                            allowClear
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.level}
                            onChange={(value) => { handleFormFieldChange('level', value) }}

                        >
                            {
                                QUESTION_LEVEL.map(item => {
                                    return <Option value={item.value}>{item.label}</Option>
                                })
                            }

                        </Select>
                    </Form.Item>

                    <Form.Item name="topic" initialValues={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.topicName} label="topic"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                    >
                        <TopciSelectFormItem fieldName={["topic", "id"]}></TopciSelectFormItem>
                    </Form.Item>
                    <Form.Item
                        initialValues={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.answerAContent}
                        label="Đáp án A"
                        name="answerA"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                        onChange={(event) => { handleFormFieldChange('answerAContent', event.target.value) }}

                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.answerAContent}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Đáp án B"
                        name="answerB"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.answerBContent}
                            onChange={(event) => { handleFormFieldChange('answerBContent', event.target.value) }}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Đáp án C"
                        name="answerC"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.answerCContent}
                            onChange={(event) => { handleFormFieldChange('answerCContent', event.target.value) }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Đáp án D"
                        name="answerD"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}
                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.answerDContent}
                            onChange={(event) => { handleFormFieldChange('answerDContent', event.target.value) }}
                        />
                    </Form.Item>
                    <Form.Item name="Đáp án đúng" label="Correct answer"
                        rules={[{ required: questionModal.title == 'Tạo câu hỏi' }]}

                    >
                        <Input.TextArea
                            defaultValue={questionModal.title == 'Tạo câu hỏi' ? '' : questionModal.correctAnswers}
                            onChange={(event) => { handleFormFieldChange('correctAnswers', event.target.value) }}

                        />
                    </Form.Item>




                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>


            </Modal>

            <QuestionDetailModal qId={qId} open={true} />

        </>
    )
}

export default TestBankPage;