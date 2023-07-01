import { Container } from "react-bootstrap";


function Question({ question, isDisplay, postAnswer, isDisabled }) {
    Question.defaultProps = {
        question: {},
        isDisplay: true,
        postAnswer: null,
        isDisabled: true
      }

    return (
        <Container className={isDisplay ? "" : "hidden"}>
            <p>{question.text}</p>
            {Object.entries(question.answers).map((item) => (
                <div key={`${question.id}-${item[0]}`} className="mb-3">
                        <input type="radio" name={question.id} value={item[0]} id={`${question.id}-${item[0]}`} onChange={postAnswer} disabled={isDisabled}/>
                        <label htmlFor={`${question.id}-${item[0]}`}>{item[1]}</label>
                </div>
            ))}
        </Container>

    );
}

export default Question;