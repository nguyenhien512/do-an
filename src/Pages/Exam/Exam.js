import Question from '../../Components/Question/Question';
import { useRef, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Countdown from 'react-countdown';
import { ListGroup } from 'react-bootstrap';
import Layout from '../../Components/Layout/Layout';
import { callCreateTest, callGetResult, callPostAnswers } from './ExamApi';


const QuestionNav = ({ isDisplay, questions, currentQuestion }) => {
  QuestionNav.defaultProps = {
    isDisplay: false,
    questions: {},
    currentQuestion: 0
  }
  return isDisplay ?
    <ListGroup >
      {questions.map((item, index) => (
        <ListGroup.Item key={index} className={index === currentQuestion ? "active" : ""}>Question {index}</ListGroup.Item>
      ))}
    </ListGroup>
    : null
}

const StartButton = ({ isDisplay, handleStart }) => {
  StartButton.defaultProps = {
    isDisplay: false,
    handleStart: null
  }
  return isDisplay ?
    <Button onClick={handleStart}>Start Exam</Button>
    : null
}

const QuestionForm = ({ isDisplay, questions, currentQuestion, handleNext, handleInput, handleSubmit }) => {
  QuestionForm.defaultProps = {
    isDisplay: false,
    questions: {},
    currentQuestion: 0,
    handleNext: null,
    handleInput: null,
    handleSubmit: null
  }
  return isDisplay ?
    <Form onSubmit={handleSubmit} className="mt-3">
      {questions.map((item, index) => (
        <Question question={item} isDisplay={index === currentQuestion} handleInput={handleInput} isDisabled={false} />
      ))}
      <Container className="d-flex justify-content-between">
        <Button onClick={handleNext} className="float-start">
          Next
        </Button>
        <Button type="submit" className="float-end">
          Submit
        </Button>
      </Container>
    </Form>
    : null
}

const TestResult = ({isDisplay, data}) => {
  TestResult.defaultProps = {
    isDisplay: false,
    data: {}
  }
  return isDisplay ? 
  <Container>
    <h2>Test Result</h2>
    <Table striped>
      <tbody>
        <tr>
          <td>Score</td>
          <td>{data.score}</td>
        </tr>
        <tr>
          <td>Duration </td>
          <td>{data.duration} ms</td>
        </tr>
      </tbody>
    </Table>
  </Container>
  : null
}

const Timer = ({isDisplay, startTime, handleRef, handleTimeOut}) => {
  return isDisplay ? 
  <Countdown date={startTime + 60000} autoStart={true} ref={handleRef} onComplete={handleTimeOut}/> 
  : null
}

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startExam, setStartExam] = useState(true);
  const [finishExam, setFinishExam] = useState(false);
  const timerRef = useRef(null);
  const [startTime, setStartTime] = useState(0);
  const [testId, setTestId] = useState("");

  const [questions, setQuestions] = useState([]);

  const [testResult, setTestResult] = useState({});

  function addAnswer(questionId, answer) {
    answers[questionId] = answer;
  }

  function handleNext() {
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleInput(event) {
    let questionId = questions[currentQuestion].id;
    let answer = event.target.value;
    addAnswer(questionId, answer);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!finishExam) {
      event.target.reset();
      timerRef.current.stop();
      handleFinishExam();
    }
  }

  async function handleFinishExam() {
    let deltaTime = Date.now() - startTime;
    await callPostAnswers(testId, {
      duration: deltaTime,
      answers: answers
    })
    const result = await callGetResult(testId);
    setTestResult(result);
    setFinishExam(true);
    resetAfter(5000);
  }

  function resetAfter(ms) {
    setTimeout(() => {
      setFinishExam(false);
      setStartExam(false);
    }, ms)
  }

  async function handleStart() {
    const test = await callCreateTest();
    if (test) {
      setQuestions(test.questions);
      setTestId(test.id);
      setStartExam(true);
      setStartTime(Date.now());
      setCurrentQuestion(0);
    }
  }

  function handleTimeOut(timerDeltaObject, isCompleted) {
    if (!finishExam) {
      handleFinishExam();
    }
  }

  return (
    <Layout
      leftComponent={
      <QuestionNav isDisplay={startExam} questions={questions} currentQuestion={currentQuestion} />
    }
      mainComponent={
        <Container>
          <StartButton isDisplay={!startExam && !finishExam} handleStart={handleStart}/>
          <QuestionForm isDisplay={startExam && !finishExam} handleInput={handleInput} handleSubmit={handleSubmit} questions={questions} currentQuestion={currentQuestion} handleNext={handleNext}/>
          <TestResult isDisplay={finishExam} data={testResult}/>
        </Container>
      }
      rightComponent={
        <Timer isDisplay={startExam} startTime={startTime} handleRef={timerRef} handleTimeOut={handleTimeOut}/>
      }
    />
  );
}

export default Exam;