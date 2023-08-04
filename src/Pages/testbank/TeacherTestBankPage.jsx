import { useState, useEffect } from 'react';
import { Modal, Table, Input, Row, Col, Space, Button, theme, Typography, message } from 'antd';
import { SUBJECT, GRADE, QUESTION_LEVEL, getLabel, compareEnum, createFilterFromEnum, QUESTION_STATUS } from '../../util/enum';
import { createFilterForProp, createFilterForNestedProp } from '../../util/arrayUtil';
import { callApproveQuestion, callGetAllQuestions, callArchiveQuestion, callDeleteQuestion, callCreateQuestion, callUpdateQuestion, callSearchQuestions } from './QuestionApi';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import QuestionDetailModal from './QuestionDetailModal';
import ManageTopicModal from './ManageTopicModal'
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const TeacherTestBankPage = () => {

    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();

    const qParam = queryParameters.get("qId");

    const [qId, setQId] = useState();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const {
        token: { colorWarning, colorInfo, colorBgBase, colorErrorActive },
    } = theme.useToken();

    const token = localStorage.getItem("token");
    const [questions, setQuestions] = useState([]);

    const [openDetailPopUp, setOpenDetailPopup] = useState(false);
    const [openTopicPopup, setOpenTopicPopup] = useState(false);

    const [action, setAction] = useState("get");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetAllQuestions(token);
                setQuestions([...data]);
            } catch (ignored) { 
                message.error(ignored.message)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (qParam) {
            setOpenDetailPopup(true);
            setQId(qParam);
        }
    },[qParam])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (<>
                <Typography.Link>
                    {id}
                </Typography.Link>
            </>)
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
        },
        {
            title: 'Lớp',
            dataIndex: 'grade',
            key: 'grade',
            render: (grade) => <span>
                {getLabel(GRADE, grade)}
            </span>,
            sorter: (a, b) => compareEnum(GRADE, a.grade, b.grade),
            filters: createFilterFromEnum(GRADE),
            onFilter: (value, record) => record.grade.indexOf(value) === 0
        },
        {
            title: 'Môn',
            dataIndex: 'subject',
            key: 'subject',
            render: (subject) => <span>
                {getLabel(SUBJECT, subject)}
            </span>,
            sorter: (a, b) => compareEnum(SUBJECT, a.subject, b.subject),
            filters: createFilterFromEnum(SUBJECT),
            onFilter: (value, record) => record.subject.indexOf(value) === 0
        },
        {
            title: 'Mức độ nhận biết',
            dataIndex: 'level',
            key: 'level',
            render: (level) => <span>
                {getLabel(QUESTION_LEVEL, level)}
            </span>,
            sorter: (a, b) => compareEnum(QUESTION_LEVEL, a.level, b.level),
            filters: createFilterFromEnum(QUESTION_LEVEL),
            onFilter: (value, record) => record.level.indexOf(value) === 0
        },
        {
            title: 'Chủ đề kiến thức',
            dataIndex: 'topic',
            key: 'topic',
            render: (topic) => <span>
                {topic?.name}
            </span>,
            filters: createFilterForNestedProp(questions, "topic", "name"),
            onFilter: (value, record) => record.topic?.name.indexOf(value) === 0,
        },
        {
            title: 'Số lượt sử dụng',
            dataIndex: 'examTimes',
            key: 'examTimes',
            sorter: (a, b) => a.examTimes - b.examTimes,
        },
        {
            title: 'Tạo bởi',
            dataIndex: 'createByUsername',
            key: 'createByUsername',
            filters: createFilterForProp(questions, "createByUsername"),
            onFilter: (value, record) => record.createBy?.username.indexOf(value) === 0,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span>
                {getLabel(QUESTION_STATUS, status)}
            </span>,
            filters: createFilterFromEnum(QUESTION_STATUS),
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
    ]

    const onSearch = async (value) => {
        try {
            const data = await callSearchQuestions(value, ['APPROVED', 'PENDING', 'ARCHIVED'], token);
            setQuestions(data);
        } catch (ignored) {
            message.error(ignored.message)
        }

    }

    const viewQuestion = (id) => {
        console.log("viewQuestion", id);
        setQId(id);
        setAction("get");
        setOpenDetailPopup(true);
    }

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));

    const openCreatePopup = () => {
        setQId(null);
        setAction("create");
        setOpenDetailPopup(true);
    }

    const handleFormOk = async (formData) => {
        console.log("action",action);
        console.log("formDta",formData);
        try {
            if (action === "create") {
                const newQuestion = await callCreateQuestion(formData, token);
                setQuestions([...questions, newQuestion])
                message.info('Tạo câu hỏi thành công')
            } else if (action === "update") {
                const updateQuestion = await callUpdateQuestion(formData, token);
                setQuestions(questions.map(e => e.id === updateQuestion.id ? updateQuestion : e));
                message.info('Sửa câu hỏi thành công')
            }
        } catch (ignored) {
            message.error(ignored.message)
        }
        setOpenDetailPopup(false);
    }

    return (<>
        <Row justify="space-between">
            <Col span={8}>
                <Search placeholder="Tìm câu hỏi theo nội dung" onSearch={onSearch} allowClear />
            </Col>
            <Col offset={2}>
                <Space>
                    <Button icon={<PlusOutlined/>} type="primary" onClick={openCreatePopup}>Tạo câu hỏi</Button>
                </Space>
            </Col>
        </Row>
        <Table className="mt-3"
            dataSource={addKey(questions)}
            columns={columns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => { viewQuestion(record.id) }, // click row
                };
            }} />
        <QuestionDetailModal qId={qId} open={openDetailPopUp} handleOk={handleFormOk} handleCancel={() => setOpenDetailPopup(false)} action={action} changeAction={setAction} />
    </>
    );
}
export default TeacherTestBankPage;