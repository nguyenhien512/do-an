import { callCreateExam, callGetExamsOfTeacher } from './TeacherExamApi';
import { Table, Tag, Button, Space, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { formatDateTime } from '../../util/dateTimeUtil';
import { SettingOutlined, FileDoneOutlined, PlusOutlined } from "@ant-design/icons";
import CreateExamModal from './CreateExamModal';

function TeacherExamPage() {

    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [openPopup, setOpenPop] = useState(false);

    const [allowMatrix, setAllowMatrix] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetExamsOfTeacher(token);
                setExams([...data]);
            } catch (ignored) { }
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
        const data = await callCreateExam(exam, token);
        if (data) {
            viewExamSettings(data.id);
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
            )
        },
        {
            title: 'Thời gian đóng',
            dataIndex: 'closeTime',
            key: 'closeTime',
            render: (closeTime) => (
                <span>{formatDateTime(closeTime)}</span>
            )
        },
        {
            title: 'Giao cho lớp',
            dataIndex: 'studentClassName',
            key: 'studentClassName'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                status == 'PUBLISHED' ?
                    <Tag key={status} color="#1677ff">Đã xuất bản</Tag>
                    : <Tag key={status} >Chưa xuất bản</Tag>
            )
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
            <Col span={4}>
                <Button icon={<PlusOutlined />} type='primary' onClick={() => {
                    setAllowMatrix(true);
                    setOpenPop(true)
                    }}>Tạo đề từ ma trận đề</Button>
            </Col>
            <Col>
                <Button icon={<PlusOutlined />} type='primary' onClick={() => setOpenPop(true)}>Tạo đề thủ công</Button>
            </Col>
        </Row>
        <Row className="mt-3 d-flex justify-content-center">
            <Table dataSource={addKey(exams)} columns={columns} style={{ width: '100%' }} />
        </Row>
        <CreateExamModal open={openPopup} handleFinish={createExam} handleCancel={() => setOpenPop(false)} />
    </>
}

export default TeacherExamPage