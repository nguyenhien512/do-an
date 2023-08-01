import { Card, Badge } from "antd";
import Icon from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const IconCard = ({ count, icon, text, route }) => {

    const navigate = useNavigate();

    const navigateMenu = () => {
        navigate(route);
    }
    return (
        <Badge count={null}>
            <Card style={{ width: 200, height: 200, cursor: "pointer" }} onClick={navigateMenu}>
                <div className='d-flex flex-column justify-content-between text-center align-items-center'>
                    <Icon component={icon} style={{ fontSize: 100 }} />
                    <span className="mt-3">{text}</span>
                </div>

            </Card>
        </Badge>
    )
}