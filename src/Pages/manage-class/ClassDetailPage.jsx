import { Table, message, Button, Row, Col, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { callAddStudent, callGetStudents, callRemoveStudent, callGetExamCounts } from './ClassApi';
import StudentSearchModal from './StudentSearchModal';

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
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchExamCount() {
            try {
                const data = await callGetExamCounts(classId, token);
                setExamCounts([...data]);    
            } catch (ignored) { }
        }
        fetchExamCount();
    }, [students])

    const removeStudent = async (username) => {
        const data = await callRemoveStudent(classId, username, token);
        message.info("Xóa học sinh thành công");
        setStudents([...data]);
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
            title: 'Đề thi đã làm',
            dataIndex: 'username',
            key: 'numberOfSubmittedExams',
            render: (username) => {
                let found = examCounts.filter(item => item.studentUsername == username);
                return <span>{found.length > 0 ? found[0].totalSubmitExam : 0}</span>
            }
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
        <Row>
            <Col span={20} >
                <Table dataSource={students} columns={columns}>
                </Table>
            </Col>
            <Col span={4}>
               <div className="d-flex justify-content-center"><Button icon={<PlusOutlined />} type='primary' onClick={showModal}>Thêm học sinh</Button></div>
                
            </Col>
        </Row>
        <StudentSearchModal open={open} onCancel={hideModal} onOk={onOk}/>

    </>
}

export default ClassDetailPage;