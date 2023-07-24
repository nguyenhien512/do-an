import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {convertScore} from "../../../util/convertData";

const ScoreBar = (props) => {
    const {loading, byScoreBars} = props
    const formatXAxis = (tickItem) => {
        return convertScore(tickItem.toString());
    }
    return (
        <div style={{ width: "50%", height: "50%" }}>
            <BarChart
                loading={loading}
                width={1000}
                height={300}
                data={byScoreBars}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barGap={10}
                barCategoryGap={10}
                barSize={50}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="point"
                    tickFormatter={formatXAxis}
                />
                <YAxis
                    allowDecimals="true"
                />
                <Tooltip
                    labelFormatter={(value) => {
                        return convertScore(value);
                    }}
                />
                <Legend />
                <Bar
                    dataKey="studentNum"
                    fill="#8884d8"
                    name="Số lượng học sinh"
                />
            </BarChart>
        </div>
    )
}

export default ScoreBar;