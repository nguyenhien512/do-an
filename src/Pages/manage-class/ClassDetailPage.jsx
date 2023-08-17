import { Table, message, Button, Row, Col, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { callAddStudent, callGetStudents, callRemoveStudent, callGetExamCounts } from './ClassApi';
import StudentSearchModal from './StudentSearchModal';
import { USER_ACTIVE, createFilterFromEnum, getLabel } from '../../util/enum';

function ClassDetailPage() {

    const [queryParameters] = useSearchParams();

    const [students, setStudents] = useState([]);
    const [examCounts, setExamCounts] = useState([]);

    const [open, setOpen] = useState(false);

    const classId = queryParameters.get("classId");

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetStudents(classId, token);
                setStudents([...data]);
            } catch (ignored) {
                message.error(ignored.error)
             }
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchExamCount() {
            try {
                const data = await callGetExamCounts(classId, token);
                setExamCounts([...data]);
            } catch (ignored) {
                message.error(ignored.error)
            }
        }
        fetchExamCount();
    }, [students])

    const removeStudent = async (username) => {
        try {
            const data = await callRemoveStudent(classId, username, token);
            setStudents([...data]);
            message.info("Xóa học sinh thành công");
        } catch (ignored) {
            message.error(ignored.message)
        }        
    }

    const merge = (source, target) => {
        const clone = [...source];
        clone.forEach(e => {
            let found = target.find(item => item.studentUsername === e.username);
            if (found) {
                e.totalSubmitExam = found.totalSubmitExam
            } else {
                e.totalSubmitExam = 0
            }
        })
        return clone;
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            )
        },
        {
            title: 'Tên',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a,b) => a.firstName.charCodeAt(0) - b.firstName.charCodeAt(0)
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
            key: 'dob'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (<span>{getLabel(USER_ACTIVE, active)}</span>),
            filters: createFilterFromEnum(USER_ACTIVE),
            onFilter: (value, record) => record.active === value,
        },
        {
            title: 'Số đề thi đã làm',
            dataIndex: 'totalSubmitExam',
            key: 'totalSubmitExam',
            sorter: (a,b) => a.totalSubmitExam - b.totalSubmitExam
        },
        {
            title: '',
            dataIndex: 'username',
            key: 'action-1',
            render: (username) => (
                <Button icon={<DeleteOutlined />} onClick={() => removeStudent(username)} danger title="Xóa học sinh"></Button>
            )
        }
    ]

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };


    const onOk = async (selectedStudent) => {
        console.log(selectedStudent);
        const data = await callAddStudent(classId, selectedStudent.username, token);
        message.info("Thêm học sinh thành công!");
        setStudents([...data]);
        hideModal();
    }

    return <>
        <Row className="d-flex-inline justify-content-end"> 
            <Button icon={<PlusOutlined />} type='primary' onClick={showModal}>Thêm học sinh</Button>
        </Row>
        <Row className="mt-3 d-flex justify-content-center">
            <Table dataSource={merge(students,examCounts)} columns={columns} style={{width: '100%'}}>
            </Table>
        </Row>
        <StudentSearchModal open={open} onCancel={hideModal} onOk={onOk} />

    </>
}

export default ClassDetailPage;