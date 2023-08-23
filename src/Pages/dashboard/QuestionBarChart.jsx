import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { QUESTION_LEVEL } from '../../util/enum';

const QuestionBarChart = ({data}) => {
    return(
    <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        barCategoryGap={'20%'}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={QUESTION_LEVEL[0].label} fill="#8884d8" />
        <Bar dataKey={QUESTION_LEVEL[1].label} fill="#82ca9d" />
        <Bar dataKey={QUESTION_LEVEL[2].label} fill="#ffc658" />
        <Bar dataKey={QUESTION_LEVEL[3].label} fill="#FF8042" />
    </BarChart>
    )
}

export default QuestionBarChart;