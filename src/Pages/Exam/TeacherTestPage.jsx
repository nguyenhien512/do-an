import { callGetTests } from './TeacherExamApi';
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, Space, Button, Row, Col, Statistic } from 'antd';
import { formatDateTime } from '../../util/dateTimeUtil';

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
                localStorage.setItem("tests", JSON.stringify(response));
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    function viewTest(test) {
        const params = { testId: test.id };
        navigate({
            pathname: '/teacher/exam/test-result',
            search: `?${createSearchParams(params)}`,
        });

    }

    return <>
        {tests ?
            <Row>
                <Col span={18}>
                    <Space size={[16, 16]} wrap>
                        {tests?.map(test => {
                            return <>
                                <Card title={`${test.student.firstName} ${test.student.lastName}`} style={{ width: 300 }}>
                                    <p>Điểm: {test.score}</p>
                                    <p>Nộp bài lúc: {formatDateTime(test.submitTime)}</p>
                                    <Button type="primary" onClick={() => viewTest(test)}>Xem chi tiết</Button>
                                </Card>
                            </>
                        })}
                    </Space>
                </Col>
                <Col span={6}>
                    <Card title={exam.name} headStyle={{background:'#E2E8F0'}} bordered={false}>
                        <Statistic title="Tổng số bài đã nộp" value={tests.length} valueStyle={{fontSize: '1em'}}/>
                        <Statistic title="Số lượt thi" value={exam.examTimes} valueStyle={{fontSize: '1em'}}/>
                        <Statistic title="Giao cho" value={exam.studentClassName} valueStyle={{fontSize: '1em'}} />
                        
                    </Card>
                </Col>
            </Row>
            : null}

    </>
}
export default TeacherTestPage;
