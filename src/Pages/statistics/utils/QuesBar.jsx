import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { convertColor } from "../../../util/convertData";
import { useNavigate } from "react-router-dom";
import {Row, Col} from "antd";

const CustomTick = ({x, y, stroke, payload, dataProp }) => {

        let color;
        let level = dataProp.find(e => e.point === payload.value)?.level;
        console.log(level)
        switch (level) {
            case 'LEVEL_1': 
                color = '#00ccff'
                break;
            case 'LEVEL_2':
                color = '#009933'
                break;
            case 'LEVEL_3':
                color = '#ff9900'
                break;
            case 'LEVEL_4':
                color = '#ff00ff';
                break;
            default: 
                color = '#ffffff';
        }
        console.log(color);

    return <g transform={`translate(${x},${y})`} style={{cursor: "pointer"}}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill={color} fontWeight='bold'>
            Câu {payload.value}
        </text>
    </g>
}

const QuesBar = (props) => {
    const { loading, byQuesBars } = props
    let navigate = useNavigate()
    const formatXAxis = (tickItem) => {
        console.log("Tick item", tickItem)
        return "Câu " + tickItem.toString();
    }

    
    return (
        <div  className="d-flex">
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
                    // tickFormatter={formatXAxis}
                    onClick={(tickItem) => {
                        let page = window.location.href
                        window.location.href = page.replace('statistics', `testbank?qId=${tickItem.value}`)
                    }}
                    tick={<CustomTick dataProp={byQuesBars} />}
                />
                <YAxis
                    allowDecimals="true"
                />
                <Tooltip />
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
            <div>
                <div className="d-inline-flex justify-content-between align-items-center">
                    <div style={{backgroundColor: '#00ccff', width: 20, height: 10}}/> 
                    <span>Nhận biết</span>
                </div><br/>
                <div className="d-inline-flex justify-content-between align-items-center">
                    <div style={{backgroundColor: '#009933', width: 20, height: 10}}/> 
                    <span>Thông hiểu</span>
                </div><br/>
                <div className="d-inline-flex justify-content-between align-items-center">
                    <div style={{backgroundColor: '#ff9900', width: 20, height: 10}}/> 
                    <span>Vận dụng</span>
                </div><br/>
                <div className="d-inline-flex justify-content-between align-items-center">
                    <div style={{backgroundColor: '#ff00ff', width: 20, height: 10}}/> 
                    <span>Vận dụng cao</span>
                </div><br/>
            </div>
        </div>
    )
}

export default QuesBar;