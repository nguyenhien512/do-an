import { Card, Button, Tag, Popconfirm, theme } from "antd";
import { getLabel, SUBJECT, GRADE, QUESTION_LEVEL } from "../../util/enum";
import { DeleteOutlined, TagOutlined } from "@ant-design/icons";

const QuestionInBank = ({ question, handleDelete }) => {

    const {
        token: { colorWarning, colorInfo },
      } = theme.useToken();
    const onDelete = () => {
        handleDelete(question.id);
    }

    return (
        <Card title={<span>Câu hỏi <a href='/teacher/testbank'>{question.id}</a></span>} extra={<>
            <Tag color={colorWarning}>{getLabel(GRADE, question.grade)}</Tag>
            <Tag color={colorInfo}>{getLabel(SUBJECT,question.subject)}</Tag>
            <Tag>{getLabel(QUESTION_LEVEL, question.level)}</Tag>
            <span className="me-1" title="Nội dung kiến thức">
                <TagOutlined/>
                <span className="ms-1">{question.topic.name}</span>
            </span>
            <Popconfirm
                title="Xóa câu hỏi"
                description={<span>Bạn có muốn xóa câu hỏi này ra khỏi đề thi?
                    <br/> Thay đổi đối với đề thi đã xuất bản có thể ảnh hưởng đến học sinh.
                </span>}
                onConfirm={onDelete}
                onCancel={null}
                okText="Có"
                cancelText="Không"
            >
                <Button danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
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