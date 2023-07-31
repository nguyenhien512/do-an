import { Button, Card, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { formatDateTime, parseDate } from '../../util/dateTimeUtil';

const { Text } = Typography;

const ExamCard = ({ exam, doExam }) => {

    const [status, setStatus] = useState("");

    useEffect(() => {
        let openTime = parseDate(exam.openTime);
        let closeTime = parseDate(exam.closeTime);
        if (Date.now() < openTime) {
            setStatus("BEFORE OPEN");
        } else if (Date.now() > closeTime) {
            setStatus("CLOSE");
        } else {
            setStatus("OPEN");
        }
    }, [Date.now()])
    return <>
        <Card title={exam.name} style={{ width: 300 }} headStyle={{ textAlign: 'center' }}>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Dành cho lớp:</p><Text>{exam.studentClassName}</Text></div>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Thời gian làm bài:</p><Text>{exam.maxDuration} phút</Text></div>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Mở lúc:</p><Text>{formatDateTime(exam.openTime)}</Text></div>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Đóng lúc:</p><Text>{formatDateTime(exam.closeTime)}</Text></div>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}><p>Giáo viên:</p><Text>{exam.createBy.lastName} {exam.createBy.firstName}</Text></div>
            <div align="center">
                {status == 'OPEN' ? <Button type="primary" onClick={() => doExam(exam)}>Làm bài thi</Button> : null}
                {status == 'BEFORE OPEN' ? <Button type="primary" disabled>Chưa mở</Button> : null}
                {status == 'CLOSE' ? <Button type="primary" disabled>Đã kết thúc</Button> : null}
            </div>
        </Card>
    </>
}

export default ExamCard;