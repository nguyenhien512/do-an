import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const QuesBar = (props) => {
    const {loading, byQuesBars} = props
    console.log("ques bar: ", byQuesBars)
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
                barGap={10}
                barCategoryGap={10}
                barSize={50}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="point"
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
                />
                <Bar
                    dataKey="wrong"
                    fill="#FF0000"
                    name="Sai"
                />
            </BarChart>
        </div>
    )
}

export default QuesBar;