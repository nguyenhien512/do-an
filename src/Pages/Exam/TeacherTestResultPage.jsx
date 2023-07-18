import QuestionResult from '../../Components/Question/QuestionResult';
import { useState, useEffect } from 'react';
import { callGetTestResult} from './TeacherExamApi';
import { Space, Button, Row, Col } from 'antd';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'

function TeacherTestResultPage() {

    const [queryParameters] = useSearchParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const testId = queryParameters.get("testId");
    const [records, setRecords] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const testResult = await callGetTestResult(testId, token);
                console.log(testResult)
                setRecords(testResult.testQuestionRelations);
            } catch (ignored) { }
        }
        fetchData();
    }, [])


    return <>
        <Row>
            <Col span={18} className="ps-5 pe-5">
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Space size={[8, 16]} wrap>
                        {/* {records.map((item, index) =>
                            <Button key={item.id} onClick={() => setCurrentQuestion(index)}>
                                Câu {index + 1}
                            </Button>)} */}
                    </Space>
                    {records?.map((item, index) => <QuestionResult
                    isDisplay={true}
                    question={item.question}
                    index={index}
                    selectedAnswer={item.answers}
                    />)}
                </Space>
            </Col>
            <Col span={6} align="center">
            </Col>
        </Row>

    </>
}
export default TeacherTestResultPage;
