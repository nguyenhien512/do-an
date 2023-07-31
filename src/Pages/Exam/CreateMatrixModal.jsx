import { callGetExamMatrix, callGetTopics } from "./TeacherExamApi";
import { useState, useEffect } from 'react';
import { Modal, Table, Typography, Button, Select, Row, Col, Input, InputNumber, Form, Popconfirm } from 'antd';
import { useSearchParams, useNavigate } from "react-router-dom";

const { Text } = Typography;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    options,
    ...restProps
}) => {
    const inputNode = inputType === 'select' ? <Select options={options} style={{width: 120}}/> : <InputNumber min={0}/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Yêu cầu nhập ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const CreateMatrixModal = ({ open, handleOk, handleCancel }) => {

    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();

    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");

    const [data, setData] = useState([]);

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const [topics, setTopics] = useState();

    const [options, setOptions] = useState();

    useEffect(() => {
      async function fetchData() {
          try {
              const data = await callGetTopics(token);
              setTopics([...data]);
              setOptions(data.map (topic => ({
                  value: topic.id,
                  label: topic.name
              })));
          } catch (ignored) { }
      }
      fetchData();
  },[])

    const edit = (record) => {
        console.log("record", record);
        form.setFieldsValue({
            name: '',
            level: '',
            sum: '',
            percent: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log("row = ",row);
            const newRow = {
                ...row,
                name: topics.find(t => t.id === row.name)?.name,
                sum: row.LEVEL_1 + row.LEVEL_2 + row.LEVEL_3 + row.LEVEL_4               
            }
            console.log("newrow", newRow);
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                console.log("item", item);
                newData.splice(index, 1, {
                    ...item,
                    id: row.name,
                    name: newRow.name,
                    level: {
                        LEVEL_1: newRow.LEVEL_1,
                        LEVEL_2: newRow.LEVEL_2,
                        LEVEL_3: newRow.LEVEL_3,
                        LEVEL_4: newRow.LEVEL_4
                    },
                    sum: newRow.sum
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(newRow);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));

    const summaryData = (data) => {
        let sumLevel1 = 0;
        let sumLevel2 = 0;
        let sumLevel3 = 0;
        let sumLevel4 = 0;
        let sumAll = 0;
        data.forEach(({ name, level: { LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4 }, sum }) => {
            sumLevel1 += LEVEL_1;
            sumLevel2 += LEVEL_2;
            sumLevel3 += LEVEL_3;
            sumLevel4 += LEVEL_4;
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
            title: 'Nội dung kiến thức',
            dataIndex: 'name',
            key: 'name',
            rowScope: 'row',
            editable: true,
        },
        {
            title: 'Mức độ nhận thức',
            editable: true,
            children: [
                {
                    title: 'Nhận biết',
                    dataIndex: 'level',
                    key: 'LEVEL_1',
                    editable: true,
                    render: (level) => (<span>
                        {level.LEVEL_1}
                    </span>)
                },
                {
                    title: 'Thông hiểu',
                    dataIndex: 'level',
                    key: 'LEVEL_2',
                    editable: true,
                    render: (level) => (<span>
                        {level.LEVEL_2}
                    </span>)
                },
                {
                    title: 'Vận dụng',
                    dataIndex: 'level',
                    key: 'LEVEL_3',
                    editable: true,
                    render: (level) => (<span>
                        {level.LEVEL_3}
                    </span>)
                },
                {
                    title: 'Vận dụng cao',
                    dataIndex: 'level',
                    key: 'LEVEL_4',
                    editable: true,
                    render: (level) => (<span>
                        {level.LEVEL_4}
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
            title: 'Hành động',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        }
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        if (col.children) {
            return {
                ...col,
                children: col.children.map(childCol => ({
                    ...childCol,
                    onCell: (record) => ({
                      record,
                      inputType: childCol.dataIndex === 'name' ? 'select' : 'number',
                      dataIndex: childCol.key,
                      title: childCol.title,
                      editing: isEditing(record),
                      options: options
                    }),
                }))
            }
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'name' ? 'select' : 'number',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
            options: options
          }),
        };
      });

    const emptyRow = {
        key: data.length,
        id: '',
        name: "",
        level: {
            LEVEL_1: 0,
            LEVEL_2: 0,
            LEVEL_3: 0,
            LEVEL_4: 0,
        },
        sum: '',
        percent: ''
    }

    const addRow = () => {
        setData([...data, emptyRow]);

    }

    const convertDataToMatrix = (data) => {
        const result = [];
        data.forEach(e => {
            let level = e.level;
            for (const prop in level) {
                if (level[prop] > 0) {
                    result.push(
                        {
                            "level": prop,
                            "topic": {
                                "id": e.id
                            },
                            "numberOfQuestions": level[prop]
                        }
                    )
                }
            }
        })
        return result;
    }

    const onOk = () => {
        handleOk(convertDataToMatrix(data));
    }


    return (

        <Modal title="Tạo ma trận đề" open={open} onOk={onOk} onCancel={handleCancel} width='80%' >
            <Row>
                <Col span={4}>
                    <Button onClick={addRow}>Thêm dòng</Button>
                </Col>
                <Col span={18} offset={1}>
                    <Form form={form} component={false}>
                        <Table
                            style={{width: '100%'}}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            dataSource={data}
                            columns={mergedColumns}
                            bordered
                            summary={(currentData) => summaryData(currentData)}
                            pagination={{
                                onChange: cancel,
                            }} />
                    </Form>
                </Col>
            </Row>
        </Modal>

    )
}

export default CreateMatrixModal;