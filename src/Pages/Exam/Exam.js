import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Question from '../../Components/Question/Question';
import { useRef, useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Countdown from 'react-countdown';
import { ListGroup } from 'react-bootstrap';
import Layout from '../../Components/Layout/Layout';


const QuestionNav = ({ isDisplay, questions, currentQuestion }) => {
  return isDisplay ?
    <ListGroup >
      {questions.map((item, index) => (
        <ListGroup.Item key={index} className={index === currentQuestion ? "active" : ""}>Question {index}</ListGroup.Item>
      ))}
    </ListGroup>
    : null
}

const StartButton = ({ isDisplay, handleStart }) => {
  return isDisplay ?
    <Button onClick={handleStart}>Start Exam</Button>
    : null
}

const QuestionForm = ({ isDisplay, questions, currentQuestion, handleNext, handleInput, handleSubmit }) => {

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

const Timer = ({isDisplay, startTime, handleRef, handleTimeOut}) => {
  return isDisplay ? 
  <Countdown date={startTime + 15000} autoStart={true} ref={handleRef} onComplete={handleTimeOut}/> 
  : null
}

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isStartExam, setIsStartExam] = useState(true);
  const [isFinishExam, setIsFinishExam] = useState(false);
  const timerRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const questions = [
    {
      id: "6500",
      description: "I wish he ________ so rude to people when we go out.",
      "answerA": "didn't be",
      "answerB": "won't be",
      "answerC": "hadn't been",
      "answerD": "wouldn't be"
    },
    {
      id: "6501",
      description: "Winters here ________ be really cold sometimes, so make sure you bring warm clothes!",
      "answerA": "may",
      "answerB": "might",
      "answerC": "can",
      "answerD": "could"
    },
    {
      id: "6502",
      description: "But they ________be away – I saw them this morning!",
      "answerA": "shouldn't",
      "answerB": "mustn't",
      "answerC": "can't",
      "answerD": "don't have to"
    }
  ]

  function addAnswer(questionId, answer) {
    console.log(questionId, answer);
    let existQuestion = answers.find(item => item.questionId === questionId);
    if (existQuestion) {
      existQuestion.answer = answer;
    } else {
      answers.push({
        questionId: questionId,
        answer: answer
      })
    }
  }

  function handleNext() {
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function postAnswer(event) {
    let input = event.target;
    addAnswer(input.name, input.value);
    console.log(answers);
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    timerRef.current.stop();
    finishExam();
  }

  function finishExam() {
    setDuration(Date.now() - startTime);
    //post answer to server
    setIsFinishExam(true);
    resetAfter(2000);
  }

  function resetAfter(ms) {
    setTimeout(() => {
      setIsFinishExam(false);
      setIsStartExam(false);
    }, ms)
  }

  function handleStart() {
    setIsStartExam(true);
    setDuration(0);
    setStartTime(Date.now());
    setCurrentQuestion(0);
  }

  function handleTimeOut(timerDeltaObject, isCompleted) {
    finishExam();
  }

  return (
    <Layout
      leftComponent={
      <QuestionNav isDisplay={true} questions={questions} currentQuestion={currentQuestion} />
    }
      mainComponent={
        <Container>
          <StartButton isDisplay={true} handleStart={handleStart}/>
          <QuestionForm isDisplay={true} handleInput={postAnswer} handleSubmit={handleSubmit} questions={questions} currentQuestion={currentQuestion} handleNext={handleNext}/>
        </Container>
      }
      rightComponent={
        <Timer isDisplay={true} startTime={startTime} handleRef={timerRef} handleTimeOut={handleTimeOut}/>
      }
    />
  );
}

export default Exam;