import { Space } from "antd";
import { DatabaseOutlined, FileSyncOutlined, UsergroupAddOutlined, BarChartOutlined } from "@ant-design/icons";
import { IconCard } from "../../Components/Card/IconCard";

function TeacherDashboardPage() {

    return (

        <Space size={[24, 24]} align="center">
            <IconCard count={5} icon={DatabaseOutlined} text="Ngân hàng câu hỏi" route="/teacher/testbank"/>
            <IconCard count={5} icon={FileSyncOutlined} text="Quản lý đề thi" route="/teacher/exam"/>
            <IconCard count={5} icon={UsergroupAddOutlined} text="Quản lý lớp học" route="/teacher/class"/>
            <IconCard count={5} icon={BarChartOutlined} text="Thống kê" route="/teacher/statistics"/>
        </Space>
    )
}

export default TeacherDashboardPage;