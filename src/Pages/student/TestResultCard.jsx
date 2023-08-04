import { Card, Typography, Button } from 'antd';
import { formatDateTime, parseDate } from '../../util/dateTimeUtil';
import { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

const { Text } = Typography;

const TestResultCard = ({ btnDisplay, nameDisplay, width, result }) => {

    const navigate = useNavigate();

    const [openAnswers, setOpenAnswers] = useState(false);

    useEffect(() => {
        if (Date.now() > parseDate(result.examCloseTime)) {
            setOpenAnswers(true);
        }
    }, [Date.now(), result])

    const viewTestResult = () => {
        const params = { testId: result.id };
        navigate({
            pathname: '/student/review/test-result',
            search: `?${createSearchParams(params)}`,
        });

    }

    return (
        <Card style={{ width: width }} >
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Đề thi:</p><Text strong>{result.examName}</Text></div>
            {nameDisplay && <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Thí sinh:</p><Text strong>{result.student.lastName} {result.student.firstName}</Text></div>}
            <div className='d-inline-flex justify-content-between align-items-baseline' style={{ width: '100%' }}><p>Điểm:</p><h4 style={{ color: '#1677ff' }}>{result.score}</h4></div>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Thời điểm nộp bài:</p><Text>{formatDateTime(result.submitTime)}</Text></div>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Thời điểm mở đáp án:</p><Text>{formatDateTime(result.examCloseTime)}</Text></div>
            <div className='d-flex justify-content-center'>
                {btnDisplay && <Button type="primary" disabled={!openAnswers} onClick={viewTestResult}>Xem đáp án</Button>}
            </div>
        </Card>
    )
}

export default TestResultCard;