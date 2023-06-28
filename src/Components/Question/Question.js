import { Container } from "react-bootstrap";


function Question({ question, isDisplay, postAnswer }) {
    Question.defaultProps = {
        question: {},
        isDisplay: true,
      }
    let displayCSS = "";
    if (isDisplay) {
        displayCSS = "block";
    } else {
        displayCSS = "none";
    }
    return (
        <Container style={{display:displayCSS}}>
            <p>{question.text}</p>
            {Object.entries(question.answers).map((item) => (
                <div key={`${question.id}-${item[0]}`} className="mb-3">
                        <input type="radio" name={question.id} value={item[0]} id={`${question.id}-${item[0]}`} onChange={postAnswer}/>
                        <label htmlFor={`${question.id}-${item[0]}`}>{item[1]}</label>
                </div>
            ))}
        </Container>

    );
}

export default Question;