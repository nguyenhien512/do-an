import { callGetResult } from './ExamApi';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, Space } from 'antd';

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

    return <>
        <Space size="large" direction="vertical">
            <h3>Kết quả thi</h3>
            <Card style={{ width: 300 }}>
                <p>Kì thi: {result?.examName}</p>
                <p>Thí sinh: {result?.studentFirstName} {result?.studentLastName} </p>
                <p>Điểm: {result?.score}</p>
            </Card>
        </Space>

    </>
}
export default StudentTestResultPage;
