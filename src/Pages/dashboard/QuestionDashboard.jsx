import { useState, useEffect } from 'react';
import { Row, Col, Select, message } from 'antd';
import { GRADE, QUESTION_LEVEL, QUESTION_STATUS, SUBJECT, getLabel } from '../../util/enum';
import { callCountQuestionByMatrix } from '../testbank/QuestionApi';
import { groupObjectsByNestedProperty } from '../../util/arrayUtil';
import QuestionBarChart from './QuestionBarChart';
import QuestionPieChart from "./QuestionPieChart";

const QuestionDashboard = () => {
    const [grade, setGrade] = useState(GRADE[0].value);
    const [subject, setSubject] = useState(SUBJECT[0].value);
    const [status, setStatus] = useState(QUESTION_STATUS[0].value);
    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callCountQuestionByMatrix(grade, subject, status, token)
                setData(data)
            } catch (ignored) {
                message.error(ignored.message)
            }
        }
        fetchData()
    }, [grade, subject, status])

    const processData = (data) => {
        const groupData = groupObjectsByNestedProperty(data, 'topic.name')
        const results = Object.keys(groupData).map(key => {
            const result = {}
            let sum = 0
            result['name'] = key;
            for (const obj of groupData[key]) {
                result[getLabel(QUESTION_LEVEL, obj.level)] = obj.numberOfQuestions
                sum += obj.numberOfQuestions
            }
            result['sum'] = sum;
            return result
        })
        console.log(results)
        return results
    }

    return (<>
        <Row justify={'center'}>
            <Col>
                <Select
                    defaultValue={GRADE[0].value}
                    style={{
                        width: 120,
                    }}
                    options={GRADE}
                    onChange={(value) => setGrade(value)}
                />
            </Col>
            <Col offset={1}>
                <Select
                    defaultValue={SUBJECT[0].value}
                    style={{
                        width: 120,
                    }}
                    options={SUBJECT}
                    onChange={(value) => setSubject(value)}
                />
            </Col>
            <Col offset={1}>
                <Select
                    defaultValue={QUESTION_STATUS[0].value}
                    style={{
                        width: 120,
                    }}
                    options={QUESTION_STATUS}
                    onChange={(value) => setStatus(value)}
                />
            </Col>
        </Row>
        <Row className='mt-3' justify={'center'}>
            <QuestionBarChart data={processData(data)} />
        </Row>
        <Row className='mt-3' justify={'center'}>
            <QuestionPieChart data={processData(data)} />
        </Row>

    </>)

}

export default QuestionDashboard;