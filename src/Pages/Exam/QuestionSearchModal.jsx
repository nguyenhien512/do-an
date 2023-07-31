import { useState } from 'react';
import { Modal, Table, Input } from 'antd';
import { callSearchQuestions } from './TeacherExamApi';
import { SUBJECT, GRADE, QUESTION_LEVEL, getLabel } from '../../util/enum';
const { Search } = Input;

// reset form fields when modal is form, closed

const QuestionSearchModal = ({ open, handleCancel, handleOk }) => {

    const [selectedQuestions, setSelectedQuestions] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedQuestions(selectedRows.map(record => record.id));
        }
    };

    const token = localStorage.getItem("token");
    const [questions, setQuestions] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content'
        },
        {
            title: 'Lớp',
            dataIndex: 'grade',
            key: 'grade',
            render: (grade) => <span>
                {getLabel(GRADE, grade)}
            </span>
        },
        {
            title: 'Môn',
            dataIndex: 'subject',
            key: 'subject',
            render: (subject) => <span>
                {getLabel(SUBJECT, subject)}
            </span>
        },
        {
            title: 'Mức độ nhận biết',
            dataIndex: 'level',
            key: 'level',
            render: (level) => <span>
                {getLabel(QUESTION_LEVEL, level)}
            </span>
        },
        {
            title: 'Nội dung kiến thức',
            dataIndex: 'topic',
            key: 'topic',
            render: (topic) => <span>
                {topic.name}
            </span>
        }
    ]

    const onSearch = async (value) => {
        const data = await callSearchQuestions(value, token);
        setQuestions(data);
    }

    const onOk = () => {
        setSelectedRowKeys([]);
        handleOk(selectedQuestions);
    }

    const addKey = (data) => data.map((item, index) => ({ ...item, key: index }));

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <Modal title="Thêm câu hỏi" open={open} onOk={onOk} onCancel={handleCancel} width='80%' >
            <Search placeholder="Tìm câu hỏi theo nội dung" onSearch={onSearch} allowClear />
            {hasSelected ? <span>Đã chọn {selectedRowKeys.length} câu hỏi</span> : null}
            <Table className="mt-3" dataSource={addKey(questions)} columns={columns} rowSelection={rowSelection} />
        </Modal>
    );
};

export default QuestionSearchModal;