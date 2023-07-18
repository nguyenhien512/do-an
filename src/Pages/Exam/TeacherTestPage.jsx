import { callGetTests} from './TeacherExamApi';
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, Space, Button } from 'antd';
import { formatDateTime } from '../../util/dateTimeUtil';

function TeacherTestPage() {
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
        <Space size={[4, 4]} wrap>
            {tests?.map(item => {
                return <>
                    <Card title={`${item.studentFirstName} ${item.studentLastName}`}>
                        <p>Điểm: {item.score}</p>
                        <p>Nộp bài lúc: {formatDateTime(item.submitTime)}</p>
                        <Button type="primary" onClick={() => viewTest(item)}>Xem chi tiết</Button>
                    </Card>
                </>
            })}
        </Space>

    </>
}
export default TeacherTestPage;
