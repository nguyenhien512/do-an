import { callGetTests } from './TeacherExamApi';
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, Space, Button, Row, Col, Statistic, Typography, Table } from 'antd';
import { formatDateTime } from '../../util/dateTimeUtil';

const { Text } = Typography;

function TeacherTestPage() {
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");

    const exams = JSON.parse(localStorage.getItem("exams"));
    const exam = exams.filter(e => e.id == examId)[0];

    console.log("Test page has exam", exam);

    const [tests, setTests] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await callGetTests(examId, token);
                setTests(response);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    function viewTest(id) {
        const params = { testId: id };
        navigate({
            pathname: '/teacher/exam/test-result',
            search: `?${createSearchParams(params)}`,
        });

    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            )
        },
        {
            title: 'Họ',
            dataIndex: 'student',
            key: 'firstName',
            render: (student) => (
                <span>{student.firstName}</span>
            )
        },
        {
            title: 'Tên',
            dataIndex: 'student',
            key: 'lastName',
            render: (student) => (
                <span>{student.lastName}</span>
            )
        },
        {
            title: 'Username',
            dataIndex: 'student',
            key: 'username',
            render: (student) => (
                <span>{student.username}</span>
            )
        },
        {
            title: 'Thời điểm nộp bài',
            dataIndex: 'submitTime',
            key: 'submitTime',
            render: (submitTime) => (
                <span>{formatDateTime(submitTime)}</span>
            )
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score'
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Button type="primary" onClick={() => viewTest(id)}>Xem chi tiết</Button>
            )
        }
    ]

    return <>
        <Row justify='space-between'>
            <h3>{exam?.name}</h3>
        </Row>
        <Row className='mt-3' justify='space-evenly'>
            <Col>
                <Statistic title="Tổng số bài đã nộp" value={tests?.length}  />
            </Col>
            <Col>
                <Statistic title="Số lượt thi" value={exam?.examTimes}  />
            </Col>
            <Col>
                <Statistic title="Giao cho lớp" value={exam?.studentClassName} />
            </Col>
        </Row>
        <Row className='mt-3' wrap={false}>
            <Table dataSource={tests} columns={columns} style={{ width: '100%' }} />
        </Row>
    </>
}
export default TeacherTestPage;
