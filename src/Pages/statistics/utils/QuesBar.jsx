import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const QuesBar = (props) => {
    const {loading, byQuesBars} = props
    console.log("ques bar: ", byQuesBars)
    const formatXAxis = (tickItem) => {
        return "Câu " + tickItem.toString();
    }
    return (
        <div style={{ width: "50%", height: "50%" }}>
            <BarChart
                loading={loading}
                width={1000}
                height={300}
                data={byQuesBars}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barGap={0}
                barCategoryGap={0}
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
                <Tooltip/>
                <Legend />
                <Bar
                    dataKey="correct"
                    fill="#00FF00"
                    name="Đúng"
                    stackId="a"
                />
                <Bar
                    dataKey="wrong"
                    fill="#FF0000"
                    name="Sai"
                    stackId="a"
                />
            </BarChart>
        </div>
    )
}

export default QuesBar;