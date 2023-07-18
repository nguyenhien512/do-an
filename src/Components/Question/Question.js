import { Card, Button } from "antd";
import { useState } from "react";

const Question = ({isDisplay, question, index, saveAnswer}) => {

      const [selected, setSelected] = useState("");

      const chooseAnswer = (key) => {
        setSelected(key);
        saveAnswer(question.id, key);
      }

    return (
        <Card title={`Câu ${index + 1}`}>
            <p>{question.content}</p>
            {question.answers.map(item => <p key={item.key}>
                <span>{item.key}</span>. <span>{item.content}</span>
            </p>)}
            <p>Chọn đáp án:
            {question.answers.map(item => <Button key={item.key} shape="circle" className="m-2" onClick={() => chooseAnswer(item.key)} type={selected == item.key ? "primary" : "default"}>
                {item.key}
            </Button>)}
            </p>
        </Card>

    );
}

export default Question;