import { callGetResult } from "./ExamApi";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, Space, Typography, message } from 'antd';
import { formatDateTime } from '../../util/dateTimeUtil';
import TestResultCard from "./TestResultCard";

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
            } catch (ignored) {
                message.error(ignored.message)
             }
        }
        fetchData();
    }, [])
    console.log("test result", result);

    return <>
        <div className='d-flex justify-content-center'>

            {result && 
            <Space size="large" direction='vertical' wrap>
                <h3 className='text-center' >Kết quả thi</h3>
                <TestResultCard result={result} btnDisplay={false} nameDisplay={true} width={500}/>
            </Space>
            }
        </div>

    </>
}
export default StudentTestResultPage;
