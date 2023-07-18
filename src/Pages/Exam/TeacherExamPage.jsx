import { callGetExam } from './TeacherExamApi';
import { Button, Card, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'

function TeacherExamPage() {

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
        const params = { examId: exam.id };
        navigate({
            pathname: '/teacher/exam/tests',
            search: `?${createSearchParams(params)}`,
        });

    }

    return <>
        <Space size={[4, 4]} wrap>
            {exams?.map(item => {
                return <>
                    <Card title={item.name}>
                        <p>Dành cho lớp: {item.studentClassName}</p>
                        <p>Thời gian làm bài: {item.maxDuration / 60000}</p>
                        <p>Mở lúc: {item.openTime}</p>
                        <p>Đóng lúc: {item.closeTime}</p>
                        <Button type="primary" onClick={() => doExam(item)}>Xem kết quả</Button>
                    </Card>
                </>
            })}
        </Space>

    </>
}

export default TeacherExamPage