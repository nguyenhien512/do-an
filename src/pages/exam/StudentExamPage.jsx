import { callGetExam } from './ExamApi';
import { Button, Card, Col, Row, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'

function StudentExamPage() {

    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetExam(token);
                setExams([...data]);
            } catch (ignored) { }
        }
        fetchData();
    }, [])
    console.log("exams", exams);

    function doExam(exam) {
        const params = { examId: exam.id, maxDuration: exam.maxDuration };

        navigate({
            pathname: '/user/exam/create-exam',
            search: `?${createSearchParams(params)}`,
        });

    }

    return <>
        <Row>
            <Col span={6}>
                {exams?.map(item => {
                    return <>
                        <Card title={item.name} style={{ width: '100%' }}>
                            <p>Dành cho lớp: {item.studentClassName}</p>
                            <p>Thời gian làm bài: {item.maxDuration / 60000}</p>
                            <p>Mở lúc: {item.openTime}</p>
                            <p>Đóng lúc: {item.closeTime}</p>
                            <Button type="primary" onClick={() => doExam(item)}>Làm bài thi</Button>
                        </Card>
                    </>
                })}
            </Col>
        </Row>

    </>
}

export default StudentExamPage