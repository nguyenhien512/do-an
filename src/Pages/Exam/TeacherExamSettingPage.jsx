import { callGetTests} from './TeacherExamApi';
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, Space, Button, Row, Col, Statistic } from 'antd';
import { formatDateTime } from '../../util/dateTimeUtil';

function TeacherExamSettingPage() {
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");

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
            {tests?
            <Row>
                <Col span={20} className="ps-3 pe-3">
                <Space size={[4, 4]} wrap>
            {tests?.map(test => {
                return <>
                    <Card title={`${test.student.firstName} ${test.student.lastName}`}>
                        <p>Điểm: {test.score}</p>
                        <p>Nộp bài lúc: {formatDateTime(test.submitTime)}</p>
                        <Button type="primary" onClick={() => viewTest(test)}>Xem chi tiết</Button>
                    </Card>
                </>
            })}
        </Space>
                </Col>
                <Col span={4}>
                <Statistic title="Tổng số bài đã nộp" value={tests.length} />
                </Col>
            </Row>
            : null}

    </>
}
export default TeacherExamSettingPage;