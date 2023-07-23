import { callGetExam } from './TeacherExamApi';
import { Table, Tag, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { formatDateTime } from '../../util/dateTimeUtil';
import { SettingOutlined, PaperClipOutlined } from "@ant-design/icons";

function TeacherExamPage() {

    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetExam(token);
                setExams([...data]);
                localStorage.setItem("exams",JSON.stringify(data));
            } catch (ignored) { }
        }
        fetchData();
    }, [])
    console.log("exams", exams);

    function viewTests(id) {
        const params = { examId: id };
        navigate({
            pathname: '/teacher/exam/tests',
            search: `?${createSearchParams(params)}`,
        });

    }

    function examSettings(id) {
        const params = { examId: id };
        navigate({
            pathname: '/teacher/exam/settings',
            search: `?${createSearchParams(params)}`,
        });

    }

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số lượt thi',
            dataIndex: 'examTimes',
            key: 'examTimes'
        },
        {
            title: 'Thời gian mở',
            dataIndex: 'openTime',
            key: 'openTime',
            render: (openTime) => (
                <span>{formatDateTime(openTime)}</span>
            )
        },
        {
            title: 'Thời gian đóng',
            dataIndex: 'closeTime',
            key: 'closeTime',
            render: (closeTime) => (
                <span>{formatDateTime(closeTime)}</span>
            )
        },
        {
            title: 'Giao cho lớp',
            dataIndex: 'studentClassName',
            key: 'studentClassName'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                status == 'PUBLISHED' ?
                    <Tag key={status} color="#1677ff">Đã xuất bản</Tag>
                    : <Tag key={status} >Chưa xuất bản</Tag>
            )
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'action-1',
            render: (id) => (
                <a title='Cài đặt' onClick={() => examSettings(id)}>
                    <SettingOutlined />
                </a>

            )
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'action-2',
            render: (id) => (
                <a title='Xem bài đã nộp' onClick={() => viewTests(id)}>
                    <PaperClipOutlined />
                </a>

            )
        }
    ]

    return <>
        <Table dataSource={exams} columns={columns}>
        </Table>

    </>
}

export default TeacherExamPage