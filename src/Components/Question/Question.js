import { Container } from "react-bootstrap";


const Question = ({ question, isDisplay, handleInput, isDisabled }) => {
    Question.defaultProps = {
        question: {},
        isDisplay: true,
        postAnswer: null,
        isDisabled: true
      }
    const iterator = [
        'answerA',
        'answerB',
        'answerC',
        'answerD'
    ]

    return (
        <Container className={isDisplay ? "" : "d-none"}>
            <p>{question.description}</p>
            {iterator.map((item) => (
                <div key={`${question.id}-${item}`} className="mb-3">
                        <input type="radio" name={question.id} value={item} id={`${question.id}-${item}`} onChange={handleInput} disabled={isDisabled}/>
                        <label htmlFor={`${question.id}-${item}`}>{question[item]}</label>
                </div>
            ))}
        </Container>

    );
}

export default Question;