import { callGetExam } from './ExamApi';
import { Row, Space, message } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'
import ExamCard from './ExamCard';

function StudentExamPage() {

    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetExam(token);
                setExams([...data]);
            } catch (ignored) {
                message.error(ignored.message)
             }
        }
        fetchData();
    }, [])
    console.log("exams", exams);

    function doExam(exam) {
        const params = { examId: exam.id, maxDuration: exam.maxDuration };

        navigate({
            pathname: '/student/exam/create-exam',
            search: `?${createSearchParams(params)}`,
        });

    }

    return <>
    <Row>
        <h3>Đề bạn có thể thi</h3>
    </Row>
    <Row className="mt-3">
    <Space size={[24, 24]} wrap>
            {exams?.map(exam => 
                    <ExamCard key={exam.id} exam={exam} doExam={doExam} />
            )}
        </Space>
    </Row>

    </>
}

export default StudentExamPage