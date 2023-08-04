import { callCreateExam, callGetExamsOfTeacher } from './TeacherExamApi';
import { Table, Tag, Button, Space, Row, Col, theme, message } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { formatDateTime } from '../../util/dateTimeUtil';
import { SettingOutlined, FileDoneOutlined, PlusOutlined } from "@ant-design/icons";
import CreateExamModal from './CreateExamModal';
import { createFilterForProp } from '../../util/arrayUtil';
import { EXAM_STATUS, createFilterFromEnum } from '../../util/enum';

function TeacherExamPage() {

    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [openPopup, setOpenPop] = useState(false);

    const [allowMatrix, setAllowMatrix] = useState(false);

    const {
        token: { colorWarning, colorInfo, colorBgBase, colorErrorActive },
    } = theme.useToken();


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetExamsOfTeacher(token);
                setExams([...data]);
            } catch (ignored) {
                message.error(ignored.message);
             }
        }
        fetchData();
    }, [])

    console.log("exams", exams);

    const viewTests = (id) => {
        const params = { examId: id };
        navigate({
            pathname: '/teacher/exam/tests',
            search: `?${createSearchParams(params)}`,
        });

    }

    const viewExamSettings = (id) => {
        const params = { examId: id, allowMatrix: allowMatrix.toString() };
        navigate({
            pathname: '/teacher/exam/settings',
            search: `?${createSearchParams(params)}`,
        });

    }

    const createExam = async (exam) => {
        try {
            const data = await callCreateExam(exam, token);
            viewExamSettings(data.id);
            message.info('Đã tạo một đề thi. Hãy bổ sung cài đặt và nội dung cho đề thi.')
        } catch (ignored) {
            message.error(ignored.message);
        }
    }

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số lượt thi',
            dataIndex: 'examTimes',
            key: 'examTimes'
        },
        {
            title: 'Thời gian mở',
            dataIndex: 'openTime',
            key: 'openTime',
            render: (openTime) => (
                <span>{formatDateTime(openTime)}</span>
            ),
            sorter: (a,b) => Date.parse(a.openTime) - Date.parse(b.openTime),
        },
        {
            title: 'Thời gian đóng',
            dataIndex: 'closeTime',
            key: 'closeTime',
            render: (closeTime) => (
                <span>{formatDateTime(closeTime)}</span>
            ),
            sorter: (a,b) => Date.parse(a.closeTime) - Date.parse(b.closeTime),
        },
        {
            title: 'Giao cho lớp',
            dataIndex: 'studentClassName',
            key: 'studentClassName',
            filters: createFilterForProp(exams, "studentClassName"),
            onFilter: (value, record) => record.studentClassName.indexOf(value) === 0
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                status == 'PUBLISHED' ?
                    <Tag key={status} color={colorInfo}>Đã xuất bản</Tag>
                    : <Tag key={status} >Chưa xuất bản</Tag>
            ),
            filters: createFilterFromEnum(EXAM_STATUS),
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'action-1',
            render: (id) => (<>
                <Space size={[16, 4]} wrap>
                    <Button title="Cài đặt" icon={<SettingOutlined />} onClick={() => viewExamSettings(id)}></Button>
                    <Button title="Xem bài làm đã nộp" icon={<FileDoneOutlined />} onClick={() => viewTests(id)}></Button>
                </Space>
            </>
            )
        }
    ]

    const addKey = (data) => data.map((item, index) => ({ ...item, key: index }));

    return <>
        <Row className="d-flex-inline justify-content-end">
            <Col>
                <Button icon={<PlusOutlined />} type='primary' id='alternative-btn' style={{ backgroundColor: colorWarning, color: colorBgBase }} onClick={() => {
                    setAllowMatrix(true);
                    setOpenPop(true)
                }}>Tạo đề từ ma trận đề</Button>
            </Col>
            <Col offset={1}>
                <Button icon={<PlusOutlined />} type='primary' onClick={() => setOpenPop(true)}>Tạo đề thủ công</Button>
            </Col>
        </Row>
        <Row className="mt-3 d-flex justify-content-center">
            <Table dataSource={addKey(exams)} columns={columns} style={{ width: '100%'}}  />
        </Row>
        <CreateExamModal open={openPopup} handleFinish={createExam} handleCancel={() => setOpenPop(false)} />
    </>
}

export default TeacherExamPage