import { useState } from 'react';
import { Modal, Table, Input } from 'antd';
import { callSearchQuestions } from './TeacherExamApi';
import { getGradeLabel, getSubjectLabel, getQuestionTypeLabel } from '../../util/enum';
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
                {getGradeLabel(grade)}
            </span>
        },
        {
            title: 'Môn',
            dataIndex: 'subject',
            key: 'subject',
            render: (subject) => <span>
                {getSubjectLabel(subject)}
            </span>
        },
        {
            title: 'Phân loại',
            dataIndex: 'questionType',
            key: 'questionType',
            render: (type) => <span>
                {getQuestionTypeLabel(type)}
            </span>
        },
        {
            title: 'Số lượt sử dụng',
            dataIndex: 'examTimes',
            key: 'examTimes'
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
            <Search placeholder="Tìm câu hỏi theo nội dung. Để trống nếu muốn tìm tất cả." onSearch={onSearch} allowClear />
            {hasSelected ? <span>Đã chọn {selectedRowKeys.length} câu hỏi</span> : null}
            <Table className="mt-3" dataSource={addKey(questions)} columns={columns} rowSelection={rowSelection} />
        </Modal>
    );
};

export default QuestionSearchModal;