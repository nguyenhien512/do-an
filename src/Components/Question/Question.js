import { Container } from "react-bootstrap";


const Question = ({ question, isDisplay, handleInput, isDisabled }) => {
    Question.defaultProps = {
        question: {},
        isDisplay: true,
        postAnswer: null,
        isDisabled: true
      }
    const iterator = {
            "answerA": "A",
            "answerB": "B",
            "answerC": "C",
            "answerD": "D"
        }

    return (
        <Container className={isDisplay ? "" : "d-none"}>
            <p>{question.description}</p>
            {Object.entries(iterator).map((entry, index) => (
                <div key={`${question.id}-${entry[1]}`} className="mb-3">
                        <input type="radio" name={question.id} value={entry[1]} id={`${question.id}-${entry[1]}`} onChange={handleInput} disabled={isDisabled}/>
                        <label htmlFor={`${question.id}-${entry[1]}`}>{question[entry[0]]}</label>
                </div>
            ))}
        </Container>

    );
}

export default Question;