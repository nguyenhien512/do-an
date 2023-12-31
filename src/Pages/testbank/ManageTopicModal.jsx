import { useState, useEffect } from 'react';
import { Modal, Table, Typography, Button, Space, Row, Col, Input, Form, Popconfirm, message } from 'antd';
import { useSearchParams, useNavigate } from "react-router-dom";
import { callGetTopics, callUpdateTopic, callCreateTopic } from '../../Components/Topic/TopicApi'
import { PlusOutlined } from '@ant-design/icons';


const { Text } = Typography;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name="name"
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

const ManageTopicModal = ({ open, handleOk, handleCancel }) => {

    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [data, setData] = useState([]);

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetTopics(token);
                setData(addKey(data));
            } catch (ignored) {
                message.error(ignored.message)
             }
        }
        if (open) {
            fetchData();
        }
    }, [open])

    const remove = (key) => {
        setData(data.filter((item) => item.key !== key));
    }

    const edit = (record) => {
        console.log("record", record);
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        const row = await form.validateFields();
        console.log("row=", row);
        const originalRow = data.find((item) => key === item.key);
        const updatedTopic = { ...originalRow, ...row };
        console.log("updatedTopic", updatedTopic);
        try {
            const status = await callUpdateTopic(updatedTopic, token);
            setData(data.map(e => e.key === key ? { ...e, ...updatedTopic } : e));
            message.info('Sửa chủ đề kiến thức thành công')
        } catch (ignored) {
            message.error(ignored.message)
        }
        console.log("data", data);
        setEditingKey('');
    };

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            editable: true,
        },
        {
            title: 'Hành động',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return <>
                    {editable ? (
                        <span>
                            <Typography.Link
                                onClick={() => save(record.key)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                Lưu
                            </Typography.Link>
                            <Popconfirm title="Bạn muốn hủy?" onConfirm={cancel}>
                                <a>Hủy</a>
                            </Popconfirm>
                        </span>
                    ) : (<>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
                            style={{
                                marginRight: 8,
                            }} >
                            Sửa
                        </Typography.Link>
                        <Popconfirm title="Bạn muốn xóa?" onConfirm={() => remove(record.key)}>
                            <a>Xóa</a>
                        </Popconfirm>
                    </>
                    )}

                </>
            },
        }
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            }),
        };
    });


    const [name, setName] = useState();

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const addItem = async (event) => {
        event.preventDefault();
        try {
            const newTopic = await callCreateTopic(name, token);
            setData([...data, { key: data.length, ...newTopic }]);
            message.info('Tạo chủ đề kiến thức thành công')
        } catch (ignored) {
            message.error(ignored.message)
        }
    }


    return (

        <Modal title="Cài đặt Chủ đề kiến thức" open={open} onCancel={handleCancel} onOk={handleOk} width='80%' >
            <Row style={{ width: '100%' }} justify='center'>
                <Col span={10}>
                    <Input
                        placeholder="Thêm Chủ đề kiến thức"
                        value={name}
                        onChange={onNameChange}
                    />
                </Col>
                <Col offset={1}></Col>
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Tạo mới
                </Button>
            </Row>
            <Row className='mt-3'>
                <Form form={form} component={false}>
                    <Table
                        style={{ width: '100%' }}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        dataSource={data}
                        columns={mergedColumns}
                    />
                </Form>
            </Row>
        </Modal>

    )
}

export default ManageTopicModal;