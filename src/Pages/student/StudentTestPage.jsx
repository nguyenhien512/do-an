import Question from '../../Components/Question/Question';
import { useState, useEffect } from 'react';
import { callCreateTest, callPostAnswers } from './ExamApi';
import { Space, Button, Row, Col, Statistic, Affix } from 'antd';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'
import { SpaceCompactItemContext } from 'antd/es/space/Compact';

const { Countdown } = Statistic;

function StudentTestPage() {
    const [queryParameters] = useSearchParams();
    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");
    const maxDuration = parseInt(queryParameters.get("maxDuration"));
    const [testId, setTestId] = useState();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [examName, setExamName] = useState("");

    const [isFinish, setIsFinish] = useState(false);

    const [questionPanel, setQuestionPanel] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState();

    const deadline = Date.now() + 1000 * 60 * maxDuration;

    const navigate = useNavigate();

    function saveAnswer(index, questionId, key) {
        answers[questionId] = key;
        setSelectedQuestion(index);
    }

    useEffect(() => {
        setQuestionPanel(questionPanel.map((item, index) => {
            if (index === selectedQuestion) {
                return "primary"
            }
            return item;
        }))
    }, [selectedQuestion])

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
                let questions = test.testQuestionRelations.map(r => r.question);
                setQuestions(questions);
                setTestId(test.id);
                setExamName(test.examName);
                setQuestionPanel(Array(questions.length).fill("default"));
            } catch (ignored) { }
        }
        fetchData();
    }, [])


    return <>
        <Row>
            <h3>{examName}</h3>
        </Row>
        <Row className='mt-3'>
            <Col span={17}>
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    {questions?.map((item, index) => <Question
                        key={item.id}
                        isDisplay={true}
                        question={item}
                        index={index}
                        saveAnswer={saveAnswer}
                    />)}
                </Space>
            </Col>
            <Col span={6} offset={1} align="center">
                {testId &&
                    <Affix offsetTop={20}>
                        <Row justify='center' >
                            {!isFinish &&
                                <Button type="primary" onClick={() => setIsFinish(true)}>Nộp bài</Button>}
                        </Row>
                        <Row justify='center' className='mt-3'>
                            {!isFinish &&
                                <Countdown title="Thời gian làm bài còn" value={deadline} format="HH:mm:ss" onFinish={() => setIsFinish(true)} />}
                        </Row>
                        <Row justify='center' className='mt-3' gutter={[16, 16]}>
                            {questionPanel.map((item, index) =>
                                <Button key={index} type={item} className="ms-1">
                                    Câu {index + 1}
                                </Button>)}
                        </Row>
                    </Affix>

                }
            </Col>
        </Row>
    </>
}
export default StudentTestPage;
