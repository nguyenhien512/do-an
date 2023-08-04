import { callGetExam, callSubmitTests } from './ExamApi';
import { Row, Space, message } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'
import ExamCard from './ExamCard';
import TestResultCard from './TestResultCard';

function StudentExamReviewPage() {

    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callSubmitTests(token);
                setResults([...data]);
            } catch (ignored) {
                message.error(ignored.message)
            }
        }
        fetchData();
    }, [])

    function doExam(exam) {
        const params = { examId: exam.id, maxDuration: exam.maxDuration };

        navigate({
            pathname: '/student/exam/create-exam',
            search: `?${createSearchParams(params)}`,
        });

    }

    return <>
    <Row>
        <h3>Đề thi bạn đã làm</h3>
    </Row>
    <Row className="mt-3">
    <Space size={[24, 24]} wrap>
            {results?.map(result => 
                    <TestResultCard btnDisplay={true} result={result} nameDisplay={false} width={350}/>
            )}
        </Space>
    </Row>

    </>
}

export default StudentExamReviewPage