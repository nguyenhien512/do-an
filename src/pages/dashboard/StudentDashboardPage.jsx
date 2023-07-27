import { Space } from "antd";
import { ReadOutlined, FileDoneOutlined } from "@ant-design/icons";
import { IconCard } from "../../Components/Card/IconCard";

function StudentDashboardPage() {
    return (<>

        <Space size={[24, 24]} align="center">
            <IconCard count={5} icon={ReadOutlined} text="Thi online" />
            <IconCard count={5} icon={FileDoneOutlined} text="Kết quả thi" />
        </Space>
    </>
    )
}

export default StudentDashboardPage;