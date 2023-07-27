import { callGetResult } from "./ExamApi";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, Space, Typography } from 'antd';
import { formatDateTime } from '../../util/dateTimeUtil';

const { Text } = Typography;

function StudentTestResultPage() {
    const [queryParameters] = useSearchParams();
    const testId = queryParameters.get("testId");
    const token = localStorage.getItem("token");

    const [result, setResult] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await callGetResult(testId, token);
                setResult(response);
            } catch (ignored) { }
        }
        fetchData();
    }, [])
    console.log("test result", result);

    return <>
        <div className='d-flex justify-content-center'>

            {result ? <Space size="large" direction='vertical' wrap>
                <h3 className='text-center' >Kết quả thi</h3>
                <Card style={{ width: 500 }} >
                    <div className='d-inline-flex justify-content-between' style={{width: '100%'}}><p>Thí sinh:</p><Text strong>{result.student.firstName} {result.student.lastName}</Text></div>
                    <div className='d-inline-flex justify-content-between align-items-baseline' style={{width: '100%'}}><p>Điểm:</p><h4 style={{color: '#1677ff'}}>{result.score}</h4></div>
                    <div className='d-inline-flex justify-content-between' style={{width: '100%'}}><p>Nộp bài lúc:</p><Text strong>{formatDateTime(result.submitTime)}</Text></div>
                </Card>
            </Space>
                : null
            }
        </div>

    </>
}
export default StudentTestResultPage;
