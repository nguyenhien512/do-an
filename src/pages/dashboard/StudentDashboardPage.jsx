import { Space } from "antd";
import { ReadOutlined, FileDoneOutlined } from "@ant-design/icons";
import { IconCard } from "../../Components/Card/IconCard";

function StudentDashboardPage() {
    return (<>

        <Space size={[24, 24]} align="center" wrap>
            <IconCard count={5} icon={ReadOutlined} text="Thi online" route="/student/exam"/>
            <IconCard count={5} icon={FileDoneOutlined} text="Kết quả thi" route="/student/review"/>
        </Space>
    </>
    )
}

export default StudentDashboardPage;