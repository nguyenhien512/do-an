import { Card, Button, Tag } from "antd";
import { getGradeLabel, getSubjectLabel } from "../../util/enum";

const QuestionInBank = ({ question }) => {

    return (
        <Card title={<span>Câu hỏi <a href='/question-bank'>{question.id}</a></span>} extra={<>
            <Tag color="#87d068">{getGradeLabel(question.grade)}</Tag>
            <Tag color="#108ee9">{getSubjectLabel(question.subject)}</Tag>
        </>

        }>
            <p>{question.content}</p>
            {question.answers.map(item => <p key={item.key}>
                <span>{item.key}</span>. <span>{item.content}</span>
            </p>)}
            <p>Đáp án đúng: <Button shape="circle" className="m-2" onClick={(e) => e.preventDefault()} type="primary">
                {question.correctAnswers}
            </Button></p>
        </Card>

    );
}

export default QuestionInBank;