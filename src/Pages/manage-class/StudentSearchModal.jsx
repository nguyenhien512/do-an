import { useState } from 'react';
import { Modal, Table, Input } from 'antd';
import { callSearchStudents } from './ClassApi';

const { Search } = Input;

// reset form fields when modal is form, closed

const StudentSearchModal = ({ open, onCancel, onOk}) => {

    const [selectedStudent, setSelectedStudent] = useState();

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
         setSelectedStudent(selectedRows[0]);
        }
      };

    const token = localStorage.getItem("token");
    const [students, setStudents] = useState([]);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Họ',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username'
        }
    ]

    const onSearch = async (value) => {
        const data = await callSearchStudents(value,token);
        setStudents(data);
    }

    const addKey = (data) => data.map((item, index) => ({...item, key: index}));
    return (
        <Modal title="Thêm học sinh" open={open} onOk={() => onOk(selectedStudent)} onCancel={onCancel} width={'50%'}>
            <Search placeholder="Tìm học sinh theo tên hoặc username" onSearch={onSearch} allowClear />
            <Table className="mt-3" dataSource={addKey(students)} columns={columns} rowSelection={rowSelection}/>
        </Modal>
    );
};

export default StudentSearchModal;