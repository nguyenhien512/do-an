import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Question from '../../Components/Question/Question';
import { useRef, useState, useEffect} from 'react';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Countdown from 'react-countdown';
import { ListGroup } from 'react-bootstrap';

function Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isStartExam, setIsStartExam] = useState(false);
  const [isFinishExam, setIsFinishExam] = useState(false);
  const timerRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const questions = [
    {
      id: "6500",
      text: "I wish he ________ so rude to people when we go out.",
      answers: {
        "A": "didn't be",
        "B": "won't be",
        "C": "hadn't been",
        "D": "wouldn't be"
      }
    },
    {
      id: "6501",
      text: "Winters here ________ be really cold sometimes, so make sure you bring warm clothes!",
      answers: {
        "A": "may",
        "B": "might",
        "C": "can",
        "D": "could"
      }
    },
    {
      id: "6502",
      text: "But they ________be away – I saw them this morning!",
      answers: {
        "A": "shouldn't",
        "B": "mustn't",
        "C": "can't",
        "D": "don't have to"
      }
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
      <Row className="bg-light w-100 m-0 h-100">
        <Col id="left" className="bg-transparent pt-3">
          {isStartExam? 
                    <ListGroup >
                    {questions.map((item, index) => (
                      <ListGroup.Item key={index} className={index === currentQuestion ? "highlighted" : ""}>Question {index}</ListGroup.Item>
                    ))}
                  </ListGroup>
            : null}

        </Col>
        <Col id="main" className="bg-white pt-3" lg="8" md="6" xs="6">
          <Container className="d-inline-flex justify-content-center"><Button disabled={isStartExam} onClick={handleStart} >Start Exam</Button></Container>
          {isStartExam? 
                    <Form onSubmit={handleSubmit} className="form mt-3">
                    {questions.map((item, index) => (
                      <Question question={item} isDisplay={index === currentQuestion} postAnswer={postAnswer} isDisabled={false}/>
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
          : null}
          {
            isFinishExam ? 
            <Container className="text-center">
              <h2>Summary</h2>
                {answers.map((item) => (
                  <p>Question {item.questionId} : <span>{item.answer}</span>
                  </p>
                ))}
                <p>Duration {duration}</p>
            </Container>
            : null
          }
        </Col>
        <Col className="bg-transparent pt-3 d-flex justify-content-center" id="right">
          {isStartExam ? <Countdown date={startTime + 15000} autoStart={true} ref={timerRef} onComplete={handleTimeOut}/> : null}
        </Col>
      </Row>
  );
}

export default Exam;