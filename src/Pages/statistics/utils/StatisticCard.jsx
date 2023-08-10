import { Card, Typography, Statistic } from "antd";
import Icon from "@ant-design/icons";

const { Text } = Typography;

const StatisticCard = ({ title, icon, value }) => {
    return (
        <Card style={{width: 300}}>
            <div className="d-flex flex-column justify-content-between">
                <div className="d-inline-flex justify-content-between">
                    <Text style={{fontSize: '1em'}}>{title}</Text>
                    <Icon component={icon} style={{ fontSize: '1.5em' }} />
                </div>
                <Text strong style={{fontSize: '1.5em'}}>{value}</Text>
            </div>
        </Card>
    )
}

export default StatisticCard;