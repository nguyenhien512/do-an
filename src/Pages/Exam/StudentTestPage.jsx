import Question from '../../Components/Question/Question';
import { useRef, useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { callCreateTest, callGetResult, callPostAnswers } from './ExamApi';
import { Space, Button, Row, Col } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom'

function StudentTestPage() {
    const [queryParameters] = useSearchParams();
    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");
    const maxDuration = parseInt(queryParameters.get("maxDuration"));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [testId, setTestId] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const [startTime, setStartTime] = useState(0);

    const navigate = useNavigate();

    const timerRef = useRef(null);

    function saveAnswer(questionId, key) {
        answers[questionId] = key;
    }

    function handleSubmit() {
        handleFinishExam();
    }

    function handleTimeOut(timerDeltaObject, isCompleted) {
        handleFinishExam();
    }

    async function handleFinishExam() {
        await callPostAnswers(testId, token, answers);
        // navigate('result?testId='+testId);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const test = await callCreateTest(examId, token);
                if (test) {
                    setQuestions(test.questions);
                    setTestId(test.id);
                    setStartTime(Date.now());
                }
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    console.log("TEST PAGE")

    return <>
        <Row>
            <Col span={18}>
                <Space size={[8, 16]} wrap>
                    {questions.map((item, index) =>
                        <Button key={item.id} onClick={() => setCurrentQuestion(index)}>
                            Câu {index + 1}
                        </Button>)}
                </Space>
                {questions.map((item, index) => <Question
                    key={item.id}
                    isDisplay={currentQuestion == index}
                    question={item}
                    index={index}
                    saveAnswer={saveAnswer}
                />)}
                <Button type="primary" onClick={handleSubmit}>Nộp bài</Button>
            </Col>
            <Col span={6}>
                {/* <Countdown date={startTime + maxDuration} autoStart={true} onComplete={handleTimeOut} /> */}
            </Col>
        </Row>

    </>
}
export default StudentTestPage;
