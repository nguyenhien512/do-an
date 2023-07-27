import { Card, Button, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleTwoTone, CloseCircleFilled, CloseCircleTwoTone } from "@ant-design/icons"

const QuestionResult = ({ isDisplay, question, index, selectedAnswer }) => {

    const isCorrect = selectedAnswer == question.correctAnswers;
    const colorPrimary = isCorrect ? '#52c41a' : '#ff4d4f';

    return (
        <Card title={<span>Câu {index + 1} (câu hỏi <a href='teacher/testbank'>{question.id}</a>)</span>}>
            <p>{question.content}</p>
            {question.answers.map(item => <p key={item.key}>
                <span>{item.key}</span>. <span>{item.content}</span>
            </p>)}
            <p>Chọn đáp án:
                {question.answers.map(item => (
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: colorPrimary,
                            },
                        }}
                    >
                        <Button key={item.key} shape="circle" className="m-2" onClick={(e) => e.preventDefault()} type={selectedAnswer == item.key ? "primary" : "default"}>
                            {item.key}
                        </Button>
                    </ConfigProvider>
                ))}
            </p>
            <p>Đáp án đúng: <Button shape="circle" className="m-2" onClick={(e) => e.preventDefault()} type="primary">
                {question.correctAnswers}
            </Button></p>

        </Card>

    );
}

export default QuestionResult;