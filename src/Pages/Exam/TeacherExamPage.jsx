import { callGetExamsOfTeacher } from './TeacherExamApi';
import { Table, Tag, Button, Space, Row } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { formatDateTime } from '../../util/dateTimeUtil';
import { SettingOutlined, PaperClipOutlined, PlusOutlined } from "@ant-design/icons";

function TeacherExamPage() {

    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetExamsOfTeacher(token);
                setExams([...data]);
                localStorage.setItem("exams", JSON.stringify(data));
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    console.log("exams", exams);

    function viewTests(id) {
        const params = { examId: id };
        navigate({
            pathname: '/teacher/exam/tests',
            search: `?${createSearchParams(params)}`,
        });

    }

    function examSettings(id) {
        const params = { examId: id };
        navigate({
            pathname: '/teacher/exam/settings',
            search: `?${createSearchParams(params)}`,
        });

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
                    <Button title="Cài đặt" icon={<SettingOutlined />} onClick={() => examSettings(id)}></Button>
                    <Button title="Xem bài làm đã nộp" icon={<PaperClipOutlined />} onClick={() => viewTests(id)}></Button>
                </Space>
            </>
            )
        }
    ]

    return <>
        <Row className="d-flex-inline justify-content-end">
            <Button icon={<PlusOutlined />} type='primary'>Tạo đề thi</Button>
        </Row>
        <Row className="mt-3 d-flex justify-content-center">
            <Table dataSource={exams} columns={columns} />
        </Row>
    </>
}

export default TeacherExamPage