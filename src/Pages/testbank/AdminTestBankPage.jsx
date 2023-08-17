import { useState, useEffect } from 'react';
import { Modal, Table, Input, Row, Col, Space, Button, theme, Typography, message } from 'antd';
import { SUBJECT, GRADE, QUESTION_LEVEL, getLabel, compareEnum, createFilterFromEnum, QUESTION_STATUS } from '../../util/enum';
import { createFilterForProp, createFilterForNestedProp } from '../../util/arrayUtil';
import { callApproveQuestion, callGetAllQuestions, callArchiveQuestion, callDeleteQuestion, callRejectQuestion } from './QuestionApi';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import QuestionDetailModal from './QuestionDetailModal';
import { callSearchQuestions } from './QuestionApi';
import ManageTopicModal from './ManageTopicModal'

const { Search } = Input;

const AdminTestBankPage = () => {

    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();

    const [selectedQuestions, setSelectedQuestions] = useState();
    const [qId, setQId] = useState(queryParameters.get("qId"));
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const {
        token: { colorWarning, colorInfo, colorBgBase, colorErrorActive },
    } = theme.useToken();

    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedQuestions(selectedRows.map(record => record.id));
        }
    };

    const token = localStorage.getItem("token");
    const [questions, setQuestions] = useState([]);

    const [openDetailPopUp, setOpenDetailPopup] = useState(false);
    const [openTopicPopup, setOpenTopicPopup] = useState(false);
    const [openApprovePopup, setOpenApprovePopup] = useState(false);

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
        }
        catch (ignored) {
            message.error(ignored.message)
        }
    }

    const viewQuestion = (id) => {
        console.log("viewQuestion", id);
        setQId(id);
        setOpenDetailPopup(true);
    }

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));

    const hasSelected = selectedRowKeys.length > 0;

    const approve = async () => {
        try {
            const status = await callApproveQuestion(selectedQuestions, token);
            setOpenApprovePopup(false);
            setQuestions(questions.map(e => selectedQuestions.includes(e.id) ? { ...e, status: 'APPROVED' } : e))
            message.info('Phê duyệt câu hỏi thành công')
        } catch (ignored) {
            message.error(ignored.message)
        }
    }

    const reject = async () => {
        try {
            const status = await callRejectQuestion(selectedQuestions, token);
            setOpenApprovePopup(false);
            setQuestions(questions.map(e => selectedQuestions.includes(e.id) ? { ...e, status: 'REJECTED' } : e))
            message.info('Từ chối câu hỏi thành công')
        } catch (ignored) {
            message.error(ignored.message)
        }
    }

    const archive = async () => {
        try {
            const status = await callArchiveQuestion(selectedQuestions, token);
            setQuestions(questions.map(e => selectedQuestions.includes(e.id) ? { ...e, status: 'ARCHIVED' } : e))
            message.info('Đã đưa câu hỏi vào lưu trữ.')
        } catch(ignored) {
            message.error(ignored.message)
        }
    }

    const deleteQuestion = async () => {
        try {
            const status = await callDeleteQuestion(selectedQuestions, token);
            setQuestions(questions.filter(e => !selectedQuestions.includes(e.id)));
            message.info('Xóa câu hỏi thành công');
        } catch (ignored) {
            message.error(ignored.message)
        }
    }

    return (<>
        <Row justify="space-between">
            <Col span={8}>
                <Search placeholder="Tìm câu hỏi theo nội dung" onSearch={onSearch} allowClear />
                {hasSelected ? <span>Đã chọn {selectedRowKeys.length} câu hỏi</span> : null}
            </Col>
            <Col offset={2}>
                <Button id='alternative-btn' style={{ backgroundColor: colorWarning, color: colorBgBase }} onClick={() => setOpenTopicPopup(true)}>Quản lý Chủ đề kiến thức</Button>
            </Col>
            <Col offset={2}>
                <Space>
                    <Button type="primary" onClick={() => setOpenApprovePopup(true)}>Phê duyệt</Button>
                    <Button type="primary" danger onClick={() => deleteQuestion()}  >Xóa</Button>
                    <Button onClick={() => archive()}>Lưu trữ</Button>
                </Space>
            </Col>
        </Row>
        <Table className="mt-3"
            dataSource={addKey(questions)}
            columns={columns}
            rowSelection={rowSelection}
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => { viewQuestion(record.id) }, // click row
                };
            }} />
        <QuestionDetailModal qId={qId} open={openDetailPopUp} handleOk={() => setOpenDetailPopup(false)} handleCancel={() => setOpenDetailPopup(false)} disabledEdit={true}/>

        <ManageTopicModal open={openTopicPopup} handleOk={() => setOpenTopicPopup(false)} handleCancel={() => setOpenTopicPopup(false)} />
        <Modal title="Phê duyệt câu hỏi" open={openApprovePopup} onOk={() => approve()} cancelButtonProps={{onClick: () => reject()}} okText="Phê duyệt" cancelText="Từ chối" onCancel={() => setOpenApprovePopup(false)}>
            <p>Bạn có muốn phê duyệt các câu hỏi đã chọn?</p>
        </Modal>
    </>
    );
}
export default AdminTestBankPage;