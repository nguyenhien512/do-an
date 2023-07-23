import QuestionResult from '../../Components/Question/QuestionResult';
import { useState, useEffect } from 'react';
import { callGetTestResult } from './TeacherExamApi';
import { Space, Row, Col, Card, Statistic } from 'antd';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'
import { calculateDurationByHMS } from '../../util/dateTimeUtil';

function TeacherTestResultPage() {

    const [queryParameters] = useSearchParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const testId = queryParameters.get("testId");
    const [testResult, setTestResult] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const testResult = await callGetTestResult(testId, token);
                console.log("testDetail", testResult)
                setTestResult(testResult);
            } catch (ignored) { }
        }
        fetchData();
    }, [])




    return <>
        {testResult ?
            <Row>
                <Col span={18} className="pe-4" >
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        {testResult.testQuestionRelations.map((item, index) => <QuestionResult
                            key={item.question.id}
                            isDisplay={true}
                            question={item.question}
                            index={index}
                            selectedAnswer={item.answers}
                        />)}
                    </Space>
                </Col>
                <Col span={6}>
                    <Card title={`${testResult.student.firstName} ${testResult.student.lastName}`} headStyle={{background:'#E2E8F0'}} bordered={false} >
                        <Statistic title="Điểm" value={testResult.score} valueStyle={{fontSize: '1em'}}/>
                        <Statistic title="Thời gian làm bài" value={calculateDurationByHMS(testResult.createTime, testResult.submitTime)} valueStyle={{fontSize: '1em'}}/>
                    </Card>
                </Col>
            </Row>
            : null}
    </>
}
export default TeacherTestResultPage;
