import { Row } from "antd";
import { UsergroupAddOutlined, DatabaseOutlined } from "@ant-design/icons";
import { IconCard } from "../../Components/Card/IconCard";
import QuestionDashboard from "./QuestionDashboard";

function AdminDashboardPage() {
    return (<>

        {/* <Space size={[24, 24]} align="center" wrap>
            <IconCard count={5} icon={UsergroupAddOutlined} text="Quản lý người dùng" route="/admin/manage-user"/>
            <IconCard count={5} icon={DatabaseOutlined} text="Quản lý câu hỏi" route="/admin/testbank"/>
        </Space> */}

        <QuestionDashboard />

    </>
    )
}

export default AdminDashboardPage;