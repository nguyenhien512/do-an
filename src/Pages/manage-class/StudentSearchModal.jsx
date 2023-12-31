import { useState } from 'react';
import { Modal, Table, Input, message } from 'antd';
import { callSearchStudents } from './ClassApi';
import { createFilterForYearProp } from '../../util/arrayUtil'

const { Search } = Input;

// reset form fields when modal is form, closed

const StudentSearchModal = ({ open, onCancel, onOk}) => {

    const [selectedStudents, setSelectedStudents] = useState([]);

    const hasSelected = selectedStudents.length > 0;

    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
         setSelectedStudents(selectedRows.map(record => record.username));
         console.log(selectedStudents)
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
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
            filters: createFilterForYearProp(students,'dob'),
            onFilter: (value, record) => record.dob.match(value) !== null
        },
    ]

    const onSearch = async (value) => {
        try {
            const data = await callSearchStudents(value,token);
            setStudents(data);
        } catch (ignored) {
            message.error(ignored.message)
        }
    }

    const addKey = (data) => data.map((item, index) => ({...item, key: index}));
    return (
        <Modal title="Thêm học sinh" open={open} onOk={() => onOk(selectedStudents)} onCancel={onCancel} width={'50%'}>
            <Search placeholder="Tìm học sinh theo tên hoặc username" onSearch={onSearch} allowClear />
            {hasSelected && <span>Đã chọn {selectedStudents.length} học sinh</span> }
            <Table className="mt-3" dataSource={addKey(students)} columns={columns} rowSelection={rowSelection}/>
        </Modal>
    );
};

export default StudentSearchModal;