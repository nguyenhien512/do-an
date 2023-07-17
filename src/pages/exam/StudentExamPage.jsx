import { callGetExam } from './ExamApi';
import { Button, Card } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function StudentExamPage () {

    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetExam(token);
                setExams(data);
                console.log(data);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    function doExam(exam) {
        navigate(`exam?examId=${exam.id}&maxDuration=${exam.maxDuration}`)
    }

    return <>
    Student Exam Page
    {exams?.map(item => {
        <Card title={item.name}>
            <p>Dành cho lớp: {item.studentClassName}</p>
            <p>Thời gian làm bài: {item.maxDuration/60000}</p>
            <p>Mở lúc: {item.openTime}</p>
            <p>Đóng lúc: {item.closeTime}</p>
            <Button type="primary" onClick={() => doExam(item)}>Làm bài thi</Button>
        </Card>
    })}
    </>
}

export default StudentExamPage