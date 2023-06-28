import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Question from '../../Components/Question/Question';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswer] = useState([]);
  const questions = [
    { id: "6500",
      text: "I wish he ________ so rude to people when we go out.",
      answers: {
        "A": "didn't be",
        "B": "won't be",
        "C": "hadn't been",
        "D": "wouldn't be"
      }
    },
    { id: "6501",
      text: "Winters here ________ be really cold sometimes, so make sure you bring warm clothes!",
      answers: {
        "A": "may",
        "B": "might",
        "C": "can",
        "D": "could"
      }
    },
    { id: "6502",
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
    console.log(answer);
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
    addAnswer(input.name, input.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(answers);
  }
  return (
    <Container>
      <Row>
        <Col className="main">
          <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            {questions.map((item,index) => (
              <Question question={item} isDisplay={index === currentQuestion} postAnswer={postAnswer}/>
            ))}
          </Stack>
          <Button onClick={handleNext}>
            Next
          </Button>
          <Button type="submit">
            Submit
          </Button>
          </Form>
        </Col>
        <Col className="timer">
        </Col>
      </Row>
    </Container>
  );
}

export default Exam;