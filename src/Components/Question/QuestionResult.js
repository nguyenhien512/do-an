import { Card, Button } from "antd";
import { useState } from "react";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons"

const QuestionResult = ({isDisplay, question, index, selectedAnswer}) => {

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
            {isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            </p>
            <p>Đáp án đúng: {question.correctAnswers}</p>
        </Card>

    );
}

export default QuestionResult;