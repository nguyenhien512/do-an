import Question from '../../Components/Question/Question';
import { useState, useEffect } from 'react';
import { callCreateTest, callPostAnswers } from './ExamApi';
import { Space, Button, Row, Col, Statistic } from 'antd';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'

const { Countdown } = Statistic;

function StudentTestPage() {
    const [queryParameters] = useSearchParams();
    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");
    const maxDuration = parseInt(queryParameters.get("maxDuration"));
    const [testId, setTestId] = useState();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const [isFinish, setIsFinish] = useState(false);

    const deadline = Date.now() + 1000 * 60 * maxDuration;

    const navigate = useNavigate();

    function saveAnswer(questionId, key) {
        answers[questionId] = key;
    }

    useEffect(() => {
        async function handleFinishExam() {
            await callPostAnswers(testId, answers, token);
            const params = { testId: testId };

            navigate({
                pathname: '/user/exam/result',
                search: `?${createSearchParams(params)}`,
            });
        }
        if (isFinish) {
            handleFinishExam();
        }

    }, [isFinish])



    useEffect(() => {
        async function fetchData() {
            try {
                const test = await callCreateTest(examId, token);
                console.log(test)
                let questions = test.testQuestionRelations.map(r => r.question);
                setQuestions(questions);
                setTestId(test.id);

            } catch (ignored) { }
        }
        fetchData();
    }, [])


    return <>
        <Row>
            <Col span={18}>
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Space >
                        {questions?.map((question, index) =>
                            <Button key={question.id}>
                                Câu {index + 1}
                            </Button>)}
                    </Space>
                    {questions?.map((item, index) => <Question
                        key={item.id}
                        isDisplay={true}
                        question={item}
                        index={index}
                        saveAnswer={saveAnswer}
                    />)}
                </Space>
            </Col>
            <Col span={6} align="center">
                <Space direction="vertical" size="large">
                    {isFinish ? null : <>
                        <Button type="primary" onClick={() => setIsFinish(true)}>Nộp bài</Button>
                        <Countdown title="Thời gian làm bài còn" value={deadline} format="HH:mm:ss" onFinish={() => setIsFinish(true)} />
                    </>}
                </Space>
            </Col>
        </Row>
    </>
}
export default StudentTestPage;
