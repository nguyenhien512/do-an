import { callGetExamMatrix } from "./TeacherExamApi";
import { useState, useEffect } from 'react';
import { Modal, Table, Typography } from 'antd';
import { useSearchParams, useNavigate } from "react-router-dom";

const { Text } = Typography;

const ExamMatrixModal = ({ open, handleClose }) => {

    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();

    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");

    const [dataSource, setDataSource] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const matrix = await callGetExamMatrix(examId, token)
                setDataSource(convertMatrixToData(matrix));
            } catch (ignored) { }
        }
        if (open) {
            fetchData();
        }
    }, [open])

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));

    const getQtyByLevel = (topicId, level, matrix) => {
        let record = matrix.find(item => item.topic.id === topicId && item.level === level);
        if (record) {
            return record.numberOfQuestions;
        } else {
            return 0;
        }
    }


    const convertMatrixToData = (matrix) => {
        let total = matrix?.map(e => e.numberOfQuestions).reduce((a, b) => a + b, 0);
        let topics = matrix?.map(e => e.topic).filter((item, index, array) => index === array.findIndex(t => t.id === item.id && t.name == item.name));
        let data = topics?.map(topic => {
            let level = {
                level1: getQtyByLevel(topic.id, 'LEVEL_1', matrix),
                level2: getQtyByLevel(topic.id, 'LEVEL_2', matrix),
                level3: getQtyByLevel(topic.id, 'LEVEL_3', matrix),
                level4: getQtyByLevel(topic.id, 'LEVEL_4', matrix)
            }
            let sum = Object.values(level).reduce((a, b) => a + b, 0);
            let percent = Math.round(sum / total * 100);
            return ({
                name: topic?.name,
                level: level,
                sum: sum,
                percent: percent
            })
        });
        return addKey(data);
    }

    const summaryData = (data) => {
        let sumLevel1 = 0;
        let sumLevel2 = 0;
        let sumLevel3 = 0;
        let sumLevel4 = 0;
        let sumAll = 0;
        data.forEach(({ name, level: { level1, level2, level3, level4 }, sum }) => {
            sumLevel1 += level1;
            sumLevel2 += level2;
            sumLevel3 += level3;
            sumLevel4 += level4;
            sumAll += sum;
        })
        return <>
            <Table.Summary.Row>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text strong style={{ color: '#1677ff' }}>Tổng</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text strong style={{ color: '#1677ff' }}>{sumLevel1}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text strong style={{ color: '#1677ff' }}>{sumLevel2}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text strong style={{ color: '#1677ff' }}>{sumLevel3}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text strong style={{ color: '#1677ff' }}>{sumLevel4}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text strong style={{ color: '#1677ff' }}>{sumAll}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                    <Text>100</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    }


    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            rowScope: 'row',
            render: (key) => (
                <span>{key + 1}</span>
            )
        },
        {
            title: 'Chủ đề kiến thức',
            dataIndex: 'name',
            rowScope: 'row',
        },
        {
            title: 'Mức độ nhận thức',
            children: [
                {
                    title: 'Nhận biết',
                    dataIndex: 'level',
                    key: 'level1',
                    render: (level) => (<span>
                        {level.level1}
                    </span>)
                },
                {
                    title: 'Thông hiểu',
                    dataIndex: 'level',
                    key: 'level2',
                    render: (level) => (<span>
                        {level.level2}
                    </span>)
                },
                {
                    title: 'Vận dụng',
                    dataIndex: 'level',
                    key: 'level3',
                    render: (level) => (<span>
                        {level.level3}
                    </span>)
                },
                {
                    title: 'Vận dụng cao',
                    dataIndex: 'level',
                    key: 'level4',
                    render: (level) => (<span>
                        {level.level4}
                    </span>)
                }
            ]
        },
        {
            title: 'Tổng số câu hỏi',
            key: 'sum',
            dataIndex: 'sum',
            render: (text) => <Text strong style={{ color: '#1677ff' }}>{text}</Text>
        },
        {
            title: '% Tổng điểm',
            key: 'percent',
            dataIndex: 'percent'
        }
    ]


    return (
        <Modal title="Ma trận đề" open={open} onOk={handleClose} onCancel={handleClose} width='80%' >
            <Table dataSource={dataSource} columns={columns} bordered summary={(currentData) => summaryData(currentData)} />
        </Modal>
    )
}

export default ExamMatrixModal;