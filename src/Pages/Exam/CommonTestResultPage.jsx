import QuestionResult from '../../Components/Question/QuestionResult';
import { useState, useEffect } from 'react';
import { callGetTestResult } from './TeacherExamApi';
import { Space, Row, Col, Button, Statistic, ConfigProvider, message } from 'antd';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'
import { calculateDurationByHMS } from '../../util/dateTimeUtil';
import { formatDateTime } from '../../util/dateTimeUtil';

function CommonTestResultPage({showQuestionId}) {

    const [queryParameters] = useSearchParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const testId = queryParameters.get("testId");
    const [testResult, setTestResult] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const testResult = await callGetTestResult(testId, token);
                setTestResult(testResult);
            } catch (ignored) {
                message.error(ignored.message);
             }
        }
        fetchData();
    }, [])




    return <>
        <Row justify='space-between'>
            <h3>Bài làm của {testResult?.student.lastName} {testResult?.student.firstName} </h3>
        </Row>
        <Row className='mt-3' justify='space-evenly'>
            <Col>
                <Statistic title="Điểm" value={testResult?.score.toFixed(2)}  />
            </Col>
            <Col>
                <Statistic title="Thời điểm nộp bài" value={formatDateTime(testResult?.submitTime)}  />
            </Col>
            <Col>
                <Statistic title="Thời gian làm bài" value={calculateDurationByHMS(testResult?.createTime, testResult?.submitTime)}  />
            </Col>
        </Row>
        <Row className='mt-3'>
            <h4>Nội dung bài làm</h4>
            </Row>
            <Row className='mt-3'>
                <Col span={18} >
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        {testResult?.testQuestionRelations.map((item, index) => <QuestionResult
                            key={item.question.id}
                            isDisplay={true}
                            question={item.question}
                            index={index}
                            selectedAnswer={item.answers}
                            showQuestionId={showQuestionId}
                        />)}
                    </Space>
                </Col>
            </Row>
    </>
}
export default CommonTestResultPage;
