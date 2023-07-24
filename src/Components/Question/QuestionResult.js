import { Card, Button } from "antd";
import { useState } from "react";
import { CheckCircleTwoTone, CloseCircleFilled, CloseCircleTwoTone} from "@ant-design/icons"

const QuestionResult = ({ isDisplay, question, index, selectedAnswer }) => {

    const isCorrect = selectedAnswer == question.correctAnswers;

    return (
        <Card title={`Câu ${index + 1}`}>
            <p>{question.content}</p>
            {question.answers.map(item => <p key={item.key}>
                <span>{item.key}</span>. <span>{item.content}</span>
            </p>)}
            <p>Chọn đáp án:
                {question.answers.map(item => <Button key={item.key} shape="circle" className="m-2" onClick={(e) => e.preventDefault()} type={selectedAnswer == item.key ? "primary" : "default"}>
                    {item.key}
                </Button>)}
                {isCorrect ? <CheckCircleTwoTone style={{fontSize: '2em'}} twoToneColor="#52c41a"/> : <CloseCircleTwoTone style={{fontSize: '2em'}} twoToneColor="#808080"/>}
            </p>
            <p>Đáp án đúng: <Button shape="circle" className="m-2" onClick={(e) => e.preventDefault()} type="primary" danger>
                {question.correctAnswers}
            </Button></p>

        </Card>

    );
}

export default QuestionResult;