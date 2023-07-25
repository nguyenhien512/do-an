import {Table} from "antd";

const StudentBoard = (props) => {
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

    const column = [
        {
            title: "STT",
            render: (text,record,index) => index + 1,
        },
        {
            title: "Họ",
            dataIndex: "lastName",
            sorter: (a, b) => sortName(a.firstName, b.firstName)
        },
        {
            title: "Tên",
            dataIndex: "firstName",
            sorter: (a, b) => sortName(a.lastName, b.lastName),
        },
        {
            title: "Username",
            dataIndex: "username",
            sorter: (a, b) => sortName(a.username, b.username),
        },
        {
            title: "Điểm",
            dataIndex: "score",
            sorter: (a,b) => a.score - b.score
        }
    ]

    return (
        <div className="table-container">
            <Table
                loading={loading}
                columns={column}
                dataSource={data}
                pagination={{
                    showQuickJumper: true,
                }}
            />
        </div>

    )
}
export default StudentBoard