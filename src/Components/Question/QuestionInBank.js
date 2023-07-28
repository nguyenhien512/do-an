import { Card, Button, Tag, Popconfirm } from "antd";
import { getGradeLabel, getSubjectLabel } from "../../util/enum";
import { DeleteOutlined } from "@ant-design/icons";

const QuestionInBank = ({ question, handleDelete }) => {

    const onDelete = () => {
        handleDelete(question.id);
    }

    return (
        <Card title={<span>Câu hỏi <a href='/teacher/testbank'>{question.id}</a></span>} extra={<>
            <Tag color="#87d068">{getGradeLabel(question.grade)}</Tag>
            <Tag color="#108ee9">{getSubjectLabel(question.subject)}</Tag>
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