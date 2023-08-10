import {Table, Typography} from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";
import { formatDateTime } from '../../../util/dateTimeUtil'

const StudentBoard = (props) => {

    const navigate = useNavigate();
    const {loading, data} = props
    const sortName = (a,b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    function viewTest(id) {
        const params = { testId: id };
        navigate({
            pathname: '/teacher/exam/test-result',
            search: `?${createSearchParams(params)}`,
        });

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
            title: 'Họ',
            dataIndex: 'student',
            key: 'firstName',
            render: (student) => (
                <span>{student.firstName}</span>
            )
        },
        {
            title: 'Tên',
            dataIndex: 'student',
            key: 'lastName',
            render: (student) => (
                <span>{student.lastName}</span>
            )
        },
        {
            title: 'Username',
            dataIndex: 'student',
            key: 'username',
            render: (student) => (
                <span>{student.username}</span>
            )
        },
        {
            title: 'Thời điểm nộp bài',
            dataIndex: 'submitTime',
            key: 'submitTime',
            render: (submitTime) => (
                <span>{formatDateTime(submitTime)}</span>
            ),
            sorter: (a,b) => Date.parse(a.submitTime) - Date.parse(b.submitTime)
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score',
            render: (score) => {
                return <span>{score.toFixed(2)}</span>
            },
            sorter: (a,b) => a.score - b.score
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Typography.Link onClick={() => viewTest(id)}>Xem chi tiết</Typography.Link>
            )
        }
    ]

    return (
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={{
                    showQuickJumper: true,
                }}
                style={{
                    width: '100%'
                }}
            />
    )
}
export default StudentBoard